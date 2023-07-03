const fs = require('fs')
const TextChunk = require('./text_chunk')

// Constantes adquiridas pelo terminal
const chave_pub = fs.readFileSync(process.argv[2], 'utf8').split('\n')
const texto_normal = fs.readFileSync(process.argv[3], 'utf8')
const arquivo_saida = process.argv[4]
// -----

const texto64 = btoa(texto_normal)
const tamChunk = 7
const chunks = []


for (let i = 0; i < texto64.length; i += tamChunk) {
  const chunk = texto64.slice(i, i + tamChunk)
  chunks.push(chunk)
}

const encript_Chunks = chunks.map(chunk => {
    const textoemChunk = new TextChunk(chunk)
    const bigIntChunk = textoemChunk.bigIntValue
    
    console.log("Esse é o textChunk = ", textoemChunk)
    console.log("BigIntValue = ", bigIntChunk)

    let encript_Chunk = bigIntChunk ** BigInt(chave_pub[1]) % BigInt(chave_pub[0])    
    return encript_Chunk.toString()
})

const encript_Texto = encript_Chunks.join('\n')
fs.writeFileSync(arquivo_saida, encript_Texto, 'utf8')

console.log('Criptografia concluída!')


//-----
/*
console.log('texto em chunk:\n' + textoemChunk + '\n\n')
console.log('big int value:\n' + textoemChunk.bigIntValue + '\n\n')

console.log('Texto em base' + '\n' + base64 + '\n\n')
console.log('Texto: ' + '\n' + texto_normal + '\n\n')
console.log('Chave: ' + '\n' + chave_pub[0] + '\n' + chave_pub[1])
*/
//-----
//fs.writeFileSync(process.argv[4], )
