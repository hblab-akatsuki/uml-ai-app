<template>
  <div class="chat-container" >
    <div class="chat-header">
      <h2 class="chat-title">Chat</h2>
    </div>
    <div class="chat-screen">
      <div class="conversation" ref="chatContainer">
        <div v-for="(message, index) in messages" :key="index" :class="{ message: true, received: message.is_bot === true, sent: message.is_bot === false }">
          <div class="avatar-container">
            <img class="avatar" :src="message.avatar" alt="Avatar">
          </div>
          <div class="message-content">
            <div class="message-text">
              <div>{{ message.text }}</div>
            </div>
          </div>
        </div>
        <div class="message received">
          <div v-if="response" class="loader-container">
            <div class="avatar-container">
              <img class="avatar" src="https://picsum.photos/200" alt="Avatar">
            </div>
            <div class="dot dot-1"></div>
            <div class="dot dot-2"></div>
            <div class="dot dot-3"></div>
          </div>
        </div>
      </div>
      <form class="message-form" @submit.prevent="addMessage">
        <textarea 
          autocomplete="off"
          v-model.trim="newMessage"
          class="resize-none"
          :style="{ height: textareaHeight }"
          @input="updateTextareaHeight"
          placeholder="Type your message here..."
          @keydown="inputHandler"
        >
        </textarea>
        <button type="submit" :disabled="isEmpty" :class="{ 'bg-gray-500 text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed': isEmpty }">
          <i class="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useMessageStore } from "../store/message"

export default {
  data() {
    const messageStore = useMessageStore()
    return {
      messages: messageStore.messages,
      newMessage: '',
      isEmpty: true,
      response: false,
      textareaHeight: '40px',
      initialHeight: '40px',
    }
  },
  methods: {
    scrollToBottom() {
      this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
    },
    inputHandler(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        this.addMessage();
      }
    },
    async addMessage() {
      this.textareaHeight = this.initialHeight;
      let msg = { 
        is_bot: false,
        avatar: 'https://picsum.photos/200',
        text: this.newMessage,
      }
      this.messages.push(msg);
      this.newMessage = '';
      this.response = true
      const res = await axios.get('http://ip.jsontest.com/')
      this.response = false
      this.messages.push({ 
        is_bot: true,
        avatar: 'https://picsum.photos/200',
        text: res.data,
      });

      this.scrollToBottom();
    },
    updateTextareaHeight(event) {
      const textarea = event.target;
      if (!this.initialHeight) {
        this.initialHeight = textarea.style.height;
      }
      textarea.style.height = '40px';
      textarea.style.height = `${textarea.scrollHeight}px`;
      this.textareaHeight = textarea.style.height;
    },
  },
  mounted() {
    this.scrollToBottom();
  },
  updated() {
    this.scrollToBottom();
  },
  watch: {
    // whenever question changes, this function will run
    newMessage(newVal) {
      let result = newVal.trim();
      if (result == null || result.length == 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
    }
  },
};
</script>

<style scoped>
  /* Chat container */
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    margin: 0 auto;
  }

  /* Chat header */
  .chat-screen{
    padding-top: 10px;
    border: 1px solid black;
    height: 92%;
    display: flex;
    flex-direction: column;
  }
  .chat-header {
    background-color: #0084ff;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8%;
  }

  .chat-title {
    font-size: 1.5rem;
  }

  /* Avatar */
  .avatar-container {
    display: flex;
    align-items: center;
  }

  .avatar {
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
    margin-right: 1rem;
  }

  /* Message */
  .message {
    width: 100%;
  }
  .message-content {
    width: 100%;
    flex-direction: column;
    justify-content: center;
  }

  .message-text {
    background-color: #fff;
    border-radius: 1rem;
    color: #333;
    max-width: 70%;
    padding: 5px 10px;
    margin-bottom: 0.5rem;
    font-size: 14px;
  }

  /* Message types */
  .message.received {
    display: flex;
    flex-direction: row;
  }
  .message.received .message-text {
    border-bottom-left-radius: 0;
    background-color: #e3e4ecb5;
    width: fit-content;
  }

  .message.received .avatar-container {
    margin-left: 5px;
  }
  /* CSS loading */
  .message.received .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .message.received .dot {
    width: 10px;
    height: 10px;
    margin-right: 6px;
    border-radius: 50%;
    background-color: #ccc;
    animation: scale 0.6s infinite ease-in-out alternate;
  }

  .message.received .dot-1 {
    animation-delay: -0.4s;
  }

  .message.received .dot-2 {
    animation-delay: -0.2s;
  }

  .message.received .dot-3 {
    animation-delay: 0s;
  }

  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  /* Sent messages */
  .message.sent {
    display: flex;
    flex-direction: row-reverse;
  }

  .message.sent .message-content {
    align-self: flex-end;
  }

  .message.sent .message-text {
    background-color: #0084ff;
    color: #fff;
    border-bottom-right-radius: 0;
    float: right;
    word-break: break-word;
  }
  .message.sent .avatar-container {
    margin-left: 10px;
  }

  /* Conversation */
  .conversation {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    margin-bottom: 1rem;
    flex-grow: 1;
  }
  /* Message form */
  .message-form {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #fff;
    height: fit-content;
    
  }

  .message-form textarea {
    flex-grow: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    padding: 8px 10px;
    margin-right: 1rem;
    border-radius: 1rem;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    max-height: 150px;

  }
  .message-form button[type="submit"] {
    background-color: #0084ff;
    border: none;
    color: #fff;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .message-form button[type="submit"] i {
    font-size: 16px;
  }
  .message-form button[type="submit"]:hover {
    background-color: #0073e6;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    background-color: #fff;
  }
</style>