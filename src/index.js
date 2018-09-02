const toyCollection = document.querySelector('#toy-collection')
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

document.addEventListener('DOMContentLoaded', function() {
  fetchToys(),
  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', createToy)
    } else {
      toyForm.style.display = 'none'
    }
  })
})

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(jsonData => {
    jsonData.forEach(toy => renderToy(toy))
  })
}

function createToy(event) {
  event.preventDefault()
  postFetch()
  event.target.reset()
}

function postFetch(){
  let newToyName = document.querySelector('#new-toy-name').value
  let newToyImage = document.querySelector('#new-toy-image').value
  let newToyData = {name: newToyName, image: newToyImage, likes: 0}
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    body: JSON.stringify(newToyData),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(response => response.json())
  .then(jsonToyData => {
    renderToy(jsonToyData)
  })
}

function renderToy(toy) {
  let toyCard = document.createElement('div')
  let toyName = document.createElement('h2')
  let toyImage = document.createElement('img')
  let toyLikes = document.createElement('p')
  let likeButton = document.createElement('button')
  toyCard.className = 'card'
  toyCard.id = `toy-${toy.id}`
  toyName.innerText = toy.name
  toyImage.src = toy.image
  toyImage.className = 'toy-avatar'
  toyLikes.innerHTML = `${toy.likes} Likes`
  likeButton.className = 'like-btn'
  likeButton.innerText = 'Like'
  likeButton.id = `like-toy-${toy.id}`
  likeButton.addEventListener('click', addLike)
  toyCard.appendChild(toyName)
  toyCard.appendChild(toyImage)
  toyCard.appendChild(toyLikes)
  toyCard.appendChild(likeButton)
  toyCollection.appendChild(toyCard)
}

function addLike() {
  let toyId = event.target.id.split('-')[2]
  let currentLikes = event.target.parentElement.querySelector('p').innerText.split(' ')[0]
  let newLikes = parseInt(currentLikes) + 1
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    body: JSON.stringify({likes: newLikes}),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(response => response.json())
  .then(jsonData => {
    document.querySelector(`#toy-${toyId}`).querySelector('p').innerHTML= `${jsonData.likes} Likes`
  })
}
