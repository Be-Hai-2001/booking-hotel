import React from "react";
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export const SendButton = ({
    handleClick,
    endIcon = <SendIcon />,
    size = 'large',
    variant = 'contained',
    loadingPosition = 'end',
    loading,
    sx = {
        position: 'absolute',
        right: '20px',
        bottom: '20px',
        background: '#D9D9D9',
        color: 'darkblue',
        borderRadius: '0'
    },
    content = 'Send'
}) => {

    return (
        <Button
            onClick={handleClick}
            endIcon={endIcon}
            loading={loading}
            loadingPosition={loadingPosition}
            variant={variant}
            size={size}
            sx={sx}
        >
            {content}
        </Button>
    );
}

export default SendButton;