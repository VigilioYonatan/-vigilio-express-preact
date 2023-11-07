import { useState } from "preact/hooks";

function CounterApp(props: {
    user: { id: number; fullName: string; age: number };
}) {
    const [count, setCount] = useState(0);
    const baseURL = import.meta.env.VITE_URL;
    return (
        <div class="bg-black my-6 p-4 bg-opacity-20 max-w-[500px] w-full mx-auto rounded-md">
            <div class="flex justify-center items-center gap-2 mt-6">
                <img
                    src={`${baseURL}/images/vite.png`}
                    alt="vite-logo"
                    width="120"
                    height="120"
                />
                <img
                    src="https://damiandeluca.com.ar/wp-content/uploads/2020/02/preact.png"
                    alt="preact-logo"
                    width="95"
                    height="90"
                />
            </div>
            <div class="flex flex-col gap-4 my-8 py-2">
                <p class="text-white font-bold text-center">Counter</p>
                <p class="text-center text-white font-bold uppercase text-4xl">
                    {count}
                </p>
            </div>
            <div class="flex gap-3 justify-center">
                <button
                    type="button"
                    onClick={() => setCount(count + 1)}
                    class="bg-black text-white px-4 py-2 rounded-md bg-opacity-80"
                >
                    +
                </button>
                <button
                    type="button"
                    onClick={() => setCount(count - 1)}
                    class="bg-black text-white px-4 py-2 rounded-md bg-opacity-80"
                >
                    -
                </button>
            </div>
            <code class="text-white mt-6 text-center block">
                {JSON.stringify(props.user)}
            </code>
        </div>
    );
}

export default CounterApp;
