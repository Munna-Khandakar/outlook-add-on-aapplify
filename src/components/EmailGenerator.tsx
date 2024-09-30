import {useState} from "react";
import {EmailPrompt} from "./EmailPrompt";
import {EmailSuggestions} from "./EmailSuggestions";
import {motion} from "framer-motion";

type EmailGeneratorProps = {
    removeToken: () => void;
}

export const EmailGenerator = (props:EmailGeneratorProps) => {

    const {removeToken} = props;

    const [suggestionsResponse, setSuggestionsResponse] = useState<string[]>([]);

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow overflow-y-auto">
                {
                    suggestionsResponse.length > 0
                        ? <EmailSuggestions
                            suggestionsResponse={suggestionsResponse}
                        />
                        : <EmailPrompt setSuggestionsResponse={setSuggestionsResponse}/>
                }
            </div>
            <div className="flex gap-2 py-2">
                {
                    suggestionsResponse.length > 0 &&
                    <motion.button
                        onClick={() => setSuggestionsResponse([])}
                        className="mt-2 px-4 py-2 bg-slate-300 dark:bg-slate-700 text-xs text-slate-900 dark:text-gray-200 rounded-md hover:bg-slate-400 dark:hover:bg-slate-600"
                        whileTap={{scale: 0.9}}
                    >
                        Write Another Email
                    </motion.button>
                }
                <motion.button
                    onClick={() => {
                        removeToken();
                    }}
                    className="mt-2 px-4 py-2 bg-slate-300 dark:bg-slate-700 text-xs text-slate-900 dark:text-gray-200 rounded-md hover:bg-slate-400 dark:hover:bg-slate-600"
                    whileTap={{scale: 0.9}}
                >
                    Logout
                </motion.button>
            </div>
        </div>
    );
}