import "./index.css";
import {createSignal, onCleanup, onMount} from "solid-js";
import {useNavigate} from "@solidjs/router";

export default function Home() {

    const navigate = useNavigate();

    // State to manage animation
    const [showWelcome, setShowWelcome] = createSignal(true);

    // Automatically hide welcome message after 5 seconds
    onMount(() => {
        const timeout = setTimeout(() => {
            setShowWelcome(false);
        }, 2500);

        onCleanup(() => clearTimeout(timeout));
    });

    const handleChatButtonClick = () => {
        navigate("/chat");
    };

    return (
        // <div class="h-screen flex justify-center items-center">
        //     <div class="container">
        //         <div class="card">
        //             <h1 class="text-3xl font-bold mb-4">Welcome!</h1>
        //             <p class="text-lg mb-4">
        //                 Click on the chat button below to start chatting.
        //             </p>
        //         </div>
        //         <div class="button-container" style={{display: showWelcome() ? "none" : "block"}}>
        //             <button class="button" onClick={handleChatButtonClick}>
        //                 Start Chat
        //             </button>
        //         </div>
        //     </div>
        // </div>

        <main>
            <div class="container">
                <h2>hello world,</h2>
                <h1 class="mt-2">I'm Deva :)</h1>
                <p class="mt-2"> @svssdeva</p>
                <div class="button-container" style={{display: showWelcome() ? "none" : "block"}}>
                    <button class="button button-blink" onClick={handleChatButtonClick}>
                        Start Chat with AI
                    </button>
                </div>
            </div>
        </main>
    );
}
