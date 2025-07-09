export class Bird {
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: number;
  rotation: number;
  initialY: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.initialY = y;
    this.width = 40;
    this.height = 30;
    this.velocity = 0;
    this.rotation = 0;
  }
  
  jump() {
    this.velocity = -8;
  }
  
  update(deltaTime: number) {
    // Update rotation based on velocity
    this.rotation = Math.max(-0.5, Math.min(0.5, this.velocity * 0.1));
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotation);
    
    // Draw bird body
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.ellipse(0, 0, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw bird wing
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.ellipse(-5, 0, this.width / 4, this.height / 3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw bird eye
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(8, -5, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw bird beak
    ctx.fillStyle = '#FF8C00';
    ctx.beginPath();
    ctx.moveTo(this.width / 2 - 5, 0);
    ctx.lineTo(this.width / 2 + 5, 0);
    ctx.lineTo(this.width / 2, 8);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
  }
  
  reset() {
    this.y = this.initialY;
    this.velocity = 0;
    this.rotation = 0;
  }
}

export class Pipe {
  x: number;
  width: number;
  gapHeight: number;
  gapY: number;
  canvasHeight: number;
  scored: boolean;
  
  constructor(x: number, canvasHeight: number) {
    this.x = x;
    this.width = 60;
    this.gapHeight = 150;
    this.canvasHeight = canvasHeight;
    this.gapY = Math.random() * (canvasHeight - this.gapHeight - 200) + 100;
    this.scored = false;
  }
  
  update(deltaTime: number, speed: number) {
    this.x -= speed * (deltaTime / 16.67); // Normalize to 60fps
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createLinearGradient(this.x, 0, this.x + this.width, 0);
    gradient.addColorStop(0, '#4CAF50');
    gradient.addColorStop(0.5, '#66BB6A');
    gradient.addColorStop(1, '#4CAF50');
    
    ctx.fillStyle = gradient;
    
    // Draw top pipe
    ctx.fillRect(this.x, 0, this.width, this.gapY);
    
    // Draw bottom pipe
    ctx.fillRect(this.x, this.gapY + this.gapHeight, this.width, this.canvasHeight - this.gapY - this.gapHeight);
    
    // Draw pipe caps
    ctx.fillStyle = '#2E7D32';
    ctx.fillRect(this.x - 5, this.gapY - 30, this.width + 10, 30);
    ctx.fillRect(this.x - 5, this.gapY + this.gapHeight, this.width + 10, 30);
  }
  
  getTopRect() {
    return {
      x: this.x,
      y: 0,
      width: this.width,
      height: this.gapY
    };
  }
  
  getBottomRect() {
    return {
      x: this.x,
      y: this.gapY + this.gapHeight,
      width: this.width,
      height: this.canvasHeight - this.gapY - this.gapHeight
    };
  }
}

export class Background {
  static draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
    // Sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98D8E8');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Ground
    ctx.fillStyle = '#DEB887';
    ctx.fillRect(0, height - 60, width, 60);
    
    // Grass on ground
    ctx.fillStyle = '#9ACD32';
    ctx.fillRect(0, height - 60, width, 20);
  }
}
