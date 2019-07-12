console.log("Blackjack Started");


class Deck {
	constructor() {
		this.deck = []
	}
	createDeck() {
		const suits = ["Diamonds", "Hearts", "Clubs", "Spades"];
		const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
		const names = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
		//console.log(this.deck)
		for (let i = 0; i < suits.length; i++) {
			for (let j = 0; j < values.length; j++) {
				// 52 card objects with 3 keys (suit, value, and name)
				// and need to make name and suits line up so img location can
				// be added
				this.deck.push({ suit: suits[i], value: values[j], name: names[j], url: names[j] + suits[i][0] + '.png' });  
			}
		}
	}
	clearDeck() {
		// set deck to an empty deck
		this.deck = [];
	}
	dealCard() {
		const cardIndex = Math.floor(Math.random() * this.deck.length);
		const [removedCard] = this.deck.splice(cardIndex, 1);
		return removedCard;
	}
}

class Player {
	constructor() {
		this.hand = [];
		this.value = 0;
		this.wins = 0;
	}
	resetPlayer() {
		this.hand = [];
		this.value = 0;
		this.wins = 0;
	}
	getCard(card) {
		// move random card from initalized Deck class and
		// push it into Player or Dealer hand
		this.hand.push(card);
		this.calculateValueOfHand();
	}
	calculateValueOfHand() {
		let aceExists = false;
		let sum = 0;
		for (let i = 0; i < this.hand.length; i++) {
			sum += this.hand[i].value;
			if (this.hand[i].name === "Ace") {
				// if true flip boole
				aceExists = true;
			}
		}
		if (aceExists && sum < 12) {
				sum += 10;
		}
		this.value = sum;
		
		return this.value
	}
	addWin() {
		this.wins += 1;
	}
}


class Dealer extends Player {
	// dealer inherits two properties and three methods from
	// Player class

}


class Game {
	constructor() {
		this.firstHand = true;
		this.dealerCardFlipped = false;
		this.player = new Player();
		this.dealer = new Dealer();
		this.deck = new Deck();
	}

	deal() {
		// partially controls the functionality of the deal cards button


		//start play
		this.deck.createDeck();
		this.player.getCard(this.deck.dealCard());
		$('#player-hand').append(`<img class="card" src="./images/${this.player.hand[this.player.hand.length - 1].url}">`)
		this.player.getCard(this.deck.dealCard());
		$('#player-hand').append(`<img class="card" src="./images/${this.player.hand[this.player.hand.length - 1].url}">`)
		this.dealer.getCard(this.deck.dealCard());
		$('#computer-hand').append(`<img id="first-dealer-card" class="card" src="./images/back.png">`)
		this.dealer.getCard(this.deck.dealCard());
		$('#computer-hand').append(`<img class="card" src="./images/${this.dealer.hand[this.dealer.hand.length - 1].url}">`)
		if (this.firstHand) {
			this.initialCheckHands();
		} else {
			this.checkHands();
		}
		this.firstHand = false;
	}

