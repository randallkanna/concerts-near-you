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

  We also run updateArtist to notify the Chrome extension the artist name as soon as it's detected.

  There is timeout of 10000ms (10seconds) to avoid memory leaks.
*/
let raf;
let startTime;

function onArtistLoad(timestamp) {
  const artistName = queryArtistName();
  const observerNode = queryObserverNode();

  if (!startTime) { startTime = timestamp}

  if (!!observerNode && !!artistName) {
    findEventsNearYou(artistName);
    setupObserver();
    window.cancelAnimationFrame(raf);

  } else if (timestamp - startTime > 10000) {
    window.cancelAnimationFrame(raf);

  } else {
    raf = window.requestAnimationFrame(onArtistLoad);
  }
}

raf = window.requestAnimationFrame(onArtistLoad);

/*
  2. Continuously observes the artist name node for changes

  The callback in MutationObserver is what fires when the node changes. In this case,
  we only care when the artist name changes (ie: when the next song plays). That's when we
  fire updateArtist to send an event to the Chrome extension.

  In every callback, we disconnect and reconnect the observer to the latest observer node
  so this will still fire for the next artist name change.
*/
function setupObserver() {
  let artistName = queryArtistName();

  const observer = new MutationObserver(() => {
    const newArtistName = queryArtistName();

    if (artistName !== newArtistName) {
      artistName = newArtistName;
      findEventsNearYou(artistName);
    }

    observer.disconnect();
    observer.observe(queryObserverNode(), observerConfig);
  });

  observer.observe(queryObserverNode(), observerConfig);
}

const ARTIST_NAME_SELECTOR = 'nowPlayingTopInfo__current__artistName';
const OBSERVER_NODE_SELECTOR = 'nowPlayingTopInfo__current';
const observerConfig = { attributes: true, childList: true, characterData: true };

function queryArtistName() {
  const node = document.getElementsByClassName(ARTIST_NAME_SELECTOR)[0];
  return (node && node.text) ? node.text.trim() : null;
}

function queryObserverNode() {
  return document.getElementsByClassName(OBSERVER_NODE_SELECTOR)[0];
}

/*
  3. Finds events near you for an artist

  Checks geolocation then sends message to backgroundjs
*/

function findEventsNearYou(artist) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      updateArtist({artist, coords: position.coords});
    });
  } else {
    updateArtist({artist});
  }
}

function updateArtist({artist, coords}) {
  let geo;

  if (!coords) { geo = null; }
  else {
    geo = {
      longitude: coords.longitude,
      latitude: coords.latitude
    };
  }

  chrome.runtime.sendMessage({
    sender: 'contentScript',
    type: 'UPDATE_ARTIST',
    artist,
    geo
  });
}

