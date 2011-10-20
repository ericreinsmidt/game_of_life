/*

author @ eric@reinsmidt.com
last edit @ 2011.09.11

*/
var paper;
//var cube_array;
var cubes;
var timer;
var buttons;
var generations;
var gens;
var changeToBlack = new Array();
var changeToWhite = new Array();

function loadGrid(n) {
	if (n === 1) {
		var setSeed = new Array (360,362,364,389,393,418,422,447,451,476,478,480);
	}
	else if (n === 2) {
		var setSeed = new Array (304, 333, 362, 391, 420, 449, 478, 507, 536, 565);
	}
	else if (n === 3) {
		var setSeed = new Array (331, 332, 334, 335, 360, 361, 363, 364, 390, 392, 417, 419, 421, 423, 446, 448, 450, 452, 475, 476, 480, 481);
	}
	else if (n === 4) {
		var setSeed = new Array (1, 31, 58, 59, 60, 385, 391, 397, 414, 419, 421, 426, 443, 449, 455, 780, 781, 782, 809, 839);
	}
	else if (n === 5) {
		var setSeed = new Array (0, 28, 30, 56, 60, 84, 90, 112, 120, 140, 150, 168, 180, 196, 210, 224, 240, 252, 270, 280, 300, 308, 330, 336, 360, 364, 390, 392, 420, 448, 450, 476, 480, 504, 510, 532, 540, 560, 570, 588, 600, 616, 630, 644, 660, 672, 690, 700, 720, 728, 750, 756, 780, 784, 810, 812, 840);
	}
	else if (n === 6) {
		var setSeed = new Array ();
		for (r=0;r<840;r++) {
			if (Math.random() > 0.5) {
				setSeed.push(r);
			}
		}
	} else {
		var setSeed = new Array ();
	}
	
	generations = 0;
	paper = Raphael("life_content", 753, 753); // canvas... params: div id, width, height
	/*cube_array = new Array(
		new Array(), // row
		new Array()  // col
	);*/
	var k = 0;
	var x = 0; // starting x-coord declaration
	var y = 0; // starting y-coord declaration
	var width = 25; // non-changed rect width declaration
	var height = 25; // non-changed rect height declaration
	var round = 5; // non-changed rect corner round declaration
	cubes = paper.set();
	
	for (var i = 0; i < 29; ++i) { // 28 rows
		x = 0; // reset x-coord for each row
		for (var j = 0; j < 29; ++j) { // 28 cols
			
			cubes.push(
				paper.rect(x, y, width, height, round)
			);

			cubes[k].mousedown(function() {
				document.getElementById('the_click').play();
				if (Raphael.getRGB(this.attr("fill")).hex === "#c0c0c0")
					this.attr({fill: "#000000"});
				else
					this.attr({fill: "#c0c0c0"});
			});
			
			k++;
			x += 26; // extra px for spacing
		}
		y += 26; // extra px for spacing
	}
	cubes.attr({fill: "#c0c0c0", stroke: "#00f", opacity: 0.8});
	for (m=0;m<setSeed.length;m++) {
		cubes[setSeed[m]].attr({fill: "#000000"});
	}
}

