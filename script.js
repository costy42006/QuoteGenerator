const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const dt = document.getElementById('year');

// Loading Spinner Shown
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Remove Loading Spinner
function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
let counter = 0;
async function getQuote() {
  showLoadingSpinner();
  // We need to use a Proxy URL to make our API call in order to avoid a CORS error
  const proxyUrl = 'https://frozen-reef-89457.herokuapp.com/';
  const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
 
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // Check if Author field is blank and replace it with 'Unknown'
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // Dynamically reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    // Stop Loading, Show Quote
    removeLoadingSpinner();
  } catch (error) {
    counter++;
    if (counter < 10) {
      getQuote(); 
    } else {
      alert("Ooops, something gone wrong. Sorry about that. Please try again later.");
    } 
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// Get year for Footer
function getDate () {
  let d =  new Date();
  dt.innerText = d.getFullYear();
}

// On Load
getQuote();
getDate ();