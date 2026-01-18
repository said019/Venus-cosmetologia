# Configuración de Certificados en Render

Para que Apple Wallet y Google Wallet funcionen correctamente en producción (Render), necesitas configurar los certificados como **secretos**.

## Paso 1: Preparar los certificados

Los certificados necesarios están en la carpeta `migration/venus-loyalty/`:
- `pass.pem` - Certificado de firma de Apple
- `pass.key` - Clave privada del certificado
- `wwdr.pem` - Certificado WWDR de Apple
- `google_private.pem` - Clave privada de Google (si usas archivo)

## Paso 2: Agregar secretos en Render

1. Ve a tu proyecto en [Render Dashboard](https://dashboard.render.com)
2. Haz clic en tu Web Service
3. Ve a la pestaña **"Environment"**
4. Haz clic en **"Secret Files"**
5. Agrega cada certificado:

### Apple Wallet Certificates

**Secret File 1:**
- Filename: `/etc/secrets/pass.pem`
- Contents: Copia el contenido completo del archivo `pass.pem`

**Secret File 2:**
- Filename: `/etc/secrets/pass.key`
- Contents: Copia el contenido completo del archivo `pass.key`

**Secret File 3:**
- Filename: `/etc/secrets/wwdr.pem`
- Contents: Copia el contenido completo del archivo `wwdr.pem`

### Google Wallet (Opcional si usas archivo)

**Secret File 4:**
- Filename: `/etc/secrets/google_private.pem`
- Contents: Copia el contenido completo del archivo `google_private.pem`

## Paso 3: Variables de Entorno

Actualiza estas variables de entorno en Render para que apunten a las rutas correctas:

```bash
# Apple Wallet
APPLE_PASS_CERT=/etc/secrets/pass.pem
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
