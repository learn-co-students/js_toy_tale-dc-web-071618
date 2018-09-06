const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const collection = document.querySelector('#toy-collection')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', function(event){
      event.preventDefault()
      addNewToy()
      toyForm.querySelector('.add-toy-form').reset()
      window.scrollTo(0, document.body.scrollHeight);
    })
  } else {
    toyForm.style.display = 'none'
  }
})

function getThemToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => toys.forEach(toy => renderToys(toy)))
}

function renderToys(toy) {
  console.log("we are in renderToys")

  let div = document.createElement('div');
  div.className = 'card'
  let name = document.createElement('h2');
  let image = document.createElement('img');
  let likes = document.createElement('p');
  let likeBtn = document.createElement('button');

  name.innerText = toy.name;
  image.src = toy.image;
  image.className = 'toy-avatar';
  likes.innerText = `Likes: ${toy.likes}`
  likes.id = `p-${toy.id}`
  likeBtn.innerText = 'Like';
  likeBtn.className = 'like-btn';

  div.appendChild(name);
  div.appendChild(image);
  div.appendChild(likes);
  div.appendChild(likeBtn);
  collection.appendChild(div);

  likeBtn.addEventListener('click', incrementLikes)
}

function updateDemDerLikes(id, likesNum) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify({likes: likesNum})
  })
  .then(response => response.json())
  .then(newToyLikes => updateDemDerLikesToDemDerDom(newToyLikes))
}

function incrementLikes(event) {
  console.log(`I did don makes it!`)
  let likesTag = event.path[1].children[2]
  let toyid = parseInt(likesTag.id.split('-')[1])
  let likeNum = parseInt(likesTag.innerText.split(' ')[1])
  likeNum = likeNum + 1
  // likesTag.innerText = `Likes: ${likeNum}`
  // let toyid = event.target.parentNode
  updateDemDerLikes(toyid, likeNum)
}

function updateDemDerLikesToDemDerDom(newToy) {
  let likes = document.getElementById(`p-${newToy.id}`);

  likes.innerText = `Likes: ${newToy.likes}`
}

function getToyInfoFromForm(){
  console.log("we are in getToyInfoFromForm")
  let newName = toyForm.querySelector('.add-toy-form').name.value
  let newImage = toyForm.querySelector('.add-toy-form').image.value
  return {
    name: newName,
    image: newImage,
    likes: 0
  }
}

function addNewToy() {
  console.log("we are in addNewToy")
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify(getToyInfoFromForm())
  })
  .then(response => response.json())
  .then(newToy => renderToys(newToy))
}

function init(){
  getThemToys();
}

document.addEventListener('DOMContentLoaded', init)
