import { useContext } from "preact/hooks";
import { FormControlContext } from "./Form";
import { JSX } from "preact";
import { Path, RegisterOptions, UseFormReturn } from "react-hook-form";

interface FormControlLabelProps<T extends object> {
	title: string;
	name: keyof T;
	question?: JSX.Element | JSX.Element[] | string;
	options?: RegisterOptions<T, Path<T>>;
	placeholder?: string;
}
function FormRadio<T extends object>({
	name,
	title,
	question,
	options = {},
}: FormControlLabelProps<T>) {
	const {
		register,
		formState: { errors },
	} = useContext<UseFormReturn<T, unknown, undefined>>(FormControlContext);

	return (
		<>
			<div class="lg:mb-2 w-full ">
				<label
					class="text-xs dark:text-secondary-light text-secondary-dark capitalize font-semibold"
					htmlFor={name as string}
				>
					{title}
				</label>
				<div class="flex gap-4 items-center">
					<div class="wrap-toggle my-1">
						<input
							type="checkbox"
							{...register(name as unknown as Path<T>, options)}
							id="toggle"
							class="offscreen"
						/>
						<label for="toggle" class="switch" />
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

				{(errors as T)[name] ? (
					<p class="text-xs text-red-600">{errors[name]?.message}</p>
				) : null}
			</div>
			<style jsx>{`
                .wrap-toggle {
                }

                .switch {
                    position: relative;
                    display: inline-block;
                    width: 80px;
                    height: 35px;
                    background-color: #848484;
                    border-radius: 40px;
                    transition: all 0.3s;
                    cursor: pointer;
                }

                .switch:after {
                    content: "";
                    position: absolute;
                    width: 25px;
                    height: 25px;
                    border-radius: 30px;
                    background-color: white;
                    top: 5px;
                    left: 5px;
                    transition: all 0.3s;
                }

                input[type="checkbox"]:checked + .switch:after {
                    transform: translateX(40px);
                    background-color: white;
                }

                input[type="checkbox"]:checked + .switch {
                    background-color: var(--primary);
                }

                .offscreen {
                    position: absolute;
                    left: -9999px;
                }
            `}</style>
		</>
	);
}

export default FormRadio;
