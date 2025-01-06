// Ocr.js
import { useEffect, useRef, useState } from 'react';
import { createWorker } from 'tesseract.js';

export const Ocr = ({ file }) => {
    const [progress, setProgress] = useState(0);
    const [progressLabel, setProgressLabel] = useState('');
    const [ocrResult, setOcrResult] = useState('');
    const workerRef = useRef(null);

    useEffect(() => {
        const initializeWorker = async () => {
            workerRef.current = await createWorker({
                logger: m => {
                    if ('progress' in m) {
                        setProgress(m.progress);
                        setProgressLabel(m.status);
                    }
                },
                workerPath: '/tesseract.js/worker.min.js'
            });
        };
        
        initializeWorker();
        
        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
            }
        };
    }, []);


    useEffect(() => {
        if (file && workerRef.current) {
            handleExtract();
        }
    }, [file]);

    const handleExtract = async () => {
        try {
            setProgress(0);
            setProgressLabel('Starting OCR');

            const worker = workerRef.current;
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');

            const response = await worker.recognize(file);
            setOcrResult(response.data.text);
            console.log('OCR Result:', response.data.text);
        } catch (error) {
            console.error('OCR Error:', error);
            setProgressLabel('Error processing image');
        }
    };

    return (
        <div>
            <div>Progress: {Math.round(progress * 100)}%</div>
            <div>Status: {progressLabel}</div>
            {ocrResult && (
                <div>
                    <h3>OCR Result:</h3>
                    <pre>{ocrResult}</pre>
                </div>
            )}
        </div>
    );
};
