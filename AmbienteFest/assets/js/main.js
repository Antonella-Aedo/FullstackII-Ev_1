// ================= Unificado: Cotillón animado y Panel Admin =================
// Mantener comentarios útiles y código relevante
document.addEventListener('DOMContentLoaded', function() {
  // Cotillón animado (index.html)
  const cotillon = document.getElementById('cotillon');
  if (cotillon) {
    const coloresCotillon = [
      '#e10098', '#ff4fcf', '#b8006e', '#3a8dde', '#b3e0ff', '#fff0fa', '#f7c6ff'
    ];
    const piezas = [];
    const cantidad = 22;
    for(let i=0; i<cantidad; i++) {
      const el = document.createElement('div');
      el.className = 'cotillon-piece';
      el.style.background = coloresCotillon[Math.floor(Math.random()*coloresCotillon.length)];
      el.style.left = Math.random()*100 + 'vw';
      el.style.top = (Math.random()*-20) + 'vh';
      el.style.width = el.style.height = (12 + Math.random()*18) + 'px';
      cotillon.appendChild(el);
      piezas.push({el, x:parseFloat(el.style.left), y:parseFloat(el.style.top), speed:0.2+Math.random()*0.25, drift: (Math.random()-0.5)*0.2});
    }
    function animarCotillon() {
      for(const p of piezas) {
        p.y += p.speed;
        p.x += p.drift;
        if(p.y > 100) { p.y = Math.random()*-10; p.x = Math.random()*100; }
        p.el.style.transform = `translate(${p.x}vw,${p.y}vh)`;
      }
      requestAnimationFrame(animarCotillon);
    }
    animarCotillon();
  }

  // Panel Admin (admin.html)
  // Eliminar servicio
  document.querySelectorAll('.btn-secondary[title="Eliminar"]').forEach(btn => {
    btn.addEventListener('click', function() {
      const row = btn.closest('tr');
      if (confirm('¿Seguro que deseas eliminar este servicio?')) {
        row.remove();
      }
    });
  });
  // Editar servicio
  document.querySelectorAll('.btn-warning[title="Editar"]').forEach(btn => {
    btn.addEventListener('click', function() {
      const row = btn.closest('tr');
      const modal = new bootstrap.Modal(document.getElementById('modalServicio'));
      document.getElementById('modalServicioLabel').textContent = 'Editar Servicio';
      document.querySelector('#modalServicio input[type="text"]').value = row.children[1].textContent;
      modal.show();
    });
  });
  // Aprobar servicio
  document.querySelectorAll('.btn-success[title="Aprobar"]').forEach(btn => {
    btn.addEventListener('click', function() {
      const row = btn.closest('tr');
      row.querySelector('.badge').className = 'badge badge-aprobado';
      row.querySelector('.badge').textContent = 'Aprobado';
      btn.remove();
      row.querySelector('.btn-danger[title="Rechazar"]').remove();
    });
  });
  // Rechazar servicio
  document.querySelectorAll('.btn-danger[title="Rechazar"]').forEach(btn => {
    btn.addEventListener('click', function() {
      const row = btn.closest('tr');
      row.querySelector('.badge').className = 'badge badge-rechazado';
      row.querySelector('.badge').textContent = 'Rechazado';
      row.querySelector('.btn-success[title="Aprobar"]').remove();
      btn.remove();
    });
  });
  // Cerrar sesión (admin e index)
  document.querySelectorAll('.nav-link, .btn-logout').forEach(link => {
    if (link.textContent.trim().toLowerCase().includes('cerrar sesión')) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        // Aquí podrías limpiar storage/cookies si hay login real
        alert('Sesión cerrada.');
        window.location.href = 'index.html';
      });
    }
  });
});
// ================= main.js =================
// Lógica principal de la web de eventos y fiestas

