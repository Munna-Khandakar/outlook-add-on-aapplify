import {SubmitHandler, useForm} from "react-hook-form";
import api from "../utils/ApiInstance";
import {EmailPromptInput} from "../types/EmailPrompt";
import {Fragment} from "react";

type EmailPromptProps = {
    setSuggestionsResponse: (response: string[]) => void;
}

export const EmailPrompt = (props: EmailPromptProps) => {

    const {setSuggestionsResponse} = props;

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<EmailPromptInput>();

    const onSubmit: SubmitHandler<EmailPromptInput> = (data) => {
        api.post('/service-email/generate-email', data).then((response) => {
            // console.log(response.data);
        }).catch((error) => {
            // console.log(error.response.data.message);
        }).finally(() => {
            // console.log('finally');
            setSuggestionsResponse(['a body of traditions and knowledge on a subject or held by a particular group, typically passed from person to person by word of mouth. ' +
            'a body of traditions and knowledge on a subject or held by a particular group, typically passed from person to person by word of mouth.' +
            ' a body of traditions and knowledge on a subject or held by a particular group, typically passed from person to person by word of mouth.',
                'Forget about spam, advertising mailings, hacking and attacking robots. Keep your real mailbox clean and secure. Temp Mail provides temporary, secure, anonymous, free, disposable email address.']);
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="py-4">
            <label htmlFor="prompt" className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">Your
                Prompt</label>
            <textarea id="prompt" rows={8}
                      className="block p-2.5 mb-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write your thoughts here..."
                      {...register('prompt', {required: 'Prompt is required'})}
            >

            </textarea>
            <div className="flex justify-end">
                <div className="relative group">
                    <button
                        className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-300 dark:bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                    >
                            <span
                                className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                        <span className="relative z-10 block px-3 py-1 rounded-lg bg-gray-50 dark:bg-gray-700">
        <div className="relative z-10 flex items-center space-x-2">

            {
                isSubmitting
                    ? <span className="transition-all duration-500 group-hover:translate-x-1 text-sm text-gray-900 dark:text-white">
                            Loading
                    </span>
                    : <Fragment>
                        <span
                            className="transition-all duration-500 group-hover:translate-x-1 text-sm text-gray-900 dark:text-white">Generate Email</span>
                        <svg
                            className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                            data-slot="icon"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                clip-rule="evenodd"
                                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                fill-rule="evenodd"
                            ></path>
                        </svg>
                    </Fragment>
            }
        </div>
      </span>
                    </button>
                </div>
            </div>
        </form>
    )
}