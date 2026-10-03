import { Alert } from "@mui/material";
import { useCountdown } from '../hooks/useCountdown';

export const AlertCustom = ({
    severity = "success",
    filled = 'filled',
    timer = 0, // Số giây
    message,
    alertKey,
    sx = {
        position: 'fixed',
        borderRadius: 0,
        bottom: 0
    }
}) => {

    const timeLeft = useCountdown(timer, alertKey);

    if (timeLeft <= 0) return null;

    return (
        <Alert
            key={alertKey}
            variant={filled}
            severity={severity}
            sx={sx}
        >
            {message}
        </Alert>
    );
};