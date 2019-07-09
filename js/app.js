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
	removeCard () {


	},
	clearDeck () {
		this.deck = [];
		console.log(cards.deck);
	}
}

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
 		for (let i = 0; i < 3; i++) {
			const cardIndexPlayer = Math.floor(Math.random() * cards.deck.length);
 			this.player.hand.push(this.removeCard(cardIndexPlayer));

			const cardIndexComputer = Math.floor(Math.random() * cards.deck.length);
 			this.computer.hand.push(this.removeCard(cardIndexComputer));
 		}
 	},
 	removeCard(cardIndex) {
 		const [ cardArray ] = cards.deck.splice(cardIndex, 1);
 		return cardArray
 	},
 	showCards() {
 		this.dealCards();
 		console.log(this.player);
 		console.log(this.computer);
 	}
}


cards.populate();
game.createPlayer();
game.createComputer();
game.dealCards();
console.log(game.player.hand);
console.log(game.computer.hand);
game.player.clearHand();
console.log(game.player.hand);
console.log(game.computer.hand);


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

 	},
	createCards() {
 		const newCards = new Cards();
 		this.cards = newCards;
 		console.log(this.cards);
 	}

 	dealCards() {
 		for (let i = 0; i < 2; i++) {
			const cardIndexPlayer = Math.floor(Math.random() * this.cards.length);
 			this.player.hand.push(this.removeCard(cardIndexPlayer));

			const cardIndexComputer = Math.floor(Math.random() * this.cards.length);
 			this.computer.hand.push(this.removeCard(cardIndexComputer));
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
 console.log(game.computer.hand);*




	Store cards




	Show cards


	Play cards against each other (Player vs Computer)




	Remove all cards from hand*/