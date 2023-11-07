"use strict";

let picContainer = document.getElementById('pictures');
let reportContainer = document.getElementById('report');
let button = document.getElementById('results');

let image1 = document.querySelector('#pictures img:first-child');
let image2 = document.querySelector('#pictures img:nth-child(2)');
let image3 = document.querySelector('#pictures img:nth-child(3)');

let state = {
  currentClicks: 0,
  totalClicks: 25,
  allPics: [],
}
// console.log(state.allPics);
// console.log(state.allPics.votes)
// debugger;

function Product( name, image) {
  this.name = name;
  this.imgFile = image;
  this.votes = 0;
  this.views = 0;
  state.allPics.push(this);
}

console.log(Product);

function renderImages(){

  function pickRandomImage() {
    return Math.floor(Math.random() * state.allPics.length);
  }

  let productOne = pickRandomImage();
  let productTwo = pickRandomImage();
  let productThree = pickRandomImage();

  while(productOne === productTwo || productOne === productThree || productTwo === productThree){
    productTwo = pickRandomImage();
    productThree = pickRandomImage();
  }

  image1.src = state.allPics[productOne].imgFile;
  image1.alt = state.allPics[productOne].name;

  image2.src = state.allPics[productTwo].imgFile;
  image2.alt = state.allPics[productTwo].name;

  image3.src = state.allPics[productThree].imgFile;
  image3.alt = state.allPics[productThree].name;

  state.allPics[productOne].views++;
  state.allPics[productTwo].views++;
  state.allPics[productThree].views++;
}

function removeButton(){
  button.style.display = 'none';
}

function renderResultsBtn(){
  button.style.display = "block";
}

function showResults() {
  let imageNames = [];
  let imageVotes = [];
  let imageViews = [];


  for(let i = 0; i < state.allPics.length; i++){
    imageNames.push(state.allPics[i].name);
    imageVotes.push(state.allPics[i].votes);
    imageViews.push(state.allPics[i].views);
  }

  const data = {
    labels: imageNames,
    datasets: [
      {
        label: 'Votes',
        data: imageVotes,
        backgroundColor: ['green']

      },
      {
        label: 'Views',
        data: imageViews,
        backgroundColor: ['rebeccapurple']
      }
    ]
  }
  let config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }
  let myChart = new Chart(reportContainer, config);
}

function clickEvent(event){
  let imageName = event.target.alt;

  for ( let i = 0; i < state.allPics.length; i++){
    if ( imageName === state.allPics[i].name) {
      state.allPics[i].votes++;
      break;
    }
  }

  if(state.currentClicks >= state.totalClicks){
    picContainer.removeEventListener("click", clickEvent);
    renderResultsBtn();
  }

  state.currentClicks++;
  // console.log(state.currentClicks);
  // console.log(Product.votes);
  renderImages();
}

function listeners(){
  picContainer.addEventListener("click", clickEvent);
  button.addEventListener("click", showResults);
}

new Product('R2D2 Bag', 'img/bag.jpg');
new Product('Banana', 'img/banana.jpg');
new Product('Bathroom', 'img/bathroom.jpg');
new Product('Boots', 'img/boots.jpg');
new Product('Breakfast', 'img/breakfast.jpg');
new Product('Bubblegum', 'img/bubblegum.jpg');
new Product('Chair', 'img/chair.jpg');
new Product('Cthulhu', 'img/cthulhu.jpg');
new Product('Dog Duck', 'img/dog-duck.jpg');
new Product('Dragon', 'img/dragon.jpg');
new Product('Pen', 'img/pen.jpg');
new Product('Pet Sweep', 'img/pet-sweep.jpg');
new Product('Scissors', 'img/scissors.jpg');
new Product('Shark', 'img/shark.jpg');
new Product('Sweep', 'img/sweep.png');
new Product('Tauntaun', 'img/tauntaun.jpg');
new Product('Unicorn', 'img/unicorn.jpg');
new Product('Water Can', 'img/water-can.jpg');
new Product('Wine Glass', 'img/wine-glass.jpg');
renderImages();
listeners();
removeButton();
