# Configuración de Certificados en Railway/Render

Para que Apple Wallet y Google Wallet funcionen correctamente en producción (Railway/Render), necesitas configurar los certificados como **secretos**.

## Paso 1: Preparar los certificados

Los certificados necesarios están en la carpeta `migration/venus-loyalty/`:
- `pass.pem` - Certificado de firma de Apple
- `pass.key` - Clave privada del certificado
- `wwdr.pem` o `wwdr_rsa.pem` - Certificado WWDR de Apple (Railway usa `wwdr_rsa.pem`)
- `google_private.pem` - Clave privada de Google (si usas archivo)

## Paso 2: Agregar secretos 

### En Railway:

1. Ve a tu proyecto en [Railway Dashboard](https://railway.app)
2. Selecciona tu servicio
3. Ve a la pestaña **"Variables"**
4. Haz clic en **"+ New Variable"** y selecciona **"Add a Secret File"**
5. Agrega cada certificado:

### En Render:

1. Ve a tu proyecto en [Render Dashboard](https://dashboard.render.com)
2. Haz clic en tu Web Service
3. Ve a la pestaña **"Environment"**
4. Haz clic en **"Secret Files"**
5. Agrega cada certificado:

### Apple Wallet Certificates
_rsa.pem` (Railway) o `/etc/secrets/wwdr.pem` (Render)
- Contents: Copia el contenido completo del archivo `wwdr_rsa.pem` (Railway) o `wwdr.pem` (Render)
- Filename: `/etc/secrets/pass.pem`
- Contents: Copia el contenido completo del archivo `pass.pem`

**Secret File 2:**
- Filename: `/etc/secrets/pass.key`
- Contents: Copia el contenido completo del archivo `pass.key`

**Secret File 3:**
- Filename: `/etc/secrets/wwdr.pem`
- Contents: Copia el contenido completo dailway/Render para que apunten a las rutas correctas:

```bash
# BASE URL (IMPORTANTE - Railway genera una automáticamente)
BASE_URL=https://tu-proyecto.up.railway.app

# Apple Wallet
APPLE_PASS_CERT=/etc/secrets/pass.pem
APPLE_PASS_KEY=/etc/secrets/pass.key
APPLE_WWDR=/etc/secrets/wwdr_rsa.pem  # Railway usa wwdr_rsa.pem
APPLE_TEAM_ID=UC97J4YGP3
APPLE_PASS_TYPE_ID=pass.com.venusloyalty.mx
APPLE_AUTH_TOKEN=886b992303852647cb1d4b59202e8a4c82de200f5788fd17c27ce5cc768fce1d

# Google Wallet
GOOGLE_ISSUER_ID=3388000000023035846
GOOGLE_SA_EMAIL=venus-loyalty-sa@venus-loyalty.iam.gserviceaccount.com
```

### ⚠️ IMPORTANTE: BASE_URL
ailway/R
La variable `BASE_URL` NO debe estar vacía. Railway te genera una URL automática como:
- `https://venus-cosmetologia-production.up.railway.app`

Copia esa URL completa y pégala en `BASE_URL`.LE_PASS_CERT=/etc/secrets/pass.pem
APPLE_PASS_KEY=/etc/secrets/pass.key
APPLE_WWDR=/etc/secrets/wwdr.pem
APPLE_TEAM_ID=tu_team_id_aqui
APPLE_PASS_TYPE_ID=pass.com.venus.loyalty
APPLE_AUTH_TOKEN=venus_secret_token_123

# Google Wallet
GOOGLE_ISSUER_ID=3388000000023035846
GOOGLE_SA_EMAIL=venus-loyalty-sa@venus-loyalty.iam.gserviceaccount.com
```

## Paso 4: Verificar

Después de agregar los secretos:
1. Guarda los cambios
2. Render reiniciará automáticamente tu servicio
3. Verifica los logs para confirmar que los certificados se cargan correctamente

Deberías ver en los logs:
```
[Apple Wallet] Generando pase para: [cardId]
```

Sin errores como:
```
[Apple Wallet] No existe APPLE_PASS_CERT (pass.pem) en: /etc/secrets/pass.pem
```

## Desarrollo Local

Para desarrollo local, el código automáticamente usa rutas relativas desde la carpeta `server/`:
- `APPLE_PASS_CERT=pass.pem` (sin ruta completa)
- `APPLE_PASS_KEY=pass.key`
- `APPLE_WWDR=wwdr.pem`

Los certificados ya están copiados en la carpeta `server/` para desarrollo local.

## Seguridad

⚠️ **IMPORTANTE**: Los certificados están en `.gitignore` y NO se suben al repositorio por seguridad. Solo se configuran en Render como secretos.
