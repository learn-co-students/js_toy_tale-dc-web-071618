const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyBox = document.getElementById("toy-collection")
const newToyForm = document.getElementById('toyForm')
const newToybtn = document.getElementById(`new-toy-btn`)
const newName = document.getElementById(`new toy name`)
const newImage = document.getElementById(`new toy pic`)
let addToy = false
// let likes = {}
// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

function getAllToys(){
  fetch(`http://localhost:3000/toys/`)
  .then(res => res.json())
  // .then(json => console.log(json))
  .then(json => handelALLToys(json))
}

function handelALLToys(rawJson){
  rawJson.forEach(function(toy){
    renderToy(toy)
  })
}

function renderToy(toy){
    let toyCard = document.createElement(`div`)
    toyCard.classList.add(`card`)
    toyCard.id = `toyID_${toy.id}`

    let toyName = document.createElement(`h2`)
    toyName.id = `toy name`
    toyName.innerText = toy.name

    let toyImage = document.createElement(`img`)
    toyImage.id = `toy image`
    toyImage.src = toy.image
    toyImage.classList.add(`toy-avatar`)

    let toyLikes = document.createElement(`p`)
    toyLikes.id = `likes for toy ${toy.id}`
    toyLikes.innerText = `${toy.likes} Likes`

    let likeButton = document.createElement(`button`)
    likeButton.classList.add(`like-btn`)
    likeButton.innerText = `Like`
    likeButton.id = `id_${toy.id}`
    likeButton.addEventListener('click', getLikes)

    toyBox.appendChild(toyCard)
    toyCard.appendChild(toyName)
    toyCard.appendChild(toyImage)
    toyCard.appendChild(toyLikes)
    toyCard.appendChild(likeButton)
}

function addToyForm(e){
  e.preventDefault()
  let newToyName = newName.value
  let newToyPic = newImage.value
  addToyFetch(newToyName, newToyPic)
}

function addToyFetch(name, image){
  fetch(`http://localhost:3000/toys/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"},
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0
    })
  }).then(res => res.json())
  .then(jsonData => {
    let newToy = jsonData
    renderToy(newToy)
  })
  newToyForm.reset()
  addBtn.click()
}

function getLikes() {
  let thisId = parseInt(this.id.split("_")[1])
  fetch(`http://localhost:3000/toys/${thisId}`)
  .then(res => res.json())
  .then(json => addlike(json, thisId))
}

function addlike(json, thisId){
  json.likes++
  fetch(`http://localhost:3000/toys/${thisId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"},
    body: JSON.stringify({
      "likes": json.likes
    })
  })
  .then(res => res.json())
  .then(jsonData => {
    let likeElement = document.getElementById(`likes for toy ${thisId}`)
    likeElement.innerText = `${jsonData.likes} Likes`
  })
}

document.addEventListener(`DOMContentLoaded`, function(){
  getAllToys()
  newToyForm.addEventListener('submit', addToyForm)
  // newToybtn.addEventListener('submit', addToyFetch)
  addEventListener
  console.log("We have liftoff 🚀")
})


// OR HERE!
