import "vite/modulepreload-polyfill"; //https://vitejs.dev/guide/backend-integration
import "../css/index.css";
import "@vigilio/sweet/sweet.min.css";
import "aos/";
import Alpine from "alpinejs";
import AOS from "aos";
import render from "./lib/preact";
import { lazy } from "preact/compat";
Alpine.start();
AOS.init();

render(
    "App",
    lazy(() => import("./App"))
);
