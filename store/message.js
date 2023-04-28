import { defineStore } from 'pinia';

export const useMessageStore = defineStore({
  id: 'chat',
  state: () => ({
    messages: [],
		rooms: [],
		code: null,
		room_id: null,
  }),
  actions: {
    addMessage(is_bot, avatar, text) {
			const message = {
				is_bot,
				avatar,
				text,
			};
			this.messages.push(message);
    },
		clearMessage() {
			while(this.messages.length) {
				this.messages.shift();
			}
		},
		addRoom(id, title) {
			const room = {
				id,
				title
			};
			this.rooms.push(room);
    },
  },
});
