const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener('DOMContentLoaded', init);

function init() {
  getToyData();
  newToyHandler();
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
function getToyData() {
  fetch('http://localhost:3000/toys')
  .then(r => r.json())
  .then(json => {
    json.forEach(toy => renderCard(toy));
  })
}

function addToyData() {
  const newToyName = document.querySelector('.add-toy-form').querySelector('input').value;
  const newToyImage = document.querySelector('.add-toy-form').querySelectorAll('input')[1].value;
  const data = {
    name: newToyName,
    image: newToyImage,
    likes: 0
  };

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(r => r.json())
  .then(json => renderCard(json))
}

let toyCounter = 0;

function renderCard(toy) {
  const toyCollection = document.getElementById('toy-collection');
  const newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.id = `toy-${++toyCounter}`
  toyCollection.appendChild(newCard);

  newCard.appendChild(document.createElement('h2'));
  newCard.querySelector('h2').innerText = toy.name;

  newCard.appendChild(document.createElement('img'));
  newCard.querySelector('img').src = toy.image;
  newCard.querySelector('img').classList.add('toy-avatar');

  newCard.appendChild(document.createElement('p'));
  newCard.querySelector('p').innerText = `${toy.likes} Likes`;

  const likeButton = document.createElement('button');
  newCard.appendChild(likeButton);
  likeButton.innerText = 'Like';
  likeButton.classList.add('like-btn');
  likeButton.addEventListener('click', addLike);
}

function addLike(e) {
  const toyId = e.path[1].id.split('-')[1];
  let likeCount = e.path[1].querySelector('p').innerText.split(' ')[0];
  likeCount++
  const data = {likes: likeCount};

  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(r => r.json())
  .then(json => e.path[1].querySelector('p').innerText = `${likeCount} Likes`);
}

function newToyHandler() {
  document.querySelector('.add-toy-form').addEventListener('submit', e => {
    e.preventDefault();
    addToyData();
    e.target.reset();
  });
}
