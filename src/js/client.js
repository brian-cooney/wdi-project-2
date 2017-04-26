$(init);

function init() {
  if($('.podcast-container').length !== 0) getTopPodcasts();
  $('.search-podcasts').on('submit', searchForPodcasts);
  $('.podcasts-search-results').on('click', 'li button', getPodcastData);
}

function getTopPodcasts() {
  $
  .get('https://itunes.apple.com/us/rss/toppodcasts/genre=1318/json')
  .done(data => {
    const json = JSON.parse(data);
    json.feed.entry.forEach(podcast => {
      $(`<div =class"col-3">
          <img src="${podcast['im:image'][2].label}">
        </div>`).appendTo('.podcast-container');
    });
  });
}

function searchForPodcasts(e) {
  $('.podcasts-search-results').empty();
  e.preventDefault();
  const query = $(this).find('input[type=search]').val();

  $
    .get(`http://localhost:3000/podcasts/get/${query}`)
    .done(data => {
      $(this).find('input[type=search]').val('');

      data.results.forEach(podcast => {
        $(`
          <div class=" col-3 result" data-feedurl="${podcast.feedUrl}">
            <img src="${podcast.artworkUrl100}">
            <h4>${podcast.collectionName}</h4>
            <h6>${podcast.artistName}</h6>
            <button class="btn btn-success">Add Podcast</button>
          </div>
          `).appendTo('.podcasts-search-results');
      });
    });
}

function getPodcastData() {
  const podcastData = {
    title: $(this).parent().find('h4').text().split('(')[0],
    artist: $(this).parent().find('h6').text(),
    image: $(this).parent().find('img').attr('src'),
    feedUrl: $(this).parent().attr('data-feedurl')
  };

  $.post('http://localhost:3000/podcasts', podcastData);
}
