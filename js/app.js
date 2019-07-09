console.log("Blackjack Started");




const cards = {
	deck: [],
	populate () {
		const suit = ['Diamonds', 'Hearts'];
		const rank = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
		for (let i = 0; i < suit.length; i++) {
			for (let j = 0; j < rank.length; j++) {
				this.deck.push(suit[i] + rank[j]);
			}
		}
	},
	clearDeck () {
		while (this.deck.length >= 0) {
			this.deck.pop();
		}

	}
}


cards.populate();

console.log(cards.deck);

cards.clearDeck();

console.log(cards.deck);


/*const deck = [];

const suit = ['Diamonds', 'Hearts'];
const rank = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
for (let i = 0; i < suit.length; i++) {
	for (let j = 0; j < rank.length; j++) {
		deck.push(suit[i] + rank[j]);
	}
}

	
console.log(deck);*/

/*class Player {
	constructor() {
		this.hand = [];
	}
	clear() {

	}
}



class Computer extends Player {

	clear() { 
	}
}



const game = {
	cards: [{
		suit: "Diamonds",
		rank: 1,
		image: undefined
	}, {
		suit: "Diamonds",
		rank: 2,
		image: undefined
	}, {
		suit: "Diamonds",
		rank: 3,
		image: undefined
	}, {
		suit: "Diamonds",
		rank: 4,
		image: undefined
	}, {
		suit: "Diamonds",
		rank: 5,
		image: undefined
	}, {
		suit: "Diamonds",
		rank: 6,
		image: undefined
	}, {
		suit: "Diamonds",
		rank: 7,
		image: undefined
	}, {
		suit: "Diamonds",
		rank: 8,
		image: undefined
	}, {
		suit: "Diamonds",
		rank: 10,
		image: undefined
	}, {
		suit: "Diamonds",
		rank: 10,
		image: undefined
	}, {
		suit: "Diamonds",
		rank: 10,
		image: undefined
	}, {
		suit: "Diamonds",
		rank: 10,
		image: undefined
	}, {
		suit: "Hearts",
		rank: 1,
		image: undefined
	}, {
		suit: "Hearts",
		rank: 2,
		image: undefined
	}, {
		suit: "Hearts",
		rank: 3,
		image: undefined
	}, {
		suit: "Hearts",
		rank: 4,
		image: undefined
	}, {
		suit: "Hearts",
		rank: 5,
		image: undefined
	}, {
		suit: "Hearts",
		rank: 6,
		image: undefined
	}, {
		suit: "Hearts",
		rank: 7,
		image: undefined
	}, {
		suit: "Hearts",
		rank: 8,
		image: undefined
	}, {
		suit: "Hearts",
		rank: 9,
		image: undefined
	}, {
		suit: "Hearts",
		rank: 10,
		image: undefined
	}, {
		suit: "Hearts",
		rank: 10,
		image: undefined
	}, {
		suit: "Hearts",
		rank: 10,
		image: undefined
	}, {
		suit: "Hearts",
		rank: 10,
		image: undefined
	},  
	],

	computerScore = 0,
	playerScore = 0,

	computer: null,
	player: null,
	cards: null,

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

 	createDeck () {
 		const newDeck = new Cards();
 		this.
 	}

	dealCards() {
 		for (let i = 0; i < 2; i++) {
			const cardIndexPlayer = Math.floor(Math.random() * this.cards.length);
 			this.player.hand.push(this.removeCard(cardIndexPlayer));

			const cardIndexComputer = Math.floor(Math.random() * this.cards.length);
 			this.computer.hand.push(this.removeCard(cardIndexComputer));
 		}
 	},

 	showCards() {
 		this.dealCards();
 		console.log(this.player);
 		console.log(this.computer);
 	}
}*/






// // 	computerScore: 0, 
// // 	playerScore: 0,

// // 	computer: null,
// // 	player: null,
// // 	cards: null,
/*
 	createPlayer() {
 		const newPlayer = new Player();
 		this.player = newPlayer;
 		console.log(this.player);
 	},
 	createComputer() {
 		const newDealer = new Computer();
 		this.computer = newDealer;
 		console.log(this.computer);

// // 	},
// // 	createCards() {
// // 		const newCards = new Cards();
// // 		this.cards = newCards;
// // 		console.log(this.cards);
// // 	}

 	dealCards() {
 		for (let i = 0; i < 2; i++) {
			const cardIndexPlayer = Math.floor(Math.random() * this.cards.length);
 			this.player.hand.push(this.removeCard(cardIndexPlayer));

			const cardIndexComputer = Math.floor(Math.random() * this.cards.length);
 			this.computer.hand.push(this.removeCard(cardIndexComputer));
 		}
 	},*/


// 	removeCard(cardIndex) {
// 		const cardArray = this.cards.splice(cardIndex, 1);
// 		return cardArray[0]
// 	}
// }



// game.createPlayer();
// game.createComputer();
// game.dealCards();
// console.log(game.player.hand);
// console.log(game.computer.hand);*




	//Store cards




	//Show cards




	//Play cards against each other (Player vs Computer)




	//Remove all cards from hand