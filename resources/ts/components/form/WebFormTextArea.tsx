import { useContext } from "preact/hooks";
import { FormControlContext } from "./Form";
import { JSX } from "preact";
import { Path, RegisterOptions, UseFormReturn } from "react-hook-form";
import { HTMLAttributes } from "preact/compat";

interface WebFormTextAreaLabelProps<T extends object>
    extends Omit<HTMLAttributes<HTMLTextAreaElement>, "type" | "name"> {
    title: string;
    name: keyof T;
    question?: JSX.Element | JSX.Element[];
    options?: RegisterOptions<T, Path<T>>;
}
function WebFormTextArea<T extends object>({
    name,
    title,
    question,
    options = {},
    ...rest
}: WebFormTextAreaLabelProps<T>) {
    const {
        register,
        formState: { errors },
        getValues,
    } = useContext<UseFormReturn<T, unknown, undefined>>(FormControlContext);

    return (
        <div class="lg:mb-2 w-full">
            <label
                class="text-xs text-secondary-dark capitalize font-semibold"
                htmlFor={name as string}
            >
                {title}
            </label>
            <div class="flex items-center gap-2">
                <textarea
                    className={`${
                        (errors as T)[name] ? "border-red-600" : ""
                    }  text-secondary-dark  bg-background-light  shadow-sm  
                     border-gray-600 border-2 px-2 outline-none rounded-lg py-2.5 my-1 text-sm w-full min-h-[100px] max-h-[100px] lg:min-h-[100px] lg:max-h-[100px]`}
                    id={name as string}
                    {...rest}
                    {...register(name as unknown as Path<T>, options)}
                >
                    {getValues(name as unknown as Path<T>)}
                </textarea>
                {question ? (
                    <div class="relative group">
                        <i class="fa-solid fa-circle-question text-xs text-white" />
                        {question}
                    </div>
                ) : null}
            </div>
            {(errors as T)[name] ? (
                <p class="text-xs text-red-600">{errors[name]?.message}</p>
            ) : null}
        </div>
    );
}

export default WebFormTextArea;
