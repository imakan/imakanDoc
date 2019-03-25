const blob = new Blob('hello'.split(''))
console.log(blob.size)

const array = new Uint8Array([128,128,128]);

const blob2 = new Blob([array])

function readBlob(blob,type){
  return new Promise((resolve,reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target.result)
    }
    reader.readAsArrayBuffer(blob)
  })
}
readBlob(blob,'DataURL').then(url => console.log(url))