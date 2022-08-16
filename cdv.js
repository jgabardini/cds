class Product {
  constructor(target) {
    this.position = { x: 0, y: 0 };
    this.target = target;
  }
  move() {
    // console.log(`target ${this.target.x} ${this.target.y}`);
    // console.log(`pos ${this.position.x} ${this.position.y}`);
    // console.log(`inc ${this.increment(this.target.x, this.position.x)} ${this.increment(this.target.y, this.position.y)}`);
    this.position.x += this.increment(this.target.x, this.position.x);
    this.position.y += this.increment(this.target.y, this.position.y);
  }
  increment(to, from) {
    const max_incr = 6;
    const dif = to - from;
    return Math.min(Math.abs(dif), max_incr) * Math.sign(dif);
  }
}

class Target {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = Math.sqrt(x**2 + y**2);
    this.phi = Math.atan2(y, x);
  }
  move() {
    this.phi += 0.06;
    this.x = this.r * Math.cos(this.phi);
    this.y = this.r * Math.sin(this.phi);
  }
}

let step;
let product;
let target;
function init() {
  target =  new Target(0, -75);
  product = new Product(target);
  step = 0;
  setTimeout(() => {draw()}, 500 );
}

function draw() {
  const canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    if (step == 0) {
      ctx.clearRect(0, 0, 150, 150);
      ctx.translate(75, 75);
    } else {
      ctx.beginPath();
      // ctx.moveTo(0, (step - 1) * 5);
      // ctx.lineTo(0, step * 5);
      ctx.moveTo(product.position.x, product.position.y);
      product.move();
      ctx.lineTo(product.position.x, product.position.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(target.x, target.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'green';
      ctx.fill();       
    }
    step++;
    
    if (step < 30 && 1<(Math.abs(product.position.x - target.x) + Math.abs(product.position.y - target.y)) ) {
      target.move();
      setTimeout(() => {draw()}, 500 );
    }
  }
}