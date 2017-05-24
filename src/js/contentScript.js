/*
  Content script does a bunch of work to scrape the artist name, update the Chrome extension,
  and observe the DOM for if the artist name changes.

  Thanks to javascript hoisting, the best way to understand this script is to read from top to bottom.
*/

/*
  1. Wait for artist name node to appear in order for us to setup the observer on it

  This uses a recursive requestAnimationFrame loop to keep checking the DOM for the node we want to
  observe. Essentially, to make sure we're on the webpage that has the artist name selector. Later,
  we may want to scope where this script is run better in the manifest.json settings.

  We also run updateArtistData to notify the Chrome extension the artist name as soon as it's detected.

  There is timeout of 10000ms (10seconds) to avoid memory leaks.
*/
let raf;
let startTime;

function onArtistLoad(timestamp) {
  const artistName = queryArtistName();
  const similarArtists = querySimilarArtists();
  const observerArtistNode = queryObserverArtistNode();
  const observerSimilarArtistNode = queryObserverSimilarArtistNode();

  if (!startTime) { startTime = timestamp}
  if (!!observerArtistNode && !!artistName && !!observerSimilarArtistNode && similarArtists.length > 0) {
    updateArtistData(artistName, similarArtists);
    setupArtistObserver();

    window.cancelAnimationFrame(raf);

  } else if (timestamp - startTime > 10000) {
    window.cancelAnimationFrame(raf);

  } else {
    raf = window.requestAnimationFrame(onArtistLoad);
  }
}

raf = window.requestAnimationFrame(onArtistLoad);

let smRaf;
let smStartTime;

function onSimilarArtistLoad(timestamp) {
  const observerSimilarArtistNode = queryObserverSimilarArtistNode();
  if (!smStartTime) { smStartTime = timestamp; }

  if (!!observerSimilarArtistNode) {
    const artistName = queryArtistName();
    const similarArtists = querySimilarArtists();
    updateArtistData(artistName, similarArtists);
    window.cancelAnimationFrame(smRaf);
  } else {
    smRaf = window.requestAnimationFrame(onSimilarArtistLoad);
  }
}

/*
  2. Continuously observes the artist name node for changes

  The callback in MutationObserver is what fires when the node changes. In this case,
  we only care when the artist name changes (ie: when the next song plays). That's when we
  fire updateArtistData to send an event to the Chrome extension.

  In every callback, we disconnect and reconnect the observer to the latest observer node
  so this will still fire for the next artist name change.
*/
function setupArtistObserver() {
  let artistName = queryArtistName();

  const observer = new MutationObserver(() => {
    const newArtistName = queryArtistName();
    const similarArtists = querySimilarArtists();

    if (artistName !== newArtistName) {
      smRaf = window.requestAnimationFrame(onSimilarArtistLoad);
      artistName = newArtistName;
      updateArtistData(artistName, similarArtists);
    }
    observer.observe(queryObserverArtistNode(), observerConfig);
  });

  observer.observe(queryObserverArtistNode(), observerConfig);
}

const ARTIST_NAME_SELECTOR = 'nowPlayingTopInfo__current__artistName';
const SIMILAR_ARTISTS_SELECTOR = 'SimilarArtistsItem--nowPlaying';
const SIMILAR_ARTIST_NAME_SELECTOR = 'SimilarArtistsItem__name';
const OBSERVER_ARTIST_NODE_SELECTOR = 'nowPlayingTopInfo__current';
const OBSERVER_SIMILAR_ARTISTS_NODE_SELECTOR = 'SimilarArtistsItem--nowPlaying';
const observerConfig = { attributes: true, childList: true, characterData: true };

function queryArtistName() {
  const node = document.getElementsByClassName(ARTIST_NAME_SELECTOR)[0];
  return (node && node.text) ? node.text.trim() : null;
}

function querySimilarArtists() {
  const nodes = document.getElementsByClassName(SIMILAR_ARTISTS_SELECTOR);
  const artists = [...nodes].reduce((results, node) => {
    const ele = node.querySelector(`.${SIMILAR_ARTIST_NAME_SELECTOR}`);

    results.push({
      name: (ele && ele.textContent) ? ele.textContent.trim() : null
    });

    return results;
  }, []);
  return artists;
}

function queryObserverArtistNode() {
  return document.getElementsByClassName(OBSERVER_ARTIST_NODE_SELECTOR)[0];
}

function queryObserverSimilarArtistNode() {
  return document.getElementsByClassName(OBSERVER_SIMILAR_ARTISTS_NODE_SELECTOR)[0];
}
/*
  3. Set artist in Chrome's storage and send message to the popup page (see popup.js)

  We set the artist on storage in case this function is called before the popup is opened.
  A message sent to popup when it is not opened will be missed. Storing the artist instorage allows
  the popup to still be able to find the latest artist.
*/

function updateArtistData(artist, similarArtists) {
  const artistData = {
    artist,
    similarArtists
  };

  chrome.storage.sync.set({
    'artistData': artistData
  });

  chrome.runtime.sendMessage({
    sender: 'contentScript',
    type: 'UPDATE_ARTIST',
    artistData
  });
}


chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "UPDATE_ARTIST_SELECTOR") {
    raf = window.requestAnimationFrame(onArtistLoad);
  }
});