// ================= Datos de servicios por temática y categoría =================
const servicios = [
  {
    id: 1,
    nombre: "Banquetería Premium",
    categoria: "Matrimonios",
    tipo: "Banquetería",
    precio: 800000,
    valoracion: 5,
    imagen: "assets/img/Banqueteria.png", // Banquetería Premium: banquete/mesa
    descripcion: "Servicio de banquetería gourmet para matrimonios, incluye menú completo y personal de atención.",
    disponibilidad: "Disponible todo el año",
    detalles: "Duración: 6 horas, Incluye: menú, bebidas, garzones, vajilla.",
    proveedor: {
      nombre: "Banquetería Gourmet Spa",
      valoracion: 5
    }
  },
  {
    id: 2,
    nombre: "Animador Infantil",
    categoria: "Cumpleaños",
    tipo: "Animadores",
    precio: 120000,
    valoracion: 4,
    imagen: "assets/img/animadorinfanil2.png", // Animador Infantil
    descripcion: "Animación profesional para cumpleaños infantiles, juegos y concursos.",
    disponibilidad: "Fines de semana",
    detalles: "Duración: 2 horas, Incluye: juegos, concursos, premios.",
    proveedor: {
      nombre: "Animaciones Infantiles Alegría",
      valoracion: 4
    }
  },
  {
    id: 3,
    nombre: "Pinta Caritas",
    categoria: "Cumpleaños",
    tipo: "Pinta Caritas",
    precio: 60000,
    valoracion: 5,
    imagen: "assets/img/pintacarita.png", // Pinta Caritas
    descripcion: "Artista profesional para pintar caritas en fiestas infantiles.",
    disponibilidad: "Disponible todo el año",
    detalles: "Duración: 2 horas, Incluye: materiales hipoalergénicos.",
    proveedor: {
      nombre: "PintaCaritas Pro",
      valoracion: 5
    }
  },
  {
    id: 4,
    nombre: "Show de Magia",
    categoria: "Baby Shower",
    tipo: "Magos",
    precio: 90000,
    valoracion: 4,
    imagen: "assets/img/mago.png", // Show de Magia: mago
    descripcion: "Mago profesional para sorprender a los invitados en baby showers.",
    disponibilidad: "Disponible todo el año",
    detalles: "Duración: 1 hora, Incluye: show interactivo.",
    proveedor: {
      nombre: "Magia y Sonrisas",
      valoracion: 4
    }
  },
  {
    id: 5,
    nombre: "Decoración Halloween",
    categoria: "Halloween",
    tipo: "Decoración",
    precio: 150000,
    valoracion: 5,
    imagen: "assets/img/aloween.png", // Decoración Halloween
    descripcion: "Decoración temática para fiestas de Halloween, incluye montaje y desmontaje.",
    disponibilidad: "Octubre",
    detalles: "Incluye: decoración interior y exterior.",
    proveedor: {
      nombre: "DecoraFestas",
      valoracion: 5
    }
  },
  {
    id: 6,
    nombre: "Cotillón Navideño",
    categoria: "Navidad",
    tipo: "Cotillón",
    precio: 50000,
    valoracion: 4,
    imagen: "assets/img/navideño.png", // Cotillón Navideño
    descripcion: "Cotillón y accesorios para fiestas navideñas.",
    disponibilidad: "Diciembre",
    detalles: "Incluye: gorros, lentes, accesorios temáticos.",
    proveedor: {
      nombre: "Navidad Express",
      valoracion: 4
    }
  },
  {
    id: 7,
    nombre: "DJ Graduaciones",
    categoria: "Graduaciones",
    tipo: "DJ",
    precio: 200000,
    valoracion: 5,
    imagen: "assets/img/dj.png", // DJ Graduaciones
    descripcion: "DJ profesional para fiestas de graduación, repertorio juvenil y luces.",
    disponibilidad: "Disponible todo el año",
    detalles: "Duración: 4 horas, Incluye: luces, sonido.",
    proveedor: {
      nombre: "DJ Fest",
      valoracion: 5
    }
  },
  {
    id: 8,
    nombre: "Pastelería Temática",
    categoria: "Titulaciones",
    tipo: "Pastelería",
    precio: 70000,
    valoracion: 5,
    imagen: "assets/img/pasteltematico.png", // Pastelería Temática
    descripcion: "Tortas y pasteles personalizados para titulaciones.",
    disponibilidad: "Disponible todo el año",
    detalles: "Incluye: torta personalizada, cupcakes.",
    proveedor: {
      nombre: "Pastelería Dulce Sabor",
      valoracion: 5
    }
  },
  {
    id: 9,
    nombre: "Animación Año Nuevo",
    categoria: "Año Nuevo",
    tipo: "Animación",
    precio: 180000,
    valoracion: 4,
    imagen: "assets/img/animadorañonuevo.png", // Animación Año Nuevo
    descripcion: "Animadores y juegos para fiestas de año nuevo.",
    disponibilidad: "Diciembre-Enero",
    detalles: "Duración: 3 horas, Incluye: animadores, juegos, premios.",
    proveedor: {
      nombre: "Animadores Pro Año Nuevo",
      valoracion: 4
    }
  },
  {
    id: 10,
    nombre: "Salón Corporativo",
    categoria: "Corporativos",
    tipo: "Salones",
    precio: 600000,
    valoracion: 5,
    imagen: "assets/img/salonevento.png", // Salón Corporativo
    descripcion: "Arriendo de salón equipado para eventos corporativos.",
    disponibilidad: "Disponible todo el año",
    detalles: "Capacidad: 200 personas, Incluye: mobiliario, proyector.",
    proveedor: {
      nombre: "Salones Elite",
      valoracion: 5
    }
  },
  {
    id: 11,
    nombre: "Juegos Deportivos",
    categoria: "Deportivos",
    tipo: "Juegos Divertidos",
    precio: 100000,
    valoracion: 4,
    imagen: "assets/img/JuegosCorporativos.png", // Juegos Deportivos
    descripcion: "Juegos y actividades para eventos deportivos y familiares.",
    disponibilidad: "Disponible todo el año",
    detalles: "Incluye: monitores, materiales deportivos.",
    proveedor: {
      nombre: "Juegos y Deportes Spa",
      valoracion: 4
    }
  },
  {
    id: 12,
    nombre: "Garzones Profesionales",
    categoria: "Laborales",
    tipo: "Garzones",
    precio: 90000,
    valoracion: 5,
    imagen: "assets/img/GarzonPro.png", // Garzones Profesionales
    descripcion: "Servicio de garzones para eventos laborales y empresariales.",
    disponibilidad: "Disponible todo el año",
    detalles: "Incluye: personal uniformado, atención de mesas.",
    proveedor: {
      nombre: "Garzones Pro",
      valoracion: 5
    }
  },
  {
    id: 13,
    nombre: "Decoración Bautizo",
    categoria: "Bautizos",
    tipo: "Decoración",
    precio: 130000,
    valoracion: 5,
    imagen: "assets/img/Bautizo.png", // Decoración Bautizo
    descripcion: "Decoración temática para bautizos, incluye globos y centros de mesa.",
    disponibilidad: "Disponible todo el año",
    detalles: "Incluye: montaje, desmontaje, decoración personalizada.",
    proveedor: {
      nombre: "Bautizo Deco",
      valoracion: 5
    }
  },
  {
    id: 14,
    nombre: "Payaso Show Infantil",
    categoria: "Cumpleaños",
    tipo: "Payasos",
    precio: 80000,
    valoracion: 4,
    imagen: "assets/img/payaso.png", // Payaso Show Infantil
    descripcion: "Show de payasos para cumpleaños, risas y diversión asegurada.",
    disponibilidad: "Disponible todo el año",
    detalles: "Duración: 1 hora, Incluye: show, globoflexia.",
    proveedor: {
      nombre: "Payasos y Risas",
      valoracion: 4
    }
  },
  {
    id: 15,
    nombre: "Otros Servicios Personalizados",
    categoria: "Otros",
    tipo: "Otros",
    precio: 50000,
    valoracion: 5,
    imagen: "assets/img/otrosservicios.png", // Otros Servicios Personalizados
    descripcion: "Servicios personalizados según la necesidad de tu evento.",
    disponibilidad: "Consultar disponibilidad",
    detalles: "Incluye: asesoría personalizada.",
    proveedor: {
      nombre: "Eventos a Medida",
      valoracion: 5
    }
  }
];

