// lib/apple-webservice.js - Web Service para Apple Wallet con APNs + PostgreSQL (Prisma)
import express from 'express';
// import { firestore } from '../src/db/compat.js'; // REMOVED
import { buildApplePassBuffer } from './apple.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import * as http2 from 'node:http2';

// Prisma Repos
import repos from '../src/db/repositories.js';
const {
  cards: CardsRepo,
  appleDevices: AppleDevicesRepo,
  appleUpdates: AppleUpdatesRepo
} = repos;

const router = express.Router();

console.log('[APPLE WEB SERVICE] ✅ Configurado para PostgreSQL (Prisma) - Router V2');

// ⭐ AUTH TOKEN
const APPLE_AUTH_TOKEN = process.env.APPLE_AUTH_TOKEN;


/* =========================================================
   CONFIGURACIÓN APNs
   ========================================================= */

function getAPNsConfig() {
  const keyId = process.env.APPLE_KEY_ID;
  const teamId = process.env.APPLE_TEAM_ID;
  const keyBase64 = process.env.APPLE_APNS_KEY_BASE64;

  if (!keyId || !teamId || !keyBase64) {
    throw new Error('Faltan credenciales de APNs: APPLE_KEY_ID, APPLE_TEAM_ID, APPLE_APNS_KEY_BASE64');
  }

  const key = Buffer.from(keyBase64, 'base64').toString('utf8');

  return {
    keyId,
    teamId,
    key: key
  };
}

/* =========================================================
   GENERAR JWT PARA APNs
   ========================================================= */

function generateAPNsToken() {
  const config = getAPNsConfig();

  const token = jwt.sign(
    {
      iss: config.teamId,
      iat: Math.floor(Date.now() / 1000)
    },
    config.key,
    {
      algorithm: 'ES256',
      header: {
        alg: 'ES256',
        kid: config.keyId
      }
    }
  );

  return token;
}

/* =========================================================
   ENVIAR NOTIFICACIÓN APNs
   ========================================================= */

async function sendAPNsAlertNotification(pushToken, title, body) {
  const apnsHost = 'api.push.apple.com';
  const apnsPort = 443;

  try {
    const token = generateAPNsToken();
    const apnsTopic = process.env.APPLE_PASS_TYPE_ID;

    const apnsPayload = {
      "aps": {
        "alert": {
          "title": title || "Venus Cosmetología",
          "body": body || "Tienes una nueva actualización"
        },
        "sound": "default",
        "badge": 1,
        "mutable-content": 1,
        "content-available": 0 // 1 for background?
      }
    };

    const jsonPayload = JSON.stringify(apnsPayload);

    const client = http2.connect(`https://${apnsHost}:${apnsPort}`);

    return new Promise((resolve, reject) => {
      client.on('error', (err) => {
        client.close();
        console.error('[APNs/ALERT] ❌ Client Error:', err);
        reject(new Error(`APNs connection failed: ${err.message}`));
      });

      const req = client.request({
        [http2.constants.HTTP2_HEADER_METHOD]: http2.constants.HTTP2_METHOD_POST,
        [http2.constants.HTTP2_HEADER_PATH]: `/3/device/${pushToken}`,
        'authorization': `bearer ${token}`,
        'apns-topic': apnsTopic,
        'apns-push-type': 'alert',
        'apns-priority': '10',
        'apns-expiration': '0',
        'content-type': 'application/json',
        'content-length': Buffer.byteLength(jsonPayload)
      });

      req.on('response', (headers) => {
        const statusCode = headers[http2.constants.HTTP2_HEADER_STATUS];
        let data = '';
        req.on('data', (chunk) => { data += chunk; });
        req.on('end', () => {
          client.close();
          if (statusCode === 200) {
            resolve(true);
          } else {
            console.error(`[APNs/ALERT] ❌ Error ${statusCode}:`, data);
            reject(new Error(`APNs failed ${statusCode}`));
          }
        });
      });

      req.on('error', (err) => {
        client.close();
        reject(new Error(`APNs request failed: ${err.message}`));
      });

      req.end(jsonPayload);
    });

  } catch (error) {
    console.error('[APNs/ALERT] ❌ Error general:', error);
    throw error;
  }
}

async function sendAlertToCardDevices(serialNumber, title, message) {
  const result = { sent: 0, errors: 0, total: 0, errorDetails: [] };

  try {
    const devices = await AppleDevicesRepo.findBySerial(serialNumber);
    result.total = devices.length;

    if (result.total === 0) return result;

    for (const device of devices) {
      try {
        await sendAPNsAlertNotification(device.pushToken, title, message);
        result.sent++;
      } catch (error) {
        result.errors++;
        result.errorDetails.push({ deviceId: device.deviceId, error: error.message });

        if (error.message.includes('410') || error.message.includes('BadDeviceToken')) {
          try {
            await AppleDevicesRepo.delete(device.deviceId, serialNumber);
          } catch (e) {
            console.error('Failed to cleanup zombie token', e);
          }
        }
      }
    }
    return result;

  } catch (error) {
    console.error('[APPLE ALERT] ❌ Error crítico:', error);
    return result;
  }
}

