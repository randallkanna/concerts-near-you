import "../css/popup.css";
import App from "./popup/app_component.jsx";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

const appContainerNode = window.document.getElementById("app-container");

/*
  When the popup is opened, the window "loads", and we grab the artist from Chrome storage.
  We render the React component with the artist name.
*/
window.onload = () => {
  chrome.storage.sync.get(['artistData', 'range'], ({ artistData: { artist, similarArtists }, range}) => {
    render(
      <App artist={artist} similarArtists={similarArtists} range={range} />,
      appContainerNode
    );
  });
}

/*
  We continue to listen for messages to update the artist in case the artist name changes
  while the popup is open.
*/
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "UPDATE_ARTIST") {
    const { artistData: { artist, similarArtists } } = msg;
    unmountComponentAtNode(appContainerNode);

    render(
      <App artist={artist} similarArtists={similarArtists} />,
      appContainerNode
    );
  }
});
