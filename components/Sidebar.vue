<template>
	<div 
    class="sidebar bottom-0 lg:left-0 p-2 w-[200px] text-center bg-gray-900 overflow-hidden hover:overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
  >
		<div
      @click="addChat"
      class="p-2.5 mt-3 flex items-center rounded-md px-4 bg-slate-400 duration-300 cursor-pointer hover:bg-blue-600 text-white"
    >
			<i class="fa fa-plus"></i>
			<span class="text-[15px] ml-4 text-gray-200 font-bold">New Chat</span>
		</div>
		<div v-for="(chat, index) in chats" :key="`${index}chat`"
			class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
		>
    <i class="fa fa-comment"></i>
			<span class="text-[15px] ml-4 text-gray-200 font-bold break-normal">{{ chat.title }}</span>
		</div>
	</div>
</template>
<script>
// import { defineComponent, ref } from 'vue';
// import { useMessageStore } from "../store/message"
export default ({
  data() {
    let id = 0
    return {
      chats: [
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
    // let messageStore = useMessageStore()
    addChat()  {
      console.log(1);
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
    /* overflow: hidden; */
	}
  /* .sidebar:hover {
    overflow-y: scroll;
  }

  @keyframes background {
    from {
      background: pink;
    }
    to {
      background: #c0d6ff;
    }
  } */
</style>
