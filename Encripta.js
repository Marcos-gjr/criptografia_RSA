const fs = require('fs')
const TextChunk = require('./text_chunk')

// Constantes adquiridas pelo terminal
const chavePublica = fs.readFileSync(process.argv[2], 'utf8').split('\n')
const textoNormal = fs.readFileSync(process.argv[3], 'utf8')
const arquivoSaida = process.argv[4]
// -----

const texto64 = btoa(textoNormal)
const tamChunk = TextChunk.blockSize(chavePublica[0])
const chunks = []


for (let i = 0; i < texto64.length; i += tamChunk) {
  const chunk = texto64.slice(i, i + tamChunk)
  chunks.push(chunk)
}

const criptoChunks = chunks.map(chunk => {
    const textoemChunk = new TextChunk(chunk)
    const bigIntChunk = textoemChunk.bigIntValue

    let criptoChunk = bigIntChunk ** BigInt(chavePublica[1]) % BigInt(chavePublica[0])    
    
    return criptoChunk.toString()
})

const criptoTexto = criptoChunks.join('\n')
fs.writeFileSync(arquivoSaida, criptoTexto, 'utf8')

console.log('Criptografia concluída!')
