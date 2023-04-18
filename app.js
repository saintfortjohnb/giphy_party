console.log("Let's get this party started!");

const form = $('#search-form');
const gifContainer = $('#gif-container');
const clearButton = $('#clear-button');
const searchInput = $('#search-input');

form.on('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.val();
  const apiKey = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym';
  const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}`;

  $.ajax({
    url: apiUrl,
    method: 'GET'
  })
    .done(response => {
      if (response.data.length === 0) {
        console.log('No GIFs found for the provided search term.');
        return;
      }
      
      const randomIndex = Math.floor(Math.random() * response.data.length);
      const gifUrl = response.data[randomIndex].images.downsized_medium.url;
      const gif = $('<img>');
      gif.attr('src', gifUrl);
      gifContainer.append(gif);

      searchInput.val('');
    })
    .fail(error => {
      console.log(error);
    });
});

clearButton.on('click', () => {
  gifContainer.html('');
});
