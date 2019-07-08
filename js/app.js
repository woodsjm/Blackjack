console.log("Blackjack Started");


class Player {
	constructor() {
		this.name = name;
		this.cardsPlayed = [];
		this.hand = [];
	}

	// Calculate value of cards in hand, return value, and empty cards in hand
	/*playCard() {
		for (let i = 0; i < this.hand.length; i++) {

		}
	}*/
}

class Computer extends Player {

	// Calculate value of cards in hand, return value, and empty cards in hand
	/*playCard() {
		const 
	}*/
}



const game = {
	cards: [{
		name: "Queen of Hearts",
		value: 10
	}, {
		name: "2 of Diamonds",
		value: 2
	}, {
		name: "Ace of Diamonds",
		value: 1
	}, {
		name: "Jack of Diamonds",
		value: 10
	}, {
		name: "King of Diamonds",
		value: 10
	}, {
		name: "3 of Diamonds",
		value: 3
	}, {
		name: "4 of Diamonds",
		value: 4
	}, {
		name: "5 of Diamonds",
		value: 5
	}, {
		name: "6 of Diamonds",
		value: 6
	}, {
		name: "7 of Diamonds",
		value: 7
	}, {
		name: "8 of Diamonds",
		value: 8
	}, {
		name: "9 of Diamonds",
		value: 9
	}, {
		name: "10 of Diamonds",
		value: 10
	}
	],

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
		console.log(this.computer);

	},

	dealCards() {
		for (let i = 0; i < 2; i++) {
			const cardIndexPlayer = Math.floor(Math.random() * this.cards.length);
			this.player.hand.push(this.removeCard(cardIndexPlayer));

			const cardIndexComputer = Math.floor(Math.random() * this.cards.length);
			this.computer.hand.push(this.removeCard(CardIndexComputer));
		}
	},


	removeCard(cardIndex) {
		const cardArray = this.cards.splice(cardIndex, 1);
		return cardArray[0]
	}
}



game.createPlayer();
game.createComputer();
game.dealCards();
console.log(game.player.hand);
console.log(game.computer.hand);




	//Store cards




	//Show cards




	//Play cards against each other (Player vs Computer)




	//Remove all cards from hand