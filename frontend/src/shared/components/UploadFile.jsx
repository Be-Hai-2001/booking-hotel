import { Box, Button, ButtonGroup, FormControl, IconButton, ImageList, ImageListItem, ImageListItemBar, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Select, Typography } from "@mui/material";
import React from "react";
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import { useUploadFile } from '../hooks/useUploadFile';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

/**
 * 
 * @param {*} images : danh sách hình ảnh => muc đích để cập nhật cho cmp cha 
 * @returns 
 */

export const UploadFile = ({ open, onClose, hotelId = null, onUploaded }) => {
    const {
        handleGroupdown,
        openItem,
        anchorEl,
        handleClose,
        handleOnclickMenu,
        handleOpenDevice,
        handleChangeImages,
        fileInputRef,

        handleUploadClick,
        selectedImage,
        handleRemovePageUpFile
        // isDragging,
        // handleDragOver,
        // handleDragEnter,
        // handleDragLeave,
        // handleDrop,
        // handleFileSelect,
        // handleBoxClick,
        // handleRemoveImage,

    } = useUploadFile({ hotelId, onSuccess: onUploaded });

    const menuItem = [
        { title: 'Thiết bị', icon: <ImportantDevicesIcon />, handle: handleOpenDevice },
        { title: 'Drive', icon: <AddToDriveIcon /> },
    ];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            sx={{
                '& .MuiPaper-root': {
                    height: '85vh',
                }
            }}
        >
            <Box
                sx={{
                    height: 'inherit',
                    maxHeight: '66vh',
                    margin: '4em 3em',
                    border: '2px dashed #ccc',
                    borderRadius: '5px',

                    '& ul': {
                        padding: '0 10px'
                    }
                }}
            // onClick={handleBoxClick}
            // onDragOver={handleDragOver}
            // onDragEnter={handleDragEnter}
            // onDragLeave={handleDragLeave}
            // onDrop={handleDrop}
            >
                {
                    selectedImage?.length > 0
                        ? (

                            <ImageList
                                cols={2}
                                gap={12}
                                sx={{
                                    maxHeight: '96%',
                                    alignContent: 'start',
                                }}

                            >
                                {selectedImage.map((item, index) => (
                                    <ImageListItem key={item.preview}>
                                        <img
                                            src={item.preview}
                                            alt={item.file.name}
                                            loading="lazy"
                                            style={{ aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 8 }}
                                        />
                                        <ImageListItemBar
                                            position="top"
                                            actionPosition="right"
                                            sx={{ background: 'transparent' }}
                                            actionIcon={
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleRemovePageUpFile(index)}
                                                    sx={{ bgcolor: 'rgba(255,255,255,.85)', m: 0.5, '&:hover': { bgcolor: '#fff' } }}
                                                >
                                                    <DeleteIcon fontSize="small" color="error" />
                                                </IconButton>
                                            }
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        )
                        : <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                minHeight: 400,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                gap: 1,
                                color: 'text.disabled',
                            }}>
                            <CloudUploadOutlinedIcon
                                sx={{
                                    fontSize: 64,
                                    height: '60%',
                                    width: '60%',
                                    opacity: '30%'
                                }}
                            />

                            <Typography sx={{ fontWeight: 'bold' }}>
                                Chưa có ảnh nào. Bấm "&#9660;" để thêm.
                            </Typography>
                        </Box>

                }

                {/* <DialogTitle
                    sx={{
                        color: 'blueviolet',
                        textDecoration: 'underline solid blueviolet'
                    }}
                >
                    Tải ảnh lên
                </DialogTitle> */}

                <DialogContent
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0
                    }}
                >
                    <ButtonGroup disableElevation variant="contained">

                        <Button
                            variant="outlined"
                            startIcon={<FileUploadIcon />}
                            onClick={() => handleUploadClick(selectedImage)}
                        >
                            Tải ảnh lên
                        </Button>

                        <Button

                            onClick={handleOnclickMenu}
                        >
                            <ArrowDropDownIcon />
                        </Button>

                    </ButtonGroup>

                    <Menu anchorEl={anchorEl} open={openItem} onClose={handleClose}>
                        {menuItem.map((item) => (
                            <MenuItem
                                key={item.title}
                                onClick={() => {
                                    handleClose();
                                    item.handle?.();
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText>{item.title}</ListItemText>
                            </MenuItem>
                        ))}
                    </Menu>

                    {/* ngoài <Menu> */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        multiple
                        hidden
                        onChange={(e) => handleChangeImages(e)}
                    />
                </DialogContent>
            </Box>
        </Dialog >
    );
};

export default UploadFile;