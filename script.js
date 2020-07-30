const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const mailBtn = document.getElementById('mail');
const wpBtn = document.getElementById('wp');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const dt = document.getElementById('year');

// Loading Spinner Shown
const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Remove Loading Spinner
const removeLoadingSpinner = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
let counter = 0;
const getQuote = async () => {
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
      quoteText.innerText = data.quoteText;
    }
    // Stop Loading, Show Quote
    removeLoadingSpinner();
  } catch (error) {
    counter++;
    if (counter < 50) {
      getQuote(); 
    } else {
      alert("Ooops, something gone wrong. Sorry about that. Please try again later.");
    } 
  }
}

// Email Quote
const mailQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const mySite = "https://costy42006.github.io/QuoteGenerator/";
  const emailIt = `mailto:name@email.com?subject=I found this nice quote on ${mySite}&body=${quote} - ${author}`;
  window.open(emailIt);
}

// WhatsApp Quote
 const wpQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const wpUrl = `https://api.whatsapp.com/send?text=${quote} - ${author}`;
  window.open(wpUrl);
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
mailBtn.addEventListener('click', mailQuote);
wpBtn.addEventListener('click', wpQuote);

// Get year for Footer
const getDate = () => {
  let d =  new Date();
  dt.innerText = d.getFullYear();
}

// Translate the page with Google Translate
googleTranslateElementInit = () =>
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');

  // On Load
getQuote();
getDate ();