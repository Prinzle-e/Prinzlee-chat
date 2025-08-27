const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const newChatBtn = document.getElementById("new-chat");
const themeToggle = document.getElementById("theme-toggle");






function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  // Typing placeholder
  const typing = document.createElement("div");
  typing.classList.add("message", "bot");
  typing.textContent = "Typing...";
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    typing.remove();
    addMessage(data.reply || "⚠️ Error: No response", "bot");
  } catch (err) {
    typing.remove();
    addMessage("⚠️ Network error", "bot");
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

newChatBtn.addEventListener("click", () => {
  chatBox.innerHTML = "";
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});