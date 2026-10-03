import React from "react";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export const AddButton = ({
    handleClick,
    loading = false,
    endIcon = <AddIcon />,
    size = 'large',
    variant = 'contained',
    loadingPosition = 'end',
    sx = {
        borderRadius: '0',
        fontWeight: 'bold'
    },
    content = 'Thêm mới'
}) => {

    return (
        <Button
            color="primary"
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