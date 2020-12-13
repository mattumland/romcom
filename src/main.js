// **** Global variables, general ****
var savedCovers = [];
var visibleCover = {};

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
var savedSectionSelector = document.querySelector('.saved-covers-section');

// **** global control variables ****
var homeButton = document.querySelector('.home-button');
var randomButton = document.querySelector('.random-cover-button');
var saveButton = document.querySelector('.save-cover-button');
var formButton = document.querySelector('.make-new-button');
var viewSavedButton = document.querySelector('.view-saved-button');

// **** global user-created cover variables ****
var userCover = document.querySelector('.user-cover');
var userTitle = document.querySelector('.user-title');
var userDescriptor1 = document.querySelector('.user-desc1');
var userDescriptor2 = document.querySelector('.user-desc2');
var createNewBookButton = document.querySelector('.create-new-book-button');

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
saveButton.addEventListener('click', saveVisibleCover)

// **** create new book button functionality ****
createNewBookButton.addEventListener('click', function(event) {
  event.preventDefault();

  covers.push(userCover.value);
  titles.push(userTitle.value);
  descriptors.push(userDescriptor1.value);
  descriptors.push(userDescriptor2.value);

  var userCreatedCover = buildNewCover(userCover.value, userTitle.value, userDescriptor1.value, userDescriptor2.value);
  updateCover(userCreatedCover);

  saveVisibleCover();
  switchToHomeView();
});

savedSectionSelector.addEventListener('dblclick', function(e) {
  var deleteThis = e.target.getAttribute('data-id');

  for (let i = 0; i < savedCovers.length; i++) {
    if (savedCovers[i].id == deleteThis) {
      savedCovers.splice(i, 1);
    }
  }
  switchToSavedView();
})

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

  var result = "";

  for (var i = 0; i < savedCovers.length; i++) {
    result += `
      <section class='mini-cover' >
        <img class="cover-image" data-id=${savedCovers[i].id} src=${savedCovers[i].cover}>
        <h2 class="cover-title" data-id=${savedCovers[i].id}>${savedCovers[i].title}</h2>
        <h3 class="tagline" data-id=${savedCovers[i].id}>A tale of <span class="tagline-1" data-id=${savedCovers[i].id}>${savedCovers[i].tagline1}</span> and <span class="tagline-2" data-id=${savedCovers[i].id}>${savedCovers[i].tagline2}</span></h3>
        <img class="price-tag" src="./assets/price.png" data-id=${savedCovers[i].id}>
        <img class="overlay" src="./assets/overlay.png">
      </section>
    `
  };
  savedCoversSection.innerHTML = result;
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

function saveVisibleCover() {
  if (!savedCovers.includes(visibleCover)) {
    savedCovers.push(visibleCover);
  }
}

function buildNewCover(cover, title, desc1, desc2) {
  visibleCover = new Cover(cover, title, desc1, desc2);
  return visibleCover;
}

function createRandomCover() {
  var coverImgSrcRandom = covers[getRandomIndex(covers)];
  var titleRandom = titles[getRandomIndex(titles)];
  var descriptor1Random = descriptors[getRandomIndex(descriptors)];
  var descriptor2Random = descriptors[getRandomIndex(descriptors)];

  return buildNewCover(coverImgSrcRandom, titleRandom, descriptor1Random, descriptor2Random);
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
