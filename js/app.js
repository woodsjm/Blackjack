console.log("Blackjack Started");



class Player {
	constructor() {
		this.hand = [];
	}
	clearHand() {
		this.hand = [];
	}
}



class Computer extends Player {

}


const cards = {
	// pack of cards
	cardPack: [{
		name: "Ace of Diamonds", 
		rank: 1, 
		url: ""
	}, {
		name: "2 of Diamonds", 
		rank: 2, 
		url: ""
	}, {
		name: "3 of Diamonds", 
		rank: 3, 
		url: ""
	}, {
		name: "4 of Diamonds", 
		rank: 4, 
		url:""
	}, {
		name: "5 of Diamonds", 
		rank: 5, 
		url:""
	}, {
		name: "6 of Diamonds", 
		rank: 6, 
		url:""
	}, {
		name: "7 of Diamonds",
		rank: 7,
		url: ""
	}, {
		name: "8 of Diamonds",
		rank: 8,
		url: ""
	}, {
		name: "9 of Diamonds",
		rank: 9,
		url: ""
	}, {
		name: "10 of Diamonds",
		rank: 10,
		url: ""
	}, {
		name: "Jack of Diamonds",
		rank: 10,
		url: ""
	}, {
		name: "Queen of Diamonds",
		rank: 10,
		url: ""
	}, {
		name: "King of Diamonds",
		rank: 10,
		url: ""
	}],
	deck: [],
	// create playing deck
	populate () {
		for (let i = 0; i < this.cardPack.length; i++) {
			this.deck.push(this.cardPack[i]);
		}
	},
	// empty the playing deck
	clearDeck () {
		this.deck = [];
		//console.log(cards.deck);
	}
}

const game = {

	computerScore: 0,
	playerScore: 0,

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
 		}
 	},
 	hitPlayer() {
 		const cardIndexPlayer = Math.floor(Math.random() * cards.deck.length);
 		this.player.hand.push(this.removeCard(cardIndexPlayer));
 	},
 	removeCard(cardIndex) {
 		const [ cardArray ] = cards.deck.splice(cardIndex, 1);
 		return cardArray
 	},
 	showCards() {
 		this.dealCards();
 		console.log(this.player);
 		console.log(this.computer);
 	},
 	startGame() {
 		game.createPlayer();
 		game.createComputer();
 	}
}



game.startGame();
game.dealCards();
game.hitPlayer();
console.log(game.player.hand);
console.log(game.computer.hand);
game.player.clearHand();
game.computer.clearHand();
console.log(game.player.hand);
console.log(game.computer.hand);