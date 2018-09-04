const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

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

//Fetch Andy's Toys
//When the page loads, make a 'GET' request to fetch all the toy objects.
document.addEventListener('DOMContentLoaded', function() {
  getAllFetch()
  document.querySelector('.add-toy-form').addEventListener('submit', handleCreate)
})

function getAllFetch() {
  fetch(`http://localhost:3000/toys`)
  .then(response => response.json())
  .then(jsonData => {
    jsonData.forEach(toys => {render(toys)})
  })
}

//add toy info to the card
function render(toys) {
  let divElement = document.createElement('div')
  let h2Element = document.createElement('h2')
  let imgElement = document.createElement('img')
  let likesElement = document.createElement('p')
  let buttonElement = document.createElement('button')

  divElement.appendChild(h2Element)
  divElement.appendChild(imgElement)
  divElement.appendChild(likesElement)
  divElement.appendChild(buttonElement)

  document.getElementById('toy-collection').appendChild(divElement)

  h2Element.innerHTML = toys.name
  imgElement.src = toys.image
  likesElement.innerHTML = `${toys.likes} likes`
  buttonElement.innerText = 'Like <3'

  divElement.classList.add('card')
  divElement.id = `toys-${toys.id}`
  imgElement.classList.add('toy-avatar')
  buttonElement.classList.add('like-btn')
  buttonElement.id = `likes-toys-${toys.id}`
  buttonElement.addEventListener('click', addLikes)
  likesElement.classList.add('likes')

  divElement.id = `toys-${toys.id}`
}

//add a new toy
function handleCreate(event) {
  event.preventDefault()
  postFetch()
  event.currentTarget.reset
}

function postFetch() {
  let toyName = document.getElementById('name-input').value
  let toyImage = document.getElementById('image-input').value
  let data = {name: toyName, image: toyImage, likes: 0}
  fetch(`http://localhost:3000/toys`,{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(jsonData => {
    render(jsonData)
  })
}

//Conditionally increase the toy's like count
//Send a patch request to the server at http://localhost:3000/toys/:id updating the number of likes that the specific toy has
function addLikes() {
  console.log(event)
  // debugger
  let likeId = event.target.id.split('-')[2]
  let likes = event.target.previousSibling.innerHTML
  let updatedLikes = parseInt(likes) + 1
  patchFetch(likeId, updatedLikes)
}

function patchFetch(likeId, updatedLikes){
  let data = {likes: updatedLikes}
  fetch(`http://localhost:3000/toys/${likeId}`,{
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(jsonData => {
    //from button give me the parent
    let parentElement = document.querySelector(`#likes-toys-${likeId}`).parentElement
    //from the parent, give me the p tag
    let pElement = parentElement.querySelector('p')
    pElement.innerText = `${jsonData.likes} Likes`
  })
}
