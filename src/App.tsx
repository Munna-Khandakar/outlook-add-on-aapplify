import {useEffect} from "react";
import {useOfficeContext} from "./contexts/OfficeContext";
import {WelcomePage} from "./components/WelcomePage";

function App() {

    const {isOfficeInitialized, userProfile, officeTheme} = useOfficeContext();

    useEffect(() => {
        if (officeTheme) {
            if (officeTheme.bodyBackgroundColor === '#212121') {
                //dark theme
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.add('light')
            }
        } else {
            document.documentElement.classList.add('dark')
        }
    }, [officeTheme]);

    return (
        <div className="h-screen px-2 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-gray-200">
            {
                isOfficeInitialized ?
                    <WelcomePage
                        userProfile={userProfile}
                    />
                    :
                    <h1>Loading...</h1>
            }
        </div>
    );
}

export default App;
