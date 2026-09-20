/* ==========================================
   ENERSCHOOL CETIS 69
========================================== */


/* ==========================================
   VARIABLES
========================================== */

let registros = JSON.parse(
    localStorage.getItem("registrosEnerSchool")
) || [];


/* ==========================================
   MENÚ HAMBURGUESA
========================================== */

const botonMenu = document.getElementById("botonMenu");

const menuNavegacion =
    document.getElementById("menuNavegacion");


botonMenu.addEventListener("click", function() {

    menuNavegacion.classList.toggle("menu-abierto");


    const menuAbierto =
        menuNavegacion.classList.contains("menu-abierto");


    botonMenu.setAttribute(
        "aria-expanded",
        menuAbierto
    );


    if (menuAbierto) {

        botonMenu.textContent = "✕";

    } else {

        botonMenu.textContent = "☰";

    }

});


/* ==========================================
   MOSTRAR SECCIONES
========================================== */

function mostrarSeccion(id) {

    const secciones =
        document.querySelectorAll(".seccion");


    secciones.forEach(function(seccion) {

        seccion.classList.remove("activa");

    });


    const seccionSeleccionada =
        document.getElementById(id);


    if (seccionSeleccionada) {

        seccionSeleccionada.classList.add("activa");

    }


    /* CERRAR MENÚ EN CELULAR */

    menuNavegacion.classList.remove(
        "menu-abierto"
    );


    botonMenu.setAttribute(
        "aria-expanded",
        "false"
    );


    botonMenu.textContent = "☰";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (id === "estadisticas") {

        actualizarEstadisticas();

    }

}


/* ==========================================
   FECHA ACTUAL
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const fecha =
            document.getElementById("fecha");


        if (fecha) {

            const hoy = new Date();

            const año =
                hoy.getFullYear();

            const mes =
                String(
                    hoy.getMonth() + 1
                ).padStart(2, "0");

            const dia =
                String(
                    hoy.getDate()
                ).padStart(2, "0");


            fecha.value =
                `${año}-${mes}-${dia}`;

        }


        mostrarRegistros();

        actualizarEstadisticas();


        const observacionGuardada =
            localStorage.getItem(
                "observacionEnerSchool"
            );


        if (observacionGuardada) {

            document.getElementById(
                "notasObservacion"
            ).value =
                observacionGuardada;

        }

    }
);


/* ==========================================
   CALCULAR CONSUMO
========================================== */

function calcularConsumo() {

    const cantidad =
        Number(
            document.getElementById(
                "cantidad"
            ).value
        );


    const potencia =
        Number(
            document.getElementById(
                "potencia"
            ).value
        );


    const horas =
        Number(
            document.getElementById(
                "horas"
            ).value
        );


    const diasSemana =
        Number(
            document.getElementById(
                "diasSemana"
            ).value
        );


    const diasMes =
        Number(
            document.getElementById(
                "diasMes"
            ).value
        );


    const costoKwh =
        Number(
            document.getElementById(
                "costoKwh"
            ).value
        );


    if (
        cantidad <= 0 ||
        potencia <= 0 ||
        horas < 0 ||
        diasSemana < 0 ||
        diasMes < 0 ||
        costoKwh < 0
    ) {

        alert(
            "Verifica que los datos sean correctos."
        );

        return null;

    }


    const diario =
        (
            cantidad *
            potencia *
            horas
        ) / 1000;


    const semanal =
        diario *
        diasSemana;


    const mensual =
        diario *
        diasMes;


    const costoMensual =
        mensual *
        costoKwh;


    document.getElementById(
        "resultadoDiario"
    ).textContent =
        diario.toFixed(2) + " kWh";


    document.getElementById(
        "resultadoSemanal"
    ).textContent =
        semanal.toFixed(2) + " kWh";


    document.getElementById(
        "resultadoMensual"
    ).textContent =
        mensual.toFixed(2) + " kWh";


    document.getElementById(
        "resultadoCosto"
    ).textContent =
        "$" + costoMensual.toFixed(2);


    return {

        diario: diario,

        semanal: semanal,

        mensual: mensual,

        costoMensual: costoMensual

    };

}


/* ==========================================
   FORMULARIO DE CONSUMO
========================================== */

