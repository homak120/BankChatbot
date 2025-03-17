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
    let chatContent = className === "outgoing" ? `<p class='Chatbubble'></p>` : `<span class="material-symbols-outlined">smart_toy</span><p class='Chatbubble'></p>`;
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
      model: "BankChatbotModel:03",  // Ensure you have this model installed in Ollama
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
      let cleanedResponse = data.response.replace(/<think>.*<\/think>\s*/s, '');
      cleanedResponse = marked.parse(cleanedResponse);
      messageElement.innerHTML = cleanedResponse;
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
      // Display "Typing..." message while waiting for the response
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
