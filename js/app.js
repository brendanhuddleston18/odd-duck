"use strict";

let picContainer = document.getElementById('pictures');
let reportContainer = document.getElementById('report');

let image1 = document.querySelector('#pictures img:first-child');
let image2 = document.querySelector('#pictures img:nth-child(2)');
let image3 = document.querySelector('#pictures img:nth-child(3)');

let state = {
  currentClicks: 0,
  totalClicks: 25,
  allPics: [],
}

function Product( name, image) {
  this.name = name;
  this.imgFile = image;
  this.votes = 0;
  this.views = 0;
  state.allGoats.push(this);
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
