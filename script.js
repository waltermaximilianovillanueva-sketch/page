
const paisajes = [
    {
        titulo: "Cuantos años uno alado del otro...",
        descripcion: "♥ ♥ ♥",
        imagen: "img/IMG-20260529-WA0023.jpg"
    },
    {
        titulo: "Pasamos por momentos buenos y malos... ",
        descripcion: "♥ ♥ ♥ ",
        imagen: "img/IMG-20260529-WA0024.jpg"
    },
    {
        titulo: "me guiaste en cada paso... ",
        descripcion: " ♥ ♥ ♥",
        imagen: "img/IMG-20260529-WA0025.jpg "
    },
    {
        titulo: "somos tan parecidos... ",
        descripcion: " ♥ ♥ ♥",
        imagen: "img/IMG-20260529-WA0027.jpg "
    },
    {
        titulo: "conoci varias de tus etapas...",
        descripcion: "♥ ♥ ♥ ",
        imagen: " img/IMG-20260529-WA0028.jpg"
    },
    {
        titulo: "estuviste en cada momento... ",
        descripcion: "♥ ♥ ♥ ",
        imagen: "img/IMG-20260529-WA0029.jpg "
    },
    {
        titulo: "nunca me falto tu presencia... ",
        descripcion: "♥ ♥ ♥ ",
        imagen: "img/IMG-20260529-WA0030.jpg "
    },
    {
        titulo: "nunca me abandonaste... ",
        descripcion: "♥ ♥ ♥ ",
        imagen: " img/IMG-20260529-WA0031.jpg"
    },
    {
        titulo: "siempre me diste todo tu amor 🥰",
        descripcion: " ♥ ♥ ♥",
        imagen: "img/IMG-20260529-WA0035.jpg "
    },
    {
        titulo: "enserio gracias por ser mi madre 😊😚 ",
        descripcion: " ♥ ♥ ♥",
        imagen: "img/IMG-20260529-WA0036.jpg "
    },
    {
        titulo: "por mas grande que sea ",
        descripcion: "♥ ♥ ♥ ",
        imagen: "img/IMG-20260529-WA0037.jpg "
    },
    {
        titulo: "me seguis viendo como tu pequeño hijo 🥰 ",
        descripcion: " ♥ ♥ ♥",
        imagen: "img/IMG-20260529-WA0038.jpg "
    },
    {
        titulo: "espero el dia de mañana ser un gran padre, como vos 😊",
        descripcion: "♥ ♥ ♥ ",
        imagen: "img/IMG-20260529-WA0039.jpg"
    },
    {
        titulo: "te quiero mamá 🤗💞 ",
        descripcion: "♥ ♥ ♥ ",
        imagen: "img/IMG-20260529-WA0040.jpg"
    },
    {
        titulo: "Diosa de la transformacion 💞 ",
        descripcion: "♥ ♥ ♥ ",
        imagen: "img/IMG-20260529-WA0042.jpg"
    },
    {
        titulo: "😁 ",
        descripcion: "♥ ♥ ♥ ",
        imagen: "img/IMG-20260529-WA0044.jpg"
    },
    {
        titulo: "prometo hacer que te sientas orgullosa ✨",
        descripcion: " ♥ ♥ ♥",
        imagen: "img/IMG-20260529-WA0046.jpg "
    },
    {
        titulo: "que fortuna tengo de ser tu hijo 🥰",
        descripcion: "♥ ♥ ♥ ",
        imagen: "img/IMG-20260529-WA0054.jpg "
    },
    {
        titulo: "realmente lo valoro 💎 ",
        descripcion: "♥ ♥ ♥ ",
        imagen: "img/IMG-20260529-WA0052.jpg "
    },
    {
        titulo: "💖💖💖 ",
        descripcion: "♥ ♥ ♥ ",
        imagen: " img/IMG-20260529-WA0048.jpg"
    }

];

// Podés agregar todos los paisajes que quieras
// copiando un objeto de arriba y cambiando sus datos.

let indiceActual = 0;

const imagenCentral = document.getElementById("imagenCentral");
const imagenIzquierda = document.getElementById("imagenIzquierda");
const imagenDerecha = document.getElementById("imagenDerecha");

