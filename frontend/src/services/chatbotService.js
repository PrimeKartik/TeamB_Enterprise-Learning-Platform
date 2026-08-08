import { chatbotApi } from "../api/chatbotApi";

const chatbotService = {
  sendMessage: (data) =>
    chatbotApi.chat(data),
};

export default chatbotService;