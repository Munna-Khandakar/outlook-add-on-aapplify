import {useAuthContext} from "../contexts/AuthContext";
import {Login} from "./Login";
import {EmailGenerator} from "./EmailGenerator";
import {Fragment} from "react";

type WelcomePageProps = {
    userProfile: Office.UserProfile | undefined;
}

export const WelcomePage = (props: WelcomePageProps) => {

    const {userProfile} = props;
    const {token, setToken} = useAuthContext();

    return (
        <Fragment>
            {
                token === null
                    ? <Login
                        userProfile={userProfile}
                        setToken={setToken}
                    />
                    : <EmailGenerator/>
            }
        </Fragment>
    );
}