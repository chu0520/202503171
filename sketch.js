let seaweeds = [];
let fishes = [];
let crabs = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('overlay'); // 將畫布添加到 overlay div 中
  background(0, 0, 0, 0); // 設置透明背景
  
  let numLines = 40;
  let colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF5', '#F5FF33', '#FF8C33', '#8C33FF'];
  
  for (let j = 0; j < numLines; j++) {
    let segments = 10;
    let segmentLength = random(40, 60);
    let x = (j / numLines) * width;
    let color = colors[j % colors.length];
    let amplitude = random(10, 20);
    
    seaweeds.push({ x, segments, segmentLength, color, amplitude });
  }

  // Add some fishes
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height / 2);
    let size = random(20, 40);
    let speed = random(1, 3);
    let color = colors[int(random(colors.length))];
    fishes.push({ x, y, size, speed, color });
  }

  // Add some crabs
  for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = height - random(50, 100);
    let size = random(30, 50);
    let color = colors[int(random(colors.length))];
    crabs.push({ x, y, size, color });
  }
}

function draw() {
  clear(); // 清除畫布，保持透明背景
  strokeWeight(50); // 設定線條粗細
  
  for (let seaweed of seaweeds) {
    let { x, segments, segmentLength, color, amplitude } = seaweed;
    let y = height;
    stroke(color + '80'); // 設定顏色為半透明
    
    for (let i = 0; i < segments; i++) {
      let nextX = x + sin(frameCount * 0.1 + i * 0.5) * amplitude;
      let nextY = y - segmentLength;
      line(x, y, nextX, nextY);
      x = nextX;
      y = nextY;
    }
  }

  // Draw fishes
  noStroke();
  for (let fish of fishes) {
    fill(fish.color + '80');
    fish.x += fish.speed;
    if (fish.x > width) fish.x = 0;
    ellipse(fish.x, fish.y, fish.size * 2, fish.size);
    triangle(fish.x - fish.size, fish.y, fish.x - fish.size * 1.5, fish.y - fish.size / 2, fish.x - fish.size * 1.5, fish.y + fish.size / 2);
  }

  // Draw crabs
  for (let crab of crabs) {
    fill(crab.color + '80');
    ellipse(crab.x, crab.y, crab.size, crab.size / 2);
    ellipse(crab.x - crab.size / 2, crab.y - crab.size / 4, crab.size / 4, crab.size / 4);
    ellipse(crab.x + crab.size / 2, crab.y - crab.size / 4, crab.size / 4, crab.size / 4);
    line(crab.x - crab.size / 2, crab.y, crab.x - crab.size, crab.y + crab.size / 2);
    line(crab.x + crab.size / 2, crab.y, crab.x + crab.size, crab.y + crab.size / 2);
  }
}