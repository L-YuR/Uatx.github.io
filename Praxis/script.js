const totalCards = 10;
const imagePaths = [
  'img/imagen1.jpeg',
  'img/imagen2.jpeg',
  'img/imagen3.jpeg',
  'img/imagen4.jpeg',
  'img/imagen5.jpeg'
];

let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;

// Llenar availableCards con las rutas de las imágenes
const availableCards = [];

for (let i = 0; i < totalCards / 2; i++) {
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  const imagePath = imagePaths.splice(randomIndex, 1)[0];
  availableCards.push(imagePath);
}

// Duplicar las rutas de las imágenes para tener pares
availableCards.push(...availableCards);

let cardTemplate = `
  <div class="card">
    <div class="back"></div>
    <div class="face">
      <img src="" alt="Carta" width="120px">
    </div>
  </div>
`;

function activate(e) {
  if (currentMove < 2) {
    if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
      e.target.classList.add('active');
      selectedCards.push(e.target);

      if (++currentMove == 2) {
        currentAttempts++;
        document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

        const face1 = selectedCards[0].querySelector('.face img');
        const face2 = selectedCards[1].querySelector('.face img');

        if (face1.src === face2.src) {
          selectedCards = [];
          currentMove = 0;
        } else {
          setTimeout(() => {
            selectedCards[0].classList.remove('active');
            selectedCards[1].classList.remove('active');
            selectedCards = [];
            currentMove = 0;
          }, 600);
        }
      }
    }
  }
}

function randomValue() {
  let rnd = Math.floor(Math.random() * totalCards * 0.5);
  let values = valuesUsed.filter(value => value === rnd);
  if (values.length < 2) {
    valuesUsed.push(rnd);
  } else {
    randomValue();
  }
}

function getFaceValue(value) {
  let rtn = value;
  if (value < availableCards.length) {
    rtn = availableCards[value];
  }
  return rtn;
}

for (let i = 0; i < totalCards; i++) {
  let div = document.createElement('div');
  div.innerHTML = cardTemplate;
  cards.push(div);
  document.querySelector('#game').append(cards[i]);
  randomValue();
  const img = cards[i].querySelector('.face img');
  img.src = getFaceValue(valuesUsed[i]);
  cards[i].querySelector('.card').addEventListener('click', activate);
}
