import { useContext, useState } from "preact/hooks";
import { FormControlContext } from "./Form";
import { type JSX } from "preact";
import {
    type Path,
    type RegisterOptions,
    type UseFormReturn,
} from "react-hook-form";
import { type HTMLAttributes } from "preact/compat";

interface FormControlLabelProps<T extends object>
    extends Omit<HTMLAttributes<HTMLInputElement>, "type" | "name"> {
    title: string;
    name: string;
    type?: HTMLInputElement["type"];
    question?: JSX.Element | JSX.Element[] | string;
    options?: RegisterOptions<T, Path<T>>;
    ico?: JSX.Element | JSX.Element[];
}
function FormControl<T extends object>({
    name,
    title,
    type = "text",
    question,
    options = {},
    ico,
    ...rest
}: FormControlLabelProps<T>) {
    const {
        register,
        formState: { errors },
    } = useContext<UseFormReturn<T, unknown, undefined>>(FormControlContext);
    const [hidden, useHidden] = useState(true);

    function onChangeHidde() {
        useHidden(!hidden);
    }
    return (
        <div class="w-full h-[95px]">
            <label
                class="text-xs dark:text-secondary-light text-secondary-dark capitalize font-semibold"
                htmlFor={name as string}
            >
                {title}
            </label>
            <div class="flex items-center gap-2">
                <div
                    class={`${
                        (errors as T)[name as keyof T]
                            ? "border border-red-600"
                            : ""
                    } w-full h-[2.5rem] flex items-center gap-2 text-xs rounded-lg  overflow-hidden dark:text-secondary-light text-secondary-dark dark:bg-admin-terciary bg-paper-light my-1 shadow-sm border border-gray-200 dark:border-gray-600`}
                >
                    {ico ? (
                        <div class="dark:bg-admin-background-dark bg-background-light  shadow min-w-[2.8rem]  h-full flex justify-center items-center">
                            {ico}
                        </div>
                    ) : null}
                    <input
                        class="outline-none bg-transparent  w-full px-2 sm:text-sm font-normal"
                        id={name as string}
                        type={hidden ? type : "text"}
                        {...rest}
                        {...register(name as unknown as Path<T>, options)}
                    />
                    {type === "password" ? (
                        <button
                            type="button"
                            aria-label="change password button eye"
                            onClick={onChangeHidde}
                            class="mr-4"
                        >
                            {hidden ? (
                                <i class="fas fa-eye" />
                            ) : (
                                <i class="fas fa-eye-slash" />
                            )}
                        </button>
                    ) : null}
                </div>

                {question ? (
                    <div class="relative group ">
                        <i class="fa-solid fa-circle-question text-xs dark:text-white" />
                        <div class="text-[9px] min-w-[100px] hidden group-hover:block -top-[35px] right-1 p-1 shadow text-center absolute rounded-md dark:bg-admin-background-dark bg-background-light dark:text-white">
                            {question}
                        </div>
                    </div>
                ) : null}
            </div>
            {(errors as T)[name as keyof T] ? (
                <p class="text-xs text-red-600">
                    {errors[name as keyof T]?.message}
                </p>
            ) : null}
        </div>
    );
}

export default FormControl;
