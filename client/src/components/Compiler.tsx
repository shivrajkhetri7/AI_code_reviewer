import '../styles/Compiler.css';
import React, { useState } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import axios from 'axios';
import DOMPurify from 'dompurify';
import Image from "../assets/send.png";

function Compiler() {
    const [inputText, setInputText] = useState<string>('');
    const [displayedText, setDisplayedText] = useState<string>('');
    const [readMeContent, setReadMeContent] = useState<string>('');
    const [inputHistory, setInputHistory] = useState<string[]>([]);
    const [responseHistory, setResponseHistory] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(event.target.value);
    };

    const handleClick = async () => {
        try {
            const sanitizedText = DOMPurify.sanitize(inputText);
            setDisplayedText(sanitizedText);
            setInputHistory(prev => [...prev, sanitizedText]);
            setInputText('');
            await getAiResponse(sanitizedText);
        } catch (error) {
            console.error(error);
        }
    };

    const getAiResponse = async (text: string) => {
        try {
            const headers = {
                'Content-Type': 'application/json'
            };

            const body = {
                prompt: text
            };

            const response = await axios.post(
                'http://localhost:8000/ai-prompt',
                body,
                { headers }
            );

            setReadMeContent(response.data?.result || "No response from AI.");
            setResponseHistory(prev => [...prev, response.data?.result]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
        }
    };

    return (
        <div className='container'>
            <div className="user_inputs">
                <div className='past-details'>
                    {inputHistory.map((input, index) => (
                        <div key={index} className='input-text'>
                            <p>{input}</p>
                        </div>
                    ))}
                </div>
                <div className='input-grp'>
                    <textarea
                        className='input-code'
                        placeholder='Ask ToCode Review ...'
                        value={inputText}
                        onChange={handleChange}
                        rows={10}
                        style={{ resize: 'none' }}
                    />
                    <button className='btn-send' onClick={handleClick}>
                        <img src={Image} alt="send icon" />
                    </button>
                </div>
            </div>
            <div className="system_output">
                {responseHistory.length > 0 && responseHistory.map((response:any, index) => (
                    <div className='readContext' key={index}>
                        <MarkdownPreview
                            source={response}
                            style={{ padding: 16, backgroundColor: 'transparent' }}
                            rehypeRewrite={(node: any, index, parent: any) => {
                                if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
                                    parent.children = parent.children.slice(1);
                                }
                            }}
                        />
                    </div>)
                )}
            </div>
        </div>
    );
}

export default Compiler;
