import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormInput } from "../types/LoginFormInput";
import api from "../utils/ApiInstance";

type LoginProps = {
    userProfile: Office.UserProfile | undefined;
    setToken: (token: string) => void;
}

const TermsPopover = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-2">Terms and Conditions</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
                Here are the terms and conditions...
            </p>
            <button
                onClick={onClose}
                className="mt-4 px-2 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Close
            </button>
        </div>
    </div>
);

export const Login = (props: LoginProps) => {
    const { userProfile, setToken } = props;
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInput>({
        defaultValues: {
            email: userProfile?.emailAddress,
            password: '',
        },
    });

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
        api.post('/auth/token', data).then((response) => {
            // console.log(response.data);
        }).catch((error) => {
            // console.log(error.response.data.message);
        }).finally(() => {
            setToken('token');
        });
    };

    return (
        <div>
            <h1 className="text-lg font-bold py-4 text-center">
                Welcome {userProfile?.displayName} to Aapplify
            </h1>
            <p className="text-sm my-2 text-center">Please Login to your account</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <label htmlFor="email"
                           className={`block mb-2 text-sm font-medium ${errors.email ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={`bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.email ? 'border-red-500' : 'border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}`}
                        placeholder="aapplify@gmail.com"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor="password"
                           className={`block mb-2 text-sm font-medium ${errors.password ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                        Your password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className={`bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.password ? 'border-red-500' : 'border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}`}
                        placeholder="Password"
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={isSubmitting}
                >
                    Login
                </button>
            </form>
            <p
                className="text-sm  mt-4 text-center font-medium text-gray-400 dark:text-gray-600 cursor-pointer"
                onClick={() => setIsPopoverOpen(true)}
            >
                Our terms and condition
            </p>
            {isPopoverOpen && <TermsPopover onClose={() => setIsPopoverOpen(false)} />}
        </div>
    );
}