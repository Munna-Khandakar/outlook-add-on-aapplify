import {FormEvent, useState} from "react";

export const TextSuggestion = () => {

    const [suggestionsResponse, setSuggestionsResponse] = useState<string>('');

    const copyToClipboard = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(suggestionsResponse).catch(err => {
                console.error('Failed to copy: ', err);
                fallbackCopyTextToClipboard(suggestionsResponse);
            });
        } else {
            fallbackCopyTextToClipboard(suggestionsResponse);
        }
    }

    const fallbackCopyTextToClipboard = (text: string) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";  // Avoid scrolling to bottom
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            console.log('Fallback: Copying text command was successful');
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSuggestionsResponse('This is a suggestion');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="text" className="text-sm">Enter your text</label>
                <textarea
                    placeholder="Enter your text"
                    className="p-2 mb-2 border rounded w-full border-gray-300 text-black"
                />
                <button type="submit" className="px-2 py-1 rounded bg-blue-500 text-white">Submit</button>
            </form>
            {
                suggestionsResponse &&
                <div>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Suggestions</span>
                        <button
                            className="text-xs px-2 py-1 border rounded"
                            onClick={copyToClipboard}>
                            copy
                        </button>
                    </div>
                    <p>{suggestionsResponse}</p>
                </div>
            }
        </div>
    );
}