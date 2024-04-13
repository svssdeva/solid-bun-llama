import { Suspense, createResource, createSignal } from "solid-js";
import { Ollama, ChatResponse } from "ollama";
import ChatInput from "../components/ChatInput/ChatInput";

const ollama = new Ollama({ host: "http://localhost:11434" });

const response = async (messages: { sender: "user" | "bot"; text: string }[]) => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.sender === "user") {
        const chatResponse = await ollama.chat({
            model: "llama2",
            messages: messages.map(({ sender, text }) => ({ role: "user", content: text })),
            stream: false,
        });

        return chatResponse.message?.content || "";
    }
    return "";
};

export default function ChatPage() {
    const [messages, setMessages] = createSignal<{ sender: "user" | "bot"; text: string }[]>([]);
    const [botResponse] = createResource(messages, response);

    const handleSubmit = (message: string) => {
        setMessages([...messages(), { sender: "user", text: message }]);
    };

    createResource(botResponse, (response) => {
        if (response) {
            setMessages([...messages(), { sender: "bot", text: response }]);
        }
    });

    return (
        <div class="flex flex-col h-screen">
            <div class="flex-grow overflow-y-auto p-4">
                <div class="flex flex-col space-y-2">
                    {messages().map((message, index) => (
                        <div
                            key={index}
                            class={`p-2 rounded-lg ${message.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 self-start"
                                }`}
                        >
                            {message.text}
                        </div>
                    ))}
                </div>
            </div>
            <div class="bg-gray-100 p-2 fixed bottom-0 left-0 right-0">
                <ChatInput onSubmit={handleSubmit} />
            </div>
        </div>
    );
}