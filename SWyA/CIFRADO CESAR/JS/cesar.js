const desplazamiento = document.getElementById("desplazamiento");
const texto = document.getElementById("texto");
const textoCifrado= document.getElementById("cifrado");
const btnDescifrar = document.getElementById("boton-descifrar");
const divDescifrar = document.getElementById("descifrar");
/*VAMOS A CREAR UN FUNCION PARA PODER CIFRAR*/ 
function cifrado (){
    //declara texto que se va a ingresar
    const textoIngresado = texto.value;
    textoCifrado.value = textoIngresado.split('').map(
    c=> {
        let mayus =  (c === c.toUpperCase()) ? true : false;
        let valorEntero = c.toLowerCase().charCodeAt(0);
        if (valorEntero >= 97 && valorEntero<= 122){
            const valorDesplazamiento= parseInt(desplazamiento.value);
            if(valorEntero + valorDesplazamiento > 122){
                valorEntero = 97 + (valorEntero - 122 + valorDesplazamiento-1);

            }else{
                valorEntero = valorEntero + valorDesplazamiento;
            }
        }
        let cifrado = String.fromCharCode(valorEntero);
        return mayus ? cifrado.toUpperCase() : cifrado;
    }).join('');

}
/*
function descifrar (){
    const descifrarTexto = cifrado.value;
    console.log(cifrado.value)
}*/
function descifrar (){
    const textoCif = textoCifrado.value;
    const textoDescifrado = textoCif.split('').map(
        e=> {
            const despla = parseInt(desplazamiento.value);
            if(e + despla > 122){
                e = 97 + (e -122 - despla-1);
            }else{
                e = e + despla;
            }

        }
       
        
    ).join('');
}
texto.addEventListener ("keyup", cifrado);
desplazamiento.addEventListener("change", cifrado);
btnDescifrar.addEventListener("click", descifrar);