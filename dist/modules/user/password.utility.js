"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordUtility = exports.PasswordUtility = void 0;
/**
* Clase utilitaria para la generación de contraseñas seguras.
*/
class PasswordUtility {
    /**
     * Genera una contraseña aleatoria con una longitud especificada, asegurando que contenga al menos un carácter de cada tipo: minúscula, mayúscula, número y carácter especial.
     * Si no se especifica una longitud, la contraseña tendrá un tamaño por defecto de 12 caracteres.
     *
     * @param length - La longitud deseada de la contraseña. El valor predeterminado es 12.
     * @returns La contraseña generada como una cadena de texto.
     */
    generatePassword(length = 12) {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const specialCharacters = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const allCharacters = lowercase + uppercase + numbers + specialCharacters;
        let password = '';
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
        for (let i = 4; i < length; i++) {
            password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
        }
        // Mezclamos la contraseña para aumentar aleatoriedad
        return password.split('').sort(() => Math.random() - 0.5).join('');
    }
}
exports.PasswordUtility = PasswordUtility;
exports.passwordUtility = new PasswordUtility();
