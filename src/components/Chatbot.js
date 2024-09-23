import React, { useState, useEffect } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load chat history from local storage
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setMessages(savedMessages);
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  // Handle user input and bot responses
  const handleSend = () => {
    if (!input.trim()) {
      alert("Message cannot be empty");
      return;
    }

    const userMessage = { text: input, sender: "user" };
    let botMessage = { text: "", sender: "bot" };

    if (input === "/hello") {
      botMessage.text = "Hello there!";
    } else if (input === "/time") {
      botMessage.text = `Current time is: ${new Date().toLocaleTimeString()}`;
    } else if (input === "/bye") {
      botMessage.text = "Goodbye!";
    } else {
      botMessage.text = "I didn't understand that.";
    }

    // Update chat with user and bot messages
    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  // Clear chat history
  const handleClearChat = () => {
    localStorage.removeItem("chatHistory");
    setMessages([]);
  };

  return (
    <div>
      <h1>Chatbot</h1>
      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          border: "1px solid black",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{ textAlign: msg.sender === "user" ? "right" : "left" }}
          >
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
      <button onClick={handleClearChat}>Clear Chat</button>
    </div>
  );
};

export default ChatBot;
