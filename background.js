chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "youtubeOrNot") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log("hi")
      const currentTab = tabs[0];
      function isYouTubeVideo(url) {
        return url.includes("youtube.com") && url.includes("/watch");
      }
      const url = currentTab.url
      const isYouTube = isYouTubeVideo(currentTab.url);
      sendResponse({isYouTube,url}); // Send the result back to the content script
    });

    // Return true to indicate that sendResponse will be used asynchronously
    return true;
  }
});


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "getUrl"){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log("getting url")
      const currentTab = tabs[0];
      const url = currentTab.url
      console.log(url)
      sendResponse({url}); // Send the result back to the content script
    });
    return true;
  }
})
// error: reloading the page
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   console.log(tab.url)

//   function isYouTubeVideo(url) {
//             return url.includes("youtube.com") && url.includes("/watch");
//           }
//           const url=tab.url
//           const isYouTube = isYouTubeVideo(url);
//      if(isYouTube){
      
//       chrome.scripting.executeScript({target: {tabId: tabId},files: ['content.js'],})
         
//        console.log(tabId)
//   setTimeout(function(){
//           chrome.tabs.sendMessage(tabId,{msg:url},(response) => {
//                   console.log(response)
//               }
//           )},2000)
//      }
    
// });



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "getSession") {
    // fetch("http://localhost:3001/api/auth/session", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error("Failed to retreive session data");
    //     }
    //   })
    //   .then((session) => {
    //     sendResponse(session);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    return true;
  }
});

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.createNewTab) {
//     chrome.tabs.update(sender.tab.id, { url: message.url });
//   }
// });

// chrome.runtime.onInstalled.addListener(function () {
//   chrome.tabs.create({ url: "http://localhost:3000/installed" });
// });

// chrome.action.onClicked.addListener((tab) => {
//   chrome.tabs.create({ url: "http://localhost:3000/installed" });
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if ((request.type = "getPlan")) {
//     fetch("http://localhost:3000/api/plan_extension", {
//       method: "GET",
//       header: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error("Failed to retreive plan data");
//         }
//       })
//       .then((data) => {
//         sendResponse(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//     return true;
//   }
// });
