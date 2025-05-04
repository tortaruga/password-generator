function charSet(numbers, special) {
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let nums = "0123456789";
    let chars = "!@#$%&*+_?";
  
    let charset = letters += numbers ? nums : '';
    return charset  += special ? chars : '';
  
  }
  
 export function generatePassword(min, max, numbers, special) {
    let password = '';
    const charset = charSet(numbers, special);

    min = min === '' ? 12 : Number(min);
    max = max === '' ? 16 : Number(max);

    const length = Math.floor(Math.random() * (max - min + 1)) + min;
    
    for (let i = 0; i < length; i++) {
       const randomIndex = Math.floor(Math.random() * charset.length);
       password += charset.charAt(randomIndex);
    }
    return password; 
  }
  
  export function evaluatePasswordStrength(password) {
    let pass = 0;
    // check if password length is strong
    if (password.length >= 12 && password.length <= 16) {
      pass += 1;
    }
    // check if it contains a number
    if (/[0-9]/.test(password)) {
      pass += 1;
    } 
    // check if it contains a special character
    if (/[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(password)) {
      pass += 1;
    }
    // check is there are consecutive repetitions of a character
    if (!/(.)\1{2,}/.test(password)) {
      pass += 1;
    }
  
    if (pass === 4) {
      return 'strong'
    } else if (pass === 2 || pass === 3) {
      return 'medium' 
    } else if (pass < 2) {
      return 'weak'
    }
  }
  
  