<template>
	<div 
    class="sidebar bottom-0 lg:left-0 p-2 w-[250px] text-center bg-gray-900"
  >
		<div
      @click="addChat"
      class="new-chat p-2.5 mt-3 flex items-center rounded-md px-4 max-w-[200px] bg-slate-400 duration-300 cursor-pointer hover:bg-blue-600 text-white"
    >
			<i class="fa fa-plus"></i>
			<span class="text-[15px] ml-4 text-gray-200 font-bold">New Chat</span>
		</div>
    <div class="history-chat overflow-hidden hover:overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div v-for="(chat, index) in chats" :key="`${index}chat`"
        class="p-2.5 mt-3 flex items-center rounded-md max-w-[200px] px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
      <i class="fa fa-comment"></i>
        <span class="text-[15px] ml-4 text-gray-200 font-bold break-word truncate">{{ chat.title }}</span>
      </div>
    </div>
		
	</div>
</template>
<script>
// import { defineComponent, ref } from 'vue';
import { useMessageStore } from "../store/message"
export default ({
  data() {
    let id = 0
    return {
      chats: [
        {
          id: ++id,
          title: 'Hey, how are you? Hey, how are you?',
        },
        {
          id: ++id,
          title: 'Hey, how are you?',
        },
        {
          id: ++id,
          title: 'Hey, how are you?',
        },
        {
          id: ++id,
          title: 'Hey, how are you?',
        },
        {
          id: ++id,
          title: 'Hey, how are you?',
        },
        {
          id: ++id,
          title: 'Hey, how are you?',
        },
        {
          id: ++id,
          title: 'Hey, how are you?',
        },
        {
          id: ++id,
          title: 'Hey, how are you?',
        },
        {
          id: ++id,
          title: 'Hey, how are you?',
        },
        {
          id: ++id,
          title: 'Hey, how are you?',
        },
        {
          id: ++id,
          title: 'Hey, how are you?',
        },
        {
          id: ++id,
          title: 'Hey, how are you?',
        },
        {
          id: ++id,
          title: 'Hey, how are you?',
        },
      ],
    }
  },
  methods: {
    addChat()  {
      console.log(1);
      const messageStore = useMessageStore()
      messageStore.addMessage(
        true,
        'https://picsum.photos/200',
        'Hello, I am a ChatGPT!'
      )
    },
  },
});
</script>
<style scoped>
	.sidebar {
		height: 100%;
	}
  .new-chat {
    height: 8%
  }
  .history-chat {
    height: 92%
  }
  .history-chat::-webkit-scrollbar
  {
    width: 8px;
    background-color: rgb(17 24 39 / var(--tw-bg-opacity));
  }

  .history-chat::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
  }
</style>
