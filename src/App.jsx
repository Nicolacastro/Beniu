import React, { useState, useMemo } from 'react';

// ============================================================
// BENIU v3.0 - Sistema de Gestión de Equipos
// ============================================================

// -------------------- PALETA DE COLORES --------------------
const C = {
  bgDark: '#0D2925',
  bgMid: '#143D36',
  bgLight: '#0F2F29',
  primary: '#2E9E6E',
  primaryLight: '#5CB885',
  primaryDark: '#1B7A55',
  accent: '#6ABE3F',
  text: '#E0F2E9',
  textSec: '#9DD4B4',
  textMuted: '#6BA38A',
  card: 'rgba(255,255,255,0.04)',
  border: 'rgba(46, 158, 110, 0.15)',
  borderActive: 'rgba(46, 158, 110, 0.4)',
  warn: '#FFB74D',
  error: '#ef5350',
  info: '#64B5F6',
  purple: '#CE93D8',
};

// -------------------- INVENTARIO COMPLETO --------------------
const inventarioInicial = [
  // Drones y componentes
  { id: 'drone_t10', categoria: 'Drones y componentes', nombre: 'DJI Agras T10', cantidadTotal: 2, relacionados: ['bat_t10','charger_t10','tank_t10_liquid','tank_t10_solid','helices_agras'] },
  { id: 'drone_t25', categoria: 'Drones y componentes', nombre: 'DJI Agras T25', cantidadTotal: 1, relacionados: ['bat_t25','charger_t25','tank_t25_liquid'] },
  { id: 'drone_t50', categoria: 'Drones y componentes', nombre: 'DJI Agras T50', cantidadTotal: 1, relacionados: ['bat_t50','charger_t50','tank_t50_liquid','tank_t50_solid'] },
  { id: 'drone_mavic3m', categoria: 'Drones y componentes', nombre: 'DJI Mavic 3M (Multispectral)', cantidadTotal: 1, relacionados: ['bat_mavic3m','helices_mavic'] },
  { id: 'drone_air3', categoria: 'Drones y componentes', nombre: 'DJI Air 3', cantidadTotal: 1, relacionados: ['bat_air3'] },
  // Baterías y cargadores
  { id: 'bat_t50', categoria: 'Baterías y cargadores', nombre: 'Batería DB1560 DJI (T50)', cantidadTotal: 5, relacionados: [] },
  { id: 'bat_t10', categoria: 'Baterías y cargadores', nombre: 'Batería DJI (T10)', cantidadTotal: 8, relacionados: [] },
  { id: 'bat_t25', categoria: 'Baterías y cargadores', nombre: 'Batería DJI (T25)', cantidadTotal: 4, relacionados: [] },
  { id: 'bat_mavic3m', categoria: 'Baterías y cargadores', nombre: 'Batería DJI Mavic 3M', cantidadTotal: 3, relacionados: [] },
  { id: 'bat_air3', categoria: 'Baterías y cargadores', nombre: 'Batería DJI Air 3', cantidadTotal: 3, relacionados: [] },
  { id: 'bat_wb37', categoria: 'Baterías y cargadores', nombre: 'Batería Externa WB37', cantidadTotal: 10, relacionados: [] },
  { id: 'charger_t50', categoria: 'Baterías y cargadores', nombre: 'Cargador baterías T50', cantidadTotal: 1, relacionados: [] },
  { id: 'charger_t25', categoria: 'Baterías y cargadores', nombre: 'Cargador baterías T25', cantidadTotal: 2, relacionados: [] },
  { id: 'charger_t10', categoria: 'Baterías y cargadores', nombre: 'Cargador baterías T10', cantidadTotal: 2, relacionados: [] },
  { id: 'adapter_jack', categoria: 'Baterías y cargadores', nombre: 'Adaptador corriente (jack)', cantidadTotal: 2, relacionados: [] },
  { id: 'adapter_usbc', categoria: 'Baterías y cargadores', nombre: 'Adaptador corriente (USB-C)', cantidadTotal: 3, relacionados: [] },
  { id: 'hub_jack', categoria: 'Baterías y cargadores', nombre: 'Hub carga bat. ext. (jack)', cantidadTotal: 1, relacionados: [] },
  { id: 'hub_usbc', categoria: 'Baterías y cargadores', nombre: 'Hub carga bat. ext. (USB-C)', cantidadTotal: 3, relacionados: [] },
  // Depósitos/Tanques
  { id: 'tank_t10_liquid', categoria: 'Depósitos/Tanques', nombre: 'Depósito T10 líquido', cantidadTotal: 5, relacionados: [] },
  { id: 'tank_t10_solid', categoria: 'Depósitos/Tanques', nombre: 'Depósito T10 sólido', cantidadTotal: 1, relacionados: [] },
  { id: 'tank_t25_liquid', categoria: 'Depósitos/Tanques', nombre: 'Depósito T25 líquido', cantidadTotal: 1, relacionados: [] },
  { id: 'tank_t50_liquid', categoria: 'Depósitos/Tanques', nombre: 'Depósito T50 líquido', cantidadTotal: 1, relacionados: [] },
  { id: 'tank_t50_solid', categoria: 'Depósitos/Tanques', nombre: 'Depósito T50 sólido', cantidadTotal: 3, relacionados: [] },
  // RTK y navegación
  { id: 'rtk_1', categoria: 'RTK y navegación', nombre: 'Antena RTK 1', cantidadTotal: 1, relacionados: [] },
  { id: 'rtk_2', categoria: 'RTK y navegación', nombre: 'RTK 2', cantidadTotal: 1, relacionados: [] },
  { id: 'rtk_3', categoria: 'RTK y navegación', nombre: 'RTK 3', cantidadTotal: 1, relacionados: [] },
  { id: 'dji_relay', categoria: 'RTK y navegación', nombre: 'DJI Relay', cantidadTotal: 1, relacionados: [] },
  { id: 'remote_id_swellpro', categoria: 'RTK y navegación', nombre: 'Remote ID Swellpro', cantidadTotal: 2, relacionados: [] },
  // Repuestos y accesorios
  { id: 'helices_agras', categoria: 'Repuestos y accesorios', nombre: 'Hélices Agras (set 4)', cantidadTotal: 10, relacionados: [] },
  { id: 'helices_mavic', categoria: 'Repuestos y accesorios', nombre: 'Hélices Mavic (paq. 2)', cantidadTotal: 2, relacionados: [] },
  { id: 'antenna_rcplus', categoria: 'Repuestos y accesorios', nombre: 'Antena repuesto RC Plus', cantidadTotal: 5, relacionados: [] },
  // Equipos de pulverización
  { id: 'pulverizador_agromur', categoria: 'Pulverización', nombre: 'Pulverizador Agromur 300L', cantidadTotal: 1, relacionados: [] },
  { id: 'bomba_diesel', categoria: 'Pulverización', nombre: 'Bomba diésel DIESEL POWER 600', cantidadTotal: 1, relacionados: [] },
  { id: 'bomba_sin_manguera', categoria: 'Pulverización', nombre: 'Bomba sin manguera', cantidadTotal: 1, relacionados: [] },
  { id: 'dosificadores', categoria: 'Pulverización', nombre: 'Dosificadores/Medidores', cantidadTotal: 4, relacionados: [] },
  { id: 'manguera_pistola', categoria: 'Pulverización', nombre: 'Manguera con pistola', cantidadTotal: 1, relacionados: [] },
  // Generadores
  { id: 'gen_hyundai', categoria: 'Generadores', nombre: 'Generador Hyundai HY10100LEK-T', cantidadTotal: 1, relacionados: [] },
  { id: 'gen_genergy', categoria: 'Generadores', nombre: 'Generador Genergy Limited 5000', cantidadTotal: 1, relacionados: [] },
  { id: 'alargador_25m', categoria: 'Generadores', nombre: 'Alargador con regleta 25m', cantidadTotal: 1, relacionados: [] },
  // Herramientas
  { id: 'llaves_workmann', categoria: 'Herramientas', nombre: 'Juego llaves Workmann 42pcs', cantidadTotal: 1, relacionados: [] },
  { id: 'destornilladores_emitools', categoria: 'Herramientas', nombre: 'Kit destornilladores EmiTools', cantidadTotal: 1, relacionados: [] },
  { id: 'caja_herramientas', categoria: 'Herramientas', nombre: 'Caja herramientas BCM 13"', cantidadTotal: 1, relacionados: [] },
  { id: 'powerbank_led', categoria: 'Herramientas', nombre: 'Powerbank + Linterna LED', cantidadTotal: 2, relacionados: [] },
  { id: 'bascula_digital', categoria: 'Herramientas', nombre: 'Báscula digital 0-50kg', cantidadTotal: 2, relacionados: [] },
  // Productos químicos
  { id: 'animo_biofert', categoria: 'Productos químicos', nombre: 'Animo Biofert 5L', cantidadTotal: 2, relacionados: [] },
];

