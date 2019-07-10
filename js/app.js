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
				this.deck.push({ suit: suits[i], value: values[j], name: names[j], imgUrl: names[j] + suits[i][0] + '.png' });  
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
	}
	resetPlayer() {
		this.hand = [];
		this.value = 0;
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
		console.log(this.value);
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

	play() {
		// start play
		this.deck.createDeck();
		this.player.getCard(this.deck.dealCard());
		this.player.getCard(this.deck.dealCard());
		this.dealer.getCard(this.deck.dealCard());
		this.dealer.getCard(this.deck.dealCard());
	}

	hit() {
		//give player an additional card
		this.player.getCard(this.deck.dealCard());
		console.log('value', this.player.value);
		if (this.player.value > 21) {
			console.log("Player Loses");
		}
	}

	stand() {
		// play current cards
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
$('#hit').on('click', () => {
	game.hit();
});
$('#play').on('click', () => {
	game.play();
	console.log(game.deck);
	console.log(game.player);
	console.log(game.dealer);
});
$('#stand').on('click', () => { 
	console.log('stand');
	game.stand();
});

/* console.log(game.player.hand);
console.log(game.computer.hand);
console.log(game.player.value);
console.log(game.player.value);
game.player.clearHand();
game.computer.clearHand();
console.log(game.player.hand);
console.log(game.computer.hand); */