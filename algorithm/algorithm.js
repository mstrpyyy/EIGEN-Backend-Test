//Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"
const string = 'NEGIE1'

function reverseAlphabet(string) {
    const alphabet = string.slice(0, string.length - 1)
    const reversedString = alphabet.split('').reverse().join('') + string.charAt(string.length - 1)
    
    return reversedString
}

console.log(reverseAlphabet(string));

//Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu
const sentence = "Saya sangat senang mengerjakan soal algoritma"

function getLongestWord(string) {
    const wordArr = string.split(' ')
    let longestWord = ''
    for (let i = 0; i < wordArr.length; i++) {
        if (wordArr[i].length > longestWord.length) {
            longestWord = wordArr[i]
        }
    }

    return `${longestWord} : ${longestWord.length} character(s).`
}

console.log(getLongestWord(sentence));


//Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT
INPUT = ['xc', 'dz', 'bbb', 'dz']  
QUERY = ['bbb', 'ac', 'dz']  


function countQuery(input, query) {
    let output = []
    for (let q = 0; q < query.length; q++) {
        let counter = 0
        for (let i = 0; i < input.length; i++) {
            if (query[q] === input[i]) {
                counter++
            }
        }
        output.push(counter)
    }

    return output
}

console.log(countQuery(INPUT, QUERY));


//Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN Contoh:
matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]] 

function matrixcDiagonalSubtract(matrix) {
    const arrLength = matrix.length
    let firstDiagonal = 0
    let secondDiagonal = 0
    for (let i = 0; i < arrLength; i++) {
        firstDiagonal = firstDiagonal + matrix[i][i]
        secondDiagonal = secondDiagonal + matrix[arrLength - 1 - i][i]
    }
    const result = firstDiagonal - secondDiagonal

    return `${firstDiagonal} - ${secondDiagonal} = ${result}`
}

console.log(matrixcDiagonalSubtract(matrix));

