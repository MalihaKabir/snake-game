document.addEventListener('DOMContentLoaded', () => {
	const startbtn = document.querySelector('.start');
	const scoreToDisplay = document.querySelector('.score');
	const smallGrids = document.querySelectorAll('.grid div');
	let score = 0;
	let width = 10;
	let appleIndex = 0;
	let currentSnake = [ 2, 1, 0 ];
	let direction = 1;
	let speed = 0.9;
	let intervalTime = 0;
	let interval = 0;

	function startFunction () {
		currentSnake.forEach((item) => smallGrids[item].classList.remove('snake'));
		clearInterval(interval);
		currentSnake = [ 2, 1, 0 ];
		score = 0;
		scoreToDisplay.textContent = score;
		generateAppleIndex();
		direction = 1;
		intervalTime = 1000;
		interval = setInterval(everyMoveOfSnake, intervalTime);
		currentSnake.forEach((item) => smallGrids[item].classList.add('snake'));
	}

	function everyMoveOfSnake () {
		if (
			(currentSnake[0] - width < 0 && direction === -width) ||
			(currentSnake[0] % width === width - 1 && direction === 1) ||
			(currentSnake[0] + width >= width * width && direction === width) ||
			(currentSnake[0] % width === 0 && direction === -1) ||
			smallGrids[currentSnake[0] + direction].classList.contains('snake')
		) {
			alert('Game Over!');
			return clearInterval(interval);
		}
		const tail = currentSnake.pop();
		smallGrids[tail].classList.remove('snake');
		currentSnake.unshift(currentSnake[0] + direction);

		if (smallGrids[currentSnake[0]].classList.contains('apple')) {
			smallGrids[currentSnake[0]].classList.remove('apple');
			smallGrids[tail].classList.add('snake');
			currentSnake.push(tail);
			score += width;
			scoreToDisplay.textContent = score;
			clearInterval(interval);
			generateAppleIndex();
			intervalTime *= speed;
			interval = setInterval(everyMoveOfSnake, intervalTime);
		}
		smallGrids[currentSnake[0]].classList.add('snake');
	}

	function giveDirection (event) {
		switch (event.keyCode) {
			case 37:
				direction = -1;
				break;
			case 38:
				direction = -width;
				break;
			case 39:
				direction = 1;
				break;
			case 40:
				direction = width;
				break;
			default:
				direction = 1;
				break;
		}
	}

	function generateAppleIndex () {
		smallGrids.forEach((smallGrid) => smallGrid.classList.remove('apple'));
		do {
			appleIndex = Math.floor(Math.random() * smallGrids.length);
		} while (currentSnake.forEach((item) => smallGrids[item].classList.contains('apple')));
		smallGrids[appleIndex].classList.add('apple');
	}

	document.addEventListener('keyup', giveDirection);
	startbtn.addEventListener('click', startFunction);
});
