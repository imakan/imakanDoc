namespace classes {
  class classes {
    a: '111'
    b: '22'
  }
  console.log(classes)
  class ed extends classes {
    name: string
    constructor(public names,public a,public b) {
      super()
      this.name = names
      this.a =  a
      this.b =  b
    }
  }
  let a:ed = new ed('11','222','444')
  console.log(a)
}