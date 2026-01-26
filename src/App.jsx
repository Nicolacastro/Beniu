import React, { useState } from 'react';

// Dati iniziali dell'inventario basati sul file Excel di Beniu
const inventarioIniziale = [
  { id: 1, categoria: 'Drones', nombre: 'DJI Agras T50', cantidad: 1, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 2, categoria: 'Drones', nombre: 'DJI Agras T25 #1', cantidad: 1, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 3, categoria: 'Drones', nombre: 'DJI Agras T25 #2', cantidad: 1, estado: '1 boquilla dañada', ubicacion: 'Patric', asignado: 'Patric' },
  { id: 4, categoria: 'Drones', nombre: 'DJI Agras T10', cantidad: 1, estado: 'en reparacion', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 5, categoria: 'Drones', nombre: 'DJI Avatar', cantidad: 1, estado: 'operativo', ubicacion: 'Patric', asignado: 'Patric' },
  { id: 6, categoria: 'Drones', nombre: 'DJI AIR 3', cantidad: 1, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 7, categoria: 'Baterías', nombre: 'Batería DJI T10', cantidad: 5, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 8, categoria: 'Baterías', nombre: 'Batería DJI T25', cantidad: 5, estado: 'Batería #2 con fallo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 9, categoria: 'Baterías', nombre: 'Batería DJI T50', cantidad: 4, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 10, categoria: 'Baterías', nombre: 'Batería Externa WB37', cantidad: 10, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 11, categoria: 'Sensores', nombre: 'D-RTK2', cantidad: 1, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 12, categoria: 'Sensores', nombre: 'D-RTK3', cantidad: 1, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 13, categoria: 'Sensores', nombre: 'DJI Relay', cantidad: 1, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 14, categoria: 'Sensores', nombre: 'AquaRID', cantidad: 3, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 15, categoria: 'Energía', nombre: 'Generador 230W #1', cantidad: 1, estado: 'Cambiar aceite', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 16, categoria: 'Energía', nombre: 'Generador 230W #2', cantidad: 1, estado: 'Cambiar bateria', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 17, categoria: 'Accesorios', nombre: 'Hélices Repuesto (set 4)', cantidad: 10, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 18, categoria: 'Accesorios', nombre: 'Antenna RCPLUS', cantidad: 5, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 19, categoria: 'Tanques', nombre: 'Tanque líquidos T10', cantidad: 2, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 20, categoria: 'Tanques', nombre: 'Tanque sólidos T10', cantidad: 1, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 21, categoria: 'Tanques', nombre: 'Tanque líquidos T25', cantidad: 1, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 22, categoria: 'Tanques', nombre: 'Tanque líquidos T50', cantidad: 1, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 23, categoria: 'Tanques', nombre: 'Tanque sólidos T50', cantidad: 1, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 24, categoria: 'Vehículos', nombre: 'Furgone Ducato #1', cantidad: 1, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
  { id: 25, categoria: 'Vehículos', nombre: 'Furgone Ducato #2', cantidad: 1, estado: 'operativo', ubicacion: 'Almacén BOLBAITE', asignado: null },
];

const operadoresIniciales = [
  { id: 1, nombre: 'Patric', rol: 'Piloto', avatar: 'P' },
  { id: 2, nombre: 'Nico', rol: 'Piloto', avatar: 'N' },
  { id: 3, nombre: 'David', rol: 'Piloto', avatar: 'D' },
  { id: 4, nombre: 'Sara', rol: 'Secretaria', avatar: 'S' },
];

// Componente principale
export default function BeniuApp() {
  const [pagina, setPagina] = useState('dashboard');
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [inventario, setInventario] = useState(inventarioIniziale);
  const [operadores] = useState(operadoresIniciales);
  const [movimientos, setMovimientos] = useState([]);
  const [reports, setReports] = useState([]);
  const [itemsSeleccionados, setItemsSeleccionados] = useState([]);
  const [reportForm, setReportForm] = useState({
    fecha: new Date().toISOString().split('T')[0],
    horaInicio: '',
    horaFin: '',
    tipoJornada: '', // 'campo', 'oficina', 'travel'
    // Campos para Campo
    cliente: '',
    ubicacion: '',
    drone: '',
    hectareas: '',
    productoAplicado: '',
    kilometraje: '',
    incidencias: '',
    anotaciones: '',
    // Campos para Oficina
    tarea1: '',
    tarea2: '',
    tarea3: '',
    tarea4: '',
    // Común
    observaciones: '',
  });

  // Login Screen
  if (!usuarioActual) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a1a0f 0%, #1a2f1a 50%, #0f1f14 100%)',
        fontFamily: 'system-ui, sans-serif',
        color: '#e8f5e9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(76, 175, 80, 0.15)',
          borderRadius: '16px',
          padding: '2rem',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#4CAF50', marginBottom: '0.5rem' }}>
            BENIU
          </div>
          <p style={{ color: '#81C784', marginBottom: '1.5rem' }}>Sistema de Gestión de Equipos</p>
          
          <p style={{ color: '#a5d6a7', marginBottom: '1rem', fontSize: '0.9rem' }}>Selecciona tu usuario:</p>
          
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {operadores.map(op => (
              <div
                key={op.id}
                onClick={() => setUsuarioActual(op)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'rgba(76, 175, 80, 0.1)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#2E7D32',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.2rem'
                }}>
                  {op.avatar}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{op.nombre}</div>
                  <div style={{ color: '#81C784', fontSize: '0.85rem' }}>{op.rol}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Calcola statistiche
  const itemsEnCampo = inventario.filter(i => i.asignado !== null).length;
  const itemsDisponibles = inventario.filter(i => i.asignado === null && i.estado === 'operativo').length;
  const itemsConProblemas = inventario.filter(i => i.estado !== 'operativo' && i.estado !== 'en reparacion').length;
  const itemsEnReparacion = inventario.filter(i => i.estado === 'en reparacion').length;

  // Funzioni
  const toggleItem = (id) => {
    if (itemsSeleccionados.includes(id)) {
      setItemsSeleccionados(itemsSeleccionados.filter(i => i !== id));
    } else {
      setItemsSeleccionados([...itemsSeleccionados, id]);
    }
  };

  const handleCheckout = () => {
    if (itemsSeleccionados.length === 0) return;
    const nuevoInventario = inventario.map(item => {
      if (itemsSeleccionados.includes(item.id) && item.asignado === null) {
        return { ...item, asignado: usuarioActual.nombre, ubicacion: usuarioActual.nombre };
      }
      return item;
    });
    const nuovoMovimento = {
      id: Date.now(),
      tipo: 'checkout',
      operador: usuarioActual.nombre,
      items: itemsSeleccionados.map(id => inventario.find(i => i.id === id)?.nombre).filter(Boolean),
      fecha: new Date().toLocaleString('es-ES'),
    };
    setInventario(nuevoInventario);
    setMovimientos([nuovoMovimento, ...movimientos]);
    setItemsSeleccionados([]);
  };

  const handleCheckin = () => {
    if (itemsSeleccionados.length === 0) return;
    const nuevoInventario = inventario.map(item => {
      if (itemsSeleccionados.includes(item.id) && item.asignado === usuarioActual.nombre) {
        return { ...item, asignado: null, ubicacion: 'Almacén BOLBAITE' };
      }
      return item;
    });
    const nuovoMovimento = {
      id: Date.now(),
      tipo: 'checkin',
      operador: usuarioActual.nombre,
      items: itemsSeleccionados.map(id => inventario.find(i => i.id === id)?.nombre).filter(Boolean),
      fecha: new Date().toLocaleString('es-ES'),
    };
    setInventario(nuevoInventario);
    setMovimientos([nuovoMovimento, ...movimientos]);
    setItemsSeleccionados([]);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    const nuovoReport = {
      id: Date.now(),
      ...reportForm,
      operador: usuarioActual.nombre,
      fechaCreacion: new Date().toLocaleString('es-ES'),
    };
    setReports([nuovoReport, ...reports]);
    setReportForm({
      fecha: new Date().toISOString().split('T')[0],
      horaInicio: '',
      horaFin: '',
      tipoJornada: '',
      cliente: '',
      ubicacion: '',
      drone: '',
      hectareas: '',
      productoAplicado: '',
      kilometraje: '',
      incidencias: '',
      anotaciones: '',
      tarea1: '',
      tarea2: '',
      tarea3: '',
      tarea4: '',
      observaciones: '',
    });
    alert('Report guardado!');
  };

  const getBadgeStyle = (estado) => {
    const base = { display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 500 };
    if (estado === 'operativo') return { ...base, background: 'rgba(76, 175, 80, 0.2)', color: '#81C784' };
    if (estado === 'en reparacion') return { ...base, background: 'rgba(244, 67, 54, 0.2)', color: '#ef5350' };
    return { ...base, background: 'rgba(255, 152, 0, 0.2)', color: '#FFB74D' };
  };

  const itemsDisponiblesParaCheckout = inventario.filter(i => i.asignado === null && i.estado !== 'en reparacion');
  const itemsMios = inventario.filter(i => i.asignado === usuarioActual.nombre);
  const categorias = [...new Set(inventario.map(i => i.categoria))];

  // Stili comuni
  const cardStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(76, 175, 80, 0.15)',
    borderRadius: '12px',
    padding: '1.25rem',
    marginBottom: '1.25rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.6rem 0.8rem',
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(76, 175, 80, 0.3)',
    borderRadius: '6px',
    color: '#e8f5e9',
    fontSize: '0.9rem',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    padding: '0.6rem 1.2rem',
    background: '#2E7D32',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1a0f 0%, #1a2f1a 50%, #0f1f14 100%)',
      fontFamily: 'system-ui, sans-serif',
      color: '#e8f5e9',
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(0,0,0,0.4)',
        borderBottom: '1px solid rgba(76, 175, 80, 0.2)',
        padding: '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4CAF50' }}>BENIU</div>
        
        <nav style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {['dashboard', 'inventario', 'checkout', 'reports'].map(p => (
            <button
              key={p}
              onClick={() => { setPagina(p); setItemsSeleccionados([]); }}
              style={{
                padding: '0.5rem 0.8rem',
                background: pagina === p ? '#2E7D32' : 'transparent',
                border: '1px solid rgba(76, 175, 80, 0.3)',
                borderRadius: '6px',
                color: pagina === p ? '#fff' : '#a5d6a7',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 500,
              }}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </nav>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.8rem',
            background: 'rgba(76, 175, 80, 0.2)',
            borderRadius: '12px',
            fontSize: '0.85rem',
          }}>
            <span style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#2E7D32',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.75rem'
            }}>{usuarioActual.avatar}</span>
            {usuarioActual.nombre}
          </span>
          <button
            onClick={() => setUsuarioActual(null)}
            style={{ ...buttonStyle, background: 'transparent', border: '1px solid rgba(76, 175, 80, 0.4)', color: '#81C784', padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
          >
            Salir
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem', color: '#e8f5e9' }}>
          {pagina === 'dashboard' && 'Panel de Control'}
          {pagina === 'inventario' && 'Inventario'}
          {pagina === 'checkout' && 'Entrada / Salida'}
          {pagina === 'reports' && 'Reports'}
        </h1>

        {/* Dashboard */}
        {pagina === 'dashboard' && (
          <div>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { num: itemsDisponibles, label: 'Disponibles', color: '#4CAF50' },
                { num: itemsEnCampo, label: 'En Campo', color: '#FFB74D' },
                { num: itemsConProblemas, label: 'Con Notas', color: '#81C784' },
                { num: itemsEnReparacion, label: 'Reparación', color: '#ef5350' },
              ].map((stat, i) => (
                <div key={i} style={{
                  background: 'rgba(46, 125, 50, 0.15)',
                  border: '1px solid rgba(76, 175, 80, 0.2)',
                  borderRadius: '10px',
                  padding: '1rem',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: stat.color }}>{stat.num}</div>
                  <div style={{ fontSize: '0.8rem', color: '#a5d6a7' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {/* En Campo */}
              <div style={cardStyle}>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#81C784', marginBottom: '1rem' }}>
                  Equipos en Campo
                </div>
                {inventario.filter(i => i.asignado !== null).length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#81C784', opacity: 0.7 }}>Ningún equipo asignado</div>
                ) : (
                  <div style={{ display: 'grid', gap: '0.4rem' }}>
                    {inventario.filter(i => i.asignado !== null).map(item => (
                      <div key={item.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.5rem 0.75rem',
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: '6px',
                        fontSize: '0.85rem'
                      }}>
                        <span>{item.nombre}</span>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          padding: '0.2rem 0.5rem',
                          background: 'rgba(76, 175, 80, 0.2)',
                          borderRadius: '10px',
                          fontSize: '0.75rem'
                        }}>
                          {item.asignado}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Movimientos */}
              <div style={cardStyle}>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#81C784', marginBottom: '1rem' }}>
                  Últimos Movimientos
                </div>
                {movimientos.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#81C784', opacity: 0.7 }}>Ningún movimiento</div>
                ) : (
                  <div style={{ display: 'grid', gap: '0.4rem' }}>
                    {movimientos.slice(0, 5).map(mov => (
                      <div key={mov.id} style={{
                        padding: '0.5rem 0.75rem',
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: '6px',
                        borderLeft: `3px solid ${mov.tipo === 'checkout' ? '#FFB74D' : '#4CAF50'}`,
                        fontSize: '0.85rem'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontWeight: 600 }}>{mov.tipo === 'checkout' ? 'Salida' : 'Entrada'}</span>
                          <span style={{ fontSize: '0.7rem', color: '#81C784' }}>{mov.fecha}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#a5d6a7' }}>
                          {mov.operador}: {mov.items.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pilotos */}
            <div style={cardStyle}>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#81C784', marginBottom: '1rem' }}>
                Estado Pilotos
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                {operadores.filter(o => o.rol === 'Piloto').map(op => {
                  const itemsOp = inventario.filter(i => i.asignado === op.nombre);
                  return (
                    <div key={op.id} style={{
                      padding: '0.75rem',
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '8px',
                      border: itemsOp.length > 0 ? '1px solid rgba(255, 152, 0, 0.3)' : '1px solid rgba(76, 175, 80, 0.2)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          background: '#2E7D32',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.9rem'
                        }}>{op.avatar}</div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{op.nombre}</div>
                          <div style={{ fontSize: '0.7rem', color: itemsOp.length > 0 ? '#FFB74D' : '#81C784' }}>
                            {itemsOp.length > 0 ? 'En campo' : 'En base'}
                          </div>
                        </div>
                      </div>
                      {itemsOp.length > 0 && (
                        <div style={{ fontSize: '0.75rem', color: '#a5d6a7' }}>
                          {itemsOp.map(i => i.nombre).join(', ')}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Inventario */}
        {pagina === 'inventario' && (
          <div style={cardStyle}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr>
                    {['Categoría', 'Artículo', 'Cant.', 'Estado', 'Ubicación', 'Asignado'].map(h => (
                      <th key={h} style={{
                        textAlign: 'left',
                        padding: '0.75rem',
                        borderBottom: '1px solid rgba(76, 175, 80, 0.2)',
                        color: '#81C784',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categorias.map(cat => (
                    inventario.filter(i => i.categoria === cat).map((item, idx) => (
                      <tr key={item.id} style={{ background: idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.1)' }}>
                        <td style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid rgba(76, 175, 80, 0.1)' }}>{idx === 0 ? cat : ''}</td>
                        <td style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid rgba(76, 175, 80, 0.1)' }}>{item.nombre}</td>
                        <td style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid rgba(76, 175, 80, 0.1)' }}>{item.cantidad}</td>
                        <td style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid rgba(76, 175, 80, 0.1)' }}>
                          <span style={getBadgeStyle(item.estado)}>{item.estado}</span>
                        </td>
                        <td style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid rgba(76, 175, 80, 0.1)' }}>{item.ubicacion}</td>
                        <td style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid rgba(76, 175, 80, 0.1)' }}>
                          {item.asignado || '-'}
                        </td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Checkout */}
        {pagina === 'checkout' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {/* Sacar */}
            <div style={cardStyle}>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#81C784', marginBottom: '1rem' }}>
                Sacar Material
              </div>
              <p style={{ color: '#a5d6a7', marginBottom: '0.75rem', fontSize: '0.8rem' }}>
                Selecciona los equipos que vas a llevar:
              </p>
              <div style={{ display: 'grid', gap: '0.4rem', maxHeight: '300px', overflowY: 'auto' }}>
                {itemsDisponiblesParaCheckout.map(item => (
                  <label
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.5rem',
                      background: itemsSeleccionados.includes(item.id) ? 'rgba(76, 175, 80, 0.15)' : 'rgba(0,0,0,0.2)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      border: itemsSeleccionados.includes(item.id) ? '1px solid rgba(76, 175, 80, 0.4)' : '1px solid transparent',
                      fontSize: '0.85rem'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={itemsSeleccionados.includes(item.id)}
                      onChange={() => toggleItem(item.id)}
                      style={{ accentColor: '#4CAF50' }}
                    />
                    <span>{item.nombre}</span>
                    <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: '#81C784' }}>{item.categoria}</span>
                  </label>
                ))}
              </div>
              {itemsSeleccionados.filter(id => itemsDisponiblesParaCheckout.find(i => i.id === id)).length > 0 && (
                <button onClick={handleCheckout} style={{ ...buttonStyle, marginTop: '0.75rem', width: '100%' }}>
                  Confirmar Salida ({itemsSeleccionados.filter(id => itemsDisponiblesParaCheckout.find(i => i.id === id)).length})
                </button>
              )}
            </div>

            {/* Devolver */}
            <div style={cardStyle}>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#81C784', marginBottom: '1rem' }}>
                Devolver Material
              </div>
              <p style={{ color: '#a5d6a7', marginBottom: '0.75rem', fontSize: '0.8rem' }}>
                Material que tienes asignado:
              </p>
              {itemsMios.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#81C784', opacity: 0.7 }}>No tienes material</div>
              ) : (
                <div>
                  <div style={{ display: 'grid', gap: '0.4rem', maxHeight: '300px', overflowY: 'auto' }}>
                    {itemsMios.map(item => (
                      <label
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          padding: '0.5rem',
                          background: itemsSeleccionados.includes(item.id) ? 'rgba(76, 175, 80, 0.15)' : 'rgba(0,0,0,0.2)',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          border: itemsSeleccionados.includes(item.id) ? '1px solid rgba(76, 175, 80, 0.4)' : '1px solid transparent',
                          fontSize: '0.85rem'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={itemsSeleccionados.includes(item.id)}
                          onChange={() => toggleItem(item.id)}
                          style={{ accentColor: '#4CAF50' }}
                        />
                        <span>{item.nombre}</span>
                        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: '#81C784' }}>{item.categoria}</span>
                      </label>
                    ))}
                  </div>
                  {itemsSeleccionados.filter(id => itemsMios.find(i => i.id === id)).length > 0 && (
                    <button onClick={handleCheckin} style={{ ...buttonStyle, background: 'transparent', border: '1px solid rgba(76, 175, 80, 0.4)', color: '#81C784', marginTop: '0.75rem', width: '100%' }}>
                      Confirmar Devolución ({itemsSeleccionados.filter(id => itemsMios.find(i => i.id === id)).length})
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reports */}
        {pagina === 'reports' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {/* Form */}
            <div style={cardStyle}>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#81C784', marginBottom: '1rem' }}>
                Control de Jornada
              </div>
              <form onSubmit={handleReportSubmit}>
                {/* Datos básicos siempre visibles */}
                <div style={{ marginBottom: '0.6rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.25rem', color: '#a5d6a7', fontSize: '0.75rem' }}>Fecha *</label>
                  <input type="date" style={inputStyle} value={reportForm.fecha} onChange={e => setReportForm({...reportForm, fecha: e.target.value})} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  <div style={{ marginBottom: '0.6rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.25rem', color: '#a5d6a7', fontSize: '0.75rem' }}>Hora Inicio *</label>
                    <input type="time" style={inputStyle} value={reportForm.horaInicio} onChange={e => setReportForm({...reportForm, horaInicio: e.target.value})} required />
                  </div>
                  <div style={{ marginBottom: '0.6rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.25rem', color: '#a5d6a7', fontSize: '0.75rem' }}>Hora Fin *</label>
                    <input type="time" style={inputStyle} value={reportForm.horaFin} onChange={e => setReportForm({...reportForm, horaFin: e.target.value})} required />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.25rem', color: '#a5d6a7', fontSize: '0.75rem' }}>Tipo de Jornada *</label>
                  <select style={inputStyle} value={reportForm.tipoJornada} onChange={e => setReportForm({...reportForm, tipoJornada: e.target.value})} required>
                    <option value="">Seleccionar...</option>
                    <option value="campo">Operación en Campo</option>
                    <option value="oficina">Oficina / Mantenimiento</option>
                    <option value="travel">Travel Day</option>
                  </select>
                </div>

                {/* Campos para CAMPO */}
                {reportForm.tipoJornada === 'campo' && (
                  <div style={{ borderTop: '1px solid rgba(76, 175, 80, 0.2)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFB74D', marginBottom: '0.75rem' }}>
                      Datos de Operación en Campo
                    </div>
                    
                    <div style={{ marginBottom: '0.6rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: '#a5d6a7', fontSize: '0.75rem' }}>Nombre de cliente o empresa *</label>
                      <input type="text" style={inputStyle} placeholder="Cliente / Empresa" value={reportForm.cliente} onChange={e => setReportForm({...reportForm, cliente: e.target.value})} required />
                    </div>

                    <div style={{ marginBottom: '0.6rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: '#a5d6a7', fontSize: '0.75rem' }}>Donde se ha aplicado *</label>
                      <input type="text" style={inputStyle} placeholder="Ubicación / Parcela" value={reportForm.ubicacion} onChange={e => setReportForm({...reportForm, ubicacion: e.target.value})} required />
                    </div>

                    <div style={{ marginBottom: '0.6rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: '#a5d6a7', fontSize: '0.75rem' }}>Qué dron *</label>
                      <select style={inputStyle} value={reportForm.drone} onChange={e => setReportForm({...reportForm, drone: e.target.value})} required>
                        <option value="">Seleccionar</option>
                        <option value="T10">T10</option>
                        <option value="T25">T25</option>
                        <option value="T50">T50</option>
                        <option value="Mavic Multiespectral">Mavic Multiespectral</option>
                        <option value="M350 with L2">M350 with L2</option>
                        <option value="DJI Avatar">DJI Avatar</option>
                        <option value="DJI AIR 3">DJI AIR 3</option>
                      </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                      <div style={{ marginBottom: '0.6rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.25rem', color: '#a5d6a7', fontSize: '0.75rem' }}>Cuántas hectáreas</label>
                        <input type="number" step="0.1" style={inputStyle} placeholder="15.5" value={reportForm.hectareas} onChange={e => setReportForm({...reportForm, hectareas: e.target.value})} />
                      </div>
                      <div style={{ marginBottom: '0.6rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.25rem', color: '#a5d6a7', fontSize: '0.75rem' }}>Kilometraje por día</label>
                        <input type="number" style={inputStyle} placeholder="120" value={reportForm.kilometraje} onChange={e => setReportForm({...reportForm, kilometraje: e.target.value})} />
                      </div>
                    </div>

                    <div style={{ marginBottom: '0.6rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: '#a5d6a7', fontSize: '0.75rem' }}>Qué productos (si procede)</label>
                      <input type="text" style={inputStyle} placeholder="Productos aplicados" value={reportForm.productoAplicado} onChange={e => setReportForm({...reportForm, productoAplicado: e.target.value})} />
                    </div>

                    <div style={{ marginBottom: '0.6rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: '#a5d6a7', fontSize: '0.75rem' }}>Alguna incidencia</label>
                      <textarea style={{ ...inputStyle, minHeight: '50px', resize: 'vertical', fontFamily: 'inherit' }} placeholder="Problemas encontrados..." value={reportForm.incidencias} onChange={e => setReportForm({...reportForm, incidencias: e.target.value})} />
                    </div>

                    <div style={{ marginBottom: '0.6rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: '#a5d6a7', fontSize: '0.75rem' }}>Cómo ha ido en general, anotaciones para mejorar</label>
                      <textarea style={{ ...inputStyle, minHeight: '50px', resize: 'vertical', fontFamily: 'inherit' }} placeholder="Feedback y mejoras..." value={reportForm.anotaciones} onChange={e => setReportForm({...reportForm, anotaciones: e.target.value})} />
                    </div>
                  </div>
                )}

                {/* Campos para OFICINA */}
                {reportForm.tipoJornada === 'oficina' && (
                  <div style={{ borderTop: '1px solid rgba(76, 175, 80, 0.2)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64B5F6', marginBottom: '0.75rem' }}>
                      Tareas Realizadas
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#a5d6a7', marginBottom: '0.75rem' }}>Resume tus tareas de hoy en puntos breves</p>
                    
                    <div style={{ marginBottom: '0.6rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: '#a5d6a7', fontSize: '0.75rem' }}>Tarea 1 *</label>
                      <input type="text" style={inputStyle} placeholder="Descripción de la tarea" value={reportForm.tarea1} onChange={e => setReportForm({...reportForm, tarea1: e.target.value})} required />
                    </div>
                    <div style={{ marginBottom: '0.6rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: '#a5d6a7', fontSize: '0.75rem' }}>Tarea 2</label>
                      <input type="text" style={inputStyle} placeholder="Opcional" value={reportForm.tarea2} onChange={e => setReportForm({...reportForm, tarea2: e.target.value})} />
                    </div>
                    <div style={{ marginBottom: '0.6rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: '#a5d6a7', fontSize: '0.75rem' }}>Tarea 3</label>
                      <input type="text" style={inputStyle} placeholder="Opcional" value={reportForm.tarea3} onChange={e => setReportForm({...reportForm, tarea3: e.target.value})} />
                    </div>
                    <div style={{ marginBottom: '0.6rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.25rem', color: '#a5d6a7', fontSize: '0.75rem' }}>Tarea 4</label>
                      <input type="text" style={inputStyle} placeholder="Opcional" value={reportForm.tarea4} onChange={e => setReportForm({...reportForm, tarea4: e.target.value})} />
                    </div>
                  </div>
                )}

                {/* Campos para TRAVEL */}
                {reportForm.tipoJornada === 'travel' && (
                  <div style={{ borderTop: '1px solid rgba(76, 175, 80, 0.2)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#BA68C8', marginBottom: '0.75rem' }}>
                      Travel Day
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#a5d6a7', marginBottom: '0.75rem' }}>Día de desplazamiento - solo se registran las horas</p>
                  </div>
                )}

                {/* Observaciones - siempre visible si hay tipo seleccionado */}
                {reportForm.tipoJornada && (
                  <div style={{ marginBottom: '0.8rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.25rem', color: '#a5d6a7', fontSize: '0.75rem' }}>Observaciones</label>
                    <textarea style={{ ...inputStyle, minHeight: '60px', resize: 'vertical', fontFamily: 'inherit' }} placeholder="Notas adicionales..." value={reportForm.observaciones} onChange={e => setReportForm({...reportForm, observaciones: e.target.value})} />
                  </div>
                )}

                {reportForm.tipoJornada && (
                  <button type="submit" style={{ ...buttonStyle, width: '100%', marginTop: '0.5rem' }}>
                    Guardar Report
                  </button>
                )}
              </form>
            </div>

            {/* Lista */}
            <div style={cardStyle}>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#81C784', marginBottom: '1rem' }}>
                Reports Anteriores
              </div>
              {reports.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#81C784', opacity: 0.7 }}>Ningún report</div>
              ) : (
                <div style={{ display: 'grid', gap: '0.75rem', maxHeight: '500px', overflowY: 'auto' }}>
                  {reports.map(rep => (
                    <div key={rep.id} style={{
                      padding: '0.75rem',
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '8px',
                      borderLeft: `3px solid ${rep.tipoJornada === 'campo' ? '#FFB74D' : rep.tipoJornada === 'oficina' ? '#64B5F6' : '#BA68C8'}`,
                      fontSize: '0.8rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <span style={{ 
                          padding: '0.15rem 0.5rem', 
                          borderRadius: '10px', 
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          background: rep.tipoJornada === 'campo' ? 'rgba(255, 183, 77, 0.2)' : rep.tipoJornada === 'oficina' ? 'rgba(100, 181, 246, 0.2)' : 'rgba(186, 104, 200, 0.2)',
                          color: rep.tipoJornada === 'campo' ? '#FFB74D' : rep.tipoJornada === 'oficina' ? '#64B5F6' : '#BA68C8'
                        }}>
                          {rep.tipoJornada === 'campo' ? 'CAMPO' : rep.tipoJornada === 'oficina' ? 'OFICINA' : 'TRAVEL'}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#81C784' }}>{rep.fecha}</span>
                      </div>
                      
                      <div style={{ color: '#e8f5e9', marginBottom: '0.3rem' }}>
                        {rep.horaInicio} - {rep.horaFin}
                      </div>
                      
                      <div style={{ color: '#a5d6a7' }}>
                        {rep.tipoJornada === 'campo' && (
                          <>
                            <div style={{ fontWeight: 600 }}>{rep.cliente}</div>
                            <div>{rep.ubicacion}</div>
                            <div>{rep.drone} {rep.hectareas && `• ${rep.hectareas}ha`} {rep.kilometraje && `• ${rep.kilometraje}km`}</div>
                            {rep.productoAplicado && <div>Productos: {rep.productoAplicado}</div>}
                            {rep.incidencias && <div style={{ color: '#ef5350' }}>⚠️ {rep.incidencias}</div>}
                            {rep.anotaciones && <div style={{ fontStyle: 'italic', marginTop: '0.2rem' }}>📝 {rep.anotaciones}</div>}
                          </>
                        )}
                        {rep.tipoJornada === 'oficina' && (
                          <div>
                            <div>• {rep.tarea1}</div>
                            {rep.tarea2 && <div>• {rep.tarea2}</div>}
                            {rep.tarea3 && <div>• {rep.tarea3}</div>}
                            {rep.tarea4 && <div>• {rep.tarea4}</div>}
                          </div>
                        )}
                        {rep.tipoJornada === 'travel' && (
                          <div>Día de desplazamiento</div>
                        )}
                        {rep.observaciones && <div style={{ fontStyle: 'italic', marginTop: '0.3rem', borderTop: '1px solid rgba(76, 175, 80, 0.1)', paddingTop: '0.3rem' }}>"{rep.observaciones}"</div>}
                      </div>
                      <div style={{ marginTop: '0.3rem', fontSize: '0.65rem', color: '#666' }}>Por {rep.operador}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
