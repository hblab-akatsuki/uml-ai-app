<template>
	<div
    class="sidebar bottom-0 lg:left-0 p-1 w-[250px] text-center bg-gray-900"
  >
		<div
      @click="addChat"
      class="new-chat flex items-center bg-slate-400 p-2.5 m-2.5 cursor-pointer hover:bg-blue-600 text-white duration-300"
    >
<!--      "  mt-3  rounded-md px-4 max-w-[220px]  -->
			<i class="fa fa-plus"></i>
			<span class="text-[15px] ml-4 text-gray-200 font-bold">New Chat</span>
		</div>
    <div class="history-chat overflow-hidden hover:overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <div v-for="chatRoom in chatRooms" :key="chatRoom.id" @click="getMessageRoom(chatRoom.id)"
        class="p-1 mt-3 flex items-center rounded-md max-w-[220px] px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        :class = "{ 'bg-gray-500': chatRoom.id === room_id }"
      >
        <i class="fa fa-comment"></i>
        <span class="text-[15px] ml-4 text-gray-200 font-bold break-word truncate">{{ chatRoom.title }}</span>
      </div>
    </div>

	</div>
</template>
<script>
import axios from 'axios';
import { useMessageStore } from "../store/message"

export default ({
  created() {
    this.getRoomChatId()
  },
  data() {
    return {
      chatRooms: useMessageStore().rooms,
      room_id: null
    }
  },
  methods: {
    addChat()  {
      let messageStore = useMessageStore();
      messageStore.clearMessage();
      messageStore.addMessage(
        true,
        'https://picsum.photos/200',
        'Hello! I am UML AI, I will help you create diagram.'
      )
      messageStore.code = '';
      messageStore.room_id = null;
    },
    async getRoomChatId() {
      const res = await axios.get('https://uml-ai-api.socoladaica.com/api/rooms')
      res.data.forEach(item => {
        useMessageStore().addRoom(
          item.id,
          item.title
        )
      })
    },
    async getMessageRoom(roomId) {
      const messageRoom = await axios.get(`https://uml-ai-api.socoladaica.com/api/rooms/${roomId}/messages`)
      this.room_id = roomId
      useMessageStore().code = messageRoom.data.plantuml;
      useMessageStore().clearMessage();
      messageRoom.data.chats.forEach(item => {
        useMessageStore().addMessage(
          item.role == 2,
          'https://picsum.photos/200',
          item.message
        )
      })
      useMessageStore().room_id = messageRoom.data.id;
    }
  },
  computed: {
    useMessageStoreCode: function() {
      return useMessageStore().code;
    }
  },
  watch: {
    useMessageStoreCode: {
      handler: function (val, oldVal) {
        $nuxt.$emit('select-room', val);
      },
      deep: true
    }
  },
});
</script>
<style scoped>
	.sidebar {
		height: 100%;
	}
  .new-chat {
    height: 40px;
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
