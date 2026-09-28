import React from "react";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export const AddButton = ({
    handleClick,
    endIcon = <AddIcon />,
    size = 'large',
    variant = 'contained',
    loadingPosition = 'end',
    loading,
    sx = {
        background: '#D9D9D9',
        color: 'darkblue',
        borderRadius: '0'
    },
    content = 'Thêm mới'
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

export default AddButton;