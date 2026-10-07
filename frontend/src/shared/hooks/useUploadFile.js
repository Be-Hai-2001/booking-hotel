import { useRef, useState } from "react";
import { hotelApi } from '../../modules/hotel/infrastructure/hotelApi';
import { useParams } from 'react-router-dom';

export const useUploadFile = ({ hotelId = null, onSuccess }) => {

    // hotelImages.append('images', 'images');
    // console.log('images', hotelImages);

    // const { id } = useParams();

    const [anchorEl, setAnchorEl] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedImage, setSelectedImage] = useState([]);
    const fileInputRef = useRef(null);
    const openItem = Boolean(anchorEl);

    const handleGroupdown = (e) => {
        // console.log(e);
        // setAnchorEl(fileInputRef?.current ?? null);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleOnclickMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    // -- Sự kiện lấy ảnh từ btn thiết bị
    const handleOpenDevice = () => {
        fileInputRef.current?.click();  // -- mở hộp thoại chọn file của hệ điều hành
    };

    // -- Sự kiện cập nhật danh sách hình ảnh
    const handleChangeImages = (e) => {
        const files = Array.from(e.target.files);

        setSelectedImage((prev) => {
            const newItems = files
                .filter((f) => !prev.some((p) => p.file.name === f.name && p.file.size === f.size))
                .map((file) => ({ file, preview: URL.createObjectURL(file) }));
            return [...prev, ...newItems];
        })

        e.target.value = '';   // cho phép chọn lại cùng file
    };

    const handleRemovePageUpFile = (index) => {
        setSelectedImage((prev) => prev.filter((_, i) => i !== index));
    }

    // -- Sự kiện lưu danh sách ảnh
    const handleUploadClick = async (images = []) => {
        try {
            // console.log('data', data);

            if (images.length > 0) {
                const formData = new FormData();

                images.forEach((item) => {
                    formData.append("images[]", item?.file);
                });
                const { data, success } = await hotelApi.storeHotelImages(hotelId, formData);

                if (success) {
                    // console.log('repo', data);
                    setAnchorEl(null);
                    onSuccess?.(data);
                }
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    // // -- Sự kiện thao tác kéo thả trong thẻ Box
    // const handleDragOver = (e) => {
    //     console.log('e', e);
    //     e.preventDefault();
    //     e.stopPropagation();
    // };

    // const handleDragEnter = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     setIsDragging(true);
    // };

    // const handleDragLeave = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     setIsDragging(false);
    // };

    // // -- Xử lý thả file
    // const handleDrop = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     setIsDragging(false);

    //     const files = e.dataTransfer.files;
    //     if (files && files.length > 0) {
    //         processFile(files[0]);
    //     }
    // };

    // // 3. Xử lý chọn file bằng click
    // const handleFileSelect = (e) => {
    //     const files = e.target.files;
    //     if (files && files.length > 0) {
    //         processFile(files[0]);
    //     }
    // };

    // // Kiếm tra định dạng & đọc file ảnh
    // const processFile = (file) => {
    //     if (!file.type.startsWith('image/')) {
    //         alert('Vui lòng chỉ chọn tệp hình ảnh (PNG, JPG, WEBP,...)!');
    //         return;
    //     }

    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         setSelectedImage(e.target.result); // Lưu URL base64 để preview
    //     };
    //     reader.readAsDataURL(file);
    // };

    // // Mở cửa sổ chọn file khi click vào Box
    // const handleBoxClick = () => {
    //     if (fileInputRef.current) {
    //         fileInputRef.current.click();
    //     }
    // };

    // // Xóa ảnh đã chọn
    // const handleRemoveImage = (e) => {
    //     e.stopPropagation(); // Ngăn sự kiện click lan ra thẻ Box cha
    //     setSelectedImage(null);
    //     if (fileInputRef.current) {
    //         fileInputRef.current.value = '';
    //     }
    // };

    return {
        handleOpenDevice,
        handleChangeImages,

        handleOnclickMenu,
        handleClose,
        handleGroupdown,
        openItem,
        anchorEl,
        fileInputRef,

        // -- Thao tác cho thẻ box
        // isDragging,
        handleUploadClick,
        selectedImage,
        handleRemovePageUpFile
        // handleDragOver,
        // handleDragEnter,
        // handleDragLeave,
        // handleDrop,
        // handleFileSelect,
        // handleBoxClick,
        // handleRemoveImage,
    }
}

export default useUploadFile;