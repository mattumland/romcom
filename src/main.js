// Create variables targeting the relevant DOM elements here 👇
// We've provided a few variables below
var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];

var coverImgSrc = covers[getRandomIndex(covers)]
var title = titles[getRandomIndex(titles)]
var descriptor1 = descriptors[getRandomIndex(descriptors)]
var descriptor2 = descriptors[getRandomIndex(descriptors)]

var currentCover = new Cover(coverImgSrc, title, descriptor1, descriptor2);

// Add your event listeners here 👇
var coverImage = document.querySelector('.cover-image');

coverImage.src = currentCover.cover;

// Create your event handlers and other functions here 👇


// We've provided one function to get you started
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
