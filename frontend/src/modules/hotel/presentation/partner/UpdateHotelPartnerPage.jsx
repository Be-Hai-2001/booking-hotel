import React, { useEffect } from "react";
import { AdminLayout } from "../../../../shared/components/AdminLayout";
import HotelForm from "./components/HotelForm";
import ImagesForm from "./components/ImagesForm";
import useUpdateHotel from "../../application/useUpdateHotel";
import { hotelEnums } from "../constants/hotelEnums";
import BaseButton from "../../../../shared/components/BaseButton";
import { Box, Typography } from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { UploadFile } from '../../../../shared/components/UploadFile';

/**
 * 
 * @param: 
 *  - alert : prop cho component thông báo
        { message: Nội dung thông báo (Thêm mới thành công | ... )
         timer: Thời gian hiển thị cái thông báo này (s)
         alertKey: key của compoent Alert
        }
 *     
 */

export const UpdateHotelPartnerPage = () => {

    const fields = [
        { name: hotelEnums.Fields.HOTEL_NAME, typography: 'Tên khách sạn*:', required: true },
        { name: hotelEnums.Fields.PHONE, typography: 'Số điện thoại*:', type: 'tel' },
        { name: hotelEnums.Fields.ADDRESS_DETAIL, typography: 'Địa chỉ chi tiết:' },
        { name: hotelEnums.Fields.CITY_ID, typography: 'Tỉnh/Thành phố:' },
        { name: hotelEnums.Fields.WARD_ID, typography: 'Phường/Xã:' },
    ];

    const {
        formData,
        cityList,
        wardList,
        fetchWards,
        handleChange,
        handleAutocompleteChange,
        handleSubmit,
        ward,
        loading,
        images, // Danh sách hình ảnh
        alert = { message: '', timer: 0, alertKey: {} },
        // handdleUploadFile,
        openViewUpload,
        openUpload = false,
        id, // Khoá chính cho bảng hotel

        handleDeleteImage,
        handleSubmitDeleteImage,
        handleChangeImagesChild,
        imagesDelete

    } = useUpdateHotel();

    return (
        <>
            <AdminLayout
                children={
                    <Box>
                        {/* Infomation */}
                        <Box>
                            <Typography
                                key={'info'}
                                sx={{
                                    textAlign: "initial",
                                    fontWeight: 700,
                                    fontSize: "20px",
                                    color: "darkblue",
                                    textDecoration: "underline solid darkblue",
                                    textUnderlineOffset: "4px",
                                }}
                            >
                                Thông tin
                            </Typography>
                            <HotelForm
                                fields={fields}
                                formData={formData}
                                cityList={cityList}
                                wardList={wardList}
                                fetchWards={fetchWards}
                                handleChange={handleChange}
                                handleAutocompleteChange={handleAutocompleteChange}
                                ward={ward}
                                buttonSubmit={
                                    <BaseButton
                                        handleClick={handleSubmit}
                                        loading={loading}
                                        endIcon={<UpdateIcon />}
                                        content='Cập nhật'
                                    />
                                }
                            />
                        </Box>

                        {/* list image */}
                        <Box
                            sx={{
                                marginTop: "3rem"
                            }}>
                            <Typography
                                key={'images'}
                                sx={{
                                    textAlign: "initial",
                                    fontWeight: 700,
                                    fontSize: "20px",
                                    color: "darkblue",
                                    textDecoration: "underline solid darkblue",
                                    textUnderlineOffset: "4px",
                                    marginTop: "3rem"
                                }}>
                                Danh sách hìn ảnh
                            </Typography>

                            <ImagesForm
                                imagesDelete={imagesDelete}
                                onDelete={(id) => handleDeleteImage(id)}
                                images={images}
                                button={
                                    <>
                                        <BaseButton
                                            sx={{
                                                borderRadius: '0',
                                                fontWeight: 'bold',
                                                marginRight: '10px'
                                            }}
                                            handleClick={handleSubmitDeleteImage}
                                            content="Cập nhật"
                                            endIcon={<UpdateIcon />}
                                        />

                                        <BaseButton
                                            sx={{
                                                borderRadius: '0',
                                                fontWeight: 'bold',
                                                background: '#eee',
                                                color: 'black'
                                            }}
                                            handleClick={openViewUpload}
                                            content="Upload_File"
                                            endIcon={<CloudUploadIcon />}
                                        />
                                    </>
                                }
                            />
                        </Box>

                        {
                            openUpload &&
                            <UploadFile
                                hotelId={id}
                                open={openUpload}
                                onClose={openViewUpload}
                                onUploaded={handleChangeImagesChild}

                            />
                        }
                    </Box>
                }
                title="Chỉnh sửa khách sạn"
                alert={alert}
            />
        </>
    );
}

export default UpdateHotelPartnerPage;