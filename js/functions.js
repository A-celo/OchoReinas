var contador = 0;
var tableroEstado = Array.from({ length: 8 }, () => Array(8).fill(0));

function mostrarReina(celda) {
    let fila = celda.parentNode.rowIndex;
    let columna = celda.cellIndex;
    let selector = document.getElementById("selectorReina");
    let imagenReina = selector.value;

    if (tableroEstado[fila][columna] !== 0) {
        return;
    }

    if (window.getComputedStyle(celda).backgroundImage === 'none' || window.getComputedStyle(celda).backgroundImage === 'url("none")') {
        if (contador < 8) {
            celda.style.backgroundImage = `url(${imagenReina})`;
            celda.style.backgroundRepeat = "no-repeat";
            celda.style.backgroundPosition = "center";
            celda.style.backgroundSize = "contain";
            contador++;
            tableroEstado[fila][columna] = 2; 
            bloquearCeldas(fila, columna);
        }
    } else {
        celda.style.backgroundImage = "none";
        contador--;
        tableroEstado[fila][columna] = 0; 
        resetearBloqueo();
    }
}

function bloquearCeldas(fila, columna) {
    for (let i = 0; i < 8; i++) {
        if (tableroEstado[fila][i] === 0) tableroEstado[fila][i] = 1; // Bloqueo horizontal
        if (tableroEstado[i][columna] === 0) tableroEstado[i][columna] = 1; // Bloqueo vertical

        // Bloqueo diagonales
        if (fila + i < 8 && columna + i < 8) tableroEstado[fila + i][columna + i] = 1;
        if (fila - i >= 0 && columna + i < 8) tableroEstado[fila - i][columna + i] = 1;
        if (fila + i < 8 && columna - i >= 0) tableroEstado[fila + i][columna - i] = 1;
        if (fila - i >= 0 && columna - i >= 0) tableroEstado[fila - i][columna - i] = 1;
    }

    actualizarCeldasBloqueadas();
}

function resetearBloqueo() {
    tableroEstado = Array.from({ length: 8 }, () => Array(8).fill(0));

    let celdas = document.querySelectorAll("#tablero td");
    celdas.forEach(celda => {
        celda.style.opacity = "1";
        celda.style.pointerEvents = "auto";
    });

    let filas = document.getElementById("tablero").rows;
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if (filas[r].cells[c].style.backgroundImage !== 'none' && filas[r].cells[c].style.backgroundImage !== 'url("none")') {
                tableroEstado[r][c] = 2; 
                bloquearCeldas(r, c);
            }
        }
    }
}

function actualizarCeldasBloqueadas() {
    let celdas = document.querySelectorAll("#tablero td");
    celdas.forEach(celda => {
        let fila = celda.parentNode.rowIndex;
        let columna = celda.cellIndex;
        if (tableroEstado[fila][columna] === 1) {
            celda.style.cursor = "not-allowed";  
            celda.style.pointerEvents = "none";  
        } else {
            celda.style.cursor = "pointer";  
            celda.style.pointerEvents = "auto";  
        }
    });
}

function cambiarColor(r, c) {
    var celda = document.getElementById("tablero");
    var r1 = r, c1 = c, r2 = r, c2 = c;
    var r3 = r, c3 = c, r4 = r, c4 = c;

    for (let i = 0; i < 8; i++) {
        celda.rows[r].cells[i].style.backgroundColor = "#E12C41";
        celda.rows[i].cells[c].style.backgroundColor = "#E12C41";

        if (r1 < 8 && c1 < 8) {
            celda.rows[r1++].cells[c1++].style.backgroundColor = "#E12C41";
        }

        if (r2 > -1 && c2 < 8) {
            celda.rows[r2--].cells[c2++].style.backgroundColor = "#E12C41";
        }

        if (r3 > -1 && c3 > -1) {
            celda.rows[r3--].cells[c3--].style.backgroundColor = "#E12C41";
        }

        if (r4 < 8 && c4 > -1) {
            celda.rows[r4++].cells[c4--].style.backgroundColor = "#E12C41";
        }
    }
}

function limpiar() {
    document.querySelectorAll("td").forEach(td => td.style.backgroundColor = "");
}

function limpiarImagen() {
    document.querySelectorAll("td").forEach(td => td.style.backgroundColor = "none");
}

function solucion1() {
    resetearTablero();
    contador = 8;

    let selector = document.getElementById("selectorReina");
    let imagenReina = selector.value;

    var celdas = document.getElementById("tablero");
    var estilo = `
                background-image: url(${imagenReina});
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;`;

    celdas.rows[0].cells[3].style = estilo;
    celdas.rows[1].cells[6].style = estilo;
    celdas.rows[2].cells[2].style = estilo;
    celdas.rows[3].cells[7].style = estilo;
    celdas.rows[4].cells[1].style = estilo;
    celdas.rows[5].cells[4].style = estilo;
    celdas.rows[6].cells[0].style = estilo;
    celdas.rows[7].cells[5].style = estilo;
}

function solucion2() {
    resetearTablero();
    contador = 8;

    let selector = document.getElementById("selectorReina");
    let imagenReina = selector.value;

    var celdas = document.getElementById("tablero");
    var estilo = `
                background-image: url(${imagenReina});
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;`;

    celdas.rows[0].cells[1].style = estilo;
    celdas.rows[1].cells[3].style = estilo;
    celdas.rows[2].cells[5].style = estilo;
    celdas.rows[3].cells[7].style = estilo;
    celdas.rows[4].cells[2].style = estilo;
    celdas.rows[5].cells[6].style = estilo;
    celdas.rows[6].cells[4].style = estilo;
    celdas.rows[7].cells[0].style = estilo;
}

function solucion3() {
    resetearTablero();
    contador = 8;

    let selector = document.getElementById("selectorReina");
    let imagenReina = selector.value;

    var celdas = document.getElementById("tablero");
    var estilo = `
                background-image: url(${imagenReina});
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;`;

    celdas.rows[0].cells[6].style = estilo;
    celdas.rows[1].cells[1].style = estilo;
    celdas.rows[2].cells[5].style = estilo;
    celdas.rows[3].cells[2].style = estilo;
    celdas.rows[4].cells[7].style = estilo;
    celdas.rows[5].cells[4].style = estilo;
    celdas.rows[6].cells[0].style = estilo;
    celdas.rows[7].cells[3].style = estilo;
}

function resetearTablero() {
    document.querySelectorAll("td").forEach(td => {
        td.style.backgroundImage = "none";
        td.style.opacity = "1";
        td.style.pointerEvents = "auto";
    });
    contador = 0;
    tableroEstado = Array.from({ length: 8 }, () => Array(8).fill(0));
}
