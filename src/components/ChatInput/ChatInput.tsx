import { createSignal } from "solid-js";

interface ChatInputProps {
    onSubmit: (message: string) => void;
}

const ChatInput = (props: ChatInputProps) => {
    const [inputValue, setInputValue] = createSignal("");

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        props.onSubmit(inputValue());
        setInputValue(""); // Clear the input after submitting
    };

    return (
        <form onSubmit={handleSubmit} class="flex items-center space-x-2">
            <input
                type="text"
                value={inputValue()}
                onInput={(e) => setInputValue(e.currentTarget.value)}
                class="flex-grow px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
            />
            <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Send
            </button>
        </form>
    );
};

export default ChatInput;