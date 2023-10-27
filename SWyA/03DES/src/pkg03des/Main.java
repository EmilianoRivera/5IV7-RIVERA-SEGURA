/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package pkg03des;

/**
 *
 * @author emiri
 */
import javax.crypto.*;
import java.security.*;
import java.io.*;


public class Main {

    public static void main(String[] args)  throws Exception{
        //vamos a cargar un archivo para cifrar
        if(args.length != 1){
            mensajeAyuda();
            System.exit(1);
        }
        System.out.println("1. - Generar la clave DES");
        //vamos a ocupar la clase KeyGenerator
        KeyGenerator generadorDES = KeyGenerator.getInstance("DES");
        //ahora debo definir el tamaño de la clave
        generadorDES.init(56);
        //generamos la clave secreta
        SecretKey clave = generadorDES.generateKey();
        
        System.out.println("VEAMOS LA CLAVE: " + clave);
        //paso poder ver la clave necesito un metodo para darle formato
        mostrarBytes(clave.getEncoded());
        System.out.println("");
        //paso 2: es momento de definir los elementos para cifrar
        /*
        DES es un cifrado por bloques, que tenemos que dar reglas de como se va a manejar
        el bloque
        
        Modo Cifrado ECB (Electronic Code Book)
        Estandar PKCS5 Padding
        */
        System.out.println("2.- Cifrar con DES el archivo  :" + args[0] + " , generamos el resultado en "
        + args[0] + " +.cifrado");
        //lo feo a cifrar
        Cipher cifrador = Cipher.getInstance("DES/ECB/PKCS5Padding");
        //ciframos
        cifrador.init(Cipher.ENCRYPT_MODE, clave);
        
        //leer el archivo y definir de cuanto en cuanto bytes de lectura
        byte[] buffer = new byte[1000];
        byte[] bufferCifrado;
        FileInputStream in = new FileInputStream(args[0]);
        FileOutputStream out = new FileOutputStream(args[0] + ".cifrado");
        //leo cada archivo
        int bytesleidos  = in.read(buffer, 0, 1000);
        while(bytesleidos != -1){
            //que no he terminado de leer el archivo
            bufferCifrado = cifrador.update(buffer, 0, bytesleidos);
            bytesleidos = in.read(buffer, 0, bytesleidos); 
        }
        bufferCifrado = cifrador.doFinal();
        out.write(bufferCifrado);
        in.close();
        out.close();   
        
        System.out.println("Vamos acifrar el archivo" + args[0]+ ".cifrado" + ", y el resultado esta en: " 
        + args[0] + ".descifrado");
        
         cifrador.init(Cipher.DECRYPT_MODE, clave);
        
        //leer el archivo y definir de cuanto en cuanto bytes de lectura
        
        byte[] bufferPlano;
         in = new FileInputStream(args[0]);
         out = new FileOutputStream(args[0] + ".cifrado");
        //leo cada archivo
        bytesleidos  = in.read(buffer, 0, 1000);
        while(bytesleidos != -1){
            //que no he terminado de leer el archivo
            bufferPlano = cifrador.update(buffer, 0, bytesleidos);
            bytesleidos = in.read(buffer, 0, bytesleidos); 
        }
        bufferPlano = cifrador.doFinal();
        out.write(bufferPlano);
        in.close();
        out.close();   
       
        
    }
    
    public static void mensajeAyuda(){
        System.out.println("EJEMPLO DE AYUDA DE CIFRADO DES");
        System.out.println("Debe de tener a fuerzas un archivo cargado");
    }
    public static void mostrarBytes(byte[] buffer){
        System.out.write(buffer, 0, buffer.length);
    }
    
    
}


