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
        <div class="chat-form" v-if="!isChat">
          <Editor :data="codeData" @updateCode="updateCode($event)"/>
        </div>
        <div class="preview">
          <Preview :data="codeData"/>
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

const text = `actor User
participant "JWT Auth Server" as server
participant "User Database" as db

User -> server : Request Login
activate server

server -> db : Verify Credentials
activate db
db --> server : Valid Credentials

server -> server : Generate JWT
server --> User : Return JWT
deactivate server

User -> server : Request Resource
activate server

User -> server : Attach JWT
server -> server : Decode JWT
server -> server : Verify Signature
server --> User : Return Resource
deactivate server`;

export default {
  name: "IndexPage",
  components: {Chat, Header, Sidebar},
  data() {
    return {
      isChat: true,
      codeData: text
    }
  },
  methods: {
    changeMode(e) {
      this.isChat = e;
    },
    updateCode(e) {
      this.codeData = e;
    }
  }
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
  background-color: brown;
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
  width: calc(100vw - 400px) !important;
  justify-content: center;
  align-content: center;
  align-items: center;
  align-self: center;
}
</style>

<style scoped>
@import 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css';
</style>