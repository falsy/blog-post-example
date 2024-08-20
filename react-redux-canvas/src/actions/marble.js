export function printMarble(canvas) {
	const ctx = canvas.getContext('2d');
	const x = 100;
	const y = 240;
	const r = 10;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.fillStyle = 'blue';
  ctx.fill();
}

export function animationMarble(canvas) {
	const ctx = canvas.getContext('2d');
	const x = 100;
	const y = 240;
	const r = 10;
	let moveSize = 0;

	const animate = setInterval(() => {
 		ctx.clearRect(x - r + moveSize, y - r, 20, 20);
 		moveSize += 5;
 		const moveX = x +  moveSize;
	  ctx.beginPath();
	  ctx.arc(moveX, y, r, 0, Math.PI * 2, true);
	  ctx.fillStyle = 'blue';
	  ctx.fill();
	  if(moveX >= 400) {
	  	clearInterval(animate);
	  	ctx.clearRect(x - r + moveSize, y - r, 20, 20);
	  }
	}, 10);
}