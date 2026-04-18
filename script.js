// =========================================
// 1. TICKER ECONÓMICO (Indicadores)
// =========================================
const datosEconomicos = [
    { indicador: "Dólar Observado", valor: "$965,40", variacion: "🔻 -0.5%" },
    { indicador: "Euro", valor: "$1.040,20", variacion: "🔺 +0.2%" },
    { indicador: "Unidad de Fomento (UF)", valor: "$37.150,00", variacion: "🔺 +0.1%" },
    { indicador: "UTM", valor: "$65.182", variacion: "➖ 0.0%" },
    { indicador: "Cobre (Libra)", valor: "US$ 4,12", variacion: "🔺 +1.2%" },
    { indicador: "Bolsa de Santiago (IPSA)", valor: "6.500 pts", variacion: "🔻 -0.3%" }
];

let indiceEconomia = 0;

function actualizarEconomia() {
    const ticker = document.getElementById('ticker-economia');
    ticker.classList.remove('fade-in-up');
    void ticker.offsetWidth; 
    
    const actual = datosEconomicos[indiceEconomia];
    ticker.innerHTML = `${actual.indicador} | <strong>${actual.valor}</strong> | ${actual.variacion}`;
    ticker.classList.add('fade-in-up');
    
    indiceEconomia = (indiceEconomia + 1) % datosEconomicos.length;
}

setInterval(actualizarEconomia, 4000);
actualizarEconomia(); 


// =========================================
// 2. RELOJ EN VIVO
// =========================================
function actualizarReloj() {
    const ahora = new Date();
    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const fecha = ahora.toLocaleDateString('es-CL', opcionesFecha);
    const hora = ahora.toLocaleTimeString('es-CL');
    const fechaCapitalizada = fecha.charAt(0).toUpperCase() + fecha.slice(1);
    
    document.getElementById('fecha-hora').textContent = `${fechaCapitalizada} | ${hora}`;
}
setInterval(actualizarReloj, 1000);
actualizarReloj();


// =========================================
// 3. BASE DE DATOS LOCAL Y RENDERIZADO
// =========================================
let baseDeDatosArticulos = [
    {
        categoria: "Medio Ambiente",
        titulo: "Iniciativa de WWF para proteger al Puma Chileno",
        texto: "El puma (Puma concolor) es el felino más grande posible de avistar en Chile y el segundo de mayor tamaño en América después del jaguar. Es uno de los mamíferos con mayor distribución en el continente americano...",
        enlace: "https://www.wwf.cl/nuestro_trabajo/campanas_e_iniciativas/iniciativa_puma/",
        textoEnlace: "Iniciativa Puma | WWF"
    },
    {
        categoria: "Actualidad",
        titulo: "Guerra en Medio Oriente",
        texto: "Irán vuelve a cerrar el estrecho de Ormuz tras acusar a EE.UU. de cometer actos de piratería con su bloqueo naval",
        enlace: "https://www.bbc.com/mundo/articles/c3v6yn213eno",
        textoEnlace: "Conflicto armado | BBC NEWS"
    },
    {
        categoria: "Tendencia",
        titulo: "Descubrimiento histórico en Tagua Tagua",
        texto: "Descubren restos humanos que podrían tener hasta cinco mil años antigüedad en San Vicente de Tagua Tagua",
        enlace: "https://www.theclinic.cl/2026/04/15/hallazgo-de-restos-humanos-en-san-vicente-de-tagua-tagua/",
        textoEnlace: "Tendencia | The Clinic"
    },
    {
        categoria: "Tecnología",
        titulo: "Autos voladores en China",
        texto: "China exhibe lo último en tecnología en la Feria de Hainan",
        enlace: "https://www.cnnchile.com/mundo/autos-voladores-que-cuestan-hasta-260-millones-de-pesos-chilenos-china-exhibe-lo-ultimo-en-tecnologia-en-la-feria-de-hainan_20260416/",
        textoEnlace: "Tecnología | CNN Chile"
    }
];

function renderizarArticulos() {
    const contDestacado = document.getElementById('articulo-destacado');
    const contSecundarios = document.getElementById('articulos-secundarios');
    
    contDestacado.innerHTML = ''; 
    contSecundarios.innerHTML = ''; 

    baseDeDatosArticulos.forEach((articulo, index) => {
        let htmlEnlace = '';
        if (articulo.enlace && articulo.textoEnlace) {
            htmlEnlace = `<br><br><a href="${articulo.enlace}" target="_blank" class="has-text-link has-text-weight-bold">${articulo.textoEnlace} →</a>`;
        }

        if(index === 0) {
            contDestacado.innerHTML = `
                <article class="box has-background-info-light position-relative">
                    <button class="delete is-medium is-pulled-right" onclick="eliminarArticulo(${index})" title="Borrar"></button>
                    <span class="tag is-info mb-3">${articulo.categoria}</span>
                    <h3 class="title is-2 has-text-info-dark">${articulo.titulo}</h3>
                    <p class="subtitle is-5 mt-2">${articulo.texto} ${htmlEnlace}</p>
                </article>
            `;
        } else {
            contSecundarios.innerHTML += `
                <div class="column is-6-tablet is-4-desktop">
                    <article class="card h-100">
                        <button class="delete btn-borrar-absoluto has-background-danger" onclick="eliminarArticulo(${index})" title="Borrar"></button>
                        <div class="card-content">
                            <span class="tag is-light mb-2">${articulo.categoria}</span>
                            <h4 class="title is-5">${articulo.titulo}</h4>
                            <p class="content is-size-6">${articulo.texto} ${htmlEnlace}</p>
                        </div>
                    </article>
                </div>
            `;
        }
    });
    
    actualizarContadores();
}


// =========================================
// 4. CONTADORES Y ELIMINACIÓN
// =========================================
function eliminarArticulo(indice) {
    if (confirm("¿Estás seguro de que deseas borrar esta noticia?")) {
        baseDeDatosArticulos.splice(indice, 1); 
        renderizarArticulos(); 
    }
}

function actualizarContadores() {
    const totalArticulos = baseDeDatosArticulos.length + 6; 
    document.querySelectorAll('.total-articulos').forEach(contador => {
        contador.textContent = totalArticulos;
    });
}


// =========================================
// 5. MANEJO DE FORMULARIOS
// =========================================
document.getElementById('form-articulo').addEventListener('submit', function(evento) {
    evento.preventDefault(); 
    
    const nuevoArticulo = {
        categoria: "Local", 
        titulo: document.getElementById('art-titulo').value,
        texto: document.getElementById('art-descripcion').value,
        enlace: document.getElementById('art-enlace').value,           
        textoEnlace: document.getElementById('art-texto-enlace').value  
    };
    
    baseDeDatosArticulos.unshift(nuevoArticulo); 
    renderizarArticulos();
    this.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('form-contacto').addEventListener('submit', function(evento) {
    evento.preventDefault(); 
    const nombre = document.getElementById('contacto-nombre').value;
    const correo = document.getElementById('contacto-correo').value;
    alert(`¡Gracias ${nombre}! Hemos recibido tu mensaje y te contactaremos en ${correo}`);
    this.reset(); 
});

// Inicialización
document.addEventListener('DOMContentLoaded', renderizarArticulos);