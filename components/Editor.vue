<template>
  <div class="chat-container">
    <div class="chat-header">
      <h2 class="chat-title">Editor</h2>
    </div>
    <div class="chat-screen">
      <div class="conversation" ref="chatContainer">
        <client-only>
          <CodeEditor 
            :copy_code="true" 
            :value="codeUml"
            @input="updateData($event)"
            :language_selector="false" 
            border_radius="none"
            theme="light"
            width="100%"
            height="100%"
            :wrap_code="true"
            font_size="14px"
            >
          </CodeEditor>
        </client-only>
      </div>
    </div>
  </div>
</template>
<script>
import { useMessageStore } from "../store/message"

export default {
  data() {
    return {
      codeUml: useMessageStore().code,
    }
  },
  methods: {
    updateData(value) {
      if (value != null) {
        useMessageStore().code = value
      }
    }
  },
  mounted() {
    this.$nuxt.$on('select-room', (codeUml) => {
      this.codeUml = codeUml;
    })
  },
}
</script>

<style scoped>
/* Chat container */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  height: 100%;
  margin: 0 auto;
}

/* Chat header */
.chat-screen {
  border: 1px solid black;
  height: 92%;
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

/* Conversation */
.conversation {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 1rem;
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
