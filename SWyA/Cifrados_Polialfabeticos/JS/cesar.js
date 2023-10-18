
function cifrarCesar() {
    const clave = obtenerClave();
    if (clave === null) return;

    const mensaje = document.getElementById("mensaje").value;
    const textoCifrado = aplicarCifrado(mensaje, clave);
    mostrarResultado(textoCifrado);
}

function descifrarCesar() {
    const clave = obtenerClave();
    if (clave === null) return;

    const mensaje = document.getElementById("mensaje").value;
    const textoDescifrado = aplicarCifrado(mensaje, -clave); // Descifrar es cifrar con el negativo de la clave
    mostrarResultado(textoDescifrado);
}

function obtenerClave() {
    const clave = document.getElementById("clave").value;
    if (clave.match(/^[a-zA-Z]$/)) {
        return clave.toLowerCase().charCodeAt(0) - 97;
    } else if (!isNaN(clave)) {
        return parseInt(clave);
    } else {
        alert("La clave debe ser un número o una letra.");
        return null;
    }
}

function aplicarCifrado(mensaje, clave) {
    let resultado = "";
    for (let i = 0; i < mensaje.length; i++) {
        const char = mensaje[i];
        if (char.match(/[a-z]/i)) {
            const code = mensaje.charCodeAt(i);
            if (char === char.toUpperCase()) {
                //C = M + Kmod|26|
                //C = 75 , K = 3 => 13 % 26 = 13
                //C = 90, K = 3 => 28%26 = 2
                //C = 65, K = 3 => 3%26 = 3 + 26 = 29 % 26 = 3 + 65 = 68
                resultado += String.fromCharCode(((code - 65 + clave) % 26 + 26) % 26 + 65);
            } else {
                resultado += String.fromCharCode(((code - 97 + clave) % 26 + 26) % 26 + 97);
            }
        } else {
            resultado += char;
        }
    }
    return resultado;
}

function mostrarResultado(resultado) {
    document.getElementById("resultado").textContent = resultado;
}



