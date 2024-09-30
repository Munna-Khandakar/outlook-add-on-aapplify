import {useOfficeContext} from "./contexts/OfficeContext";
import "./App.css";
import {WelcomePage} from "./components/WelcomePage";
import {useEffect} from "react";

function App() {

    const {isOfficeInitialized, userProfile, officeTheme} = useOfficeContext();

    useEffect(() => {
        if (officeTheme) {
            console.log(officeTheme);
            document.documentElement.classList.add('dark')
        }else{
            console.log('no theme');
            document.documentElement.classList.add('dark')
        }
    }, [officeTheme]);

    return (
        <div
            className="h-screen px-2 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-gray-200"
            style={{
                background: officeTheme?.bodyBackgroundColor,
                color: officeTheme?.bodyForegroundColor,
            }}
        >
            {
                isOfficeInitialized ? (
                    <WelcomePage
                        userProfile={userProfile}
                    />
                ) : (
                    <h1>Loading...</h1>
                )
            }

        </div>
    );
}

export default App;
