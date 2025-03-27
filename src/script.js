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
    let chatContent = className === "outgoing" ? `<div class='Chatbubble'></div>` : `<span class="material-symbols-outlined">smart_toy</span><div class='Chatbubble'></div>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("div").textContent = message;
    return chatLi; // return chat <li> element
  };

  const generateResponse = async (chatElement) => {
    const messageElement = chatElement.querySelector("div");

    const requestBody = {
      model: "BankChatbotModel:02", // Ensure you have this model installed in Ollama 
      prompt: userMessage,
      stream: true    // Enable streaming
    };
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    };
    
    try {
      const response = await fetch(API_URL, requestOptions);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }
    
      // Clear the existing content in the element
      messageElement.innerHTML = "";
      let messageText = "";

      // Create a reader to process the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
    
      // Continuously read stream chunks until done
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        // Decode the chunk into text
        const chunkText = decoder.decode(value, { stream: true });
        if (chunkText) {
          // Split the input string into lines and remove any empty lines
          const lines = chunkText.split('\n').filter(line => line.trim() !== '');

          // Parse each JSON object and extract the response property
          const concatenatedResponse = lines
            .map(line => JSON.parse(line))
            .map(obj => obj.response)
            .join('');
          // Append the new text chunk to the message text
          messageText += concatenatedResponse;
          
          // Append the new text chunk to the HTML element
          messageElement.innerHTML = marked.parse(messageText);
          // Optionally, scroll the chatbox as new content arrives
          chatbox.scrollTo(0, chatbox.scrollHeight);
        }
      }
    } catch (error) {
      messageElement.classList.add("error");
      messageElement.textContent = error.message;
      console.error(error);
    } finally {
      // Final scroll update if needed
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
