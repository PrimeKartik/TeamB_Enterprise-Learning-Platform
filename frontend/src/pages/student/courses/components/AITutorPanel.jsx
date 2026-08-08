import { useState } from "react";

import { chatbotApi } from "../../../../api/chatbotApi";

import AIMessage from "./AIMessage";
import AIInput from "./AIInput";
import SuggestedQuestions from "./SuggestedQuestions";

export default function AITutorPanel({
    lessonId
}) {

    const [messages, setMessages] = useState([]);

    const [text, setText] = useState("");

    async function send(message = text) {

        if (!message.trim()) return;

        setMessages(prev => [
            ...prev,
            {
                role: "user",
                message
            }
        ]);

        setText("");

        const response =
            await chatbotApi.chat(
                message,
                lessonId
            );

        setMessages(prev => [
            ...prev,
            {
                role: "assistant",
                message: response.data.reply
            }
        ]);

    }

    return (

        <div className="bg-white rounded-xl shadow h-full flex flex-col">

            <div className="p-5 border-b">

                <h2 className="font-bold text-xl">

                    AI Tutor

                </h2>

            </div>

            <div className="flex-1 overflow-auto p-5 space-y-3">

                {messages.map((message, index) => (

                    <AIMessage

                        key={index}

                        role={message.role}

                        message={message.message}

                    />

                ))}

            </div>

            <div className="p-5 space-y-3">

                <SuggestedQuestions

                    onSelect={send}

                />

                <AIInput

                    value={text}

                    onChange={setText}

                    onSend={() => send()}

                />

            </div>

        </div>

    );

}