import {onCleanup, onMount} from 'solid-js';

const LoadingSpinner = () => {
    let svgElement: SVGSVGElement | null = null;
    let rotationId: number | undefined;

    // Start rotating the SVG element when it's mounted
    onMount(() => {
        rotationId = window.setInterval(() => {
            if (svgElement) {
                svgElement.style.transform = `rotate(${Date.now() % 360}deg)`;
            }
        }, 1000 / 60); // 60 FPS
    });

    // Stop rotating when the component is unmounted
    onCleanup(() => {
        if (rotationId) {
            window.clearInterval(rotationId);
        }
    });


    return (
        <svg
            ref={el => {
                svgElement = el;
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            // @ts-ignore
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            class="feather feather-loader"
        >
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
    );
}

export default LoadingSpinner;
