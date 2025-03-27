![Getting Started](doc/BankChatbotLogo.webp)

# BankChatBot

BankChatBot is a learning project designed to demonstrate the potential use of Local Language Models (LLMs) for customer service in a banking environment. This project shows how you can run a customer-specific LLM locally, providing AI-powered chatbot functionality with Ollama. It serves as a valuable starting point for anyone looking to learn how to set up a custom LLM for various use cases, such as banking or other industries.

## Features

- Demonstrates how to run a local LLM and use it for a bank chatbot.
- Interactive chatbot interface for simulating bank-related customer queries.
- Potential to adapt and build any custom LLM for different industries or use cases.

## Setup Instructions

### Prerequisites

1. **Install Ollama**  
   If you don’t have Ollama installed, you can follow these instructions to set it up locally:

   - **macOS**: 
     ```
     brew install ollama
     ```
   - **Windows/Linux**:  
     Follow the installation steps on [Ollama's official website](https://www.ollama.com/) for your respective platform.

2. **Node.js**  
   You’ll need Node.js installed to run the chatbot UI. You can download it from [here](https://nodejs.org/).

### Step-by-step Setup

1. **Set Up Ollama for Local AI**  
   This will start the Ollama server, making it available for interactions from the BankChatBot UI.

- Start Ollama to serve AI responses locally by running the following command in your terminal:
    ```bash
     ollama serve
    ```

- Ollama offers a straightforward way to download and manage open source language models directly on your local machine. For this project setup, you need to download the Gemma3 model with 4 billion parameters. Use the following command to initiate the download:
   ```bash
   ollama pull gemma3:4b
   ```
- Confirm Gemma 3 model is downloaded
   ```bash
   ollama list
   ```

2. **Create the Custom BankChatbotModel from ModelFile**  
   After starting Ollama, create the custom BankChatbotModel to handle the chatbot queries. The model file will configure the chatbot for the specific use case of bank-related questions.

- To create the model, run the following command:
  ```
  ollama create BankChatbotModel -f ModelFile
  ```

   This command will use the provided `ModelFile` already in the repo to create the custom model for the chatbot.

- Confirm your custom model is created
   ```bash
   ollama list
   ```
- Additional: Implementing the RAG to augment the chatbot's knowledge base, aiming to replace product details in the modelFile.

3. **Run the Node.js Server for the Chatbot UI**  
Start the local chatbot UI by running the following commands:

- Install dependencies:
  ```
  npm install
  ```
- Start the Node.js server:
  ```
  npm start
  ```

The chatbot UI will be accessible at `http://localhost:4000`.

4. **Start the Optional `ollamaForwarder.js` (for running the chatbot on a different domain)**  
If you are running the chatbot UI and Ollama on separate domains or different servers, you can start the optional `ollamaForwarder.js` script to forward the requests to your Ollama instance.

- To start the forwarder, run:
  ```
  node ollamaForwarder.js
  ```

This will ensure the UI can communicate with the Ollama instance even if they are running on different domains. If you are running both on `localhost`, you don’t need to use this script as the UI can directly access the local Ollama instance.

### Demo

The following demo GIFs illustrate the functionality and features of the BankChatBot:

1. **Starting the Chatbot UI and Initiating the Conversation**  
This GIF demonstrates the chatbot UI loading and initiating a conversation with the customer.
![Starting Chatbot Conversation](doc/staringChatbotConversation.gif)


2. **Assisting with Account Opening Questions**  
This GIF shows the chatbot handling queries related to opening a bank account, showcasing its ability to address common customer questions.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="doc/assistAccountOpeningQuestions.gif" alt="Assisting with Account Opening Questions" width="400" height="450" />

3. **Smart AI Response to Account Opening Queries**  
This GIF highlights the chatbot’s intelligent response when a customer asks about account opening. The AI provides a helpful and informative reply.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="doc/smartAIResponse.gif" alt="Smart AI Response to Account Opening Queries" width="400" height="450" />

4. **Restricted Assistance Based on Configured Roles**  
This GIF demonstrates how the chatbot restricts its responses based on pre-configured roles. For example, the chatbot may limit assistance to account opening questions only.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="doc/restrictOnlyAssistBasedOnConfiguredRole.gif" alt="Restricted Assistance Based on Configured Roles" width="400" height="450" />

---

## Summary of Learning

This project has been a valuable learning experience in setting up and running a **customer-local LLM using Ollama**. Through building the BankChatBot, I gained hands-on experience with **deploying** and **interaction** with a **custom language model** for real-world use cases, like assisting with banking queries. The project also demonstrated the power of LLMs for interactive customer support.

## Next Steps
1. I'm reengineering our approach by replacing a static system prompt with a dynamic knowledge base. To accomplish this, I'm developing a Python-based Retrieval Augmented Generation (RAG) framework using **scikit-learn**. This framework leverages techniques like **TF-IDF vectorization** and cosine similarity to efficiently retrieve and rank relevant knowledge snippets, thereby improving the system’s context-awareness and response quality. (**Latest update:** I am planning to transition to using the **FAISS (Facebook AI Similarity Search)** library to optimize similarity search performance and to add support for **processing PDF documentation**, allowing for more scalable and flexible knowledge retrieval.)
2. I plan to explore a new project using the **[OpenAI Agents SDK](https://openai.github.io/openai-agents-python/)**. This will allow me to build more dynamic and intelligent agents capable of handling complex tasks and multi-step interactions. I’m excited to dive deeper into the world of autonomous agents and see how they can be leveraged to create sophisticated applications. More to come:  **[EduAgent](https://github.com/homak120/EduAgent)**

## Software Engineer Insight

Thank you for taking the time to read through the entire README! If you're still here, it’s clear that you’re a curious, die-hard software engineer, and I truly appreciate your interest in diving deep into the details of this project.

There are a few things I’d like to share with you from a software engineering perspective:

1. **Why I Don’t React (Yet):**
   You might notice that this project isn't built using React or any other modern front-end framework. The main focus here is learning and experimenting with Large Language Models (LLMs) rather than UI enhancement. My goal was to concentrate on the backend and LLM integration for now, and UI/UX improvements may come at a later stage. As the project evolves, I might shift focus and integrate a more dynamic, responsive front-end. Stay tuned!

2. **Why There's `build.js` and `ollamaForwarder.js`:**
   You might be wondering why there’s a `build.js` file and the `ollamaForwarder.js` script included in the project. The reason lies in my choice to use dynamic JavaScript logic to apply CSS styles. This allows for a flexible, reusable approach to embedding the chatbot in various websites. By using a single JavaScript snippet, I can easily inject the chatbot into any existing site, providing a clean and consistent visual demo without having to modify each page’s core structure. It’s all about making the process smoother and faster for showcasing the LLM’s capabilities, with minimal fuss for the user.

3. **Why I Use `/generate` API Instead of `/chat`:**
   If you take a look at the source code for the LLM API call, you’ll see that I use the `/generate` endpoint instead of `/chat`. This choice is made to optimize and save on local RAM usage. The `/chat` endpoint would require maintaining chat history, which can increase memory consumption. However, you can easily switch to the `/chat` API if you prefer to have the app maintain chat history. This might be an interesting feature to explore further in the future.

Thanks again for your curiosity and for being a part of this learning journey!


