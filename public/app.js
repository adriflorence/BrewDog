const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest(); // create new XML Http Request object
  request.open("GET", url); // set the type of request
  request.addEventListener('load', callback);
  request.send(); // send the request
};

const requestComplete = function () { // callback
  if(this.status !== 200) return;
  const jsonString = this.responseText; // JSON FORMAT
  const beers = JSON.parse(jsonString); // ARRAY OF COUNTRY OBJECTS
  populateList(beers);
  getBeer(beers);
};

const populateList = function (beers) {
  let select = document.getElementById('beer-list');
  beers.forEach(function(beer, index) {
    let option = document.createElement('option');
    option.innerText = beer.name;
    option.value = index;
    select.appendChild(option);
  });
};

const getBeer = function (beers) {
  let select = document.getElementById('beer-list');
  select.addEventListener('change', function() {
    const selected = beers[this.value];
    displayBeerInfo(selected);
    displayImage(selected);
    displayIngredients(selected);
  });
};

const displayImage = function (selected) {
  let imageArea = document.getElementById('image');
  let img = document.createElement('img');
  imageArea.appendChild(img);
  img.src = selected.image_url;
};

const displayIngredients = function (selected) {

  let ingredients = selected.ingredients;
  let malts = ingredients.malt;
  let hops = ingredients.hops;
  let yeast = ingredients.yeast;

  let ingredientsTag = document.getElementById('ingredients');
  clearUlContent();

  ingredientsTag.innerText = "Ingredients: ";
  // malts
  let maltUl = document.createElement('ul');
  maltUl.innerText = "malts: ";
  ingredientsTag.appendChild(maltUl);
  malts.forEach(function(malt) {
    let li = document.createElement('li');
    maltUl.appendChild(li);
    li.innerText = malt.name;
  });
  // hops
  let hopUl = document.createElement('ul');
  hopUl.innerText = "hops: ";
  ingredientsTag.appendChild(hopUl);
  hops.forEach(function(hop) {
    let li = document.createElement('li');
    hopUl.appendChild(li);
    li.innerText = hop.name;
  });
  // yeast
  let yeastUl = document.createElement('ul');
  yeastUl.innerText = `yeast: ${selected.yeast}`;
  ingredientsTag.appendChild(hopUl);
};

const displayBeerInfo = function (selected) {
  let displayArea = document.getElementById('beer-info');
  let name = document.getElementById('name');
  let tagline = document.getElementById('tagline');
  let image = document.getElementById('image');
  name.innerText = `${selected.name}`;
  tagline.innerText = `${selected.tagline}`;
  image.src = selected.image_url;
};

const clearUlContent = function() {
  const ingredientsTag = document.getElementById('ingredients');
  ingredientsTag.innerHTML = '';
};

var app = function(){
  const url = 'https://api.punkapi.com/v2/beers';
  makeRequest(url, requestComplete);
};

window.addEventListener('load', app);
