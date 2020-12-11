
// Create variables targetting the relevant DOM elements here 👇

// We've provided a few variables below
var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];

window.addEventListener('load', updateCover);

function buildNewCover() {
  var coverImgSrc = covers[getRandomIndex(covers)];
  var title = titles[getRandomIndex(titles)];
  var descriptor1 = descriptors[getRandomIndex(descriptors)];
  var descriptor2 = descriptors[getRandomIndex(descriptors)];

  return new Cover(coverImgSrc, title, descriptor1, descriptor2);
}

// Global cover variables
var coverImage = document.querySelector('.cover-image');
var coverTitle = document.querySelector('.cover-title');
var firstDescriptor = document.querySelector('.tagline-1');
var secondDescriptor = document.querySelector('.tagline-2');
var button = document.querySelector('.random-cover-button');

// Global view variables
var homeView = document.querySelector('.main-cover');
var savedView = document.querySelector('.saved-covers-section');
var formView = document.querySelector('.form-view');

// global control variables
var homeButton = document.querySelector('.home-button');
var randomButton = document.querySelector('.random-cover-button');
var saveButton = document.querySelector('.save-cover-button');
var formButton = document.querySelector('.make-new-button');
var viewSavedButton = document.querySelector('.view-saved-button');

// event listeners
randomButton.addEventListener('click', updateCover);
formButton.addEventListener('click', switchToFormView);
viewSavedButton.addEventListener('click', switchToSavedView);
homeButton.addEventListener('click', switchToHomeView);

//event handlers
function switchToFormView() {
  homeView.classList.add('hidden'); //hide home view
  savedView.classList.add('hidden'); //hide saved view
  formView.classList.remove('hidden'); //reveal form view
  homeButton.classList.remove('hidden'); //reveal home button
  randomButton.classList.add('hidden'); //hide random cover button
  saveButton.classList.add('hidden'); //hide saved cover button
}

function switchToSavedView() {
  homeView.classList.add('hidden'); //hide home view
  savedView.parentNode.classList.remove('hidden'); //reveal saved view
  formView.classList.add('hidden'); //hide form view
  homeButton.classList.remove('hidden'); //reveal home button
  randomButton.classList.add('hidden'); //hide random cover button
  saveButton.classList.add('hidden'); //hide saved cover button
}

function switchToHomeView() {
  homeView.classList.remove('hidden'); //reveal home view
  savedView.parentNode.classList.add('hidden'); //hide saved view
  formView.classList.add('hidden'); //hide form view
  homeButton.classList.add('hidden'); //hide home button
  randomButton.classList.remove('hidden'); //reveal cover button
  saveButton.classList.remove('hidden'); //reveal cover button
}

// other functions

function updateCover() {
  var currentCover = buildNewCover();

  coverImage.src = currentCover.cover;
  coverTitle.innerHTML = currentCover.title;
  firstDescriptor.innerHTML = currentCover.tagline1;
  secondDescriptor.innerHTML = currentCover.tagline2;
}


// **** create new book button functionality ****

var userCover = document.querySelector('input.user-cover');
var userTitle = document.querySelector('input.user-title');
var userDescriptor1 = document.querySelector('input.user-desc1');
var userDescriptor2 = document.querySelector('input.user-desc2');

var createNewBookButton = document.querySelector('button.create-new-book-button');

createNewBookButton.addEventListener('submit', function(event) {
  event.preventDefault();  // prevent reload??

  // push each piece of data into its respective array in data.js
  covers.push(userCover.value)
  titles.push(userTitle.value)
  descriptors.push(userDescriptor1.value)
  descriptors.push(userDescriptor2.value)

  // build new cover from class and unshift that to the savedCovers, so we can access it when we go
  // back to the home page
  var userCreatedCover = buildNewCover(userCover.value, userTitle.value, userDescriptor1.value, userDescriptor2.value);
  savedCovers.unshift(userCreatedCover)

  // change back to home by adding hidden to form-view and removing it from home

  // when at home, should load THIS new cover
  // use unshift to add to front, then we can use index 0 to access the first one.

});

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
