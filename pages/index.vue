<template>
  <div>
    <div class="options" id="app">
      <Header/>
    </div>
    <div class="grid-content">
      <div class="flex flex-row h-full">
        <div class="">
          <Sidebar/>
        </div>
        <div class="chat-form">
          <Chat/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Chat from '../components/Chat'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default {
  name: "IndexPage",
  components: {Chat, Header, Sidebar},
  // data() {
  //   return {
  //     isChat: true,
  //     codeData: text
  //   }
  // },
  // methods: {
  //   changeMode(e) {
  //     this.isChat = e;
  //   },
  //   updateCode(e) {
  //     this.codeData = e;
  //   }
  // }
}
</script>
<style>
body {
  height: 100vh;
  margin: 0;
}

.options {
  height: 10vh;
  background-color: brown;
}

.grid-content {
  height: 90vh;
}

.chat-form {
  width: 400px;
  margin: 0;
  height: 100%;
}
</style>

<style scoped>
@import 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css';
</style>