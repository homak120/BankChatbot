//dynamicStyles.js
//Google Fonts Link For Icons
function setChatbotStyles(root) {
    const link1 = document.createElement('link');
    link1.rel = 'stylesheet';
    link1.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0';
    document.head.appendChild(link1);

    const link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0';
    document.head.appendChild(link2);
    const styles = `

/* fallback */
@font-face {
  font-family: 'Material Symbols Rounded';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialsymbolsrounded/v228/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDJ_vb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOc7TOVpeRL2w5rwZu2rIelXxeJKJBiCa8.woff2) format('woff2');
}

.material-symbols-rounded {
  font-family: 'Material Symbols Rounded';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

/* fallback */
@font-face {
  font-family: 'Material Symbols Outlined';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialsymbolsoutlined/v228/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1n-q_4MrImHCIJIZrDCvHOejbd5zrDAt.woff2) format('woff2');
}

.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

    /* Import Google font - Poppins */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
    }


    .chatbot-toggler {
    position: fixed;
    bottom: 30px;
    right: 35px;
    outline: none;
    border: none;
    height: 50px;
    width: 50px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #005eb8;
    transition: all 0.2s ease;
    }

    #chatbot-container.show-chatbot .chatbot-toggler {
    transform: rotate(90deg);
    }

    .chatbot-toggler span {
    color: #fff;
    position: absolute;
    }

    .chatbot-toggler span:last-child,
    #chatbot-container.show-chatbot .chatbot-toggler span:first-child {
    opacity: 0;
    }

    #chatbot-container.show-chatbot .chatbot-toggler span:last-child {
    opacity: 1;
    }

    .chatbot {
    position: fixed;
    right: 35px;
    bottom: 90px;
    width: 420px;
    background: #fff;
    border-radius: 15px;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
    transform: scale(0.5);
    transform-origin: bottom right;
    box-shadow: 0 0 128px 0 rgba(0, 0, 0, 0.1),
        0 32px 64px -48px rgba(0, 0, 0, 0.5);
    transition: all 0.1s ease;
    }

    #chatbot-container.show-chatbot .chatbot {
    opacity: 1;
    pointer-events: auto;
    transform: scale(1);
    }

    .chatbot header {
    padding: 16px 0;
    position: relative;
    text-align: center;
    color: #fff;
    background: #005eb8;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .chatbot header span {
    position: absolute;
    right: 15px;
    top: 50%;
    display: none;
    cursor: pointer;
    transform: translateY(-50%);
    }

    header h2 {
    font-size: 1.4rem;
    }

    .chatbot .chatbox {
    overflow-y: auto;
    height: 410px;
    padding: 30px 20px 100px;
    }

    .chatbot :where(.chatbox, textarea)::-webkit-scrollbar {
    width: 6px;
    }

    .chatbot :where(.chatbox, textarea)::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 25px;
    }

    .chatbot :where(.chatbox, textarea)::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 25px;
    }

    .chatbox .chat {
    display: flex;
    list-style: none;
    }

    .chatbox .outgoing {
    margin: 20px 0;
    justify-content: flex-end;
    }

    .chatbox .incoming span {
    width: 32px;
    height: 32px;
    color: #fff;
    cursor: default;
    text-align: center;
    line-height: 32px;
    align-self: flex-end;
    background: #005eb8;
    border-radius: 4px;
    margin: 0 10px 7px 0;
    }

    .chatbox .chat p {
    white-space: pre-wrap;
    padding: 12px 16px;
    border-radius: 10px 10px 0 10px;
    max-width: 75%;
    color: #fff;
    font-size: 0.95rem;
    background: #005eb8;
    }

    .chatbox .incoming p {
    border-radius: 10px 10px 10px 0;
    }

    .chatbox .chat p.error {
    color: #721c24;
    background: #f8d7da;
    }

    .chatbox .incoming p {
    color: #000;
    background: #f2f2f2;
    }

    .chatbot .chat-input {
    display: flex;
    gap: 5px;
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #fff;
    padding: 3px 20px;
    border-top: 1px solid #ddd;
    }

    .chat-input textarea {
    height: 55px;
    width: 100%;
    border: none;
    outline: none;
    resize: none;
    max-height: 180px;
    padding: 15px 15px 15px 0;
    font-size: 0.95rem;
    }

    .chat-input span {
    align-self: flex-end;
    color: #005eb8;
    cursor: pointer;
    height: 55px;
    display: flex;
    align-items: center;
    visibility: hidden;
    font-size: 1.35rem;
    }

    .chat-input textarea:valid~span {
    visibility: visible;
    }

    @media (max-width: 490px) {
    .chatbot-toggler {
        right: 20px;
        bottom: 20px;
    }

    .chatbot {
        right: 0;
        bottom: 0;
        height: 100%;
        border-radius: 0;
        width: 100%;
    }

    .chatbot .chatbox {
        height: 90%;
        padding: 25px 15px 100px;
    }

    .chatbot .chat-input {
        padding: 5px 15px;
    }

    .chatbot header span {
        display: block;
    }
    }
    `;

/*
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    root.appendChild(styleSheet);
    */


    const sheet = new CSSStyleSheet();
    sheet.replaceSync(styles);
    root.adoptedStyleSheets = [sheet];
    
}


