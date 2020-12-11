
window.addEventListener('load', function() {
  var firstCover = createRandomCover();
  updateCover(firstCover);
});

var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];

// Global cover variables
var coverImage = document.querySelector('.cover-image');
var coverTitle = document.querySelector('.cover-title');
var firstDescriptor = document.querySelector('.tagline-1');
var secondDescriptor = document.querySelector('.tagline-2');

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
randomButton.addEventListener('click', function() {
  var randomCover = createRandomCover()
  updateCover(randomCover)
});

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
function createRandomCover() {
  var coverImgSrcRandom = covers[getRandomIndex(covers)];
  var titleRandom = titles[getRandomIndex(titles)];
  var descriptor1Random = descriptors[getRandomIndex(descriptors)];
  var descriptor2Random = descriptors[getRandomIndex(descriptors)];

  return new Cover(coverImgSrcRandom, titleRandom, descriptor1Random, descriptor2Random)
}

function buildNewCover(cover, title, desc1, desc2) {
  return new Cover(cover, title, desc1, desc2);
}

function updateCover(currentCover) {

  coverImage.src = currentCover.cover;
  coverTitle.innerHTML = currentCover.title;
  firstDescriptor.innerHTML = currentCover.tagline1;
  secondDescriptor.innerHTML = currentCover.tagline2;
}


// **** create new book button functionality ****

var userCover = document.querySelector('.user-cover');
var userTitle = document.querySelector('.user-title');
var userDescriptor1 = document.querySelector('.user-desc1');
var userDescriptor2 = document.querySelector('.user-desc2');

var createNewBookButton = document.querySelector('.create-new-book-button');

createNewBookButton.addEventListener('click', function(event) {
  covers.push(userCover.value)
  titles.push(userTitle.value)
  descriptors.push(userDescriptor1.value)
  descriptors.push(userDescriptor2.value)

  var userCreatedCover = buildNewCover(userCover.value, userTitle.value, userDescriptor1.value, userDescriptor2.value);
  savedCovers.unshift(userCreatedCover);
  console.log(userCreatedCover)

  updateCover(userCreatedCover);

  switchToHomeView();

  event.preventDefault();

});

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
