import {EmailSuggestionCard} from "./EmailSuggestionCard";

type EmailSuggestionsProps = {
    suggestionsResponse: string[];
}

export const EmailSuggestions = (props: EmailSuggestionsProps) => {

    const {suggestionsResponse} = props;

    return (
        <div>
            <h1 className="text-lg font-bold py-4">Suggestions</h1>

            <div className="flex flex-col gap-2 overflow-auto">
                {
                    suggestionsResponse.map((suggestion, index) => (
                        <EmailSuggestionCard
                            key={index}
                            suggestion={suggestion}
                        />
                    ))
                }
            </div>

        </div>
    );
}