//loadChatbot.js
function RenderChatbot() {
    
    const body = document.body;
    const host = document.createElement("div");
    body.insertBefore(host, body.firstChild);
    const shadow = host.attachShadow({ mode: 'open' });
    setChatbotStyles(shadow);

    const chatbotContainer = document.createElement("div");
    chatbotContainer.id = "chatbot-container";
    host.shadowRoot.appendChild(chatbotContainer);

    chatbotContainer.innerHTML = `
      <button class="chatbot-toggler" style="z-index: 9999;">
        <span class="material-symbols-rounded">mode_comment</span>
        <span class="material-symbols-outlined">close</span>
      </button>
      <div class="chatbot" style="z-index: 9999;">
        <header>
          <h2>Digital Teller</h2>
          <span class="close-btn material-symbols-outlined">close</span>
        </header>
        <ul class="chatbox">
          <li class="chat incoming">
            <span class="material-symbols-outlined">smart_toy</span>
            <p>Hi there 👋<br />I’m your Digital Teller. I’m here to help you open an account and answer any questions along the way. How can I assist you today?</p>
          </li>
        </ul>
        <div class="chat-input">
          <textarea placeholder="Enter a message..." spellcheck="false" required></textarea>
          <span id="send-btn" class="material-symbols-rounded">send</span>
        </div>
      </div>
    `;

    // Initialize the chatbot
    initializeChatbot(host.shadowRoot);
  }
function isLocalhost() {
    const hostname = window.location.hostname;
    return (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '[::1]' ||
        // Check for 127.0.0.0/8 range (e.g., 127.0.0.2)
        hostname.match(/^127\.\d+\.\d+\.\d+$/)
    );
}
if (isLocalhost()) {
    document.addEventListener("DOMContentLoaded", RenderChatbot);
} else {
    RenderChatbot();
}

//script.js
function initializeChatbot(root) {
  const chatbotContainer = root.querySelector("#chatbot-container");
  const chatbotToggler = root.querySelector(".chatbot-toggler");
  const closeBtn = root.querySelector(".close-btn");
  const chatbox = root.querySelector(".chatbox");
  const chatInput = root.querySelector(".chat-input textarea");
  const sendChatBtn = root.querySelector(".chat-input span");

  let userMessage = null; // Variable to store user's message
  const inputInitHeight = chatInput.scrollHeight;

  // API configuration
  const API_KEY = "PASTE-YOUR-API-KEY"; // Your API key here
  //const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
  //const API_URL = `http://localhost:11434/api/generate`;
  const API_URL = `http://localhost:5566/api/generate`;

  const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
  };

  const generateResponse = async (chatElement) => {
    const messageElement = chatElement.querySelector("p");

    // Define the properties and message for the API request
    /*
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: userMessage }],
          },
        ],
      }),
    };
    */
    const requestBody = {
      model: "deepseek-r1:1.5b",  // Ensure you have this model installed in Ollama
      prompt: userMessage,
      stream: false
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    };

    // Send POST request to API, get response and set the reponse as paragraph text
    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);

      // Get the API response text and update the message element

      // Remove think portion to keep the output simple
      const cleanedResponse = data.response.replace(/<think>.*<\/think>\s*/s, '');
      messageElement.textContent = cleanedResponse;
      //messageElement.textContent = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1");
    } catch (error) {
      // Handle error
      messageElement.classList.add("error");
      messageElement.textContent = error.message;
    } finally {
      chatbox.scrollTo(0, chatbox.scrollHeight);
    }
  };

  const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
      // Display "Thinking..." message while waiting for the response
      const incomingChatLi = createChatLi("Typing...", "incoming");
      chatbox.appendChild(incomingChatLi);
      chatbox.scrollTo(0, chatbox.scrollHeight);
      generateResponse(incomingChatLi);
    }, 600);
  };

  chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
  });

  chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleChat();
    }
  });

  sendChatBtn.addEventListener("click", handleChat);
  closeBtn.addEventListener("click", () => chatbotContainer.classList.remove("show-chatbot"));
  chatbotToggler.addEventListener("click", () => chatbotContainer.classList.toggle("show-chatbot"));
};


