import authFormControl from "./AuthFormControl";
import VigilioForm from "./Form";
import FormButtonReset from "./FormButtonReset";
import FormButtonSubmit from "./FormButtonSubmit";
import FormControl from "./FormControl";
import FormFile from "./FormFile";
import FormRadio from "./FormToggle";
import FormSelect from "./FormSelect";
import FormTextArea from "./FormTextArea";
import WebFormControl from "./WebFormControl";
import WebFormTextArea from "./WebFormTextArea";

const Form = Object.assign(VigilioForm, {
    control: Object.assign(FormControl, {
        file: FormFile,
        select: FormSelect,
        area: FormTextArea,
        web: Object.assign(WebFormControl, { area: WebFormTextArea }),
        auth: authFormControl,
        toggle: FormRadio,
    }),
    button: { reset: FormButtonReset, submit: FormButtonSubmit },
});
export default Form;
