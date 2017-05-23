chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){

       localStorage["from"] = request.from;
       localStorage["subject"] = request.subject;
    }
);