// -------------------- OPERADORES --------------------
const operadoresIniciales = [
  { id: 1, nombre: 'Patrik', rol: 'empleado', avatar: 'P', color: '#64B5F6', password: '1' },
  { id: 2, nombre: 'Nico', rol: 'admin', avatar: 'N', color: '#66BB6A', password: '2' },
  { id: 3, nombre: 'David', rol: 'admin', avatar: 'D', color: '#FFB74D', password: '3' },
  { id: 4, nombre: 'Sara', rol: 'admin', avatar: 'S', color: '#CE93D8', password: '4' },
];

// -------------------- REPORTS DE EJEMPLO --------------------
const reportesIniciales = [
  { id: 1, operador: 'Patrik', fecha: '2026-01-27', horaInicio: '07:30', horaFin: '15:00', tipoJornada: 'campo', cliente: 'Cooperativa Agrícola Valencia', ubicacion: 'Parcela 12, Alzira', drone: 'T50', hectareas: '45', kilometraje: '120', productoAplicado: 'Fungicida cúprico', incidencias: '', anotaciones: 'Buen rendimiento, clima favorable' },
  { id: 2, operador: 'Nico', fecha: '2026-01-27', horaInicio: '08:00', horaFin: '14:30', tipoJornada: 'campo', cliente: 'Finca Los Naranjos', ubicacion: 'Carcaixent', drone: 'T25', hectareas: '28', kilometraje: '85', productoAplicado: 'Tratamiento fitosanitario', incidencias: 'Viento fuerte a partir de las 12:00', anotaciones: 'Se tuvo que parar 30min por el viento' },
  { id: 3, operador: 'David', fecha: '2026-01-27', horaInicio: '09:00', horaFin: '17:00', tipoJornada: 'oficina', tarea1: 'Revisión documentación AESA', tarea2: 'Presupuesto cliente nuevo', tarea3: 'Planificación rutas semana', tarea4: '' },
  { id: 4, operador: 'Sara', fecha: '2026-01-27', horaInicio: '09:00', horaFin: '14:00', tipoJornada: 'oficina', tarea1: 'Facturación enero', tarea2: 'Llamadas clientes', tarea3: '', tarea4: '' },
  { id: 5, operador: 'Patrik', fecha: '2026-01-26', horaInicio: '06:00', horaFin: '14:00', tipoJornada: 'campo', cliente: 'Bodega San Vicente', ubicacion: 'Requena', drone: 'T50', hectareas: '62', kilometraje: '150', productoAplicado: 'Azufre micronizado', incidencias: '', anotaciones: 'Viñedos en excelente estado' },
  { id: 6, operador: 'Nico', fecha: '2026-01-26', horaInicio: '07:00', horaFin: '12:00', tipoJornada: 'campo', cliente: 'Huertos del Júcar', ubicacion: 'Sueca', drone: 'T25', hectareas: '18', kilometraje: '60', productoAplicado: 'Biocontrol Trichogramma', incidencias: 'Batería #3 con warning', anotaciones: 'Revisar batería en taller' },
  { id: 7, operador: 'David', fecha: '2026-01-26', horaInicio: '08:00', horaFin: '18:00', tipoJornada: 'travel', observaciones: 'Viaje a Madrid - reunión con proveedor DJI' },
  { id: 8, operador: 'Patrik', fecha: '2026-01-25', horaInicio: '07:00', horaFin: '16:00', tipoJornada: 'campo', cliente: 'Agrolevante S.L.', ubicacion: 'Gandía', drone: 'T50', hectareas: '55', kilometraje: '90', productoAplicado: 'Herbicida selectivo', incidencias: '', anotaciones: '' },
  { id: 9, operador: 'Nico', fecha: '2026-01-25', horaInicio: '09:00', horaFin: '14:00', tipoJornada: 'oficina', tarea1: 'Mantenimiento drone T10', tarea2: 'Calibración sensores', tarea3: 'Actualización firmware', tarea4: 'Limpieza boquillas T25' },
  { id: 10, operador: 'David', fecha: '2026-01-25', horaInicio: '08:00', horaFin: '15:00', tipoJornada: 'campo', cliente: 'Citrus Export', ubicacion: 'Oliva', drone: 'T25', hectareas: '32', kilometraje: '75', productoAplicado: 'Abono foliar', incidencias: '', anotaciones: 'Cliente muy satisfecho' },
  { id: 11, operador: 'Patrik', fecha: '2026-01-24', horaInicio: '06:30', horaFin: '15:30', tipoJornada: 'campo', cliente: 'Cooperativa Agrícola Valencia', ubicacion: 'Parcela 8, Alzira', drone: 'T50', hectareas: '48', kilometraje: '125', productoAplicado: 'Insecticida biológico', incidencias: 'Rotura boquilla #2', anotaciones: 'Cambiar boquilla antes del próximo vuelo' },
  { id: 12, operador: 'Nico', fecha: '2026-01-24', horaInicio: '07:00', horaFin: '13:00', tipoJornada: 'campo', cliente: 'Finca El Paraíso', ubicacion: 'Xàtiva', drone: 'T10', hectareas: '12', kilometraje: '45', productoAplicado: 'Tratamiento preventivo', incidencias: '', anotaciones: '' },
  { id: 13, operador: 'David', fecha: '2026-01-24', horaInicio: '09:00', horaFin: '18:00', tipoJornada: 'oficina', tarea1: 'Reunión equipo semanal', tarea2: 'Revisión KPIs enero', tarea3: 'Entrevista piloto nuevo', tarea4: 'Presupuestos pendientes' },
  { id: 14, operador: 'Sara', fecha: '2026-01-24', horaInicio: '09:00', horaFin: '14:00', tipoJornada: 'oficina', tarea1: 'Gestión cobros pendientes', tarea2: 'Actualización base de datos clientes', tarea3: '', tarea4: '' },
  { id: 15, operador: 'Patrik', fecha: '2026-01-23', horaInicio: '08:00', horaFin: '18:00', tipoJornada: 'travel', observaciones: 'Desplazamiento a Murcia - trabajo 2 días' },
];

// -------------------- DOCUMENTOS INICIALES --------------------
const documentosIniciales = [
  { id: 1, nombre: 'Checklist Pre-Vuelo', categoria: 'Checklists', url: '', descripcion: 'Lista de verificación antes de cada vuelo', fechaSubida: '2024-01-10' },
  { id: 2, nombre: 'Checklist Post-Vuelo', categoria: 'Checklists', url: '', descripcion: 'Verificación y registro al finalizar operación', fechaSubida: '2024-01-10' },
  { id: 3, nombre: 'Protocolo de Seguridad en Campo', categoria: 'Protocolos de Seguridad', url: '', descripcion: 'Normas de seguridad operacional en campo', fechaSubida: '2024-01-05' },
  { id: 4, nombre: 'Protocolo de Emergencia', categoria: 'Protocolos de Seguridad', url: '', descripcion: 'Procedimiento ante incidentes y emergencias', fechaSubida: '2024-01-05' },
  { id: 5, nombre: 'Manual DJI Agras T10', categoria: 'Manuales', url: 'https://www.dji.com/agras-t10/downloads', descripcion: 'Manual de usuario oficial T10', fechaSubida: '2024-01-15' },
  { id: 6, nombre: 'Manual DJI Agras T25', categoria: 'Manuales', url: 'https://www.dji.com/agras-t25/downloads', descripcion: 'Manual de usuario oficial T25', fechaSubida: '2024-01-15' },
  { id: 7, nombre: 'Manual DJI Agras T50', categoria: 'Manuales', url: 'https://www.dji.com/agras-t50/downloads', descripcion: 'Manual de usuario oficial T50', fechaSubida: '2024-01-15' },
  { id: 8, nombre: 'Manual DJI Mavic 3M', categoria: 'Manuales', url: 'https://www.dji.com/mavic-3-multispectral/downloads', descripcion: 'Manual multispectral drone', fechaSubida: '2024-06-01' },
  { id: 9, nombre: 'Manual DJI Relay', categoria: 'Manuales', url: 'https://www.dji.com/dji-relay/downloads', descripcion: 'Manual antena Relay', fechaSubida: '2024-01-15' },
  { id: 10, nombre: 'Manual D-RTK 2', categoria: 'Manuales', url: 'https://www.dji.com/d-rtk-2/downloads', descripcion: 'Manual D-RTK 2', fechaSubida: '2024-01-15' },
  { id: 11, nombre: 'Autorización AESA - Categoría Específica', categoria: 'Autorizaciones y Licencias', url: '', descripcion: 'ESP-OAT-00178/001 - Válida hasta 22/10/2026 - T10, T25, T50', fechaSubida: '2025-10-29' },
  { id: 12, nombre: 'Seguro RC Drones', categoria: 'Autorizaciones y Licencias', url: '', descripcion: 'Póliza de responsabilidad civil para operaciones con drones', fechaSubida: '2025-01-15' },
  { id: 13, nombre: 'Licencia Piloto UAS A1/A3', categoria: 'Autorizaciones y Licencias', url: '', descripcion: 'Certificado competencia piloto categoría abierta', fechaSubida: '2024-06-01' },
  { id: 14, nombre: 'Certificado Operador AESA', categoria: 'Autorizaciones y Licencias', url: '', descripcion: 'Registro como operador de UAS en AESA', fechaSubida: '2025-03-01' },
];

