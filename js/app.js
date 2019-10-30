

// Standard deck of cards //
class Deck {
	constructor() {
		this.deck = []
	}
	createDeck() {
		const suits = ["Diamonds", "Hearts", "Clubs", "Spades"];
		const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
		const names = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
		suits.forEach(s => {
			values.forEach((v, idx) => {
				this.deck.push({ suit: s, value: v, name: names[idx], url: names[idx] + s[0] + '.png' });
			})
		})
	}
	clearDeck() {
		this.deck = [];
	}
	dealCard() {
		const cardIndex = Math.floor(Math.random() * this.deck.length);
		const [removedCard] = this.deck.splice(cardIndex, 1);
		return removedCard;
	}
}

// The Player and Dealer. //
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
		// Deal card to Player or Dealer.
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


}


// The Game //
class Game {
	constructor() {
		this.dealerCardFlipped = false;
		this.player = new Player();
		this.dealer = new Dealer();
		this.deck = new Deck();
	}
  
	deal() {
		// Start play //
		this.deck.createDeck();
		this.player.getCard(this.deck.dealCard());
		$('#player-hand').append(`<img class="card" src="./images/${this.player.hand[this.player.hand.length - 1].url}">`)
		this.player.getCard(this.deck.dealCard());
		$('#player-hand').append(`<img class="card" src="./images/${this.player.hand[this.player.hand.length - 1].url}">`)
		this.dealer.getCard(this.deck.dealCard());
		$('#computer-hand').append(`<img id="first-dealer-card" class="card" src="./images/back.png">`)
		this.dealer.getCard(this.deck.dealCard());
		$('#computer-hand').append(`<img class="card" src="./images/${this.dealer.hand[this.dealer.hand.length - 1].url}">`)
		this.initialCheckHands()
	}

	hit() {
		// Deal additional card to player//
		this.player.getCard(this.deck.dealCard());
		$('#player-hand').append(`<img class="card" src="./images/${this.player.hand[this.player.hand.length - 1].url}">`)
		if (this.player.value > 21) {
			setTimeout(this.clearTableOnLoss, 2000);

		} else if (this.player.value === 21) {
			setTimeout(this.clearTableOnWin, 2000);
		}
	}
	dealerHits() {
		while (this.dealer.value < 17) {
			this.dealer.getCard(this.deck.dealCard());
			$('#computer-hand').append(`<img class="card" src="./images/${this.player.hand[this.player.hand.length - 1].url}">`)
		}
		if (this.dealer.value > 21) {
			
			if (this.dealerCardFlipped === false) {
				flipDealersFirstCard();
			}
			setTimeout(this.clearTableOnWin, 3500);

		} else if (this.dealer.value === this.player.value) {
			
			if (this.dealerCardFlipped === false) {
				flipDealersFirstCard();
			}
			setTimeout(this.clearTableOnTie, 3500);

		} else if (this.dealer.value > this.player.value) {
			
			if (this.dealerCardFlipped === false) {
				flipDealersFirstCard();
			}
			setTimeout(this.clearTableOnLoss, 3500);

		} else if (this.dealer.value < this.player.value) {
			
			if (this.dealerCardFlipped === false) {
				flipDealersFirstCard();
			}
			setTimeout(this.clearTableOnWin, 3500);
		}
	}
	stand() {
		flipDealersFirstCard();
		this.dealerCardFlipped = true;
		this.dealerHits();
	}
	clearTableOnTie() {
		$('#lose-title').text(`You tied! Your original bet ($${betAmount}) is returned.`);
		moveToLosePage();
		
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
			
			setTimeout(this.clearTableOnTie, 3500);
			

		} else if (this.dealer.value === 21) {
			
			if (this.dealerCardFlipped === false) {
				
				flipDealersFirstCard();
			}
			setTimeout(this.clearTableOnLoss, 3500);
			
		} else if (this.player.value === 21) {
			
			if (this.dealerCardFlipped === false) {
				
				flipDealersFirstCard();
			}
			setTimeout(this.clearTableOnWin, 3500);
		}
	}
}

// New game initialized //
let game = new Game();

// Amount bet is always zero at the beginning of a game. //
let betAmount = 0;

// Page IDs //
const pagesArray = ["#home-page", "#bets-page", 
"#hit-or-stand-page", "#won-page", "#lose-page", "tie-page"];

// Turn dealer's first card face-up //
function flipDealersFirstCard() {
	$('#first-dealer-card').replaceWith(`<img class="card" src="./images/${game.dealer.hand[0].url}">`)
}

// Make specific page not show in browser //
function removePage(pageIndex) {
	$(pagesArray[pageIndex]).css("display", "none");
}

// Make specific page show in browser //
function createPage(pageIndex) {
	$(pagesArray[pageIndex]).css("display", "block");
}

// Take player to win page //
function moveToWinPage() {
	removePage(2);
	createPage(3);
}

// Take player to lose page //
function moveToLosePage() {
	removePage(2);
	createPage(4);
}

// EVENT LISTENERS //
$('#play-blackjack').on('click', () => {
	removePage(0);
	createPage(1);
});

$('#deal').on('click', () => {
	removePage(1);
	createPage(2);
	game.deal();
	//console.log(game.deck);
	game.player.hand.forEach(c => console.log(c))
	//console.log("player:",game.player.calculateValueOfHand())
	game.dealer.hand.forEach(c => console.log(c))
	//console.log("dealer:",game.dealer.calculateValueOfHand())
});

$('#hit').on('click', () => {
	game.hit();
	//console.log(game.player.hand);
	game.player.hand.forEach(c => console.log(c))
	//console.log("player:",game.player.calculateValueOfHand())
	game.dealer.hand.forEach(c => console.log(c))
	//console.log("dealer:",game.dealer.calculateValueOfHand())
});

$('#stand').on('click', () => { 
	game.stand();
	game.player.hand.forEach(c => console.log(c))
	//console.log("player:",game.player.calculateValueOfHand())
	game.dealer.hand.forEach(c => console.log(c))
	//console.log("dealer:",game.dealer.calculateValueOfHand())
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
	$('.bet-amount').text(`Bet Amount: $${betAmount}`);
});

$('#500').on('click', () => {
	betAmount += 500;
	$('.bet-amount').text(`Bet Amount: $${betAmount}`);
});


