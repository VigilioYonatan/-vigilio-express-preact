import { FunctionComponent, render as renderPreact } from "preact";
import { Suspense } from "preact/compat";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function render(element: string, Component: FunctionComponent<any>) {
    const ele = document.querySelector(nameTemplate(element));
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let props: any = {};
    if (ele) {
        for (const [_key, value] of Object.entries(ele?.attributes)) {
            const printValue: string = value.name.startsWith(":")
                ? JSON.parse(value.value)
                : value.value;
            const printName: string = value.name.startsWith(":")
                ? value.name.slice(1)
                : value.name;
            props = { ...props, [printName]: printValue };
        }
        return renderPreact(
            <Suspense fallback={null}>
                <Component {...props} />
            </Suspense>,
            ele
        );
    }
}
function nameTemplate(text: string) {
    return text.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
export default render;
