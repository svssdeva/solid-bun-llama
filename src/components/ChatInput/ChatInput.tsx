import {createSignal} from "solid-js";
import './ChatInput.css';

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
        <form onSubmit={handleSubmit} class="form">
            <input
                type="text"
                value={inputValue()}
                onInput={(e) => setInputValue(e.currentTarget.value)}
                class="input"
                placeholder="Type your message..."
            />
            <button
                type="submit"
                class="button"
            >
                Send
            </button>
        </form>
    );
};

export default ChatInput;
