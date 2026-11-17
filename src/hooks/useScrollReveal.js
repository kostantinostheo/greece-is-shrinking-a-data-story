import { useEffect, useRef } from 'react';

// Adds `reveal-visible` the first time the element's top edge scrolls into view.
// threshold 0 matters: tall elements can never reach a 20% visibility ratio.
export function useScrollReveal(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('reveal-visible');
                    observer.unobserve(el);
                }
            },
            {
                threshold: options.threshold ?? 0,
                rootMargin: options.rootMargin ?? '0px 0px -10% 0px',
            }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [options.threshold, options.rootMargin]);

    return ref;
}
