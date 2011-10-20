<?php
	
?>

<!DOCTYPE HTML>

<html>

<head>
	<title>Game of Life</title>
	<link rel="stylesheet" type="text/css" href="css/main.css" />
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/popup.js"></script>
	<script type="text/javascript" src="js/raphael-min.js"></script>
	<script type="text/javascript" src="js/life.js"></script>
</head>

<body onload="loadGrid();">

<audio preload="auto" id="the_click">
	<source src="audio/click.ogg" />
	<source src="audio/click.mp3" />
</audio>

<div id='wrapper'>
	
	<div id='header'>
		<h1>Game of Life</h1>
	</div>
	
	<div id='content'>

		<div id='life_content'></div>

		<div id="life_footer">

			<p id="gens">
				<!--current generation written here using JS-->
				generations = 0
			</p>
			<p id="buttons">
				<!--buttons written here using JS-->
				<input type="button" value="Start" onclick="startLife(0, 0), writeStop();" />
			</p>

			<p id="seeds">
				<input type="button" value="Exploder" onclick="clearLife(); paper.remove(); loadGrid(1);" />&nbsp;
				<input type="button" value="10 Row" onclick="clearLife(); paper.remove(); loadGrid(2);" />&nbsp;
				<input type="button" value="Tumbler" onclick="clearLife(); paper.remove(); loadGrid(3);" />&nbsp;
				<input type="button" value="Gliders" onclick="clearLife(); paper.remove(); loadGrid(4);" />&nbsp;
				<input type="button" value="The Spot" onclick="clearLife(); paper.remove(); loadGrid(5);" />&nbsp;
				<input type="button" value="Random" onclick="clearLife(); paper.remove(); loadGrid(6);" />&nbsp;
				<input type="button" value="Clear" onclick="clearLife();" />
			</p>
			
			<div id="button"><input type="submit" value="Game of Life Help" /></div>

		</div>

		<div id="popupContact">
			<a id="popupContactClose" style="cursor: pointer; cursor: hand">x</a>
			<h1>Game of Life Help</h1>
			<p id="contactArea">
				<h3>Rules</h3>
				In this iteration of the Game of Life the universe is a non-infinite two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive or dead. Every cell interacts with its eight neighbors, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:<br /><br />
				+ Any live cell with fewer than two live neighbors dies, as if caused by under-population.<br />
				+ Any live cell with two or three live neighbours lives on to the next generation.<br />
				+ Any live cell with more than three live neighbours dies, as if by overcrowding.<br />
				+ Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.<br />
				<h3>Directions</h3>
				The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed, births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick (in other words, each generation is a pure function of the preceding one). The rules continue to be applied repeatedly to create further generations.<br /><br />
				+ Click on indiviual cells to make them live.<br />
				+ When you are done creating your seed click Start.<br />
				+ Click Stop to stop the ticks.<br />
				+ Click any of the predefined seeds to load the seed on the board.<br />
				+ Click Clear to remove all life from the board and start fresh.
			</p>
		</div>

		<div id="backgroundPopup"></div>

	</div>
	<div id="footer"></div>

</div>

<div id="bottom_space"></div>

</body>

</html>