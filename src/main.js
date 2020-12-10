
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

var coverImage = document.querySelector('.cover-image');
var coverTitle = document.querySelector('.cover-title');
var firstDescriptor = document.querySelector('.tagline-1');
var secondDescriptor = document.querySelector('.tagline-2');
var button = document.querySelector('.random-cover-button');


var button = document.querySelector('.random-cover-button');
button.addEventListener('click', updateCover);

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


// We've provided one function to get you started
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
