let paginaActual = 0;
function cargarComponente(id, ruta) {
    fetch(ruta)
        .then(res => {
            if (!res.ok) throw new Error("Error cargando " + ruta);
            return res.text();
        })
        .then(html => {
            const contenedor = document.getElementById(id);

            if (!contenedor) {
                console.error("❌ No existe el contenedor #" + id);
                return;
            }

            contenedor.innerHTML = html;
        })
        .catch(err => console.error(err));
}

function cargarVista(vista) {
    return fetch(`vistas/${vista}.html`) // 🔥 RETURN
        .then(res => res.text())
        .then(html => {
            const contenedor = document.getElementById("contenido");

            if (!contenedor) {
                console.error("❌ No existe #contenido");
                return;
            }

            contenedor.innerHTML = html;
        })
        .catch(err => console.error(err));
}

// INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", () => {

    // 🔥 MISMO menú en ambos lados
    cargarComponente("menu-desktop", "componentes/menu.html");
    cargarComponente("menu-mobile", "componentes/menu.html");

    cargarComponente("header", "componentes/header.html");

    cargarComponente("footer", "componentes/footer.html");

    cargarVista("introduccion");
    irAPagina(0);
});

document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-index]");
    if (!link) return;

    e.preventDefault();
    irAPagina(parseInt(link.dataset.index));
});


const paginas = [
    { id: "introduccion", anchor: "aprenderas", titulo: "👋 Aprenderás...", header: "Para iniciar: conoce prerrequisitos y configuración" },
    { id: "introduccion", anchor: "requisitos", titulo: "🛠️ Requisitos", header: "Antes de comenzar: prepara tu entorno de desarrollo" },
    { id: "introduccion", anchor: "estructura", titulo: "📁 Estructura", header: "Explora cómo está organizado el proyecto" },

    { id: "guardar_dataset", titulo: "📊 guardar_dataset.pl", header: "Genera y guarda datos para el sistema" },
    { id: "server", titulo: "🖥️ server.pl", header: "Configura el backend y expone servicios en Prolog" },

    { id: "crear_index", titulo: "📄 crear_index.html", header: "Construye la interfaz principal del sistema" },
    { id: "crear_style", titulo: "🎨 crear_style.css", header: "Diseña el estilo visual y la experiencia de usuario" },
    { id: "crear_script", titulo: "⚙️ crear_script.js", header: "Programa la lógica y comunicación con el backend" },

    { id: "probar", titulo: "▶️ Probar sistema", header: "Haz pruebas reales del sistema completo" }
];


function irAPagina(index) {
    if (index < 0 || index >= paginas.length) return;

    paginaActual = index;
    const pagina = paginas[index];

    cargarVista(pagina.id).then(() => {

        // 🔥 actualizar header dinámico
        actualizarHeader(pagina.header);

        // 🔥 scroll a anchor si existe
        setTimeout(() => {
            if (pagina.anchor) {
                const el = document.getElementById(pagina.anchor);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }, 50);

        actualizarFooter();
    });
}


function actualizarFooter() {
    const footer = document.getElementById("footer");

    if (!footer) return;

    const pagina = paginas[paginaActual];

    footer.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">

            <button class="btn btn-outline-primary"
                ${paginaActual === 0 ? "disabled" : ""}
                onclick="irAPagina(${paginaActual - 1})">
                ⬅ Anterior
            </button>

            <div class="fw-bold text-center flex-grow-1">
                ${pagina.titulo}
            </div>

            <button class="btn btn-outline-primary"
                ${paginaActual === paginas.length - 1 ? "style='visibility:hidden'" : ""}
                onclick="irAPagina(${paginaActual + 1})">
                Siguiente ➡
            </button>

        </div>
    `;
}

function actualizarHeader(texto) {
    const titulo = document.getElementById("tituloPagina");
    if (!titulo) return;

    titulo.textContent = texto;
}

function copiarCodigo(id) {
    const codigo = document.getElementById(id).innerText;

    navigator.clipboard.writeText(codigo).then(() => {
        const msg = document.getElementById("mensajeCopiado");
        msg.classList.remove("d-none");

        setTimeout(() => {
            msg.classList.add("d-none");
        }, 2000);
    });
}

//  efecto copiar texto

function copiarCodigo(id, btn) {
    const texto = document.getElementById(id).innerText;

    navigator.clipboard.writeText(texto);

    const original = btn.innerText;

    btn.innerText = "✔️ Copiado";
    btn.classList.add("btn-success");

    setTimeout(() => {
        btn.innerText = original;
        btn.classList.remove("btn-success");
    }, 1500);
}


// Modal para imágenes
function abrirImagen(src) {
    document.getElementById("imgPreview").src = src;
    const modal = new bootstrap.Modal(document.getElementById('imgModal'));
    modal.show();
}
