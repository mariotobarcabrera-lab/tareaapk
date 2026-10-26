// Puente con Android: avisos locales programados en el sistema (AlarmManager), con la app cerrada.
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

const CANAL = 'recordatorios';
const MAX = 60;                                   // Android limita las alarmas pendientes; se programan las más cercanas
const idNum = s => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return (Math.abs(h) % 2000000000) + 1; };
const nativo = Capacitor.isNativePlatform();

async function init(onAccion) {
  if (!nativo) return false;
  await LocalNotifications.createChannel({
    id: CANAL, name: 'Recordatorios de tareas', description: 'Avisos de tus tareas',
    importance: 5, visibility: 1, vibration: true, lights: true
  });
  await LocalNotifications.registerActionTypes({ types: [{ id: 'TAREA', actions: [
    { id: 'posponer', title: 'Posponer' },
    { id: 'hecha', title: 'Marcar como realizada' }
  ] }] });
  LocalNotifications.addListener('localNotificationActionPerformed', ev => {
    const id = ev.notification && ev.notification.extra && ev.notification.extra.id;
    if (id && ev.actionId !== 'tap') onAccion(ev.actionId, id);   // tocar la notificación solo abre la app
  });
  return true;
}
async function estadoPermiso() {
  const r = await LocalNotifications.checkPermissions();
  return r.display === 'prompt-with-rationale' ? 'prompt' : r.display;
}
async function permisos() {
  let r = await LocalNotifications.checkPermissions();
  if (r.display === 'prompt' || r.display === 'prompt-with-rationale') r = await LocalNotifications.requestPermissions();
  return r.display === 'granted';
}
async function exacta() {
  try { return (await LocalNotifications.checkExactNotificationSetting()).exact_alarm === 'granted'; } catch (e) { return true; }
}
async function pedirExacta() { try { await LocalNotifications.changeExactNotificationSetting(); } catch (e) {} }

async function programar(items) {                 // items: [{id, titulo, cuerpo, at(ms)}]
  const pend = await LocalNotifications.getPending();
  if (pend.notifications.length) await LocalNotifications.cancel({ notifications: pend.notifications.map(n => ({ id: n.id })) });
  const lote = items.filter(i => i.at > Date.now()).sort((a, b) => a.at - b.at).slice(0, MAX);
  if (!lote.length) return 0;
  await LocalNotifications.schedule({ notifications: lote.map(i => ({
    id: idNum(i.id), title: i.titulo, body: i.cuerpo, channelId: CANAL, actionTypeId: 'TAREA',
    extra: { id: i.id }, schedule: { at: new Date(i.at), allowWhileIdle: true }
  })) });
  return lote.length;
}
async function probar() {
  await LocalNotifications.schedule({ notifications: [{
    id: 2000000001, title: 'Aviso de prueba', body: 'Así llegarán tus recordatorios.', channelId: CANAL,
    schedule: { at: new Date(Date.now() + 3000), allowWhileIdle: true }
  }] });
}

window.NativoTareas = { esNativo: nativo, init, estadoPermiso, permisos, exacta, pedirExacta, programar, probar };