document.getElementById(
    "formConsumo"
).addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const resultado =
            calcularConsumo();


        if (!resultado) {

            return;

        }


        const registro = {

            id: Date.now(),

            fecha:
                document.getElementById(
                    "fecha"
                ).value,

            area:
                document.getElementById(
                    "area"
                ).value,

            aparato:
                document.getElementById(
                    "aparato"
                ).value,

            cantidad:
                Number(
                    document.getElementById(
                        "cantidad"
                    ).value
                ),

            potencia:
                Number(
                    document.getElementById(
                        "potencia"
                    ).value
                ),

            horas:
                Number(
                    document.getElementById(
                        "horas"
                    ).value
                ),

            diasSemana:
                Number(
                    document.getElementById(
                        "diasSemana"
                    ).value
                ),

            diasMes:
                Number(
                    document.getElementById(
                        "diasMes"
                    ).value
                ),

            costoKwh:
                Number(
                    document.getElementById(
                        "costoKwh"
                    ).value
                ),

            diario:
                resultado.diario,

            semanal:
                resultado.semanal,

            mensual:
                resultado.mensual,

            costoMensual:
                resultado.costoMensual

        };


        registros.push(registro);


        guardarDatos();

        mostrarRegistros();

        actualizarEstadisticas();


        alert(
            "El registro de consumo se guardó correctamente."
        );


        document.getElementById(
            "formConsumo"
        ).reset();


        document.getElementById(
            "cantidad"
        ).value = 1;


        document.getElementById(
            "diasSemana"
        ).value = 5;


        document.getElementById(
            "diasMes"
        ).value = 20;


        document.getElementById(
            "costoKwh"
        ).value = 1.50;


        document.getElementById(
            "resultadoDiario"
        ).textContent = "0 kWh";


        document.getElementById(
            "resultadoSemanal"
        ).textContent = "0 kWh";


        document.getElementById(
            "resultadoMensual"
        ).textContent = "0 kWh";


        document.getElementById(
            "resultadoCosto"
        ).textContent = "$0.00";

    }
);


/* ==========================================
   GUARDAR DATOS
========================================== */

function guardarDatos() {

    localStorage.setItem(
        "registrosEnerSchool",
        JSON.stringify(registros)
    );

}


/* ==========================================
   MOSTRAR REGISTROS
========================================== */

