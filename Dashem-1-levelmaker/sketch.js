let gridsize = 8;
let scl;
let map = [];
let colors;
const tilemapWidth = 65536;
let tilemapdata = [];
let cColor = 0;

const alphabet = [
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'a',
	'b',
	'c',
	'd',
	'e',
	'f'
]

function setup(){
	createCanvas(500, 640);
	scl = width/gridsize;
	colors = [220, 51, 127, color(240, 255, 90)];
	for(let i = 0; i < gridsize; i++){
		map[i] = [];
		for(let j = 0; j < gridsize; j++){
			map[i][j] = (i == 0 || i == gridsize-1 || j == 0 || j == gridsize-1)? 1 : 0
		}
	}
}

function draw(){
	background(6, 22, 46);

	for(let i = 0; i < gridsize; i++){
		for(let j = 0; j < gridsize; j++){
			fill(colors[map[i][j]]);
			rect(i*scl, j*scl, scl, scl);
		}
	}

	for(let i = 0; i < 4; i++){
		fill(colors[i]);
		ellipse(i * scl*2+scl, 560, scl*1.5, scl*1.5);
	}

	noStroke();
	fill(colors[cColor]);
	ellipse(mouseX, mouseY, 5, 5);
	stroke(0);
	strokeWeight(1);
}

function mousePressed(){
	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < width){
		let x = mouseX / scl;
		let y = mouseY / scl;
		let i = floor(x);
		let j = floor(y);

		map[i][j] = cColor;
	}else{
		for(let i = 0; i < 4; i++){
			let x = abs(mouseX-(i * scl*2+scl));
			let y = abs(mouseY-560);
			let d = createVector(x, y).mag();

			if(d < scl*1.5){
				console.log("colour picked");
				cColor = i;
			}
		}
	}
}

function keyTyped(){
	if(key == ' '){
		let string = '';
		for(let i = 0; i < 6; i++){
			let s = '';
			for(let j = 0; j < 6; j+=2){
				let val = ((map[i+1][j+1]&3)<<2) + (map[i+1][j+1+1]&3);
				// console.log(val);
				map[i+1][j+1+1] = val&3;
				map[i+1][j+1]   = (val&12)>>2;
				s += alphabet[val]
			}
			string += s;
		}
		alert(string);
	}
}
