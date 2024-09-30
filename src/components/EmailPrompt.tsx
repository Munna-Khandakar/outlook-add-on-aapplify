import {Fragment, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import api from "../utils/ApiInstance";
import {EmailPromptInput} from "../types/EmailPrompt";

type EmailPromptProps = {
    setSuggestionsResponse: (response: string[]) => void;
}

export const EmailPrompt = (props: EmailPromptProps) => {

    const {setSuggestionsResponse} = props;
    const [alertMessage, setAlertMessage] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: {isSubmitting},
    } = useForm<EmailPromptInput>();

    const onSubmit: SubmitHandler<EmailPromptInput> = (data) => {
        api.post('/api/service-email/generate-email/', data).then((response) => {
            setSuggestionsResponse(response.data.prompt)
        }).catch((error) => {
            reset();
            setAlertMessage(error.response.data.error)
        });
    };

    return (
        <Fragment>
            {
                alertMessage &&
                <div
                    className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-blue-400"
                    role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Info alert!</span> {alertMessage}
                    </div>
                </div>
            }
            <form onSubmit={handleSubmit(onSubmit)} className="py-4 px-1">
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
                            className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-300 dark:bg-gray-800 cursor-pointer rounded-lg shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                        >
                            <span
                                className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                            <span className="relative block px-3 py-1 rounded-lg bg-gray-50 dark:bg-gray-700">
        <div className="relative flex items-center space-x-2">

            {
                isSubmitting
                    ? <span
                        className="transition-all duration-500 group-hover:translate-x-1 text-sm text-gray-900 dark:text-white">
                            Loading
                    </span>
                    : <Fragment>
                        <span
                            className="transition-all duration-500 group-hover:translate-x-1 text-sm text-gray-900 dark:text-white">Generate Email</span>
                        <svg
                            className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1 text-gray-900 dark:text-white"
                            data-slot="icon"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                clipRule="evenodd"
                                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                fillRule="evenodd"
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
        </Fragment>
    )
}