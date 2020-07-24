document.addEventListener('DOMContentLoaded', () => {
	const squares = document.querySelectorAll('.grid div');
	const scoreToDisplay = document.querySelector('span');
	const startBtn = document.querySelector('.start');

	const widthOfWholeSquare = 10; // since there are 10 squares on each coloumn and row
	let currentIndex = 0; // first div in our grid
	let appleIndex = 0; // first div in our grid
	let currentSnake = [ 2, 1, 0 ]; // in grid, 2 is the Head of our Snake, 0 is being the Tail and 1 is being Body for now
	let direction = 1; // the Snake should always go 1 div ahead according to the given direction of keyboard by the player
	let score = 0;
	let speed = 0.9;
	let intervalTime = 0;
	let interval = 0;

	// Start or Restart the game, basically resetting the game
	function startGame () {
		currentSnake.forEach((item) => squares[item].classList.remove('snake'));
		squares[appleIndex].classList.remove('apple');
		clearInterval(interval);
		score = 0;
		scoreToDisplay.textContent = score;
		generateAppleRandomly();
		direction = 1;
		intervalTime = 1000;
		currentIndex = 0;
		currentSnake = [ 2, 1, 0 ];
		currentSnake.forEach((item) => squares[item].classList.add('snake'));
		interval = setInterval(moveOutcomes, intervalTime);
	}

	// a funtion that deals with All outcomes
	function moveOutcomes () {
		// deals with snake hitting border and snake hitting itself. "currentSnake[0]" is the head position
		if (
			(currentSnake[0] + widthOfWholeSquare >= widthOfWholeSquare * widthOfWholeSquare &&
				direction === widthOfWholeSquare) || // if snake hits bottom
			(currentSnake[0] % widthOfWholeSquare === widthOfWholeSquare - 1 && direction === 1) || // if snake hits right wall
			(currentSnake[0] % widthOfWholeSquare === 0 && direction === -1) || // if snake hits left wall
			(currentSnake[0] - widthOfWholeSquare < 0 && direction === -widthOfWholeSquare) || // if snake hits the top
			squares[currentSnake[0] + direction].classList.contains('snake') // if snake goes into itself
		) {
			alert('Game Over!');
			return clearInterval(interval); // it'll clear the interval if any of the above happen
		}

		const tail = currentSnake.pop(); // removes last item from the array and shows it
		squares[tail].classList.remove('snake'); // removes class of snake from Tail
		currentSnake.unshift(currentSnake[0] + direction); // gives a direction to head of currentSnake array

		// deals with snake getting apple, when the head of the currentSnake gets into a square that contains a className 'apple'
		if (squares[currentSnake[0]].classList.contains('apple')) {
			squares[currentSnake[0]].classList.remove('apple');
			// squares[currentSnake[0]].classList.add('snake');
			squares[tail].classList.add('snake'); // to grow the snake longer
			currentSnake.push(tail);
			generateAppleRandomly();
			score++;
			scoreToDisplay.textContent = score;
			clearInterval(interval);
			intervalTime = intervalTime * speed;
			interval = setInterval(moveOutcomes, intervalTime);
		}
		// re-add the className of 'snake' at the end of moveOutcomes function
		squares[currentSnake[0]].classList.add('snake');
	}

	// generate new apple (once apple is eaten)
	function generateAppleRandomly () {
		do {
			appleIndex = Math.floor(Math.random() * squares.length);
		} while (squares[appleIndex].classList.contains('snake'));
		squares[appleIndex].classList.add('apple');
	}

	// create a function to assign keyCodes to make the snake move across the board using keycode
	function control (event) {
		squares[currentIndex].classList.remove('snake'); // make sure to remove all class list of '.snake' between each move

		if (event.keyCode === 39) {
			direction = 1; // arrow RIGHT
		} else if (event.keyCode === 40) {
			direction = +widthOfWholeSquare; // for arrow DOWN key, the snake head will instantly appear 10 divs ahead from where you're now
		} else if (event.keyCode === 37) {
			direction = -1; // for LEFT, the snake will go one div left
		} else if (event.keyCode === 38) {
			direction = -widthOfWholeSquare; // for UP, the snake will go 10 divs back, to appear up
		}
	}
	document.addEventListener('keydown', control);
	startBtn.addEventListener('click', startGame);
});
