const fs = require('fs')
const TextChunk = require('./text_chunk')


// Constantes adquiridas pelo terminal
const chavePrivada = fs.readFileSync(process.argv[2], 'utf8').split('\n')
const criptoTexto = fs.readFileSync(process.argv[3], 'utf8').split('\n')
const arquivo_saida = process.argv[4]
// -----


function powermod(valorCripto, d, n) {
    let result = 1n;
    while (d !== 0n) {
        if (d % 2n === 1n) {
            result = (result * valorCripto) % n;
        }
        valorCripto = (valorCripto * valorCripto) % n;
        d >>= 1n;
    }
    return result;
}

function descriptografar(chunksCriptografados, chave_privada) {
    const chunksDescriptografados = chunksCriptografados.map(valorCriptografado => {
        const valorDescriptografado = powermod(BigInt(valorCriptografado), BigInt(chave_privada[1]), BigInt(chave_privada[0]));

        let decriptoChunk = new TextChunk(valorDescriptografado);

        decriptoChunk = decriptoChunk.stringVal

        return decriptoChunk;
    });

    const base64Text = chunksDescriptografados.join('');
    const plaintext = atob(base64Text).toString();

    return plaintext;
}

const decriptoTexto = descriptografar(criptoTexto, chavePrivada);
fs.writeFileSync(arquivo_saida, decriptoTexto)

console.log("Descriptografia Concluída!")
