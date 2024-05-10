export const storeChat = (set: any ) => ({
  message: '',
  messages: [],

  setMessage: (value: string) => set({ message: value }),
  setMessages: (value: string[]) => set({messages: value})
});


