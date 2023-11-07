import "vite/modulepreload-polyfill";
import "../css/index.css";
import "@vigilio/sweet/sweet.min.css";
import Alpine from "alpinejs";
import render from "./lib/preact";
import { lazy } from "preact/compat";
Alpine.start();

render(
    "CounterApp",
    lazy(() => import("./CounterApp"))
);
render(
    "App",
    lazy(() => import("./App"))
);
