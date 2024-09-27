import {Fragment} from "react";
import {useAuthContext} from "../contexts/AuthContext";
import {Login} from "./Login";
import {TextSuggestion} from "./TextSuggestion";

type WelcomePageProps = {
    userProfile: Office.UserProfile | undefined;
}

export const WelcomePage = (props: WelcomePageProps) => {

    const {userProfile} = props;
    const {token, setToken, removeToken} = useAuthContext();

    return (
        <div className="flex flex-col h-full">
            <div className="w-full py-5 text-center my-auto">
                <h1 className="text-lg font-bold">
                    Welcome {userProfile?.displayName} to Aapplify
                </h1>
            </div>
            <div className="flex-grow">
                {
                    token === null
                        ? <Login
                            defaultUserEmail={userProfile?.emailAddress}
                            setToken={setToken}
                        />
                        : <TextSuggestion/>
                }
            </div>
            {
                token &&
                <div className="w-full py-5 text-center my-auto">
                    <button
                        className="px-2 py-1 text-xs rounded border"
                        onClick={() => removeToken()}
                    >
                        Logout
                    </button>
                </div>
            }
        </div>
    );
}