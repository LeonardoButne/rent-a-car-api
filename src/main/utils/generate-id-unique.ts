export const generateIdUnique = (): string => {
  const numeros = Math.floor(1000 + Math.random() * 9000) // 4 digits: 1000–9999
  const letras = Array.from({ length: 5 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('')
  const sufixo = Math.floor(10 + Math.random() * 90) // 2 digits: 10–99
  return `COM${numeros}${letras}${sufixo}`
}

export const generateOrderId = (): string => {
  const prefix = Math.random().toString(36).substring(2, 7).toUpperCase()
  const timestamp = Date.now()
  return `${prefix}${timestamp}`
}
