// Class 的继承

class Point {
  constructor() {
    console.log(new.target.name)
  }
  con() {
    console.log(this)
  }
}

class ColorPoint extends Point {
 constructor() {
  super()
 }
 foo() {
   console.log(this)
 }
}
new Point()
new ColorPoint()