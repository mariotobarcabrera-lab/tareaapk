# Agrega los permisos que Android necesita para avisos con la app cerrada.
p = 'android/app/src/main/AndroidManifest.xml'
s = open(p, encoding='utf-8').read()
permisos = [
    'android.permission.POST_NOTIFICATIONS',     # Android 13+: mostrar notificaciones
    'android.permission.USE_EXACT_ALARM',        # Android 13+: alarmas exactas sin pedir permiso especial
    'android.permission.SCHEDULE_EXACT_ALARM',   # Android 12: alarmas exactas
    'android.permission.RECEIVE_BOOT_COMPLETED', # reprogramar tras reiniciar
    'android.permission.VIBRATE',
    'android.permission.WAKE_LOCK',
]
nuevos = ''.join('    <uses-permission android:name="%s" />\n' % x for x in permisos if x not in s)
assert '<application' in s, 'AndroidManifest sin <application>'
s = s.replace('<application', nuevos + '    <application', 1)
open(p, 'w', encoding='utf-8').write(s)
print('Permisos agregados:', nuevos.count('uses-permission'))
