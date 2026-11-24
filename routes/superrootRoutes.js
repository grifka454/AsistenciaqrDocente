const express = require('express');
const router = express.Router();
const superrootController = require('../controllers/superrootController');
const { verifyToken, requireSuperroot } = require('../middlewares/auth');
const { handleCarnetUpload } = require('../middlewares/upload');

// Todas las rutas requieren autenticación y rol SUPERROOT
router.use(verifyToken, requireSuperroot);

// Métricas del Dashboard
router.get('/dashboard-stats', superrootController.getEstadisticasDashboard);

// Gestión de Solicitudes Pendientes
router.get('/solicitudes', superrootController.getSolicitudesPendientes);
router.patch('/solicitudes/:id/aprobar', superrootController.aprobarSolicitud);
router.patch('/solicitudes/:id/rechazar', superrootController.rechazarSolicitud);
router.patch('/solicitudes/:id/solicitar-cambio-foto', superrootController.solicitarCambioFoto);

// Gestión General de Docentes
router.get('/docentes', superrootController.getDocentes);
router.patch('/docentes/:id/estado', superrootController.cambiarEstadoDocente);
router.patch('/docentes/:id/foto-carnet', handleCarnetUpload, superrootController.actualizarFotoDocenteAdmin);

// Gestión de Usuarios: Eliminación directa (Requerimiento 2.A.1)
router.delete('/usuarios/:id', superrootController.eliminarUsuario);

// Control de Logs: Auditoría del Sistema (Requerimiento 2.A.2)
router.get('/system-logs', superrootController.getSystemLogs);

// Asignación de Horarios por Docente (Requerimiento 2.A.3)
router.get('/docentes/:id/horario', superrootController.getDocenteHorario);
router.post('/docentes/:id/horario', superrootController.asignarDocenteHorario);
router.delete('/horarios/:horario_id', superrootController.eliminarDocenteHorario);

// Asignación y Control de Materias por Docente (Exclusivo Superroot)
router.post('/docentes/:id/materias', superrootController.asignarMateriaDocente);
router.delete('/docentes/:id/materias/:materia_id', superrootController.eliminarMateriaDocente);

// Generador de Código QR Institucional Oficial
router.get('/generar-qr', superrootController.generarQROficial);
router.post('/renovar-qr', superrootController.renovarQROficial);

// Reporte y Logs de Asistencias con Puntualidad
router.get('/asistencias', superrootController.getAsistenciasLogs);

module.exports = router;
