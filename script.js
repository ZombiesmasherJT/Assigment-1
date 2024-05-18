//form loading icon javascript code
document.getElementById('search-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the default search form submission.
  
    document.getElementById('loading').style.display = 'block';
    //will get element from the html and show the loading giff
    await new Promise(resolve => setTimeout(resolve, 400)); // delays the amount of seconds that the loading giff will be on for.
    // this will then hide the loading giff
    document.getElementById('loading').style.display = 'none';
});
// Defined variables
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const resultTemplate = document.getElementById('result-template').content;

// Event listener for the form submission
searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const searchTerm = searchInput.value;
    resultsContainer.innerHTML = ''; // Clear previous results

    if (searchTerm) {
        try {
            const response = await fetch(`https://api.vam.ac.uk/v2/objects/search?q_object_title=${searchTerm}&data_profile=full&images=true`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const records = data.records;

            records.forEach(record => {
                const clone = document.importNode(resultTemplate, true);
    
                clone.querySelector('.result-title').textContent = record._primaryTitle || 'No title available';
                clone.querySelector('.result-image').src = `https://framemark.vam.ac.uk/collections/${record._primaryImageId}/full/!100,100/0/default.jpg`;
                clone.querySelector('.result-image').alt = record._imageurl || 'Result API image';
                clone.querySelector('.result-description').textContent = record.physicalDescription || 'No description available';
                clone.querySelector ('.result-date').textContent = record._primaryDate || 'No date available'; // Fallback if date is not present
                clone.querySelector ('.result-place').textContent = record._primaryPlace || 'No place of origin avaliable available'; // Fallback if place is not present

                resultsContainer.appendChild(clone);
            });
        } catch (error) {
            console.error('Error:', error);
            resultsContainer.innerHTML = '<p>There was an error fetching the data.</p>'; // Provides feedback in the UI
        }
    } else {
        // Displays an error message if the search term is empty
        resultsContainer.innerHTML = '<p class="error-message">Please enter a search term.</p>';
    }
});
// Event listener for the form submission
searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const searchTerm = searchInput.value.trim();
    resultsContainer.innerHTML = ''; // Clear previous results
    const gibberishPattern = /[^aeiouy]{5,}|[qwrtpsdfghjklzxcvbnm]{4,}/i;
    // Check the searchTerm against the gibberishPattern i have created
    if (gibberishPattern.test(searchTerm)) {
        // If the pattern matches, it will be classed as jibberish and the pattern will not run
        resultsContainer.innerHTML = '<p class="error-message">Not found. Please enter a valid search term.</p>';
        return; // Exit the function early
    }
    if (searchTerm) {
        // If the searchTerm doesnt match the gib pattern then it will continue on with the search term.
    } else {
        // this shows a message if you dont have anything in the search box this pop up message will apperar
        resultsContainer.innerHTML = '<p class="error-message">Please enter a search term.</p>';
    }
});