function startLife(flag, stop) {
	generations++;
	// flag 0 = fast generations
	// flag 1 = slow generations
	// stop 0 = startLife called from button
	// stop 1 = startLife called recursively
	var neighbors = 0;
	changeToBlack.length = 0;
	changeToWhite.length = 0;
	//var blacks = new Array();
	//alert(cubes.length);
	for (var i = 0; i < cubes.length; i++) {
		/*if (Raphael.getRGB(cubes[i].attr("fill")).hex === "#000000")
			blacks.push(i);*/
		/*if ((i+1)%29 === 0) {
			//alert(i); (i)%29 != 0 &&
			cubes[i].attr({fill: "#ff0000"});
		}*/
		// count alive neighbors
		if (i >= 30 && (i)%29 != 0 && Raphael.getRGB(cubes[i-30].attr("fill")).hex === "#000000") neighbors++; // left top
		if (i >= 29 && Raphael.getRGB(cubes[i-29].attr("fill")).hex === "#000000") neighbors++; // middle top
		if (i >= 28 && (i+1)%29 != 0 && Raphael.getRGB(cubes[i-28].attr("fill")).hex === "#000000") neighbors++; // right top
		if (i >= 1 && (i)%29 != 0 && Raphael.getRGB(cubes[i-1].attr("fill")).hex === "#000000") neighbors++; // left middle
		if (i <= 839 && (i+1)%29 != 0 && Raphael.getRGB(cubes[i+1].attr("fill")).hex === "#000000") neighbors++; // right middle
		if (i <= 812 && (i)%29 != 0 && Raphael.getRGB(cubes[i+28].attr("fill")).hex === "#000000") neighbors++; // left bottom
		if (i <= 811 && Raphael.getRGB(cubes[i+29].attr("fill")).hex === "#000000") neighbors++; // middle bottom
		if (i <= 810 && (i+1)%29 != 0 && Raphael.getRGB(cubes[i+30].attr("fill")).hex === "#000000") neighbors++; // right bottom
		
		// Rules 1-3: Condensed to single if
		if ((Raphael.getRGB(cubes[i].attr("fill")).hex === "#000000" && neighbors < 2) || (Raphael.getRGB(cubes[i].attr("fill")).hex === "#000000" && neighbors > 3)) {
			changeToWhite.push(i);
		}
		// Rule 4: If dead cell has 3 live neighbors dead cell is born
		else if (Raphael.getRGB(cubes[i].attr("fill")).hex === "#c0c0c0" && neighbors === 3) {
			changeToBlack.push(i);
		}
		neighbors = 0;
	}
	
	/*blackstring = '';
	for (f=0;f<blacks.length;f++) {
		blackstring += blacks[f];
		blackstring += ', ';
	}
	document.getElementById('temp').innerHTML += blackstring;
	document.getElementById('temp').innerHTML += '<br /><br /><br /><br /><br />';
	
	//alert(blackstring);*/

	// write alive cells
	for (j=0;j<changeToBlack.length;j++) {
		cubes[changeToBlack[j]].attr({fill: "#000000"});
	}

	// write dead cells
	for (k=0;k<changeToWhite.length;k++) {
		cubes[changeToWhite[k]].attr({fill: "#c0c0c0"});
	}

	// write number of generations
	gens = document.getElementById('gens');
	gens.textContent = 'generations = ' + generations;

	/*if (flag === 0) {*/
		timer = setTimeout("startLife(0, 1);", 75);
	/*}*/

	/*if (flag === 1) {
		timer = setTimeout("startLife(1, 1);", 150);
	}*/

	if (stop === 0) {
		writeStop();
	}
}

function stopLife() {
	// clearTimeout to stop the setTimeout event.
	clearTimeout(timer);

	// write out button paragraph tag
	buttons = document.getElementById('buttons');
	buttons.innerHTML = '<input type="button" value="Start" onclick="startLife(0, 0);" />';
}

function clearLife() {
	
	// clear all black squares
	for (var i = 0; i < cubes.length; i++) {
		if (Raphael.getRGB(cubes[i].attr("fill")).hex === "#000000") {
			cubes[i].attr({fill: "#c0c0c0"});
		}
	}

	// clearTimeout to stop the setTimeout event.
	clearTimeout(timer);

	// reset generations
	generations = 0;
	gens = document.getElementById('gens');
	gens.textContent = 'generations = ' + generations;

	// write out button paragraph tag
	buttons = document.getElementById('buttons');
	buttons.innerHTML = '<input type="button" value="Start" onclick="startLife(0, 0);" />';
}

function writeStop() {
	buttons = document.getElementById('buttons');
	buttons.innerHTML = '<input type="button" value="Stop" onclick="stopLife();" />';
}