// ================= Renderizar servicios según filtros =================
function renderServicios(filtros = {}) {
  const lista = document.getElementById('listaServicios');
  lista.innerHTML = '';
  let filtrados = servicios.filter(s => {
    let ok = true;
    if (filtros.categoria && filtros.categoria !== '' && s.categoria !== filtros.categoria) ok = false;
    if (filtros.precio && s.precio > filtros.precio) ok = false;
    if (filtros.valoracion && s.valoracion < filtros.valoracion) ok = false;
    return ok;
  });
  if (filtrados.length === 0) {
    lista.innerHTML = '<div class="col-12 text-center text-muted">No hay servicios disponibles para esta búsqueda.</div>';
    return;
  }
  filtrados.forEach(servicio => {
    lista.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.nombre}">
          <div class="card-body">
            <h5 class="card-title">${servicio.nombre}</h5>
            <p class="card-text">${servicio.descripcion}</p>
            <div class="mb-2">
              <span class="badge bg-success">$${servicio.precio.toLocaleString()}</span>
              <span class="ms-2 text-warning">${'★'.repeat(servicio.valoracion)}${'☆'.repeat(5-servicio.valoracion)}</span>
            </div>
            <button class="btn btn-primary btn-sm" onclick="verDetalle(${servicio.id})">Ver Detalle</button>
            <button class="btn btn-outline-success btn-sm ms-2" onclick="agregarAlCarrito(${servicio.id})">Agregar al Carrito</button>
          </div>
        </div>
      </div>
    `;
  });
}

// ================= Filtros de búsqueda =================
const filtrosForm = document.getElementById('filtrosServicios');
filtrosForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const categoria = this.categoria.value;
  const precio = this.precio.value;
  const valoracion = this.valoracion.value;
  renderServicios({
    categoria,
    precio: precio ? parseInt(precio) : undefined,
    valoracion: valoracion ? parseInt(valoracion) : undefined
  });
});

document.getElementById('precioFiltro').addEventListener('input', function() {
  document.getElementById('precioFiltroValor').textContent = `$${parseInt(this.value).toLocaleString()}`;
});

// ================= Render inicial de servicios =================
renderServicios();

// Funciones para detalle y carrito
function verDetalle(id) {
  const servicio = servicios.find(s => s.id === id);
  if (!servicio) return;
  // Llenar el modal con la info del servicio y proveedor
  const modal = document.getElementById('detalleServicioModal');
  modal.querySelector('.modal-title').textContent = servicio.nombre;
  modal.querySelector('img').src = servicio.imagen;
  modal.querySelector('img').alt = servicio.nombre;
  modal.querySelector('h4').textContent = servicio.nombre;
  modal.querySelector('p').textContent = servicio.descripcion;
  const ul = modal.querySelector('ul');
  ul.innerHTML = '';
  ul.innerHTML += `<li>${servicio.detalles}</li>`;
  ul.innerHTML += `<li>Disponibilidad: ${servicio.disponibilidad}</li>`;
  ul.innerHTML += `<li>Precio: $${servicio.precio.toLocaleString()}</li>`;
  ul.innerHTML += `<li>Valoración: ${'★'.repeat(servicio.valoracion)}${'☆'.repeat(5-servicio.valoracion)}</li>`;
  // Proveedor
  let proveedorHtml = `<div class="proveedor-info mt-3">
    <strong>Proveedor:</strong> ${servicio.proveedor.nombre}<br>
    <strong>Valoración Proveedor:</strong> ${'★'.repeat(servicio.proveedor.valoracion)}${'☆'.repeat(5-servicio.proveedor.valoracion)}
  </div>`;
  // Insertar proveedor después de la lista
  if (!modal.querySelector('.proveedor-info')) {
    ul.insertAdjacentHTML('afterend', proveedorHtml);
  } else {
    modal.querySelector('.proveedor-info').outerHTML = proveedorHtml;
  }
  // Actualizar precio y valoración
  modal.querySelector('.badge').textContent = `$${servicio.precio.toLocaleString()}`;
  modal.querySelector('.text-warning').innerHTML = `${'★'.repeat(servicio.valoracion)}${'☆'.repeat(5-servicio.valoracion)}`;
  // Mostrar modal
  const bsModal = bootstrap.Modal.getOrCreateInstance(modal);
  bsModal.show();
}
  // ================= Carrito de compras =================
// ================= Funciones de gestión de carrito =================
// ================= Mostrar carrito al abrir modal =================
// ================= Función detalle con botón agregar al carrito =================

// Futuro: agregar persistencia de carrito en localStorage, integración de pago, validación de login, gestión de blog, etc.
  let carrito = [];

  function renderCarrito() {
  // Actualizar badge del menú
  const badge = document.getElementById('carritoBadge');
  if (badge) {
    let totalServicios = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    badge.textContent = totalServicios;
    badge.style.display = totalServicios > 0 ? 'inline-block' : 'none';
  }
    const lista = document.getElementById('carritoLista');
    lista.innerHTML = '';
    let total = 0;
    carrito.forEach(item => {
      const servicio = servicios.find(s => s.id === item.id);
      if (!servicio) return;
      total += servicio.precio * item.cantidad;
      lista.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>${servicio.nombre}</strong><br>
            <small>Cantidad: <button class="btn btn-sm btn-outline-secondary me-1" onclick="cambiarCantidad(${servicio.id},-1)">-</button>${item.cantidad}<button class="btn btn-sm btn-outline-secondary ms-1" onclick="cambiarCantidad(${servicio.id},1)">+</button></small>
          </div>
          <span>$${(servicio.precio * item.cantidad).toLocaleString()}</span>
          <button class="btn btn-danger btn-sm ms-2" onclick="eliminarDelCarrito(${servicio.id})">Eliminar</button>
        </li>
      `;
    });
    if (carrito.length === 0) {
      lista.innerHTML = '<li class="list-group-item text-center text-muted">El carrito está vacío.</li>';
    }
    // Resumen
    const totalSpan = document.querySelector('#carritoModal .d-flex span + strong');
    const impuestosSpan = document.querySelectorAll('#carritoModal .d-flex strong')[1];
    const finalSpan = document.querySelectorAll('#carritoModal .d-flex strong')[2];
    if (totalSpan && impuestosSpan && finalSpan) {
      totalSpan.textContent = `$${total.toLocaleString()}`;
      const impuestos = Math.round(total * 0.19);
      impuestosSpan.textContent = `$${impuestos.toLocaleString()}`;
      finalSpan.textContent = `$${(total + impuestos).toLocaleString()}`;
    }
  }

  function agregarAlCarrito(id) {
    const idx = carrito.findIndex(item => item.id === id);
    if (idx > -1) {
      carrito[idx].cantidad++;
    } else {
      carrito.push({ id, cantidad: 1 });
    }
    renderCarrito();
  }

  function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    renderCarrito();
  }

  function cambiarCantidad(id, delta) {
    const idx = carrito.findIndex(item => item.id === id);
    if (idx > -1) {
      carrito[idx].cantidad += delta;
      if (carrito[idx].cantidad < 1) carrito[idx].cantidad = 1;
      renderCarrito();
    }
  }

  // Mostrar carrito al abrir modal
  const carritoModal = document.getElementById('carritoModal');
  if (carritoModal) {
    carritoModal.addEventListener('show.bs.modal', renderCarrito);
  }

  // Función detalle con botón agregar al carrito
  function verDetalle(id) {
    const servicio = servicios.find(s => s.id === id);
    if (!servicio) return;
    // Llenar el modal con la info del servicio y proveedor
    const modal = document.getElementById('detalleServicioModal');
    modal.querySelector('.modal-title').textContent = servicio.nombre;
    modal.querySelector('img').src = servicio.imagen;
    modal.querySelector('img').alt = servicio.nombre;
    modal.querySelector('h4').textContent = servicio.nombre;
    modal.querySelector('p').textContent = servicio.descripcion;
    const ul = modal.querySelector('ul');
    ul.innerHTML = '';
    ul.innerHTML += `<li>${servicio.detalles}</li>`;
    ul.innerHTML += `<li>Disponibilidad: ${servicio.disponibilidad}</li>`;
    ul.innerHTML += `<li>Precio: $${servicio.precio.toLocaleString()}</li>`;
    ul.innerHTML += `<li>Valoración: ${'★'.repeat(servicio.valoracion)}${'☆'.repeat(5-servicio.valoracion)}</li>`;
    // Proveedor
    let proveedorHtml = `<div class="proveedor-info mt-3">
      <strong>Proveedor:</strong> ${servicio.proveedor.nombre}<br>
      <strong>Valoración Proveedor:</strong> ${'★'.repeat(servicio.proveedor.valoracion)}${'☆'.repeat(5-servicio.proveedor.valoracion)}
    </div>`;
    if (!modal.querySelector('.proveedor-info')) {
      ul.insertAdjacentHTML('afterend', proveedorHtml);
    } else {
      modal.querySelector('.proveedor-info').outerHTML = proveedorHtml;
    }
    // Actualizar precio y valoración
    modal.querySelector('.badge').textContent = `$${servicio.precio.toLocaleString()}`;
    modal.querySelector('.text-warning').innerHTML = `${'★'.repeat(servicio.valoracion)}${'☆'.repeat(5-servicio.valoracion)}`;
    // Botón agregar al carrito
    const btnAgregar = modal.querySelector('.btn-success');
    btnAgregar.onclick = function() { agregarAlCarrito(servicio.id); };
    // Mostrar modal
    const bsModal = bootstrap.Modal.getOrCreateInstance(modal);
    bsModal.show();
  }
