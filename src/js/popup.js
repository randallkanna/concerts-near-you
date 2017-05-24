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
  chrome.storage.sync.get(['artist', 'events'], (items) => {
    render(
      <App artist={items.artist} events={items.events} />,
      appContainerNode
    );
  });
}

/*
  We continue to listen for messages to update the artist in case the artist name changes
  while the popup is open.
*/
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.sender === "background" && msg.type === "UPDATE_EVENTS") {
    unmountComponentAtNode(appContainerNode);

    render(
      <App artist={msg.artist} events={msg.events} />,
      appContainerNode
    );
  }
});
