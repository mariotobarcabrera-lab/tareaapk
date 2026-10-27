# Tareas para Android (avisos con la app cerrada)

La app es la misma de `lumeozone.com/tareas`, empaquetada con Capacitor. Dentro de Android, los recordatorios
se programan en el sistema (AlarmManager), así que suenan aunque cierres la app y después de reiniciar el celular.

## Cómo obtener el APK (sin instalar nada en tu computadora)

1. Crea un repositorio nuevo en GitHub llamado `tareas-android` y sube **todo el contenido de esta carpeta**,
   incluida la carpeta oculta `.github`. Si el navegador no te deja subir `.github`, usa
   **Add file → Create new file**, escribe el nombre `.github/workflows/apk.yml` y pega el contenido del archivo `apk.yml`.
2. Entra a la pestaña **Actions**. Si GitHub pide habilitar los flujos, acéptalo.
3. Abre **Compilar APK → Run workflow**. Tarda entre 5 y 10 minutos.
4. Al terminar, entra a la ejecución y descarga el archivo **tareas-apk** (un zip que contiene `app-debug.apk`).
5. Pasa el APK al celular, permite instalar de orígenes desconocidos e instálalo.

## Primera vez en el celular

1. Inicia sesión con la misma cuenta que usas en la web (tus tareas se sincronizan por Firebase).
2. Crea una tarea con recordatorio: la app pedirá permiso de notificaciones. Acéptalo.
3. Si aparece el aviso "Permitir alarmas exactas", tócalo y actívalo.
4. Pulsa **Probar aviso** (en "¿Cómo funcionan los avisos?") para comprobar que llega la notificación.
5. Prueba real: crea una tarea para dentro de 5 minutos con recordatorio a la hora, cierra la app deslizándola
   y espera.

## Si los avisos no llegan con la app cerrada

- Ajustes de Android → Apps → Tareas → Batería: elige **Sin restricciones** (en Xiaomi, Huawei, Oppo, Samsung hay
  además un "inicio automático" o "apps protegidas" que conviene activar).
- Ajustes → Apps → Tareas → Notificaciones: deben estar activadas.
- Android 12 o superior: permitir "Alarmas y recordatorios" a Tareas.

## Límites

- Se programan los 60 avisos más cercanos; al abrir la app se reprograman los siguientes.
- Si completas, cambias o eliminas una tarea desde otro dispositivo, el celular puede avisar de la versión anterior
  hasta que abras la app y se sincronice.
- Si la sesión se cierra, los avisos programados se cancelan.
- El APK es de depuración, firmado con la llave de pruebas de Android: sirve para instalar directamente, no para Google Play.

## Actualizar

Cuando cambies `web/index.html` (por ejemplo, copiando aquí la versión nueva de la web), sube el cambio al repositorio
y vuelve a ejecutar **Compilar APK**.
