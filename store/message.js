// import { defineStore } from 'pinia';

// const useMessageStore = defineStore({
//   id: 'chat',
//   state: () => ({
//     messages: [],
//   }),
//   actions: {
//     addMessage(is_bot, avatar, text) {
//       const message = {
//         is_bot,
//         avatar,
//         text,
//       };
//       this.messages.push(message);
//     },
//   },
//   getters: {
//     botMessages() {
//       return this.messages.filter(message => message.is_bot);
//     },
//   },
// });

// export default useMessageStore;