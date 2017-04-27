$(init);

function init() {
  if($('.podcast-container').length !== 0) getTopPodcasts();
  $('.search-podcasts').on('submit', searchForPodcasts);
  $('.podcasts-search-results').on('click', 'div', postPodcastToPlaylist);
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
  e.preventDefault();
  $('.podcasts-search-results').empty();
  const query = $(this).find('input[type=search]').val();

  $
  .get(`http://localhost:3000/podcasts/get/${query}`)
  .done(data => {
    $(this).find('input[type=search]').val('');

    data.results.forEach(podcast => {
      $(`
        <div
          class="podcast-result"
          data-feedurl="${podcast.feedUrl}"
          data-artwork="${podcast.artworkUrl600}"
          data-collection="${podcast.collectionName}"
          data-artist="${podcast.artistName}">
            <img src="${podcast.artworkUrl600}">
        </div>
        `).appendTo('.podcasts-search-results');
    });

    $('.podcasts-search-results').slick({
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });
  });
}

function postPodcastToPlaylist() {
  console.log('init');
  const podcastData = {
    title: $(this).attr('data-collection').split('(')[0],
    artist: $(this).attr('data-artist'),
    image: $(this).attr('data-artwork'),
    feedUrl: $(this).attr('data-feedurl')
  };

  $
    .post('http://localhost:3000/podcasts', podcastData)
    .done(() => {
      $(this).find('img').css('opacity', '.3');
      $('<span>Added to Playlist</span>').appendTo($(this));
    });
}
