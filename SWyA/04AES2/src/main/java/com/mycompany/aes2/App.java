/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.aes2;

import java.security.*;
import javax.crypto.*;
import sun.misc.*;
import java.util.Base64.Encoder;
import javax.crypto.spec.SecretKeySpec;


/**
 *
 * @author emiri
 */
public class App {
    private static final String algoritmo = "AES";
    //clave
    private static final byte  [] keyvalue = {'a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a'};
    
    
    //metodo para encriptar
    public static String encrypt(String Data ) throws Exception{
        Key key = generateKey();
        Cipher c = Cipher.getInstance(algoritmo);
        c.init(Cipher.ENCRYPT_MODE, key);
        byte [] encVal = c.doFinal(Data.getBytes());
        String valorcifrado = new String (encVal).toString();
        return valorcifrado;
    }
    public static String decrypt(String cifradoData ) throws Exception{
        Key key = generateKey();
        Cipher c = Cipher.getInstance(algoritmo);
        c.init(Cipher.DECRYPT_MODE, key);
        byte [] decVal = c.doFinal(cifradoData.getBytes() );
        String valordecifrado = new String (decVal);
        return valordecifrado;
        
    }        
    public static void main(String[] args) throws Exception {
       String texto = " habia una vez un patito que decia miau miau";
       String password = encrypt(texto);
       String descifrado = decrypt (password);
        System.out.println(texto);
        System.out.println(password);
        System.out.println(descifrado);
    }

    private static Key generateKey() throws Exception {
        Key llave = new SecretKeySpec(keyvalue, algoritmo);
        return llave;
    }
    
}
