export const  generateIdUniqueReference =(): string =>{
    const prefixo = "OEU";
  
    const parteAleatoria = Array.from({ length: 10 }, () => {
      const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");
  
    return `${prefixo}${parteAleatoria}`;
  }