
let transcript = ""
chrome.runtime.sendMessage({ type: "youtubeOrNot" }, function (response) {
if (response) {
  console.log("1. is YT long video")
  const slider = document.createElement("div");
  slider.classList="slider-007"
  document.body.appendChild(slider); 
  const sidebar = document.createElement("div")
  sidebar.classList="sidebar-007"
  document.body.appendChild(sidebar);
  slider.onclick= function(){
    sidebar.classList.toggle("sidebar-active-007")
    slider.classList.toggle("slider-active-007")
    sidebar.style.display = sidebar.style.display == 'block' ? 'none' : 'block'
  }
  const sidebarBody = document.createElement("div")
  sidebar.appendChild(sidebarBody)
  sidebarBody.classList="sidebarBody-007"

  //adding the icon to the slider
    const img = document.createElement('img');

 
  img.src =chrome.runtime.getURL("icon.png"); 
  img.alt = 'icon';
  img.width = 35;
  img.height = 35;
  slider.appendChild(img);
  //creating the chatbox
  sidebarBody.innerHTML=`
   <div class="chat-container">
    <div class="header-chat007" id="header-chat007">
    <h1 class="ghostsai-logo-sexy">GhostsAI</h1>
    <div class="profile-pic-sexy"></div>
    </div>
    <div class="messages-container" id="messages"></div>
    <form id="prospects_form" method="post">
    <div class="message-input-container">
      <input type="text" id="messageInput" placeholder="Type a message...">
      <button id="sendButton" type="submit" onclick="handleSubmit()">Send</button>
    </div>
    </form>
  </div>
  `
  const messagesDiv = document.getElementById('messages');
  const messageInput = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');
  const form = document.getElementById('prospects_form')

  form.addEventListener('submit', function(e) { 
    e.preventDefault()
    const message = messageInput.value;
    
    displayMessage(message, true);

    fetch("https://ghostsai-extension.vercel.app/api/gemini", {
    // fetch("http://localhost:3000/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcript, message}),
    })
      .then((response) => response.json())
      .then((data)=>{
        const reply= data.generatedText
        displayMessage(reply)
        console.log(reply)
      })
    messageInput.value = '';
  });

  function displayMessage(message, isSender = false) {
    const messageContainer = document.createElement('div');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    
    messageContainer.classList.add('message-container');
    
    if (isSender) {
      messageContainer.classList.add('sender-message-container');
      messageElement.classList.add('message-bubble', 'sender-message-bubble');
    } else {
      messageElement.classList.add('message-bubble');
    }
    
    messageContainer.appendChild(messageElement);
    messagesDiv.appendChild(messageContainer);
    
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }


  setTimeout(function () {
          const showTranscriptButton = document.querySelector(
            'button[aria-label="Show transcript"]'
          );
        
      if (showTranscriptButton) {
        console.log("2. has Transcript")
        showTranscriptButton.click();
        const contentWrapper = document.querySelector(
          'ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-searchable-transcript"]'
        );
        if (contentWrapper) {
          // contentWrapper.style.display = "none";
          console.log("3. Has content wrapper")
          // let transcript = ""
          setTimeout(()=>{
            console.log("4. started workin on transcript")
            ;
            const contentWrap = contentWrapper.querySelector("#content");
            let transcriptElement1 = contentWrap.querySelector(
              "ytd-transcript-renderer"
            );
            let transcriptElement2 = transcriptElement1.querySelector(
              "#segments-container"
            );
            let transcriptElement3 = transcriptElement2.querySelectorAll(
              "yt-formatted-string"
            );
            let transcriptElement4 = transcriptElement2.querySelectorAll(
              ".segment-timestamp"
            );
            if (transcriptElement4) {
              let i=0;
              transcriptElement4.forEach((string) =>{
                transcript+=string.innerHTML
                transcript+=transcriptElement3[i].innerHTML
                // console.log(transcript)
                i++;
              });
              
            }
            // if (transcriptElement3) {
            //   transcriptElement3.forEach((string) =>{
            //     transcript+=string.innerHTML
                
            //     console.log(transcript)
            //   });
              
            // }

          },10000)
     
        }

      }
    },3000)




  }

})