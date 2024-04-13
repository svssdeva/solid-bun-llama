import { Suspense, createResource, createSignal } from "solid-js";
import { Ollama, ChatResponse } from "ollama";
import ChatInput from "../components/ChatInput/ChatInput";

const ollama = new Ollama({ host: "http://localhost:11434" });

const response = async (content: string) => {
    const chatResponse = await ollama.chat({
        model: "llama2",
        messages: [{ role: "user", content }],
        stream: false,
    });

    return chatResponse.message?.content || "";
};

export default function ChatPage() {
    const [content, setContent] = createSignal<string>("");
    const [botResponse] = createResource(content, response);
    const [messages, setMessages] = createSignal<
        { sender: "user" | "bot"; text: string }[]
    >([]);

    const handleSubmit = (message: string) => {
        setContent(message);
        setMessages([...messages(), { sender: "user", text: message }]);
    };

    return (
        <div class="flex flex-col h-screen">
            <div class="flex-grow overflow-y-auto p-4">
                <div class="flex flex-col space-y-2">
                    <Suspense fallback={<div>Loading...</div>}>
                        <div class="p-2 rounded-lg bg-gray-200 self-start">
                            {botResponse() || ""}
                        </div>
                    </Suspense>
                    {messages().map((message, index) => (
                        <div
                            key={index}
                            class={`p-2 rounded-lg ${message.sender === "user"
                                ? "bg-blue-500 text-white self-end"
                                : "bg-gray-200 self-start"
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