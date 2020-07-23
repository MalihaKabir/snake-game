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

	// Start or Restart the game
	function startGame () {
		currentSnake.forEach((item) => squares[item].classList.remove('snake'));
		squares[appleIndex].classList.remove('apple');
		clearInterval(interval);
		score = 0;
		scoreToDisplay.innerHTML = score;
		// generateRandomApple()
		direction = 1;
		intervalTime = 1000;
		currentIndex = 0;
		currentSnake = [ 2, 1, 0 ];
		currentSnake.forEach((item) => squares[item].classList.add('snake'));
		interval = setInterval(moveOutcomes, intervalTime);
	}

	// a funtion that deals with All outcomes

	// create a function to assign keyCodes to make the snake move across the board using keycode
	function control (event) {
		squares[currentIndex].classList.remove('snake'); // make sure to remove all class list of '.snake' between each move

		if (event.keyCode === 39) {
			direction = 1; // arrow RIGHT
		} else if (event.keyCode === 40) {
			direction = +widthOfWholeSquare; // for arrow DOWN key, the snake head will instantly appear 10 divs ahead from where you're now
		} else if (event.keyCode === 37) {
			direction -= 1; // for LEFT, the snake will go one div left
		} else if (event.keyCode === 38) {
			direction = -widthOfWholeSquare; // for UP, the snake will go 10 divs back, to appear up
		}
	}
	document.addEventListener('keydown', control);
});
