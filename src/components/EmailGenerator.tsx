import {useState} from "react";
import {EmailPrompt} from "./EmailPrompt";
import {EmailSuggestions} from "./EmailSuggestions";

export const EmailGenerator = () => {

    const [suggestionsResponse, setSuggestionsResponse] = useState<string[]>([]);



    return (
        <div>
            {
                suggestionsResponse.length > 0
                    ? <EmailSuggestions
                        suggestionsResponse={suggestionsResponse}
                    />
                    : <EmailPrompt setSuggestionsResponse={setSuggestionsResponse}/>
            }
        </div>
    );
}