	hit() {
		//give player an additional card
		this.player.getCard(this.deck.dealCard());
		$('#player-hand').append(`<img class="card" src="./images/${this.player.hand[this.player.hand.length - 1].url}">`)
		console.log('player hand value', this.player.value);
		if (this.player.value > 21) {
			console.log("player loses");
			this.clearTableOnLoss();

		} else if (this.player.value === 21) {
			console.log("player wins");
			this.clearTableOnWin();
		}
	}
	dealerHits() {
		while (this.dealer.value < 17) {
			this.dealer.getCard(this.deck.dealCard());
			$('#computer-hand').append(`<img class="card" src="./images/${this.player.hand[this.player.hand.length - 1].url}">`)
		}
		if (this.dealer.value > 21) {
			console.log("Dealer Loses");
			if (this.dealerCardFlipped === false) {
				flipDealersFirstCard();
			}
			setTimeout(this.clearTableOnWin, 1500);
		} else if (this.dealer.value === this.player.value) {
			console.log("Tie, but dealer wins");
			if (this.dealerCardFlipped === false) {
				flipDealersFirstCard();
			}
			setTimeout(this.clearTableOnLoss, 1500);
		} else if (this.dealer.value > this.player.value) {
			console.log("Dealer Wins");
			if (this.dealerCardFlipped === false) {
				flipDealersFirstCard();
			}
			setTimeout(this.clearTableOnLoss, 1500);
		} else if (this.dealer.value < this.player.value) {
			console.log("Player Wins")
			if (this.dealerCardFlipped === false) {
				flipDealersFirstCard();
			}
			setTimeout(this.clearTableOnWin, 1500);
		}
	}
	stand() {
		flipDealersFirstCard();
		this.dealerCardFlipped = true;
		this.dealerHits();
	}
	clearTableOnTie() {
		game = new Game();
		this.deal();
	}
	clearTableOnLoss() {
		$('#lose-title').text(`Sorry, You lost $${betAmount}!`);
		moveToLosePage();

	}
	clearTableOnWin() {
		$('#win-title').text(`Congrats! You won $${betAmount}!`);
		moveToWinPage();
	}
	initialCheckHands() {
		if (this.player.value === 21 && this.dealer.value === 21) {
			console.log("Tie! Both have Blackjacks! Take chips back");
			this.clearTableOnTie();
		} else if (this.dealer.value === 21) {
			console.log("Dealer WINS After First Deal");
			this.clearTableOnLoss();
			
		} else if (this.player.value === 21) {
			console.log("PLAYER WON After First Deal");
			this.clearTableOnWin();
		}
	}
}

// New game initialized
let game = new Game();

let betAmount = 0;

// Page IDs stored in an array
const pagesArray = ["#home-page", "#bets-page", 
"#hit-or-stand-page", "#won-page", "#lose-page"];

// Function for turning dealer's first face-up
function flipDealersFirstCard() {
	console.log("flipDealersFirstCard Working!!!!!")
	$('#first-dealer-card').replaceWith(`<img class="card" src="./images/${game.dealer.hand[0].url}">`)
}

// Make specific page not show in browser
function removePage(pageIndex) {
	$(pagesArray[pageIndex]).css("display", "none");
}

// Make specific page show in browser
function createPage(pageIndex) {
	$(pagesArray[pageIndex]).css("display", "block");
}

// Take player to win page
function moveToWinPage() {
	removePage(2);
	createPage(3);
}

// Take player to lose page
function moveToLosePage() {
	removePage(2);
	createPage(4);
}

// EVENT LISTENERS

$('#play-blackjack').on('click', () => {
	removePage(0);
	createPage(1);
});

$('#deal').on('click', () => {
	removePage(1);
	createPage(2);
	game.deal();
	console.log(game.deck);
	game.player.hand.forEach(c => console.log(c))
	console.log("player:",game.player.calculateValueOfHand())
	game.dealer.hand.forEach(c => console.log(c))
	console.log("dealer:",game.dealer.calculateValueOfHand())
});

$('#hit').on('click', () => {
	game.hit();
	console.log(game.player.hand);
	game.player.hand.forEach(c => console.log(c))
	console.log("player:",game.player.calculateValueOfHand())
	game.dealer.hand.forEach(c => console.log(c))
	console.log("dealer:",game.dealer.calculateValueOfHand())
});

$('#stand').on('click', () => { 
	console.log('stand');
	game.stand();
	game.player.hand.forEach(c => console.log(c))
	console.log("player:",game.player.calculateValueOfHand())
	game.dealer.hand.forEach(c => console.log(c))
	console.log("dealer:",game.dealer.calculateValueOfHand())
});

$('.play-blackjack').on('click', () => {
	removePage(3);
	removePage(4);
	document.getElementById('computer-hand').innerHTML=""
	document.getElementById('player-hand').innerHTML=""
	betAmount = 0;
	$('.bet-amount').text(betAmount);
	game = new Game();
	createPage(1);
});

$('#100').on('click', () => {
	betAmount += 100;
	$('.bet-amount').text(betAmount);
});

$('#500').on('click', () => {
	betAmount += 500;
	$('.bet-amount').text(betAmount);
});

$('#1000').on('click', () => {
	betAmount += 1000;
	$('.bet-amount').text(betAmount);
});