const tituloPaisaje = document.getElementById("tituloPaisaje");
const textoPaisaje = document.getElementById("textoPaisaje");
const indicadores = document.getElementById("indicadores");

function obtenerIndice(indice) {
    return (indice + paisajes.length) % paisajes.length;
}

function mostrarPaisaje() {
    if (paisajes.length === 0) return;

    const anterior = paisajes[obtenerIndice(indiceActual - 1)];
    const actual = paisajes[indiceActual];
    const siguiente = paisajes[obtenerIndice(indiceActual + 1)];

    imagenIzquierda.style.backgroundImage =
        `url("${anterior.imagen}")`;

    imagenCentral.style.backgroundImage =
        `url("${actual.imagen}")`;

    imagenDerecha.style.backgroundImage =
        `url("${siguiente.imagen}")`;

    tituloPaisaje.textContent = actual.titulo;
    textoPaisaje.textContent = actual.descripcion;

    // Actualizar los puntos de navegación
    indicadores.querySelectorAll("button").forEach((boton, indice) => {
        const activo = indice === indiceActual;

        boton.classList.toggle("activo", activo);

        if (activo) {
            boton.setAttribute("aria-current", "true");
        } else {
            boton.removeAttribute("aria-current");
        }
    });
}


function ajustarProporcion(url) {
    const imagen = new Image();

    imagen.onload = () => {
        const proporcion =
            imagen.naturalWidth / imagen.naturalHeight;

        // Evitar proporciones extremas
        const proporcionSegura = Math.min(
            2.2,
            Math.max(0.65, proporcion)
        );

        imagenCentral.style.setProperty(
            "--proporcion-imagen",
            `${proporcionSegura}`
        );
    };

    imagen.onerror = () => {
        imagenCentral.style.setProperty(
            "--proporcion-imagen",
            "16 / 9"
        );
    };

    imagen.src = url;
}


function crearIndicadores() {
    indicadores.innerHTML = "";

    paisajes.forEach((paisaje, indice) => {
        const boton = document.createElement("button");

        boton.type = "button";
        boton.setAttribute("aria-label", `Mostrar ${paisaje.titulo}`);

        boton.addEventListener("click", () => {
            indiceActual = indice;
            mostrarPaisaje();
        });

        indicadores.appendChild(boton);
    });
}

function avanzar() {
    indiceActual = obtenerIndice(indiceActual + 1);
    mostrarPaisaje();
}

function retroceder() {
    indiceActual = obtenerIndice(indiceActual - 1);
    mostrarPaisaje();
}

document.getElementById("siguiente").addEventListener("click", avanzar);
document.getElementById("anterior").addEventListener("click", retroceder);

document.addEventListener("keydown", (evento) => {
    // Evitar cambiar el carrusel mientras se usan controles de formulario
    if (
        evento.target instanceof HTMLElement &&
        evento.target.closest("input, textarea, select, button")
    ) {
        return;
    }

    if (evento.key === "ArrowRight") avanzar();
    if (evento.key === "ArrowLeft") retroceder();
});

// ===== MÚSICA DE FONDO =====

const audio = document.getElementById("audioFondo");
const botonMusica = document.getElementById("botonMusica");
const estadoMusica = document.getElementById("estadoMusica");
const volumen = document.getElementById("volumen");

audio.volume = Number(volumen.value);

botonMusica.addEventListener("click", async () => {
    if (audio.paused) {
        try {
            await audio.play();
            botonMusica.textContent = "❚❚ Pausar";
            botonMusica.setAttribute("aria-pressed", "true");
            estadoMusica.textContent = "Reproduciendo";
        } catch (error) {
            estadoMusica.textContent =
                "No se pudo cargar musica.mp3";
            botonMusica.textContent = "▶ Reintentar";
        }
    } else {
        audio.pause();
        botonMusica.textContent = "▶ Reproducir";
        botonMusica.setAttribute("aria-pressed", "false");
        estadoMusica.textContent = "En pausa";
    }
});

audio.addEventListener("ended", () => {
    // Normalmente no se ejecutará porque el audio usa loop.
    botonMusica.textContent = "▶ Reproducir";
    estadoMusica.textContent = "Finalizada";
});

volumen.addEventListener("input", () => {
    audio.volume = Number(volumen.value);
});

// Inicializar
crearIndicadores();
mostrarPaisaje();
