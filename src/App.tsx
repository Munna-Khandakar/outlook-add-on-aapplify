import {useOfficeContext} from "./contexts/OfficeContext";
import "./App.css";
import {WelcomePage} from "./components/WelcomePage";

function App() {

    const {isOfficeInitialized, userProfile, officeTheme} = useOfficeContext();

    return (
        <div
            className="h-screen px-2"
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
