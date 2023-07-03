const fs = require('fs')
const TextChunk = require('./text_chunk')


// Constantes adquiridas pelo terminal
const chave_priv = fs.readFileSync(process.argv[2], 'utf8').split('\n')
const texto_cript = fs.readFileSync(process.argv[3], 'utf8').split('\n')
const arquivo_saida = process.argv[4]
// -----


const textoemChunk = new TextChunk(texto_cript)
let chunks = textoemChunk.stringVal
console.log(textoemChunk)


function decriptar(base, exp, p) {
    var result = 1n
    while (exp !== 0n) {
      if (exp % 2n === 1n) result = (result * base) % p
      base = (base * base) % p
      exp >>= 1n;
    }
    return result
  }

const decript_Chunks = chunks.map(chunk => {
    const bigIntChunk = BigInt(chunk);
    console.log("Chunk = ", chunk)
    console.log("Encrypted value: " + bigIntChunk)
  
    let decript_Chunk = decriptar(bigIntChunk, BigInt(chave_priv[1]), BigInt(chave_priv[0]));
    console.log("Decrypted value: " + decript_Chunk)
  
    return decript_Chunk.toString();
})

const texto64 = decript_Chunks.join('');
console.log("Texto base64: " + texto64);

const textoNormal = atob(texto64);
console.log("Texto plano = ", textoNormal);

fs.writeFileSync(arquivo_saida, textoNormal, 'utf-8');

console.log('Descriptografia concluída!');



//------ fazer map no stringval 
//console.log('texto em chunk: ' + textoemChunk + '\n\n')
//console.log('Texto em base' + '\n' + base64 + '\n\n')
/*
console.log('big int value:\n' + textoemChunk.bigIntValue + '\n\n')
console.log('Texto: ' + '\n' + texto_cript + '\n\n')
console.log('Chave: ' + '\n' + chave_priv[0] + '\n' + chave_priv[1] + '\n\n')
console.log(typeof(texto_cript))
*/
//-----
//fs.writeFileSync(process.argv[4], texto_cript, 'utf8')
