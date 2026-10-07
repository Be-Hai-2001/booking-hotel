import React from "react"
import { Box, Button, Grid, IconButton, ImageList, ImageListItem, Paper, Typography } from "@mui/material";
import { getImageUrl } from '../../../../../shared/utils/image';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UndoIcon from '@mui/icons-material/Undo';

export const ImagesForm = ({
    onDelete, // funtion lấy danh sách ảnh xóa
    imagesDelete = [],

    notification = 'Không có ảnh',
    button = <></>,
    sxButton = { textAlign: 'end' },
    images = [],
    styleImageList = { width: 'auto', height: 450 },
    sx = { padding: "1rem 1rem" },
    StyleIconButton = {
        position: 'absolute',
        right: 0,
        top: 0,
        background: '#fafafac9',
        borderRadius: 0,
        '&:hover': {
            color: 'black',
            background: 'red'
        },
    }
}) => {
    return (
        <Paper sx={sx}>
            <Box>
                {images.length === 0 ? (
                    <Typography>{notification}</Typography>
                ) : (
                    <ImageList sx={styleImageList} cols={3} rowHeight={164}>
                        {images.map((item) => (
                            <ImageListItem key={item?.id}>
                                <IconButton
                                    aria-label="delete"
                                    size="small"
                                    color="error"
                                    sx={StyleIconButton}
                                    onClick={() => onDelete(item?.id)}
                                >
                                    {
                                        imagesDelete.includes(item?.id)
                                            ? <UndoIcon sx={{
                                                color: 'black',
                                                '&:hover': {
                                                    color: 'Yellow',
                                                },
                                            }} />
                                            : <DeleteForeverIcon />
                                    }
                                </IconButton>
                                <img
                                    src={getImageUrl(item?.image_path)}
                                    alt={item?.image_path || 'hotel image'}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                )}
            </Box>
            <Box
                sx={sxButton}
            >
                {
                    button
                }
            </Box>
        </Paper >
    );
}

export default React.memo(ImagesForm);