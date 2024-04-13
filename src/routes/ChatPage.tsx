// import { createResource, createSignal, createEffect } from "solid-js";
// import { Ollama } from "ollama";
// import ChatInput from "../components/ChatInput/ChatInput";
// import "./ChatPage.css";

// const ollama = new Ollama({ host: "http://localhost:11434" });

// const response = async (messages: { sender: "user" | "bot"; text: string }[]) => {
//     const lastMessage = messages.filter(Boolean)[messages.length - 1];
//     console.log(lastMessage);
//     if (lastMessage?.sender === "user") {
//         const chatResponse = await ollama.chat({
//             model: "llama2",
//             messages: messages
//                 .filter(Boolean)
//                 .map(({ sender, text }) => ({ role: sender, content: text })),
//             stream: false,
//         });
//         console.log(chatResponse)
//         return chatResponse.message?.content || "";
//     }
//     return "";
// };

// export default function ChatPage() {
//     const [messages, setMessages] = createSignal<{ sender: "user" | "bot"; text: string }[]>(
//         []
//     );

//     // createEffect(() => {
//     //     saveMessages(messages());
//     // });

//     const [botResponse] = createResource(messages, response);

//     const handleSubmit = (message: string) => {
//         setMessages([...messages(), { sender: "user", text: message }]);
//     };

//     createResource(botResponse, (response) => {
//         if (response) {
//             setMessages([...messages(), { sender: "bot", text: response }]);
//         }
//     });

//     return (
//         <div class="chat-container">
//             <div class="chat-history">
//                 <div class="chat-messages">
//                     {messages().map((message, index) => (
//                         <div

//                             class={`message ${message?.sender === "user" ? "user-message" : "bot-message"}`}
//                         >
//                             {message.text}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div class="chat-input">
//                 <ChatInput onSubmit={handleSubmit} />
//             </div>
//         </div>
//     );
// }

// // function getInitialMessages() {
// //     if (typeof window !== "undefined") {
// //         const storedMessages = localStorage.getItem("messages");
// //         console.log(storedMessages);
// //         if (storedMessages) {
// //             try {
// //                 return JSON.parse(storedMessages);
// //             } catch (e) {
// //                 console.error("Error parsing localStorage messages:", e);
// //                 return [];
// //             }
// //         }
// //     }
// //     return [];
// // }

// // function saveMessages(messages: { sender: "user" | "bot"; text: string }[]) {
// //     if (typeof window !== "undefined") {
// //         localStorage.setItem("messages", JSON.stringify(messages));
// //     }
// // }


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
        <div class="chat-container">
            <div class="chat-history">
                <div class="chat-messages">
                    {messages().map((message, index) => (
                        <div
                            class={`message ${message.sender === "user" ? "user-message" : "bot-message"
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