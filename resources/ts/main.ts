import "vite/modulepreload-polyfill"; //https://vitejs.dev/guide/backend-integration
import "../css/index.css";
import "@vigilio/sweet/sweet.min.css";
import render from "@vigilio/express-core/client/preact";
import "aos/dist/aos.css";
import Alpine from "alpinejs";
import AOS from "aos";
import { lazy } from "preact/compat";
Alpine.start();
AOS.init();

render(
	"App",
	lazy(() => import("./App")),
);
