// Saves options to chrome.storage.sync.
function save_options() {
  var pageLimit = document.getElementById('pageLimit').value;
  chrome.storage.sync.set({
    pageLimit: pageLimit
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
    pageLimit: 100,
    likesColor: true
  }, function(items) {
    document.getElementById('pageLimit').value = items.pageLimit;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('close').addEventListener('click', close_options_dialog);