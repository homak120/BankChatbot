//loadChatbot.js
function RenderChatbot() {
    
    const body = document.body;
    const host = document.createElement("div");
    
    //host.attachShadow({ mode: 'open' });
    //body.insertBefore(host, body.firstChild);
    //setChatbotStyles(host);

    setChatbotStyles(document.body);
    
    const chatbotContainer = document.createElement("div");
    chatbotContainer.id = "chatbot-container";
    body.insertBefore(chatbotContainer, body.firstChild);
    //host.shadowRoot.appendChild(chatbotContainer);
    

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
    initializeChatbot();
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