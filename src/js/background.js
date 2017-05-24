import { getSecretURL } from "secrets";

chrome.runtime.onMessage.addListener(({ sender, type, artist, geo}) => {
  if (sender === "contentScript" && type === "UPDATE_ARTIST") {
    chrome.storage.sync.set({'artist': artist})

    const url = getSecretURL(encodeURIComponent(artist), geo);

    if (artist) {
      fetchEvents(url).then(sendEventsToPopup).catch(console.log);
    }
  }
});

function fetchEvents(url) {
  return fetch(url).then(r => r.json()).then(({ _embedded }) => {
    if (!_embedded) {
      return { events: [] };
    }

    const events = _embedded.events.map((event) => {
      const date = event.dates.start.dateTime;
      const venue = event._embedded.venues[0].name;
      const city = event._embedded.venues[0].city.name;
      const name = event.name;
      const image = event.images[0].url;
      const id = event.id;

      return {
        date,
        venue,
        name,
        image,
        city,
        eventId: id
      };
    });

    return { events };
  });
}

function sendEventsToPopup({ events }) {
  chrome.storage.sync.set({'events': events});

  chrome.storage.sync.get(['artist'], ({artist}) => {
    chrome.runtime.sendMessage({
      sender: 'background',
      type: 'UPDATE_EVENTS',
      artist,
      events
    });
  });
}