async function notifyCardUpdate(cardId, title = "Venus Cosmetología", message = "Tu tarjeta ha sido actualizada") {
  return sendAlertToCardDevices(cardId, title, message);
}

async function updatePassAndNotify(cardId, oldStamps, newStamps, customMessage = null) {
  // Log update
  await AppleUpdatesRepo.create(cardId);

  let title = "Venus Cosmetología";
  let message = customMessage;

  if (!message) {
    if (newStamps === 0 && oldStamps > 0) {
      title = "¡Canje realizado! 🎉";
      message = "Has canjeado tu recompensa. Comienza a acumular nuevos sellos.";
    } else if (newStamps > oldStamps) {
      title = "¡Nuevo sello! 🎉";
      message = `Tienes ${newStamps} sellos acumulados.`;
    } else {
      title = "Actualización";
      message = "Tu tarjeta ha sido actualizada.";
    }
  }

  return notifyCardUpdate(cardId, title, message);
}

/* =========================================================
   MIDDLEWARE AUTH
   ========================================================= */

function appleAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('ApplePass ')) {
    return res.status(401).send('Unauthorized');
  }

  const receivedToken = authHeader.substring('ApplePass '.length).trim();
  if (!APPLE_AUTH_TOKEN || receivedToken !== APPLE_AUTH_TOKEN) {
    return res.status(401).send('Unauthorized');
  }

  next();
}


/* =========================================================
   ROUTES
   ========================================================= */

// 1. Logging
router.post('/log', async (req, res) => {
  try {
    if (req.body?.logs) console.log('[APPLE LOG]', JSON.stringify(req.body.logs));
    res.sendStatus(200);
  } catch { res.sendStatus(500); }
});

// 2. Register Device
router.post('/devices/:deviceId/registrations/:passTypeId/:serial', appleAuthMiddleware, async (req, res) => {
  try {
    const { deviceId, passTypeId, serial } = req.params;
    const { pushToken } = req.body;

    // Verificar tarjeta
    const card = await CardsRepo.findById(serial);
    if (!card) return res.sendStatus(404);

    await AppleDevicesRepo.register({
      deviceId,
      passTypeId,
      serialNumber: serial,
      pushToken
    });

    res.sendStatus(201);
  } catch (e) {
    // Ignorar unique constraints errors (ya registrado)
    if (e.code === 'P2002') return res.sendStatus(200);
    console.error(e);
    res.sendStatus(500);
  }
});

// 3. Get Serial Numbers (pases actualizados)
router.get('/devices/:deviceId/registrations/:passTypeId', appleAuthMiddleware, async (req, res) => {
  try {
    const { deviceId, passTypeId } = req.params;
    const passesUpdatedSince = req.query.passesUpdatedSince;

    // Obtener todos los serials registrados en este dispositivo
    const devices = await AppleDevicesRepo.findByDevice(deviceId); // Filtrar por passTypeId si fuera necesario en repo
    // Como la tabla no tiene passTypeId en la query del repo generico, asumimos que deviceId es unico por passType user-agent
    // Pero idealmente el repo deberia soportar filtro.
    // Dado que el schema tiene composite unique [deviceId, passTypeId, serialNumber], esta bien.

    // Filtrar por passTypeId aquí si el repo trae todo
    const myDevices = devices.filter(d => d.passTypeId === passTypeId);

    if (myDevices.length === 0) return res.sendStatus(204);

    let serials = myDevices.map(d => d.serialNumber);

    if (passesUpdatedSince) {
      let sinceDate = new Date(passesUpdatedSince);
      // Si es timestamp numérico
      if (!isNaN(passesUpdatedSince)) sinceDate = new Date(parseInt(passesUpdatedSince) * 1000);

      const filtered = [];
      for (const serial of serials) {
        const updates = await AppleUpdatesRepo.findSince(serial, sinceDate);
        if (updates.length > 0) filtered.push(serial);
      }
      serials = filtered;
    }

    if (serials.length === 0) return res.sendStatus(204);

    res.json({
      lastUpdated: new Date().toISOString(),
      serialNumbers: serials
    });

  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// 4. Get Latest Pass
router.get('/passes/:passTypeId/:serial', appleAuthMiddleware, async (req, res) => {
  try {
    const { serial } = req.params;
    const card = await CardsRepo.findById(serial);

    if (!card) return res.sendStatus(404);

    // Mapear datos
    const passData = {
      cardId: card.id,
      name: card.name,
      stamps: card.stamps,
      max: card.max,
      latestMessage: card.latestMessage
    };

    const buffer = await buildApplePassBuffer(passData);

    res.set({
      'Content-Type': 'application/vnd.apple.pkpass',
      'Last-Modified': new Date().toUTCString(),
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });

    res.send(buffer);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// 5. Unregister
router.delete('/devices/:deviceId/registrations/:passTypeId/:serial', appleAuthMiddleware, async (req, res) => {
  try {
    const { deviceId, serial } = req.params;
    await AppleDevicesRepo.delete(deviceId, serial);
    res.sendStatus(200);
  } catch {
    res.sendStatus(200); // Siempre 200
  }
});

// Exportar el router por defecto
export default router;

// Exportar funciones helpers
export {
  notifyCardUpdate,
  sendAPNsAlertNotification,
  sendAlertToCardDevices,
  updatePassAndNotify
};