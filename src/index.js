const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false


document.addEventListener('DOMContentLoaded', init)
let likeButton = document.querySelector('.like-btn')



function init() {
  fetchToys()

}

function fetchToys() {
  fetch(`http://localhost:3000/toys`)
  .then(response => response.json())
  .then(json => {
    let toysArray = json
    toysArray.forEach(toyInfo => {
      addCard(toyInfo)
    })
  })
}

function addCard(toyInfo) {
  let toyCollection = document.getElementById('toy-collection')
  let toyCard = document.createElement('div')
  toyCard.className = 'card'
  toyCard.id = toyInfo.id
  toyCollection.appendChild(toyCard)
  addInfo(toyCard, toyInfo)
}

function addInfo(toyCard, toyInfo) {
  let toyName = document.createElement('h2')
  let toyImg = document.createElement('img')
  let toyLikes = document.createElement('p')
  let likeButton = document.createElement('button')
  console.log(likeButton)
  toyName.innerText = toyInfo.name
  toyImg.className = 'toy-avatar'
  toyImg.src = toyInfo.image
  toyLikes.innerText = `${toyInfo.likes} likes`
  toyLikes.className = 'likes-text'
  toyLikes.id =  `likes-for-${toyInfo.id}`
  likeButton.innerText = 'Like'
  likeButton.id = `like-${toyInfo.id}`
  likeButton.className = 'like-btn'


  toyCard.appendChild(toyName)
  toyCard.appendChild(toyImg)
  toyCard.appendChild(toyLikes)
  toyCard.appendChild(likeButton)

  likeButton.addEventListener('click', addLike)
}

function addLike() {
  let toyId = event.target.id.split('-')[1]
  let currLikes = document.querySelector(`#likes-for-${toyId}`).innerText.split(' ')[0]
  let updatedLikes = parseInt(currLikes) + 1

  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    body: JSON.stringify({likes: updatedLikes}),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(response => response.json())
  .then(json => {
    document.querySelector(`#likes-for-${toyId}`).innerHTML = `${json.likes} likes`
  })
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', addToyHandler)
  } else {
    toyForm.style.display = 'none'
  }
})

function addToyHandler(event) {
  event.preventDefault()
  let name = document.querySelector('#new-toy-name').value
  let imgUrl = document.querySelector('#new-toy-image')
  let newToyInfo = {name: name, image: imgUrl.value, likes: 0}
  addNewToy(newToyInfo)
}

function addNewToy(newToyInfo) {
  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: newToyInfo.name,
      image: newToyInfo.image,
      likes: newToyInfo.likes
    })
  })
  .then(response => response.json())
  .then(json => {
    let newToy = json
    addCard(json)
  })
  document.querySelector('.add-toy-form').reset()
  // trying to make form hide again
  addToy = false
}
