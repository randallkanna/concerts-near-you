// Saves options to chrome.storage.sync.
function save_options() {
  var range = document.getElementById('range').value;
  chrome.storage.sync.set({
    range: range
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function close_options_dialog(){
  window.close();
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    range: 100,
  }, function(items) {
    document.getElementById('range').value = items.range;
  });
}

//Make sure we have default value available to application
/*
(function set_default_options(){
  chrome.storage.sync.set({range: -1});
  console.log("Setting default range value. ");
})();
*/

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('close').addEventListener('click', close_options_dialog);