function mostrarRegistros() {

    const tabla =
        document.getElementById(
            "tablaRegistros"
        );


    tabla.innerHTML = "";


    if (registros.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="10">
                    No hay registros de consumo todavía.
                </td>
            </tr>
        `;

        return;

    }


    registros.forEach(function(registro) {

        const fila =
            document.createElement("tr");


        fila.innerHTML = `

            <td>
                ${registro.fecha}
            </td>

            <td>
                ${registro.area}
            </td>

            <td>
                ${registro.aparato}
            </td>

            <td>
                ${registro.cantidad}
            </td>

            <td>
                ${registro.potencia} W
            </td>

            <td>
                ${registro.diario.toFixed(2)} kWh
            </td>

            <td>
                ${registro.semanal.toFixed(2)} kWh
            </td>

            <td>
                ${registro.mensual.toFixed(2)} kWh
            </td>

            <td>
                $${registro.costoMensual.toFixed(2)}
            </td>

            <td>

                <button
                    class="btn-eliminar"
                    onclick="eliminarRegistro(${registro.id})">

                    Eliminar

                </button>

            </td>

        `;


        tabla.appendChild(fila);

    });

}


/* ==========================================
   ELIMINAR REGISTRO
========================================== */

function eliminarRegistro(id) {

    const confirmar =
        confirm(
            "¿Quieres eliminar este registro?"
        );


    if (!confirmar) {

        return;

    }


    registros =
        registros.filter(
            function(registro) {

                return registro.id !== id;

            }
        );


    guardarDatos();

    mostrarRegistros();

    actualizarEstadisticas();

}


/* ==========================================
   LIMPIAR REGISTROS
========================================== */

function limpiarRegistros() {

    if (registros.length === 0) {

        alert(
            "No hay registros para eliminar."
        );

        return;

    }


    const confirmar =
        confirm(
            "¿Estás seguro de eliminar TODOS los registros?"
        );


    if (!confirmar) {

        return;

    }


    registros = [];


    localStorage.removeItem(
        "registrosEnerSchool"
    );


    mostrarRegistros();

    actualizarEstadisticas();


    alert(
        "Todos los registros fueron eliminados."
    );

}


/* ==========================================
   ESTADÍSTICAS
========================================== */

function actualizarEstadisticas() {

    let totalDiario = 0;

    let totalSemanal = 0;

    let totalMensual = 0;

    let totalCosto = 0;


    registros.forEach(function(registro) {

        totalDiario +=
            registro.diario;

        totalSemanal +=
            registro.semanal;

        totalMensual +=
            registro.mensual;

        totalCosto +=
            registro.costoMensual;

    });


    document.getElementById(
        "totalDiario"
    ).textContent =
        totalDiario.toFixed(2) + " kWh";


    document.getElementById(
        "totalSemanal"
    ).textContent =
        totalSemanal.toFixed(2) + " kWh";


    document.getElementById(
        "totalMensual"
    ).textContent =
        totalMensual.toFixed(2) + " kWh";


    document.getElementById(
        "totalCosto"
    ).textContent =
        "$" + totalCosto.toFixed(2);


    generarGraficaAreas();

    generarEstadisticasAparatos();

}


/* ==========================================
   GRÁFICA POR ÁREA
========================================== */

function generarGraficaAreas() {

    const contenedor =
        document.getElementById(
            "graficaAreas"
        );


    contenedor.innerHTML = "";


    if (registros.length === 0) {

        contenedor.innerHTML =
            "<p>No hay información suficiente para mostrar la gráfica.</p>";

        return;

    }


    const consumoAreas = {};


    registros.forEach(function(registro) {

        if (!consumoAreas[registro.area]) {

            consumoAreas[registro.area] = 0;

        }


        consumoAreas[registro.area] +=
            registro.mensual;

    });


    const valores =
        Object.values(
            consumoAreas
        );


    const maximo =
        Math.max(...valores);


    Object.keys(
        consumoAreas
    ).forEach(function(area) {

        const consumo =
            consumoAreas[area];


        let porcentaje = 0;


        if (maximo > 0) {

            porcentaje =
                (consumo / maximo) * 100;

        }


        const item =
            document.createElement("div");


        item.className =
            "barra-item";


        item.innerHTML = `

            <div class="barra-nombre">
                ${area}
            </div>

            <div class="barra-fondo">

                <div
                    class="barra"
                    style="width: ${porcentaje}%">
                </div>

            </div>

            <div class="barra-valor">
                ${consumo.toFixed(2)} kWh
            </div>

        `;


        contenedor.appendChild(item);

    });

}


/* ==========================================
   ESTADÍSTICAS POR APARATO
========================================== */

function generarEstadisticasAparatos() {

    const contenedor =
        document.getElementById(
            "listaAparatos"
        );


    contenedor.innerHTML = "";


    if (registros.length === 0) {

        contenedor.innerHTML =
            "<p>No hay registros de aparatos.</p>";

        return;

    }


    const aparatos = {};


    registros.forEach(function(registro) {

        if (!aparatos[registro.aparato]) {

            aparatos[registro.aparato] = 0;

        }


        aparatos[registro.aparato] +=
            registro.mensual;

    });


    Object.keys(
        aparatos
    ).forEach(function(aparato) {

        const item =
            document.createElement("div");


        item.className =
            "aparato-estadistica";


        item.innerHTML = `

            <span>
                ⚡ ${aparato}
            </span>

            <strong>
                ${aparatos[aparato].toFixed(2)} kWh/mes
            </strong>

        `;


        contenedor.appendChild(item);

    });

}


/* ==========================================
   ENCUESTA
========================================== */

document.getElementById(
    "formEncuesta"
).addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        alert(
            "Gracias por participar en la encuesta de EnerSchool CETis 69."
        );


        this.reset();

    }
);


/* ==========================================
   OBSERVACIÓN
========================================== */

function guardarObservacion() {

    const notas =
        document.getElementById(
            "notasObservacion"
        ).value;


    if (notas.trim() === "") {

        alert(
            "Escribe alguna observación antes de guardar."
        );

        return;

    }


    localStorage.setItem(
        "observacionEnerSchool",
        notas
    );


    alert(
        "La observación se guardó correctamente."
    );

}