import {FormEvent} from "react";

type LoginProps = {
    defaultUserEmail: string | undefined;
    setToken: (token: string) => void;
}

export const Login = (props: LoginProps) => {

    const {defaultUserEmail, setToken} = props;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setToken("application-token");
    }

    return (
        <div>
            <p className="text-sm my-2 text-center">Please Login to your account</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="text-sm">Email</label>
                <input type="email" placeholder="Email" defaultValue={defaultUserEmail}
                       className="p-2 mb-2 border rounded w-full border-gray-300 text-black"/>
                <label htmlFor="password" className="text-sm">Password</label>
                <input type="password" placeholder="Password"
                       className="p-2 mb-4 border rounded w-full border-gray-300 text-black"/>
                <button type="submit" className="px-2 py-1 rounded bg-blue-500 text-white">Login</button>
            </form>
        </div>
    );
}