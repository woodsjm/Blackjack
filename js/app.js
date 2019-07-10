console.log("Blackjack Started");

class Cards {
	constructor() {
		this.deck = []
		this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,]
	}
	createDeck() {
		const suit = ["Diamonds", "Hearts", "Clubs", "Spades"];
		const rank = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
		for (let i = 0; i < suit.length; i++) {
			for (let j = 0; j < rank.length; j++) {
				this.deck.push(suit[i] + rank[j]);
			}
		}
	}
}



class Player {
	constructor() {
		this.hand = [];
		this.value = 0
	}
	clearHand() {
		this.hand = [];
	}
	clearHandValue() {
		this.value = 0;
	}
}



class Computer extends Player {

}


const cards = {
	// pack of cards
	deck: [],
	// create playing deck
	populate() {
		for (let i = 0; i < this.cardPack.length; i++) {
			this.deck.push(this.cardPack[i]);
		}
	},
	// empty the playing deck
	clearDeck() {
		this.deck = [];
		//console.log(cards.deck);
	}
}

const game = {

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
	playerHandValue() {
		let sum = 0;
		let aceExists = false;
		let total = 0;
		for (let i = 0; i < this.player.hand.length; i++) {
			sum += game.player.hand[i]['rank'];
			if (game.player.hand['name'] === "Ace of Diamonds" || game.player.hand[i]['name'] === "Ace of Hearts"
				|| game.player.hand[i]['name'] === "Ace of Spades" || game.player.hand[i]['name'] === "Ace of Clubs") {
				// if there is an ace change aceExists to true
				aceExists = true;
			}
		}
		let softHand = 0;
		let hardHand = 0;
		if (aceExists) {
			softHand = sum + 10;
		} else {
			hardHand = sum;
		}
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
}





game.startGame();
game.dealCards();

$('#hit').on('click', () => {
	console.log('hit is working');
	game.hitPlayer();
});


console.log(game.player.hand);
console.log(game.computer.hand);
console.log(game.player.value);
console.log(game.player.value);
game.player.clearHand();
game.computer.clearHand();
console.log(game.player.hand);
console.log(game.computer.hand);