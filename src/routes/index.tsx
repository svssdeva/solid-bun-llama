import Counter from "~/components/Counter";
import "./index.css";

export default function Home() {
  return (
    <main>
      <h1>Hello world!</h1>
      <Counter />
      <p class="text-red-500">
        Visit{" "}
        <a href="https://solidjs.com" target="_blank">
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
    </main>
  );
}
