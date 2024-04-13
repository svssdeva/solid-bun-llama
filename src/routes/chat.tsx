import {batch, createResource, createSignal, lazy, onMount} from "solid-js";
import {Ollama} from "ollama";
import ChatInput from "../components/ChatInput/ChatInput";
import './chat.css';

const Loader = lazy(() => import('../components/Loading/Loading'))
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
    const [isLoading, setIsLoading] = createSignal(false);
    const [messages, setMessages] = createSignal<{ sender: "user" | "bot"; text: string }[]>([]);

    onMount(() => {
        if (typeof localStorage !== "undefined") {
            const storedMessages = localStorage.getItem("messages");
            if (storedMessages) {
                setMessages(JSON.parse(storedMessages));
            }
        }
    });

    const [botResponse] = createResource(messages, response);

    const handleSubmit = (message: string) => {
        setIsLoading(true);
        batch(() => {
            const newMessages: { sender: "user" | "bot", text: string }[] = [...messages(), {
                sender: "user",
                text: message
            }];
            setMessages(newMessages);
            if (typeof localStorage !== "undefined") {
                localStorage.setItem("messages", JSON.stringify(newMessages));
            }
        });
    };

    createResource(botResponse, (response) => {
        if (response) {
            batch(() => {
                setMessages([...messages(), {sender: "bot", text: response}]);
                setIsLoading(false);
            });
        }
    });

    return (
        <div class="chat-container">
            {isLoading() ? (
                <Loader/>
            ) : (
                <>
                    <div class="chat-history">
                        <div class="chat-messages">
                            {messages().map((message, index) => {
                                const parts = message.text.split(/(`[^`]*`)/g);
                                return (
                                    <div
                                        class={`message ${message.sender === "user" ? "user-message" : "bot-message"}`}
                                    >
                                        {parts.map(part => part.startsWith('`') && part.endsWith('`') ? (
                                            <pre><code>{part.slice(1, -1)}</code></pre>
                                        ) : (
                                            part
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div class="chat-input">
                        <ChatInput onSubmit={handleSubmit}/>
                    </div>
                </>
            )}
        </div>
    );
}
