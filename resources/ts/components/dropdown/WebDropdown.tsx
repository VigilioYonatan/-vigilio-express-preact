import { JSX } from "preact/jsx-runtime";
import useDropdown, { UseDropdown } from "~/hooks/useDropdown";

interface WebDropdownProps {
    children: JSX.Element | JSX.Element[];
    triggerChildren: (props: UseDropdown) => JSX.Element | JSX.Element[];
    className?: string;
}
function WebDropdown({
    triggerChildren,
    children,
    className = "bottom-[-30px]",
}: WebDropdownProps) {
    const dropdown = useDropdown();
    return (
        <>
            <div
                class="relative "
                onMouseEnter={dropdown.onOpen}
                onMouseLeave={() => dropdown.onClose()}
            >
                <div>{triggerChildren(dropdown)}</div>
                <div
                    class={`${className} ${
                        dropdown.dropdownOpen ? "block" : "hidden "
                    } absolute  dark:bg-background-dark bg-background-light shadow-sm  border border-gray-200 dark:border-gray-700 p-4 rounded-md right-0 min-w-[180px]`}
                    ref={dropdown.dropdown}
                >
                    {children}
                </div>
            </div>
        </>
    );
}

export default WebDropdown;
