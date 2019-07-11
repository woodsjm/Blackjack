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
		// handle aces
		this.calculateValueOfHand();
	}
	calculateValueOfHand() {
		let aceExists = false;
		let sum = 0;
		console.log(this.hand)
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
		// console.log(this.value);
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
		$('#computer-hand').append(`<img class="card" src="./images/${this.player.hand[this.player.hand.length - 1].url}">`)
		this.checkHandsAtStart();
	}

	hit() {
		//give player an additional card
		this.player.getCard(this.deck.dealCard());
		$('#player-hand').append(`<img class="card" src="./images/${this.player.hand[this.player.hand.length - 1].url}">`)
		console.log('player hand value', this.player.value);
		if (this.player.value > 21) {
			console.log("player LOST");
			this.dealer.addWin();
			this.clearTable();
		} else if (this.player.value === 21) {
			this.checkHands();
		} 
	}
	dealerHits() {
		while (this.dealer.value < 21 && this.dealer.value < this.player.value) {
			this.dealer.getCard(this.deck.dealCard());
			$('#player-hand').append(`<img class="card" src="./images/${this.player.hand[this.player.hand.length - 1].url}">`)
		}
		this.checkHands();
	}
	stand() {
		if (this.player.value <= this.dealer.value) {
			this.checkHands();
		}
		if (this.dealer.value < 17) {
			while (this.dealer.value < 17) {
				this.dealer.getCard(this.deck.dealCard());
				console.log('dealer hand value after card dealt: ', this.dealer.value);
			}
		}
		if (this.dealer.value > 16 && this.dealer.value < this.player.value) {
			this.checkHands();
		} else if (this.dealer.value > 16 && this.dealer.value > this.player.value) {
			this.checkHands();
		}
	}
	checkHands() {
		if (this.dealer.value > 21) {
			console.log('player WON');
			this.player.addWin();
			this.clearTable();
		} else if (this.player.value === 21 && this.dealer.value !== 21) {
			console.log('player WON');
			this.player.addWin();
			this.clearTable();
		} else if (this.player.value > this.dealer.value) {
			//POSSIBLE BUG--- this.dealerHits();
			console.log('player WON');
			this.player.addWin();
			this.clearTable();
		} else if (this.dealer.value > this.player.value) {
			console.log('dealer WON');
			this.dealer.addWin();
			this.clearTable();
		} else if (this.player.value === this.dealer.value) {
			console.log('Tie, but dealer still WINS!');
			this.dealer.addWin();
			this.clearTable();
		}
	}
	checkHandsAtStart() {
		if (this.player.value === 21 && this.dealer.value === 21) {
			console.log("Tie! Both have Blackjacks! Take chips back");
			this.clearTable(); 
		} else if (this.dealer.value === 21) {
			console.log("Dealer WINS After First Deal");
			this.dealer.addWin();
			this.clearTable();
		} else if (this.player.value === 21) {
			console.log("PLAYER WON After First Deal");
			this.player.addWin();
			this.clearTable();
		}
	}
	clearTable() {
		flipDealersFirstCard();
		//this.player.resetPlayer();
		//this.dealer.resetPlayer();
		//this.deck.clearDeck();
	}
}

// New game initialized
const game = new Game();

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
	createPage(3);
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

