const cardsArray = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F',
    'G', 'G', 'H', 'H'
  ];
  
  let cards = [];
  let flippedCards = [];
  let matchedCards = [];
  let moves = 0;
  
  // Shuffle the cards array
  function shuffleCards() {
    cardsArray.sort(() => Math.random() - 0.5);
  }
  
  // Create card elements and append them to the board
  function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    shuffleCards();
  
    cardsArray.forEach(cardValue => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.dataset.value = cardValue;
      cardElement.addEventListener('click', flipCard);
      gameBoard.appendChild(cardElement);
      cards.push(cardElement);
    });
  }
  
  // Flip a card
  function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
      this.classList.add('flipped');
      this.innerText = this.dataset.value;
      flippedCards.push(this);
      
      if (flippedCards.length === 2) {
        checkMatch();
      }
    }
  }
  
  // Check if two flipped cards match
  function checkMatch() {
    moves++;
    if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
      flippedCards[0].classList.add('matched');
      flippedCards[1].classList.add('matched');
      matchedCards.push(flippedCards[0], flippedCards[1]);
    }
    
    setTimeout(() => {
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        card.innerText = '';
      });
      flippedCards = [];
      if (matchedCards.length === cardsArray.length) {
        alert(`You won in ${moves} moves!`);
      }
    }, 1000);
  }
  
  // Initialize the game
  function startGame() {
    createBoard();
    moves = 0;
    matchedCards = [];
  }
  
  startGame();
  