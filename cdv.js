class Product {
  constructor(target, speed) {
    this.last = { x: 0, y: 0 };
    this.position = { x: 0, y: 0 };
    this.target = target;
    this.step = 0;
    this.speed = speed;
  }
  move() {
    const incr = this.increment(this.target.x - this.position.x, this.target.y - this.position.y);
    this.last.x = this.position.x;
    this.last.y = this.position.y;
    this.position.x += incr.x;
    this.position.y += incr.y;
    this.step++;

  }
  increment(delta_x, delta_y) {
    const phi = Math.atan2(delta_y, delta_x);
    const r = Math.min( Math.sqrt(delta_x**2 + delta_y**2), this.speed);

    return { x: r * Math.cos(phi), y: r * Math.sin(phi) };
  }
}

class Target {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.r = Math.sqrt(x**2 + y**2);
    this.phi = Math.atan2(y, x);
    this.speed = speed;
  }
  move() {
    this.phi += this.speed;
    this.x = this.r * Math.cos(this.phi);
    this.y = this.r * Math.sin(this.phi);
  }
}

let product;
let target;
// init(9, 6); // too slow
// init(3, 6); // ideal
function init(target_speed, product_speed) {
  target =  new Target(0, -75, target_speed / 180 * Math.PI);
  // fixed_target =  new Target(0, -75, 0);
  product = new Product(target, product_speed);
  setTimeout(() => {draw()}, 500 );
}

function draw() {
  const canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    if (product.step == 0) {
      ctx.clearRect(0, 0, 150, 150);
      ctx.translate(75, 75);
    } else {
      ctx.beginPath();
      ctx.moveTo(product.last.x, product.last.y);
      ctx.lineTo(product.position.x, product.position.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(target.x, target.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'green';
      ctx.fill();       
    }
    target.move();
    product.move();
    
    if (product.step < 30 && 1<(Math.abs(product.position.x - target.x) + Math.abs(product.position.y - target.y)) ) {
      setTimeout(() => {draw()}, 200 );
    }
  }
}