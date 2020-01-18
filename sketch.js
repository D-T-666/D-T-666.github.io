let total = 150;

let particles = [];

let last = false;

function get_color(){
	let colors = [color(0, 78, 181), color(235, 255, 60), color(235, 90, 255)];
	let rand = random(1);
	if(rand < 0.9){
		return colors[0];
	}else if(rand < 1){
		return colors[1];
	}else{
		return colors[2];
	}
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(0);
	blendMode(ADD);
	let WplusH = width+height;
	let hFraq = (width/WplusH)*0.5;
	let wFraq = (height/WplusH)*0.5;
	for(let i = 0; i < total*hFraq; i++){
		particles.push(new Particle(
			0,
			map(i, 0, total*hFraq, 0, height),
			1,
			0,
			get_color(),
			127));
	}
	for(let i = 0; i < total*wFraq; i++){
		particles.push(new Particle(
			map(i, 0, total*wFraq, 0, width),
			0,
			0,
			1,
			get_color(),
			127));
	}
	for(let i = 0; i < total*hFraq; i++){
		particles.push(new Particle(
			width,
			map(i, 0, total*hFraq, 0, height),
			-1,
			0,
			get_color(),
			127));
	}
	 for(let i = 0; i < total*wFraq; i++){
	 	particles.push(new Particle(
	 		map(i, 0, total*wFraq, 0, width),
	 		height,
	 		0,
	 		-1,
	 		get_color(),
	 		127));
	 }
	for(let i = 0; i < total/2; i++){
		particles.push(new Particle(
			map(i, 0, total/2, -width*0.2, width*1.2),
			height,
			0,
			-1,
			color(60, 10, 5),
			15, 
			400,
			0.0015));
	}
	for(let i = 0; i < total/2; i++){
		particles.push(new Particle(
			map(i, 0, total/2, -width*0.2, width*1.2),
			0,
			0,
			1,
			color(60, 10, 5),
			15, 
			200,
			0.002));
	}
	for(let x = 0; x < width; x += width/10){
		for(let y = 0; y < height; y += height/25){
			if(random(1) < 0.3){
				particles.push(new Particle(
					x,
					y,
					0,
					1,
					color(60, 10, 5),
					10, 
					200,
					0.005));
			}
		}
	}
}

function draw(){
	for(let j = 0; j < 2; j++){
		for(let i = particles.length-1; i >= 0; i--){
			let p = particles[i];
			if(p.update(particles)){
				particles.splice(i, 1);
			}
			p.show();
		}
	}
}
