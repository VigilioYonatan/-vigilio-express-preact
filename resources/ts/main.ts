import "vite/modulepreload-polyfill"; //https://vitejs.dev/guide/backend-integration
import "../css/index.css";
import "@vigilio/sweet/sweet.min.css";
import "aos/dist/aos.css";
import Alpine from "alpinejs";
import AOS from "aos";
import { lazy } from "preact/compat";
import render from "./libs/preact";
Alpine.start();
AOS.init();
render(
    "App",
    lazy(() => import("./App"))
);
