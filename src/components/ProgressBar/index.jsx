import React, { useState, useEffect } from 'react';

export default function ProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            role="progressbar"
            aria-label="Reading progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            className="pointer-events-none fixed left-0 top-0 z-[60] h-[3px] bg-accent"
            style={{ width: `${progress}%`, transition: 'width 0.08s linear' }}
        />
    );
}
