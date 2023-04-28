<template>
  <div>
    <div class="options" id="app">
      <Header @changeMode="changeMode($event)"/>
    </div>
    <div class="grid-content">
      <div class="flex flex-row h-full">
        <div class="">
          <Sidebar/>
        </div>
        <div class="chat-form" v-if="isChat">
          <Chat/>
        </div>
        <div class="chat-form" v-else>
          <Editor/>
        </div>
        <div class="preview">
          <Preview/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Chat from '../components/Chat'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Preview from '../components/Preview.vue'
import Editor from '../components/Editor.vue'
import { useMessageStore } from "../store/message"
import axios from 'axios';


export default {
  name: "IndexPage",
  components: {Chat, Header, Sidebar},
  data() {
    return {
      isChat: true,
    }
  },
  methods: {
    async changeMode(e) {
      this.isChat = e;
      if (this.isChat && useMessageStore().room_id != null) {
        const res = await axios.post(
          'https://uml-ai-api.socoladaica.com/api/messages',
          {
            "room_id": useMessageStore().room_id,
            "plantuml": useMessageStore().code
          }
        )
      } 
    },
  },
  mounted() {
    const messageStore = useMessageStore()
    messageStore.addMessage(
      true,
      'https://picsum.photos/200',
      'Hello, I am a ChatGPT!'
    )
  },
}
</script>
<style>
body {
  height: 100vh;
  margin: 0;
  overflow: hidden;
}

.options {
  height: 10vh;
  background-color: #c2aeae2e;
}

.grid-content {
  height: 90vh;
}

.chat-form {
  width: 500px;
  margin: 0;
  height: 100%;
}
.preview {
  width: calc(100vw - 650px) !important;
  height: 100%;
  justify-content: center;
  align-content: center;
  align-items: center;
}
</style>

<style scoped>
@import 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css';
</style>