console.log("Blackjack Started");


class Deck {
	constructor() {
		this.deck = []
	}
	createDeck() {
		const suits = ["Diamonds", "Hearts", "Clubs", "Spades"];
		const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
		const names = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queens', 'King'];
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
		this.money = 10000;
	}
	resetPlayer() {
		this.hand = [];
		this.value = 0;
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
}


class Dealer extends Player {
	// dealer inherits two properties and three methods from
	// Player class

}

class Bet {
	constructor () {
		this.pot = 0;
		this.round = true;
	}
}



class Game {
	constructor() {
		this.player = new Player();
		this.dealer = new Dealer();
		this.deck = new Deck();
		this.bet = new Bet();
	}

	deal() {
		// partially controls the functionality of the deal cards button
		if (this.bet.round) {
			this.bet.round = false;
			//start play
			this.deck.createDeck();
			this.player.getCard(this.deck.dealCard());
			$('#player-hand').append(`<img class="card" src="./images/${this.player.hand[this.player.hand.length - 1].url}">`)
			this.player.getCard(this.deck.dealCard());
			$('#player-hand').append(`<img class="card" src="./images/${this.player.hand[this.player.hand.length - 1].url}">`)
			this.dealer.getCard(this.deck.dealCard());
			$('#computer-hand').append(`<img class="card" src="./images/back.png">`)
			this.dealer.getCard(this.deck.dealCard());
			$('#computer-hand').append(`<img class="card" src="./images/${this.player.hand[this.player.hand.length - 1].url}">`)
			this.checkHandsAtStart();
		}
	}

	hit() {
		//give player an additional card
		this.player.getCard(this.deck.dealCard());
		console.log('player hand value', this.player.value);
		if (this.player.value > 21) {
			console.log("player LOST");
			this.clearTable();
		} else if (this.player.value === 21) {
			this.checkHands();
		} 
	}
	dealerHits() {
		while (this.dealer.value < 21 && this.dealer.value < this.player.value) {
			this.dealer.getCard(this.deck.dealCard());
		}
		this.checkHands();
	}
	stand() {
		if (this.player.value === this.dealer.value) {
			this.checkHands();
		} else if (this.player.value < this.dealer.value) {
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
			this.clearTable();
		} else if (this.player.value === 21 && this.dealer.value !== 21) {
			console.log('player WON');
			this.clearTable();
		} else if (this.player.value > this.dealer.value) {
			this.dealerHits();
			console.log('player WON');
			this.clearTable();
		} else if (this.dealer.value > this.player.value) {
			console.log('dealer WINS');
			this.clearTable();
		} else if (this.player.value === this.dealer.value) {
			console.log('Tie, but dealer still WINS!');
			this.clearTable();
		}
	}
	checkHandsAtStart() {
		if (this.player.value === 21 && this.dealer.value === 21) {
			console.log("Tie! Both have Blackjacks! Take chips back");
			this.clearTable(); 
		} else if (this.dealer.value === 21) {
			console.log("Dealer WINS After First Deal");
			this.clearTable();
		} else if (this.player.value === 21) {
			console.log("PLAYER WON After First Deal");
			this.clearTable();
		}
	}
	clearTable() {
		this.player.resetPlayer();
		this.dealer.resetPlayer();
		this.deck.clearDeck();
		this.bet.round = true;
	}
}

// }

/* const game = {

	// computerHandValue: 0,
	// playerHandValue: 0,

	computer: null,
	player: null,

	createPlayer() {
		const newPlayer = new Player();
		this.player = newPlayer;
		console.log(this.player);
	},

	createComputer() {
		const newDealer = new Computer();
		this.computer = newDealer;
	},

	dealCards() {
		cards.populate();
		for (let i = 0; i < 3; i++) {
			const cardIndexPlayer = Math.floor(Math.random() * cards.deck.length);
			this.player.hand.push(this.removeCard(cardIndexPlayer));

			const cardIndexComputer = Math.floor(Math.random() * cards.deck.length);
			this.computer.hand.push(this.removeCard(cardIndexComputer));
			// game.play();
		}
	},
	// deal one extra card to player
	hitPlayer() {
		const cardIndexPlayer = Math.floor(Math.random() * cards.deck.length);
		this.player.hand.push(this.removeCard(cardIndexPlayer));
	},
	stand() {
		// Play current cards
	},

	// removes a card from the deck and places it in hand
	removeCard(cardIndex) {
		const [cardArray] = cards.deck.splice(cardIndex, 1);
		return cardArray
	},

	// reveal cards in hand
	showCards() {
		this.dealCards();
		console.log(this.player);
		console.log(this.computer);
	},
	// initialize Player and Computer
	startGame() {
		game.createPlayer();
		game.createComputer();
	}
} */


const game = new Game();

// Pages are stored
const pagesArray = ["#home-page", "#bets-page", 
"#hit-or-stand-page"];

// Make specific page not show in browser
const removePage = (pageIndex) => {
	$(pagesArray[pageIndex]).css("display", "none");
}

// Make specific page show in browser
const createPage = (pageIndex) => {
	$(pagesArray[pageIndex]).css("display", "block");
}


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