const categoriasDocumentos = ['Checklists', 'Protocolos de Seguridad', 'Manuales', 'Autorizaciones y Licencias', 'Otro'];

// -------------------- PRÉSTAMOS DE EJEMPLO --------------------
const prestamosIniciales = [
  {
    id: 1, operador: 'Patrik', operadorColor: '#64B5F6',
    items: [
      { itemId: 'drone_t50', nombre: 'DJI Agras T50', cantidad: 1 },
      { itemId: 'bat_t50', nombre: 'Batería DB1560 DJI (T50)', cantidad: 3 },
      { itemId: 'tank_t50_liquid', nombre: 'Depósito T50 líquido', cantidad: 1 },
    ],
    fechaInicio: '2026-02-08', fechaFin: '2026-02-12', estado: 'activo',
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

const hoy = () => new Date().toISOString().split('T')[0];

const getDiasEnMes = (year, month) => new Date(year, month + 1, 0).getDate();
const getPrimerDiaSemana = (year, month) => { const d = new Date(year, month, 1).getDay(); return d === 0 ? 6 : d - 1; };
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS_SEM = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];

function exportarExcel(datos, columnas, nombreArchivo) {
  const bom = '\uFEFF';
  const header = columnas.join('\t');
  const rows = datos.map(row => columnas.map(col => {
    const val = row[col] ?? '';
    return String(val).replace(/\t/g, ' ').replace(/\n/g, ' ');
  }).join('\t'));
  const tsv = bom + header + '\n' + rows.join('\n');
  const blob = new Blob([tsv], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = nombreArchivo + '.xls';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function crearEventoGoogleCalendar(titulo, fechaInicio, fechaFin, descripcion) {
  const fi = fechaInicio.replace(/-/g, '') + 'T080000';
  const ff = fechaFin.replace(/-/g, '') + 'T200000';
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(titulo)}&dates=${fi}/${ff}&details=${encodeURIComponent(descripcion)}`;
  window.open(url, '_blank');
}

// ============================================================
// LOGO COMPONENT
// ============================================================
function BeniuLogo({ size = 40 }) {
  return (
    <svg viewBox="0 0 200 60" width={size * 3.3} height={size} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#7EC845" />
          <stop offset="50%" stopColor="#4AAE5B" />
          <stop offset="100%" stopColor="#1B8A6B" />
        </linearGradient>
      </defs>
      <path d="M30 4 C30 4, 55 28, 55 40 C55 52, 44 60, 30 60 C16 60, 5 52, 5 40 C5 28, 30 4, 30 4Z" fill="url(#logoGrad)" />
      <g transform="translate(30,36) scale(0.4)" fill="white" opacity="0.95">
        <rect x="-18" y="-3" width="36" height="6" rx="2" />
        <rect x="-3" y="-18" width="6" height="36" rx="2" />
        <circle cx="0" cy="0" r="5" />
        <line x1="-16" y1="-16" x2="-8" y2="-8" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <line x1="16" y1="-16" x2="8" y2="-8" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <line x1="-16" y1="16" x2="-8" y2="8" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <line x1="16" y1="16" x2="8" y2="8" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </g>
      <text x="70" y="42" fontFamily="system-ui, sans-serif" fontSize="36" fontWeight="800" fill="#1B7A6B">BENIU</text>
    </svg>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function BeniuApp() {
  // ---------- STATE ----------
  const [pagina, setPagina] = useState('dashboard');
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [operadores] = useState(operadoresIniciales);
  const [movimientos, setMovimientos] = useState([]);
  const [reports, setReports] = useState(reportesIniciales);
  const [documentos, setDocumentos] = useState(documentosIniciales);
  const [prestamos, setPrestamos] = useState(prestamosIniciales);

  // Checkout state
  const [carrito, setCarrito] = useState({});
  const [fechaFinPrestamo, setFechaFinPrestamo] = useState('');
  const [mostrarRelacionados, setMostrarRelacionados] = useState(null);

  // Calendar state
  const [calMes, setCalMes] = useState(new Date().getMonth());
  const [calAnio, setCalAnio] = useState(new Date().getFullYear());
  const [calDiaSeleccionado, setCalDiaSeleccionado] = useState(null);

  // Reports state
  const [filtroOperadorReport, setFiltroOperadorReport] = useState('todos');
  const [filtroFechaDesde, setFiltroFechaDesde] = useState('');
  const [filtroFechaHasta, setFiltroFechaHasta] = useState('');

  // Report form
  const [reportForm, setReportForm] = useState({
    fecha: hoy(), horaInicio: '', horaFin: '', tipoJornada: '',
    cliente: '', ubicacion: '', drone: '', hectareas: '', productoAplicado: '',
    kilometraje: '', incidencias: '', anotaciones: '',
    tarea1: '', tarea2: '', tarea3: '', tarea4: '', observaciones: '',
  });

  // Doc form state
  const [docEditando, setDocEditando] = useState(null);

  // ---------- COMPUTED ----------
  const getDisponible = (itemId) => {
    const item = inventarioInicial.find(i => i.id === itemId);
    if (!item) return 0;
    const enPrestamo = prestamos
      .filter(p => p.estado === 'activo')
      .reduce((sum, p) => {
        const found = p.items.find(pi => pi.itemId === itemId);
        return sum + (found ? found.cantidad : 0);
      }, 0);
    return item.cantidadTotal - enPrestamo;
  };

  const categorias = useMemo(() => [...new Set(inventarioInicial.map(i => i.categoria))], []);

  const misEquipos = useMemo(() => {
    if (!usuarioActual) return [];
    return prestamos
      .filter(p => p.estado === 'activo' && p.operador === usuarioActual.nombre)
      .flatMap(p => p.items);
  }, [prestamos, usuarioActual]);

  const totalMisEquipos = misEquipos.reduce((s, i) => s + i.cantidad, 0);

  // Filtered reports for admin
  const reportsFiltrados = useMemo(() => {
    let r = [...reports];
    if (filtroOperadorReport !== 'todos') r = r.filter(rep => rep.operador === filtroOperadorReport);
    if (filtroFechaDesde) r = r.filter(rep => rep.fecha >= filtroFechaDesde);
    if (filtroFechaHasta) r = r.filter(rep => rep.fecha <= filtroFechaHasta);
    return r;
  }, [reports, filtroOperadorReport, filtroFechaDesde, filtroFechaHasta]);

  // ---------- HANDLERS ----------
  const handleLogin = () => {
    if (passwordInput === usuarioSeleccionado.password) {
      setUsuarioActual(usuarioSeleccionado);
      setUsuarioSeleccionado(null);
      setPasswordInput('');
    } else {
      setErrorPassword(true);
    }
  };

  const actualizarCarrito = (itemId, cantidad) => {
    const disp = getDisponible(itemId);
    const c = Math.max(0, Math.min(cantidad, disp));
    if (c === 0) {
      const nuevo = { ...carrito };
      delete nuevo[itemId];
      setCarrito(nuevo);
    } else {
      setCarrito({ ...carrito, [itemId]: c });
    }
  };

  const handleCheckout = () => {
    const itemsEnCarrito = Object.entries(carrito).filter(([, c]) => c > 0);
    if (itemsEnCarrito.length === 0 || !fechaFinPrestamo) return;
    const itemsPrestamo = itemsEnCarrito.map(([itemId, cantidad]) => {
      const item = inventarioInicial.find(i => i.id === itemId);
      return { itemId, nombre: item?.nombre || itemId, cantidad };
    });
    const op = operadores.find(o => o.nombre === usuarioActual.nombre);
    const nuevoPrestamo = {
      id: Date.now(),
      operador: usuarioActual.nombre,
      operadorColor: op?.color || C.primary,
      items: itemsPrestamo,
      fechaInicio: hoy(),
      fechaFin: fechaFinPrestamo,
      estado: 'activo',
    };
    setPrestamos([nuevoPrestamo, ...prestamos]);
    setMovimientos([{
      id: Date.now(), tipo: 'checkout', operador: usuarioActual.nombre,
      items: itemsPrestamo.map(i => `${i.nombre} x${i.cantidad}`),
      fecha: new Date().toLocaleString('es-ES'),
    }, ...movimientos]);
    setCarrito({});
    setFechaFinPrestamo('');
    setMostrarRelacionados(null);
  };

  const handleDevolver = (prestamoId) => {
    const prestamo = prestamos.find(p => p.id === prestamoId);
    if (!prestamo) return;
    setPrestamos(prestamos.map(p => p.id === prestamoId ? { ...p, estado: 'devuelto' } : p));
    setMovimientos([{
      id: Date.now(), tipo: 'checkin', operador: prestamo.operador,
      items: prestamo.items.map(i => `${i.nombre} x${i.cantidad}`),
      fecha: new Date().toLocaleString('es-ES'),
    }, ...movimientos]);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    setReports([{ id: Date.now(), ...reportForm, operador: usuarioActual.nombre }, ...reports]);
    setReportForm({
      fecha: hoy(), horaInicio: '', horaFin: '', tipoJornada: '',
      cliente: '', ubicacion: '', drone: '', hectareas: '', productoAplicado: '',
      kilometraje: '', incidencias: '', anotaciones: '',
      tarea1: '', tarea2: '', tarea3: '', tarea4: '', observaciones: '',
    });
    alert('Report guardado correctamente');
  };

  const handleExportReports = () => {
    const cols = ['operador', 'fecha', 'horaInicio', 'horaFin', 'tipoJornada', 'cliente', 'ubicacion', 'drone', 'hectareas', 'kilometraje', 'productoAplicado', 'incidencias', 'anotaciones', 'tarea1', 'tarea2', 'tarea3', 'tarea4', 'observaciones'];
    exportarExcel(reportsFiltrados, cols, `BENIU_Reports_${hoy()}`);
  };

  // ---------- STYLES ----------
  const cardStyle = {
    background: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: '12px',
    padding: '1.25rem',
    marginBottom: '1.25rem',
  };
  const inputStyle = {
    width: '100%', padding: '0.6rem 0.8rem',
    background: 'rgba(0,0,0,0.3)', border: `1px solid ${C.border}`,
    borderRadius: '6px', color: C.text, fontSize: '0.9rem', boxSizing: 'border-box',
  };
  const btnStyle = {
    padding: '0.6rem 1.2rem', background: C.primary, border: 'none',
    borderRadius: '6px', color: '#fff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
  };
  const btnOutline = {
    ...btnStyle, background: 'transparent', border: `1px solid ${C.borderActive}`, color: C.primaryLight,
  };

  // ============================================================
  // LOGIN SCREEN
  // ============================================================
  if (!usuarioActual) {
    return (
      <div style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${C.bgDark} 0%, ${C.bgMid} 50%, ${C.bgLight} 100%)`,
        fontFamily: 'system-ui, sans-serif', color: C.text,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
      }}>
        <div style={{
          background: C.card, border: `1px solid ${C.border}`, borderRadius: '16px',
          padding: '2.5rem', maxWidth: '420px', width: '100%', textAlign: 'center',
        }}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <BeniuLogo size={42} />
          </div>
          <p style={{ color: C.textSec, marginBottom: '1.5rem', fontSize: '0.95rem' }}>Sistema de Gestión de Equipos v3.0</p>

          {!usuarioSeleccionado ? (
            <>
              <p style={{ color: C.textSec, marginBottom: '1rem', fontSize: '0.9rem' }}>Selecciona tu usuario:</p>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {operadores.map(op => (
                  <div
                    key={op.id}
                    onClick={() => { setUsuarioSeleccionado(op); setErrorPassword(false); setPasswordInput(''); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem',
                      background: `rgba(46, 158, 110, 0.08)`, borderRadius: '12px',
                      cursor: 'pointer', border: '2px solid transparent', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = C.primary}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                  >
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '50%', background: op.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '1.2rem', color: '#fff',
                    }}>{op.avatar}</div>
                    <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{op.nombre}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  width: '60px', height: '60px', borderRadius: '50%', background: usuarioSeleccionado.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '1.5rem', margin: '0 auto 0.75rem', color: '#fff',
                }}>{usuarioSeleccionado.avatar}</div>
                <div style={{ fontWeight: 600, fontSize: '1.2rem' }}>{usuarioSeleccionado.nombre}</div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="password" placeholder="Contraseña" value={passwordInput}
                  onChange={e => { setPasswordInput(e.target.value); setErrorPassword(false); }}
                  onKeyDown={e => { if (e.key === 'Enter') handleLogin(); }}
                  style={{
                    width: '100%', padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.3)',
                    border: errorPassword ? `1px solid ${C.error}` : `1px solid ${C.border}`,
                    borderRadius: '8px', color: C.text, fontSize: '1rem', textAlign: 'center', boxSizing: 'border-box',
                  }}
                  autoFocus
                />
                {errorPassword && <div style={{ color: C.error, fontSize: '0.8rem', marginTop: '0.5rem' }}>Contraseña incorrecta</div>}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => { setUsuarioSeleccionado(null); setPasswordInput(''); setErrorPassword(false); }}
                  style={{ ...btnOutline, flex: 1, padding: '0.75rem' }}>Volver</button>
                <button onClick={handleLogin} style={{ ...btnStyle, flex: 1, padding: '0.75rem' }}>Entrar</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  const isAdmin = usuarioActual.rol === 'admin';
  const paginas = ['dashboard', 'inventario', 'checkout', 'calendario', 'reports', 'documentos'];
  const paginaLabels = { dashboard: 'Panel', inventario: 'Inventario', checkout: 'Entrada/Salida', calendario: 'Calendario', reports: 'Reports', documentos: 'Documentos' };

  // ============================================================
  // MAIN APP RENDER
  // ============================================================
  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${C.bgDark} 0%, ${C.bgMid} 50%, ${C.bgLight} 100%)`,
      fontFamily: 'system-ui, sans-serif', color: C.text,
    }}>
      {/* ========== HEADER ========== */}
      <header style={{
        background: 'rgba(0,0,0,0.4)', borderBottom: `1px solid ${C.border}`,
        padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem',
        position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(10px)',
      }}>
        <BeniuLogo size={28} />

        <nav style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
          {paginas.map(p => (
            <button key={p}
              onClick={() => { setPagina(p); setCarrito({}); setMostrarRelacionados(null); }}
              style={{
                padding: '0.45rem 0.7rem',
                background: pagina === p ? C.primary : 'transparent',
                border: `1px solid ${C.border}`, borderRadius: '6px',
                color: pagina === p ? '#fff' : C.textSec, cursor: 'pointer',
                fontSize: '0.78rem', fontWeight: 500,
              }}
            >{paginaLabels[p]}</button>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.3rem 0.8rem', background: `rgba(46, 158, 110, 0.15)`,
            borderRadius: '12px', fontSize: '0.85rem',
          }}>
            <span style={{
              width: '24px', height: '24px', borderRadius: '50%', background: usuarioActual.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '0.7rem', color: '#fff',
            }}>{usuarioActual.avatar}</span>
            {usuarioActual.nombre}
          </span>
          <button onClick={() => { setUsuarioActual(null); setPagina('dashboard'); }}
            style={{ ...btnOutline, padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Salir</button>
        </div>
      </header>

      {/* ========== MAIN CONTENT ========== */}
      <main style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem' }}>
          {paginaLabels[pagina] || pagina}
        </h1>

        {/* ============================================================ */}
        {/* DASHBOARD */}
        {/* ============================================================ */}
        {pagina === 'dashboard' && (
          <div>
            {/* Mis Equipos Asignados */}
            <div style={{
              ...cardStyle,
              background: `linear-gradient(135deg, rgba(46, 158, 110, 0.15), rgba(106, 190, 63, 0.08))`,
              border: `1px solid ${C.borderActive}`,
              display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap',
            }}>
              <div style={{
                width: '70px', height: '70px', borderRadius: '50%',
                background: `rgba(46, 158, 110, 0.2)`, border: `2px solid ${C.primary}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', fontWeight: 800, color: C.accent,
              }}>{totalMisEquipos}</div>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                  {totalMisEquipos === 0 ? 'No tienes equipos asignados' : `Tienes ${totalMisEquipos} equipo${totalMisEquipos > 1 ? 's' : ''} asignado${totalMisEquipos > 1 ? 's' : ''}`}
                </div>
                {misEquipos.length > 0 && (
                  <div style={{ fontSize: '0.85rem', color: C.textSec, marginTop: '0.3rem' }}>
                    {misEquipos.map(i => `${i.nombre} x${i.cantidad}`).join(' · ')}
                  </div>
                )}
              </div>
            </div>

            {/* Admin: equipos por operador */}
            {isAdmin && (
              <div style={cardStyle}>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: C.primaryLight, marginBottom: '1rem' }}>
                  Equipos asignados por operador
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                  {operadores.map(op => {
                    const prestamosOp = prestamos.filter(p => p.estado === 'activo' && p.operador === op.nombre);
                    const totalItems = prestamosOp.reduce((s, p) => s + p.items.reduce((s2, i) => s2 + i.cantidad, 0), 0);
                    return (
                      <div key={op.id} style={{
                        padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px',
                        border: `1px solid ${totalItems > 0 ? op.color + '44' : C.border}`,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                          <div style={{
                            width: '28px', height: '28px', borderRadius: '50%', background: op.color,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 700, fontSize: '0.8rem', color: '#fff',
                          }}>{op.avatar}</div>
                          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{op.nombre}</span>
                          <span style={{
                            marginLeft: 'auto', fontWeight: 700, fontSize: '1.1rem',
                            color: totalItems > 0 ? op.color : C.textMuted,
                          }}>{totalItems}</span>
                        </div>
                        {prestamosOp.length > 0 && (
                          <div style={{ fontSize: '0.75rem', color: C.textSec }}>
                            {prestamosOp.flatMap(p => p.items).map(i => `${i.nombre} x${i.cantidad}`).join(', ')}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {/* Últimos Movimientos */}
              <div style={cardStyle}>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: C.primaryLight, marginBottom: '1rem' }}>
                  Últimos Movimientos
                </div>
                {movimientos.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: C.textMuted }}>Ningún movimiento registrado</div>
                ) : (
                  <div style={{ display: 'grid', gap: '0.4rem' }}>
                    {movimientos.slice(0, 8).map(mov => (
                      <div key={mov.id} style={{
                        padding: '0.5rem 0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '6px',
                        borderLeft: `3px solid ${mov.tipo === 'checkout' ? C.warn : C.accent}`, fontSize: '0.85rem',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontWeight: 600 }}>{mov.tipo === 'checkout' ? 'Salida' : 'Devolución'}</span>
                          <span style={{ fontSize: '0.7rem', color: C.textMuted }}>{mov.fecha}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: C.textSec }}>{mov.operador}: {mov.items.join(', ')}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Estado Pilotos */}
              <div style={cardStyle}>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: C.primaryLight, marginBottom: '1rem' }}>
                  Estado Pilotos
                </div>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {operadores.map(op => {
                    const prestamosOp = prestamos.filter(p => p.estado === 'activo' && p.operador === op.nombre);
                    const enCampo = prestamosOp.length > 0;
                    return (
                      <div key={op.id} style={{
                        padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px',
                        border: `1px solid ${enCampo ? op.color + '44' : C.border}`,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            width: '30px', height: '30px', borderRadius: '50%', background: op.color,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 700, fontSize: '0.85rem', color: '#fff',
                          }}>{op.avatar}</div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{op.nombre}</div>
                            <div style={{ fontSize: '0.7rem', color: enCampo ? op.color : C.textMuted }}>
                              {enCampo ? 'Con material en campo' : 'En base'}
                            </div>
                          </div>
                        </div>
                        {enCampo && (
                          <div style={{ fontSize: '0.75rem', color: C.textSec, marginTop: '0.4rem' }}>
                            {prestamosOp.flatMap(p => p.items).map(i => i.nombre).join(', ')}
                            {' · Hasta: ' + prestamosOp.map(p => p.fechaFin).sort().pop()}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* INVENTARIO */}
        {/* ============================================================ */}
        {pagina === 'inventario' && (
          <div style={cardStyle}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr>
                    {['Categoría', 'Artículo', 'Total', 'Disponible', 'En préstamo'].map(h => (
                      <th key={h} style={{
                        textAlign: 'left', padding: '0.75rem', borderBottom: `1px solid ${C.border}`,
                        color: C.primaryLight, fontSize: '0.75rem', fontWeight: 600,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categorias.map(cat => {
                    const items = inventarioInicial.filter(i => i.categoria === cat);
                    return items.map((item, idx) => {
                      const disp = getDisponible(item.id);
                      const enPrestamo = item.cantidadTotal - disp;
                      return (
                        <tr key={item.id} style={{ background: idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.1)' }}>
                          <td style={{ padding: '0.6rem 0.75rem', borderBottom: `1px solid ${C.border}`, color: C.textSec, fontWeight: idx === 0 ? 600 : 400 }}>
                            {idx === 0 ? cat : ''}
                          </td>
                          <td style={{ padding: '0.6rem 0.75rem', borderBottom: `1px solid ${C.border}` }}>{item.nombre}</td>
                          <td style={{ padding: '0.6rem 0.75rem', borderBottom: `1px solid ${C.border}`, fontWeight: 600 }}>{item.cantidadTotal}</td>
                          <td style={{ padding: '0.6rem 0.75rem', borderBottom: `1px solid ${C.border}` }}>
                            <span style={{
                              display: 'inline-block', padding: '0.15rem 0.5rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 600,
                              background: disp > 0 ? 'rgba(106, 190, 63, 0.15)' : 'rgba(239, 83, 80, 0.15)',
                              color: disp > 0 ? C.accent : C.error,
                            }}>{disp}</span>
                          </td>
                          <td style={{ padding: '0.6rem 0.75rem', borderBottom: `1px solid ${C.border}` }}>
                            {enPrestamo > 0 ? (
                              <span style={{
                                display: 'inline-block', padding: '0.15rem 0.5rem', borderRadius: '10px', fontSize: '0.75rem',
                                background: 'rgba(255, 183, 77, 0.15)', color: C.warn,
                              }}>{enPrestamo}</span>
                            ) : <span style={{ color: C.textMuted }}>-</span>}
                          </td>
                        </tr>
                      );
                    });
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* CHECKOUT (ENTRADA/SALIDA) */}
        {/* ============================================================ */}
        {pagina === 'checkout' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {/* SACAR MATERIAL */}
            <div style={cardStyle}>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: C.primaryLight, marginBottom: '0.5rem' }}>
                Sacar Material
              </div>
              <p style={{ color: C.textSec, marginBottom: '0.75rem', fontSize: '0.8rem' }}>
                Selecciona equipos y cantidades. Al elegir un drone se sugerirán sus accesorios.
              </p>

              <div style={{ maxHeight: '350px', overflowY: 'auto', marginBottom: '1rem' }}>
                {categorias.map(cat => {
                  const items = inventarioInicial.filter(i => i.categoria === cat);
                  return (
                    <div key={cat} style={{ marginBottom: '0.75rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: C.warn, marginBottom: '0.3rem', padding: '0.2rem 0', borderBottom: `1px solid ${C.warn}22` }}>
                        {cat}
                      </div>
                      {items.map(item => {
                        const disp = getDisponible(item.id);
                        const enCarrito = carrito[item.id] || 0;
                        const esRelacionado = mostrarRelacionados && inventarioInicial.find(i => i.id === mostrarRelacionados)?.relacionados?.includes(item.id);
                        if (disp <= 0 && enCarrito <= 0) return null;
                        return (
                          <div key={item.id} style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.4rem 0.5rem', borderRadius: '6px', fontSize: '0.85rem',
                            background: enCarrito > 0 ? `rgba(46, 158, 110, 0.12)` : esRelacionado ? `rgba(106, 190, 63, 0.08)` : 'transparent',
                            border: esRelacionado ? `1px dashed ${C.accent}44` : '1px solid transparent',
                            marginBottom: '0.2rem',
                          }}>
                            <span style={{ flex: 1 }}>{item.nombre}</span>
                            <span style={{ fontSize: '0.7rem', color: C.textMuted, minWidth: '30px' }}>({disp})</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                              <button onClick={() => actualizarCarrito(item.id, enCarrito - 1)}
                                style={{ width: '24px', height: '24px', borderRadius: '4px', border: `1px solid ${C.border}`, background: 'rgba(0,0,0,0.3)', color: C.text, cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                              <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 600, color: enCarrito > 0 ? C.accent : C.textMuted }}>{enCarrito}</span>
                              <button onClick={() => {
                                actualizarCarrito(item.id, enCarrito + 1);
                                if (item.relacionados?.length > 0) setMostrarRelacionados(item.id);
                              }}
                                style={{ width: '24px', height: '24px', borderRadius: '4px', border: `1px solid ${C.border}`, background: 'rgba(0,0,0,0.3)', color: C.text, cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {Object.values(carrito).some(c => c > 0) && (
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '1rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: C.primaryLight }}>
                    Resumen: {Object.values(carrito).reduce((s, c) => s + c, 0)} artículos
                  </div>
                  <div style={{ fontSize: '0.8rem', color: C.textSec, marginBottom: '0.75rem' }}>
                    {Object.entries(carrito).filter(([,c]) => c > 0).map(([id, c]) => {
                      const item = inventarioInicial.find(i => i.id === id);
                      return `${item?.nombre} x${c}`;
                    }).join(' · ')}
                  </div>

                  <label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.8rem', fontWeight: 600 }}>
                    ¿Hasta qué fecha te llevas este material? *
                  </label>
                  <input type="date" value={fechaFinPrestamo}
                    onChange={e => setFechaFinPrestamo(e.target.value)}
                    min={hoy()}
                    style={{ ...inputStyle, marginBottom: '0.75rem' }} />

                  <button onClick={handleCheckout}
                    disabled={!fechaFinPrestamo}
                    style={{
                      ...btnStyle, width: '100%',
                      opacity: fechaFinPrestamo ? 1 : 0.5,
                    }}>
                    Confirmar Salida
                  </button>
                </div>
              )}
            </div>

            {/* DEVOLVER MATERIAL */}
            <div style={cardStyle}>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: C.primaryLight, marginBottom: '0.5rem' }}>
                Devolver Material
              </div>
              <p style={{ color: C.textSec, marginBottom: '0.75rem', fontSize: '0.8rem' }}>
                Tus préstamos activos:
              </p>
              {prestamos.filter(p => p.estado === 'activo' && p.operador === usuarioActual.nombre).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: C.textMuted }}>No tienes material en préstamo</div>
              ) : (
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {prestamos.filter(p => p.estado === 'activo' && p.operador === usuarioActual.nombre).map(p => (
                    <div key={p.id} style={{
                      padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px',
                      border: `1px solid ${C.warn}33`,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '0.75rem', color: C.warn }}>Desde {p.fechaInicio}</span>
                        <span style={{ fontSize: '0.75rem', color: C.error }}>Hasta {p.fechaFin}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        {p.items.map(i => `${i.nombre} x${i.cantidad}`).join(', ')}
                      </div>
                      <button onClick={() => handleDevolver(p.id)}
                        style={{ ...btnOutline, width: '100%', fontSize: '0.8rem', padding: '0.5rem' }}>
                        Devolver todo
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Admin: ver todos los préstamos activos */}
              {isAdmin && (
                <div style={{ marginTop: '1.5rem', borderTop: `1px solid ${C.border}`, paddingTop: '1rem' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: C.primaryLight, marginBottom: '0.75rem' }}>
                    Todos los préstamos activos
                  </div>
                  {prestamos.filter(p => p.estado === 'activo').length === 0 ? (
                    <div style={{ color: C.textMuted, fontSize: '0.85rem' }}>No hay préstamos activos</div>
                  ) : (
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                      {prestamos.filter(p => p.estado === 'activo').map(p => {
                        const op = operadores.find(o => o.nombre === p.operador);
                        return (
                          <div key={p.id} style={{
                            padding: '0.6rem', background: 'rgba(0,0,0,0.15)', borderRadius: '6px',
                            borderLeft: `3px solid ${op?.color || C.primary}`, fontSize: '0.8rem',
                          }}>
                            <div style={{ fontWeight: 600, color: op?.color }}>{p.operador}</div>
                            <div style={{ color: C.textSec }}>{p.items.map(i => `${i.nombre} x${i.cantidad}`).join(', ')}</div>
                            <div style={{ fontSize: '0.7rem', color: C.textMuted }}>{p.fechaInicio} → {p.fechaFin}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* CALENDARIO */}
        {/* ============================================================ */}
        {pagina === 'calendario' && (() => {
          const dias = getDiasEnMes(calAnio, calMes);
          const primerDia = getPrimerDiaSemana(calAnio, calMes);
          const celdas = [];
          for (let i = 0; i < primerDia; i++) celdas.push(null);
          for (let d = 1; d <= dias; d++) celdas.push(d);

          const getLoansPorDia = (dia) => {
            const fecha = `${calAnio}-${String(calMes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
            return prestamos.filter(p => p.fechaInicio <= fecha && p.fechaFin >= fecha && p.estado === 'activo');
          };

          const diaSelFecha = calDiaSeleccionado ? `${calAnio}-${String(calMes + 1).padStart(2, '0')}-${String(calDiaSeleccionado).padStart(2, '0')}` : null;
          const loansDiaSel = calDiaSeleccionado ? prestamos.filter(p => p.fechaInicio <= diaSelFecha && p.fechaFin >= diaSelFecha) : [];

          return (
            <div>
              <div style={cardStyle}>
                {/* Nav mes */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <button onClick={() => { if (calMes === 0) { setCalMes(11); setCalAnio(calAnio - 1); } else setCalMes(calMes - 1); setCalDiaSeleccionado(null); }}
                    style={{ ...btnOutline, padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>&#8592;</button>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>{MESES[calMes]} {calAnio}</span>
                  <button onClick={() => { if (calMes === 11) { setCalMes(0); setCalAnio(calAnio + 1); } else setCalMes(calMes + 1); setCalDiaSeleccionado(null); }}
                    style={{ ...btnOutline, padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>&#8594;</button>
                </div>

                {/* Grid calendario */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
                  {DIAS_SEM.map(d => (
                    <div key={d} style={{ padding: '0.4rem', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, color: C.textMuted }}>{d}</div>
                  ))}
                  {celdas.map((dia, idx) => {
                    if (dia === null) return <div key={`empty-${idx}`} />;
                    const loansHoy = getLoansPorDia(dia);
                    const esHoy = `${calAnio}-${String(calMes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}` === hoy();
                    const esSel = dia === calDiaSeleccionado;
                    return (
                      <div key={dia}
                        onClick={() => setCalDiaSeleccionado(dia === calDiaSeleccionado ? null : dia)}
                        style={{
                          padding: '0.4rem', minHeight: '55px', borderRadius: '6px',
                          background: esSel ? `rgba(46, 158, 110, 0.2)` : 'rgba(0,0,0,0.15)',
                          border: esHoy ? `2px solid ${C.accent}` : esSel ? `2px solid ${C.primary}` : '1px solid rgba(255,255,255,0.03)',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                      >
                        <div style={{ fontSize: '0.75rem', fontWeight: esHoy ? 700 : 400, color: esHoy ? C.accent : C.text, marginBottom: '0.2rem' }}>{dia}</div>
                        <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
                          {loansHoy.map(l => (
                            <div key={l.id} style={{
                              width: '8px', height: '8px', borderRadius: '50%',
                              background: l.operadorColor, flexShrink: 0,
                            }} title={l.operador} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Leyenda */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  {operadores.map(op => (
                    <div key={op.id} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: op.color }} />
                      <span style={{ color: C.textSec }}>{op.nombre}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detalle día seleccionado */}
              {calDiaSeleccionado && (
                <div style={cardStyle}>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: C.primaryLight, marginBottom: '0.75rem' }}>
                    {calDiaSeleccionado} {MESES[calMes]} {calAnio}
                  </div>
                  {loansDiaSel.length === 0 ? (
                    <div style={{ color: C.textMuted, fontSize: '0.85rem' }}>No hay préstamos para este día</div>
                  ) : (
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                      {loansDiaSel.map(l => (
                        <div key={l.id} style={{
                          padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px',
                          borderLeft: `4px solid ${l.operadorColor}`,
                        }}>
                          <div style={{ fontWeight: 600, marginBottom: '0.3rem', color: l.operadorColor }}>{l.operador}</div>
                          <div style={{ fontSize: '0.85rem', color: C.textSec }}>
                            {l.items.map(i => `${i.nombre} x${i.cantidad}`).join(', ')}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: C.textMuted, marginTop: '0.3rem' }}>
                            {l.fechaInicio} → {l.fechaFin}
                            {l.estado === 'devuelto' && <span style={{ color: C.accent, marginLeft: '0.5rem' }}>(Devuelto)</span>}
                          </div>
                          <button onClick={() => crearEventoGoogleCalendar(
                            `BENIU - ${l.operador} material`,
                            l.fechaInicio, l.fechaFin,
                            `Operador: ${l.operador}\nEquipos: ${l.items.map(i => `${i.nombre} x${i.cantidad}`).join(', ')}`
                          )} style={{ ...btnOutline, fontSize: '0.7rem', padding: '0.3rem 0.6rem', marginTop: '0.5rem' }}>
                            Añadir a Google Calendar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })()}

        {/* ============================================================ */}
        {/* REPORTS */}
        {/* ============================================================ */}
        {pagina === 'reports' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {/* Formulario */}
            <div style={cardStyle}>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: C.primaryLight, marginBottom: '1rem' }}>Control de Jornada</div>
              <form onSubmit={handleReportSubmit}>
                <div style={{ marginBottom: '0.6rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.75rem' }}>Fecha *</label>
                  <input type="date" style={inputStyle} value={reportForm.fecha} onChange={e => setReportForm({ ...reportForm, fecha: e.target.value })} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  <div><label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.75rem' }}>Hora Inicio *</label>
                    <input type="time" style={inputStyle} value={reportForm.horaInicio} onChange={e => setReportForm({ ...reportForm, horaInicio: e.target.value })} required /></div>
                  <div><label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.75rem' }}>Hora Fin *</label>
                    <input type="time" style={inputStyle} value={reportForm.horaFin} onChange={e => setReportForm({ ...reportForm, horaFin: e.target.value })} required /></div>
                </div>
                <div style={{ marginBottom: '1rem', marginTop: '0.6rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.75rem' }}>Tipo de Jornada *</label>
                  <select style={inputStyle} value={reportForm.tipoJornada} onChange={e => setReportForm({ ...reportForm, tipoJornada: e.target.value })} required>
                    <option value="">Seleccionar...</option>
                    <option value="campo">Operación en Campo</option>
                    <option value="oficina">Oficina / Mantenimiento</option>
                    <option value="travel">Travel Day</option>
                  </select>
                </div>

                {reportForm.tipoJornada === 'campo' && (
                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '1rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: C.warn, marginBottom: '0.75rem' }}>Datos de Operación en Campo</div>
                    <div style={{ marginBottom: '0.6rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.75rem' }}>Cliente *</label>
                      <input type="text" style={inputStyle} placeholder="Cliente / Empresa" value={reportForm.cliente} onChange={e => setReportForm({ ...reportForm, cliente: e.target.value })} required />
                    </div>
                    <div style={{ marginBottom: '0.6rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.75rem' }}>Ubicación *</label>
                      <input type="text" style={inputStyle} placeholder="Ubicación / Parcela" value={reportForm.ubicacion} onChange={e => setReportForm({ ...reportForm, ubicacion: e.target.value })} required />
                    </div>
                    <div style={{ marginBottom: '0.6rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.75rem' }}>Drone *</label>
                      <select style={inputStyle} value={reportForm.drone} onChange={e => setReportForm({ ...reportForm, drone: e.target.value })} required>
                        <option value="">Seleccionar</option>
                        <option value="T10">T10</option><option value="T25">T25</option><option value="T50">T50</option>
                        <option value="Mavic 3M">Mavic 3M</option><option value="Air 3">Air 3</option>
                      </select>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                      <div><label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.75rem' }}>Hectáreas</label>
                        <input type="number" step="0.1" style={inputStyle} value={reportForm.hectareas} onChange={e => setReportForm({ ...reportForm, hectareas: e.target.value })} /></div>
                      <div><label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.75rem' }}>Km del día</label>
                        <input type="number" style={inputStyle} value={reportForm.kilometraje} onChange={e => setReportForm({ ...reportForm, kilometraje: e.target.value })} /></div>
                    </div>
                    <div style={{ marginBottom: '0.6rem', marginTop: '0.6rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.75rem' }}>Productos aplicados</label>
                      <input type="text" style={inputStyle} value={reportForm.productoAplicado} onChange={e => setReportForm({ ...reportForm, productoAplicado: e.target.value })} />
                    </div>
                    <div style={{ marginBottom: '0.6rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.75rem' }}>Incidencias</label>
                      <textarea style={{ ...inputStyle, minHeight: '50px', resize: 'vertical', fontFamily: 'inherit' }} value={reportForm.incidencias} onChange={e => setReportForm({ ...reportForm, incidencias: e.target.value })} />
                    </div>
                    <div style={{ marginBottom: '0.6rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.75rem' }}>Anotaciones</label>
                      <textarea style={{ ...inputStyle, minHeight: '50px', resize: 'vertical', fontFamily: 'inherit' }} value={reportForm.anotaciones} onChange={e => setReportForm({ ...reportForm, anotaciones: e.target.value })} />
                    </div>
                  </div>
                )}

                {reportForm.tipoJornada === 'oficina' && (
                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '1rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: C.info, marginBottom: '0.75rem' }}>Tareas Realizadas</div>
                    {[1, 2, 3, 4].map(n => (
                      <div key={n} style={{ marginBottom: '0.6rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.75rem' }}>Tarea {n} {n === 1 ? '*' : ''}</label>
                        <input type="text" style={inputStyle} placeholder={n === 1 ? 'Descripción' : 'Opcional'}
                          value={reportForm[`tarea${n}`]} onChange={e => setReportForm({ ...reportForm, [`tarea${n}`]: e.target.value })} required={n === 1} />
                      </div>
                    ))}
                  </div>
                )}

                {reportForm.tipoJornada === 'travel' && (
                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '1rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: C.purple, marginBottom: '0.5rem' }}>Travel Day</div>
                    <p style={{ fontSize: '0.75rem', color: C.textSec }}>Día de desplazamiento</p>
                  </div>
                )}

                {reportForm.tipoJornada && (
                  <>
                    <div style={{ marginBottom: '0.8rem', marginTop: '0.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.75rem' }}>Observaciones</label>
                      <textarea style={{ ...inputStyle, minHeight: '50px', resize: 'vertical', fontFamily: 'inherit' }}
                        value={reportForm.observaciones} onChange={e => setReportForm({ ...reportForm, observaciones: e.target.value })} />
                    </div>
                    <button type="submit" style={{ ...btnStyle, width: '100%' }}>Guardar Report</button>
                  </>
                )}
              </form>
            </div>

            {/* LISTA DE REPORTS */}
            <div style={cardStyle}>
              {isAdmin ? (
                <>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: C.primaryLight, marginBottom: '0.75rem' }}>
                    Todos los Reports (Admin)
                  </div>

                  {/* Filtros */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    <select value={filtroOperadorReport} onChange={e => setFiltroOperadorReport(e.target.value)}
                      style={{ ...inputStyle, width: 'auto', minWidth: '120px' }}>
                      <option value="todos">Todos</option>
                      {operadores.map(op => <option key={op.id} value={op.nombre}>{op.nombre}</option>)}
                    </select>
                    <input type="date" value={filtroFechaDesde} onChange={e => setFiltroFechaDesde(e.target.value)}
                      style={{ ...inputStyle, width: 'auto' }} placeholder="Desde" />
                    <input type="date" value={filtroFechaHasta} onChange={e => setFiltroFechaHasta(e.target.value)}
                      style={{ ...inputStyle, width: 'auto' }} placeholder="Hasta" />
                    <button onClick={handleExportReports} style={{ ...btnStyle, fontSize: '0.75rem', padding: '0.5rem 0.8rem' }}>
                      Exportar Excel
                    </button>
                  </div>

                  {/* Totales */}
                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                    gap: '0.5rem', marginBottom: '1rem', padding: '0.75rem',
                    background: 'rgba(0,0,0,0.2)', borderRadius: '8px',
                  }}>
                    {[
                      { n: reportsFiltrados.filter(r => r.tipoJornada === 'campo').length, l: 'Campo', c: C.warn },
                      { n: reportsFiltrados.filter(r => r.tipoJornada === 'oficina').length, l: 'Oficina', c: C.info },
                      { n: reportsFiltrados.filter(r => r.tipoJornada === 'travel').length, l: 'Travel', c: C.purple },
                      { n: reportsFiltrados.reduce((a, r) => a + (parseFloat(r.hectareas) || 0), 0).toFixed(1), l: 'Ha total', c: C.accent },
                      { n: reportsFiltrados.reduce((a, r) => a + (parseFloat(r.kilometraje) || 0), 0), l: 'Km total', c: C.primaryLight },
                    ].map((s, i) => (
                      <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.3rem', fontWeight: 700, color: s.c }}>{s.n}</div>
                        <div style={{ fontSize: '0.65rem', color: C.textSec }}>{s.l}</div>
                      </div>
                    ))}
                  </div>

                  {/* Gráfico barras por operador */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', color: C.textSec, marginBottom: '0.5rem' }}>Reports por operador:</div>
                    {operadores.map(op => {
                      const count = reportsFiltrados.filter(r => r.operador === op.nombre).length;
                      const max = Math.max(...operadores.map(o => reportsFiltrados.filter(r => r.operador === o.nombre).length), 1);
                      return (
                        <div key={op.id} style={{ marginBottom: '0.4rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.15rem' }}>
                            <span>{op.nombre}</span><span style={{ color: op.color }}>{count}</span>
                          </div>
                          <div style={{ height: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${(count / max) * 100}%`, background: op.color, borderRadius: '4px', transition: 'width 0.3s' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Gráfico hectáreas por operador */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', color: C.textSec, marginBottom: '0.5rem' }}>Hectáreas por operador:</div>
                    {operadores.map(op => {
                      const ha = reportsFiltrados.filter(r => r.operador === op.nombre).reduce((a, r) => a + (parseFloat(r.hectareas) || 0), 0);
                      const maxHa = Math.max(...operadores.map(o => reportsFiltrados.filter(r => r.operador === o.nombre).reduce((a, r) => a + (parseFloat(r.hectareas) || 0), 0)), 1);
                      return (
                        <div key={op.id} style={{ marginBottom: '0.4rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.15rem' }}>
                            <span>{op.nombre}</span><span style={{ color: op.color }}>{ha.toFixed(1)} ha</span>
                          </div>
                          <div style={{ height: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${(ha / maxHa) * 100}%`, background: op.color, borderRadius: '4px', transition: 'width 0.3s' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Lista de reports */}
                  {reportsFiltrados.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: C.textMuted }}>Sin reports para estos filtros</div>
                  ) : (
                    <div style={{ display: 'grid', gap: '0.5rem', maxHeight: '400px', overflowY: 'auto' }}>
                      {reportsFiltrados.map(rep => (
                        <div key={rep.id} style={{
                          padding: '0.65rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px',
                          borderLeft: `3px solid ${rep.tipoJornada === 'campo' ? C.warn : rep.tipoJornada === 'oficina' ? C.info : C.purple}`,
                          fontSize: '0.8rem',
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                            <span style={{
                              padding: '0.1rem 0.4rem', borderRadius: '10px', fontSize: '0.65rem', fontWeight: 600,
                              background: rep.tipoJornada === 'campo' ? `${C.warn}22` : rep.tipoJornada === 'oficina' ? `${C.info}22` : `${C.purple}22`,
                              color: rep.tipoJornada === 'campo' ? C.warn : rep.tipoJornada === 'oficina' ? C.info : C.purple,
                            }}>{(rep.tipoJornada || '').toUpperCase()}</span>
                            <span style={{ fontSize: '0.7rem', color: C.textMuted }}>{rep.fecha}</span>
                          </div>
                          <div style={{ color: C.text }}>{rep.horaInicio} - {rep.horaFin}</div>
                          <div style={{ color: C.textSec, fontSize: '0.75rem' }}>
                            {rep.tipoJornada === 'campo' && <>{rep.cliente} · {rep.ubicacion} {rep.hectareas && `· ${rep.hectareas}ha`} {rep.kilometraje && `· ${rep.kilometraje}km`}</>}
                            {rep.tipoJornada === 'oficina' && <>{rep.tarea1}{rep.tarea2 && `, ${rep.tarea2}`}</>}
                            {rep.tipoJornada === 'travel' && <>{rep.observaciones || 'Desplazamiento'}</>}
                          </div>
                          <div style={{ fontSize: '0.65rem', color: C.textMuted, marginTop: '0.2rem' }}>Por {rep.operador}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: C.primaryLight, marginBottom: '1rem' }}>Mis Reports</div>
                  {reports.filter(r => r.operador === usuarioActual.nombre).length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: C.textMuted }}>No has enviado reports aún</div>
                  ) : (
                    <div style={{ display: 'grid', gap: '0.5rem', maxHeight: '500px', overflowY: 'auto' }}>
                      {reports.filter(r => r.operador === usuarioActual.nombre).map(rep => (
                        <div key={rep.id} style={{
                          padding: '0.65rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px',
                          borderLeft: `3px solid ${rep.tipoJornada === 'campo' ? C.warn : rep.tipoJornada === 'oficina' ? C.info : C.purple}`,
                          fontSize: '0.8rem',
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{
                              padding: '0.1rem 0.4rem', borderRadius: '10px', fontSize: '0.65rem', fontWeight: 600,
                              background: rep.tipoJornada === 'campo' ? `${C.warn}22` : rep.tipoJornada === 'oficina' ? `${C.info}22` : `${C.purple}22`,
                              color: rep.tipoJornada === 'campo' ? C.warn : rep.tipoJornada === 'oficina' ? C.info : C.purple,
                            }}>{(rep.tipoJornada || '').toUpperCase()}</span>
                            <span style={{ fontSize: '0.7rem', color: C.textMuted }}>{rep.fecha}</span>
                          </div>
                          <div>{rep.horaInicio} - {rep.horaFin}</div>
                          {rep.tipoJornada === 'campo' && <div style={{ color: C.textSec, fontSize: '0.75rem' }}>{rep.cliente} · {rep.ubicacion}</div>}
                          {rep.tipoJornada === 'oficina' && <div style={{ color: C.textSec, fontSize: '0.75rem' }}>{rep.tarea1}</div>}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* DOCUMENTOS */}
        {/* ============================================================ */}
        {pagina === 'documentos' && (
          <div>
            {/* Upload - Solo admin */}
            {isAdmin && (
              <div style={cardStyle}>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: C.primaryLight, marginBottom: '1rem' }}>
                  {docEditando ? 'Editar Documento' : 'Subir Nuevo Documento'}
                </div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  if (docEditando) {
                    setDocumentos(documentos.map(d => d.id === docEditando.id ? {
                      ...d, nombre: form.nombre.value, categoria: form.categoria.value,
                      url: form.url.value, descripcion: form.descripcion.value,
                    } : d));
                    setDocEditando(null);
                  } else {
                    setDocumentos([{
                      id: Date.now(), nombre: form.nombre.value, categoria: form.categoria.value,
                      url: form.url.value, descripcion: form.descripcion.value,
                      fechaSubida: hoy(),
                    }, ...documentos]);
                  }
                  form.reset();
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.75rem' }}>Nombre *</label>
                      <input type="text" name="nombre" style={inputStyle} defaultValue={docEditando?.nombre || ''} required />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.75rem' }}>Categoría *</label>
                      <select name="categoria" style={inputStyle} defaultValue={docEditando?.categoria || ''} required>
                        <option value="">Seleccionar...</option>
                        {categoriasDocumentos.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ marginTop: '0.6rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.75rem' }}>URL (Google Drive, Dropbox, etc.)</label>
                    <input type="url" name="url" style={inputStyle} defaultValue={docEditando?.url || ''} placeholder="https://..." />
                  </div>
                  <div style={{ marginTop: '0.6rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.25rem', color: C.textSec, fontSize: '0.75rem' }}>Descripción</label>
                    <input type="text" name="descripcion" style={inputStyle} defaultValue={docEditando?.descripcion || ''} />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                    <button type="submit" style={btnStyle}>
                      {docEditando ? 'Guardar cambios' : 'Añadir Documento'}
                    </button>
                    {docEditando && (
                      <button type="button" onClick={() => setDocEditando(null)} style={btnOutline}>Cancelar</button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* Biblioteca */}
            <div style={cardStyle}>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: C.primaryLight, marginBottom: '1rem' }}>
                Documentos Compartidos
              </div>
              {documentos.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: C.textMuted }}>No hay documentos</div>
              ) : (
                categoriasDocumentos.map(cat => {
                  const docs = documentos.filter(d => d.categoria === cat);
                  if (docs.length === 0) return null;
                  return (
                    <div key={cat} style={{ marginBottom: '1.5rem' }}>
                      <div style={{
                        fontSize: '0.85rem', fontWeight: 600, color: C.warn,
                        marginBottom: '0.5rem', padding: '0.3rem 0',
                        borderBottom: `1px solid ${C.warn}33`,
                      }}>{cat} ({docs.length})</div>
                      <div style={{ display: 'grid', gap: '0.5rem' }}>
                        {docs.map(doc => (
                          <div key={doc.id} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', gap: '1rem',
                          }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{doc.nombre}</div>
                              {doc.descripcion && <div style={{ fontSize: '0.8rem', color: C.textSec }}>{doc.descripcion}</div>}
                              <div style={{ fontSize: '0.7rem', color: C.textMuted, marginTop: '0.2rem' }}>{doc.fechaSubida}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                              {doc.url && (
                                <a href={doc.url} target="_blank" rel="noopener noreferrer"
                                  style={{ padding: '0.35rem 0.7rem', background: C.primary, borderRadius: '6px', color: '#fff', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600 }}>
                                  Abrir
                                </a>
                              )}
                              {isAdmin && (
                                <>
                                  <button onClick={() => setDocEditando(doc)}
                                    style={{ padding: '0.35rem 0.7rem', background: `${C.info}22`, border: `1px solid ${C.info}44`, borderRadius: '6px', color: C.info, cursor: 'pointer', fontSize: '0.7rem' }}>
                                    Editar
                                  </button>
                                  <button onClick={() => { if (confirm('¿Eliminar este documento?')) setDocumentos(documentos.filter(d => d.id !== doc.id)); }}
                                    style={{ padding: '0.35rem 0.7rem', background: `${C.error}22`, border: `1px solid ${C.error}44`, borderRadius: '6px', color: C.error, cursor: 'pointer', fontSize: '0.7rem' }}>
                                    Eliminar
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
