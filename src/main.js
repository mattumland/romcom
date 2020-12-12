// **** Global variables, general ****
var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];

// **** Global cover variables ****
var coverImage = document.querySelector('.cover-image');
var coverTitle = document.querySelector('.cover-title');
var firstDescriptor = document.querySelector('.tagline-1');
var secondDescriptor = document.querySelector('.tagline-2');

// **** Global view variables ****
var homeView = document.querySelector('.main-cover');
var savedView = document.querySelector('.saved-view');
var formView = document.querySelector('.form-view');
var savedCoversSection = document.querySelector('.saved-covers-section')

var altSavedView = document.getElementById("targetThis");

// **** global control variables ****
var homeButton = document.querySelector('.home-button');
var randomButton = document.querySelector('.random-cover-button');
var saveButton = document.querySelector('.save-cover-button');
var formButton = document.querySelector('.make-new-button');
var viewSavedButton = document.querySelector('.view-saved-button');

// **** event listeners ****
window.addEventListener('load', function() {
  var firstCover = createRandomCover();
  updateCover(firstCover);
});

randomButton.addEventListener('click', function() {
  var randomCover = createRandomCover()
  updateCover(randomCover)
});

formButton.addEventListener('click', switchToFormView);
viewSavedButton.addEventListener('click', switchToSavedView);
homeButton.addEventListener('click', switchToHomeView);
saveButton.addEventListener('click', saveCurrentCover)

// **** view switch functions ****
function switchToFormView() {
  homeView.classList.add("hidden"); //hide home view
  savedView.classList.add("hidden"); //hide saved view
  formView.classList.remove("hidden"); //reveal form view
  homeButton.classList.remove("hidden"); //reveal home button
  randomButton.classList.add("hidden"); //hide random cover button
  saveButton.classList.add("hidden"); //hide saved cover button
}

function switchToSavedView() {
  homeView.classList.add("hidden"); //hide home view
  savedView.classList.remove("hidden"); //reveal saved view
  formView.classList.add("hidden"); //hide form view
  homeButton.classList.remove("hidden"); //reveal home button
  randomButton.classList.add("hidden"); //hide random cover button
  saveButton.classList.add("hidden"); //hide saved cover button

  for (var i = 0; i < savedCovers.length; i++) {
    var injectThis = `
      <section class='mini-cover'>
        <img class="cover-image" src=${savedCovers[i].cover}>
        <h2 class="cover-title">${savedCovers[i].title}</h2>
        <h3 class="tagline">A tale of <span class="tagline-1">${savedCovers[i].tagline1}</span> and <span class="tagline-2">${savedCovers[i].tagline2}</span></h3>
        <img class="price-tag" src="./assets/price.png">
        <img class="overlay" src="./assets/overlay.png">
      </section>
    `;
    savedCoversSection.innerHTML = injectThis;
  }
}

function switchToHomeView() {
  homeView.classList.remove("hidden"); //reveal home view
  savedView.classList.add("hidden"); //hide saved view
  formView.classList.add("hidden"); //hide form view
  homeButton.classList.add("hidden"); //hide home button
  randomButton.classList.remove("hidden"); //reveal cover button
  saveButton.classList.remove("hidden"); //reveal cover button
}

// **** other functions ****
function createRandomCover() {
  var coverImgSrcRandom = covers[getRandomIndex(covers)];
  var titleRandom = titles[getRandomIndex(titles)];
  var descriptor1Random = descriptors[getRandomIndex(descriptors)];
  var descriptor2Random = descriptors[getRandomIndex(descriptors)];

  return new Cover(coverImgSrcRandom, titleRandom, descriptor1Random, descriptor2Random)
}

function buildNewCover(cover, title, desc1, desc2) {
  ///update global currentCover variable
  return new Cover(cover, title, desc1, desc2);
}

function updateCover(currentCover) {

  coverImage.src = currentCover.cover;
  coverTitle.innerHTML = currentCover.title;
  firstDescriptor.innerHTML = currentCover.tagline1;
  secondDescriptor.innerHTML = currentCover.tagline2;
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
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

  savedCovers.unshift(userCreatedCover); //this could cause repeat covers if a user inputs the same cover data into the form twice

  updateCover(userCreatedCover);

  switchToHomeView();

  event.preventDefault();

});


// can we add data attribute to our covers?? how hard would that be?
// or should we just use the cover name, since it's unique?
//   maybe first iteration we can use cover name and then we could try adding/removing data
//     attribute as a second iteration on this feature?
function deleteCover() {
  // grab the id of the current cover
  // find that id in the array of savedCovers
  // delete it using splice
  // ask for confirmation using a modal??

  var thisCover = document.querySelector('img')

  thisCover.addEventListener('dblclick', function (e) {
    // find it in the array
    var searchTerm = thisCover.src;

    // splice it out
    for (let i = 0; i < savedCovers.length; i++) {
      if (savedCovers[i].cover === searchTerm) {
        savedCovers.splice(i, 1)
      }
    }
  })

}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
// **** Save current cover functionality ****

function saveCurrentCover() {

  // THIS CURRENTLY PRODUCES AN UNDEFINED COVER AND ADDS IT TO savedCovers. HOW DO WE ACCESS THE VALUE OF THE COVER THAT IS CURRENTLY BEING DISPLAYED?
  var visibleCover = new Cover(coverImage.value, coverTitle.value, descriptor1.value, descriptor2.value) //create new cover object based on the currently visible cover
  // console.log(coverImage.value);
  var isRepeat = false;
  for (var i = 0; i < savedCovers.length; i++) {
    if (visibleCover === savedCovers[i]) {
      isRepeat = true
    }
  }
  if (isRepeat === false) {
    savedCovers.unshift(visibleCover);
  }
  console.log(savedCovers);
}
