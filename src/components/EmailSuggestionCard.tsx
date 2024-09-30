import { useState } from 'react';
import { motion } from 'framer-motion';

type EmailSuggestionCardProps = {
    suggestion: string;
}

export const EmailSuggestionCard = (props: EmailSuggestionCardProps) => {
    const { suggestion } = props;
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(suggestion).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                fallbackCopyTextToClipboard(suggestion);
            });
        } else {
            fallbackCopyTextToClipboard(suggestion);
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
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            console.log('Fallback: Copying text command was successful');
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }

    return (
        <div className="p-4 bg-slate-200 text-sm text-justify dark:bg-slate-800 text-slate-900 dark:text-gray-200 rounded-md">
            {suggestion}
            <div>
                <motion.button
                    onClick={copyToClipboard}
                    className="mt-2 px-4 py-2 bg-slate-300 dark:bg-slate-700 text-xs text-slate-900 dark:text-gray-200 rounded-md hover:bg-slate-400 dark:hover:bg-slate-600"
                    whileTap={{ scale: 0.9 }}
                >
                    Copy to Clipboard
                </motion.button>
                {copied && <p className="mt-2 text-green-500 text-xs">Added to clipboard</p>}
            </div>
        </div>
    );
}