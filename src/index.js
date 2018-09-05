const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const addToyForm = document.querySelector('form.add-toy-form')


// YOUR CODE HERE
document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(json => {json.forEach((toy) => {
      makeCardFor(toy);
      if(json.indexOf(toy) === json.length-1) {
        const likeBtns = document.querySelectorAll('.like-btn')
        console.log(likeBtns)
        addLikeHandlers(likeBtns);
      }

    })
  })

})

function makeCardFor(toy) {
  let card = document.createElement('div');
  card.classList.add('card');
  card.id = `toy-${toy.id}`;
  document.getElementById('toy-collection').appendChild(card);
  card.innerHTML = `<h2>${toy.name}</h2>
        <img class="toy-avatar" src="${toy.image}">
        <p class="likes">${toy.likes} likes</p>
        <button class="like-btn">Like <3</button>`
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

addToyForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputs = event.currentTarget.querySelectorAll('.input-text');
  // console.log(inputs[0].value, inputs[1].value);
  const newName = inputs[0].value;
  const newImage = inputs[1].value;
  const data = {name: newName, image: newImage, likes: 0}
  fetch('http://localhost:3000/toys', {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    'body': JSON.stringify(data)
  }).then(res => res.json())
    .then(json => makeCardFor(json))
})

function addLikeHandlers(likeBtns) {
  likeBtns.forEach((button) => {
    button.addEventListener('click', updateLikes)
  })
}


function updateLikes(event) {
  let id = event.currentTarget.parentElement.id.split('-')[1];
  const div = event.currentTarget.parentElement;
  const patchName = div.querySelector('h2').innerText
  const patchImage = div.querySelector('img').src 
  let patchLikes = Number.parseInt(div.querySelector('p.likes').innerText.split(' ')[0])
  patchLikes++;
  console.log(patchLikes);
  const data = {name: patchName, image: patchImage, likes: patchLikes}
  console.log(event.currentTarget.parentElement)
  fetch(`http://localhost:3000/toys/${id}`, {
    'method': 'PATCH',
    'headers': {
      'Content-Type': 'application/json', 
      'Accept': 'application/json'
    }, 
    'body': JSON.stringify(data)
  }).then(res => res.json())
    .then(json => {
      div.querySelector('p.likes').innerText = `${patchLikes} likes`;
    })
}


// OR HERE!
