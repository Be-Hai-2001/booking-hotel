// shared/hooks/useCountdown.js
import { useEffect, useState } from 'react';

export const useCountdown = (seconds, trigger) => {
    const [timeLeft, setTimeLeft] = useState(seconds);
    useEffect(() => {
        setTimeLeft(seconds);
        const id = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(id);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(id);
    }, [seconds, trigger]);

    return timeLeft;
}

export default useCountdown;