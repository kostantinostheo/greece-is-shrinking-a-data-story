import React, { useEffect, useState } from 'react';
import { ChevronUpIcon } from '../Icons';

export default function ScrollToTopButton({ threshold = 600 }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > threshold);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);

    return (
        <button
            type="button"
            aria-label="Scroll to top"
            tabIndex={visible ? 0 : -1}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-5 right-5 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-accent text-on-accent shadow-lg transition-all duration-300 hover:opacity-90 ${
                visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
            }`}
        >
            <ChevronUpIcon size={22} />
        </button>
    );
}
