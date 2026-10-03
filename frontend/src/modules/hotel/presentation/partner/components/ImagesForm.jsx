import React from "react"
import { Box, Grid, ImageList, ImageListItem, Paper, Typography } from "@mui/material";
import { getImageUrl } from '../../../../../shared/utils/image';

export const ImagesForm = ({
    sx = { padding: "1rem 1rem" },
    notification = 'Không có ảnh',
    button = <></>,
    sxButton = { textAlign: 'end' },
    images = []
}) => {
    return (
        <Paper
            sx={sx}
        >
            <Box>
                {
                    images.length === 0
                        ?
                        (
                            <Typography>
                                {notification}
                            </Typography>
                        )
                        :
                        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                            {images.map((item) => (
                                <ImageListItem
                                    key={item?.id}

                                >
                                    <img
                                        src={getImageUrl(item?.image_path)}
                                        // alt={item.title}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    // ))
                }
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

export default ImagesForm;