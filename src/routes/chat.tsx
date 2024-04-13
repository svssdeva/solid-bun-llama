import {createResource, createSignal} from "solid-js";
import {Ollama} from "ollama";
import ChatInput from "../components/ChatInput/ChatInput";
import './chat.css';

const ollama = new Ollama({host: "http://localhost:11434"});

const response = async (messages: { sender: "user" | "bot"; text: string }[]) => {
    if (messages.length === 0) {
        const chatResponse = await ollama.chat({
            model: "llama2",
            messages: messages.map(({sender, text}) => ({role: "user", content: text})),
            stream: false,
        });

        return chatResponse?.message?.content || "";
    }
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === "user") {
        const chatResponse = await ollama.chat({
            model: "llama2",
            messages: messages.map(({sender, text}) => ({role: "user", content: text})),
            stream: false,
        });

        return chatResponse?.message?.content || "";
    }
    return "";
};

export default function ChatPage() {
    const [messages, setMessages] = createSignal<{ sender: "user" | "bot"; text: string }[]>([]);
    const [botResponse] = createResource(messages, response);

    const handleSubmit = (message: string) => {
        setMessages([...messages(), {sender: "user", text: message}]);
    };

    createResource(botResponse, (response) => {
        if (response) {
            setMessages([...messages(), {sender: "bot", text: response}]);
        }
    });

    return (
        <div class="container">
            <div class="chat-history">
                <div class="chat-messages">
                    {messages().map((message, index) => (
                        <div
                            class={`message ${message.sender === "user" ? "user-message" : "bot-message"}`}
                        >
                            {message.text}
                        </div>
                    ))}
                </div>
            </div>
            <div class="chat-input">
                <ChatInput onSubmit={handleSubmit}/>
            </div>
        </div>
    );
}
