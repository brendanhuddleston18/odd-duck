"use strict";

let picContainer = document.getElementById('pictures');
let reportContainer = document.getElementById('chart');
let button = document.getElementById('results');

let image1 = document.querySelector('#pictures img:first-child');
let image2 = document.querySelector('#pictures img:nth-child(2)');
let image3 = document.querySelector('#pictures img:nth-child(3)');


let state = {
  currentClicks: 0,
  totalClicks: 25,
  allPics: [],
  threeImages: [],
};

let storedData = localStorage.getItem('allPics');

if(storedData){
  state.allPics = JSON.parse(storedData);
}

// console.log(state.allPics);
// console.log(state.allPics.votes)
// debugger;

function Product( name, image) {
  this.name = name;
  this.imgFile = image;
  this.votes = 0;
  this.views = 0;

}



function renderImages(){

  function pickRandomImage() {
    return Math.floor(Math.random() * state.allPics.length);
  }

  // Pick initial values for each product
  let productOne = pickRandomImage();
  let productTwo = pickRandomImage();
  let productThree = pickRandomImage();

  // Checking if images match eachother or were used in previous set
  while(productOne === productTwo || productOne === productThree || state.threeImages.includes(productOne)){
    productOne = pickRandomImage();
  }

  while(productTwo === productThree || productTwo === productOne || state.threeImages.includes(productTwo)){
    productTwo = pickRandomImage();
  };

  while(productThree === productOne || productThree === productTwo || state.threeImages.includes(productThree)){
    productThree = pickRandomImage();
  }

  // Storing images into an array so when user clicks again, the while loops will know the previous set
  state.threeImages = [productOne, productTwo, productThree];

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

let storedVotesData = localStorage.getItem('allPics');


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

  if (storedVotesData) {
    state.allPics = JSON.parse(storedVotesData);
  }

  console.log(storedVotesData);

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
  localStorage.setItem(`allPics`, JSON.stringify(state.allPics));

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


let productList = [
  new Product('R2D2 Bag', 'img/bag.jpg'),
  new Product('Banana', 'img/banana.jpg'),
  new Product('Bathroom', 'img/bathroom.jpg'),
  new Product('Boots', 'img/boots.jpg'),
  new Product('Breakfast', 'img/breakfast.jpg'),
  new Product('Bubblegum', 'img/bubblegum.jpg'),
  new Product('Chair', 'img/chair.jpg'),
  new Product('Cthulhu', 'img/cthulhu.jpg'),
  new Product('Dog Duck', 'img/dog-duck.jpg'),
  new Product('Dragon', 'img/dragon.jpg'),
  new Product('Pen', 'img/pen.jpg'),
  new Product('Pet Sweep', 'img/pet-sweep.jpg'),
  new Product('Scissors', 'img/scissors.jpg'),
  new Product('Shark', 'img/shark.jpg'),
  new Product('Sweep', 'img/sweep.png'),
  new Product('Tauntaun', 'img/tauntaun.jpg'),
  new Product('Unicorn', 'img/unicorn.jpg'),
  new Product('Water Can', 'img/water-can.jpg'),
  new Product('Wine Glass', 'img/wine-glass.jpg'),
];

for(let i = 0; i < productList.length; i++){
  state.allPics.push(productList[i]);
}
renderImages();
listeners();
removeButton();
