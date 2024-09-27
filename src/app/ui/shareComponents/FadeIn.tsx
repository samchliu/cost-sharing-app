import { useEffect, useState } from 'react';

interface FadeInProps {
    children: React.ReactNode;
    direction: 'top' | 'left' | 'right';
}

export const FadeIn = ({ children, direction }: FadeInProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const transitions = {
        right: {
            start: 'right-2 opacity-90',
            end: 'right-0 opacity-100',
        },
        top: {
            start: 'top-2 opacity-90',
            end: 'top-0 opacity-100',
        },
        left: {
            start: 'left-2 opacity-90',
            end: 'left-0 opacity-100',
        },
    };

    const { start, end } = transitions[direction];

    return (
        <div className={`w-full transition-all duration-300 ease-in-out relative ${!isVisible ? start : end}`}>
            {children}
        </div>
    );
};
