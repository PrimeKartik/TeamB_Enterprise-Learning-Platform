import client from "./client";

export const chatbotApi = {

    chat(message, lessonId) {
        return client.post("/chatbot/chat", {
            message,
            lessonId
        });
    },

    explain(topic) {
        return client.post("/chatbot/explain", {
            topic
        });
    },

    summarize(lessonId) {
        return client.post("/chatbot/summarize", {
            lessonId
        });
    },

    generateQuiz(lessonId) {
        return client.post("/chatbot/generate-quiz", {
            lessonId
        });
    }

};