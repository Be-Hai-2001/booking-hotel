import React, { useEffect } from "react";
import { AdminLayout } from "../../../../shared/components/AdminLayout";
import HotelForm from "./components/HotelForm";
import ImagesForm from "./components/ImagesForm";
import useUpdateHotel from "../../application/useUpdateHotel";
import { hotelEnums } from "../constants/hotelEnums";
import AddButton from "../../../../shared/components/AddButton";
import { Box, Typography } from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
        images,
        alert = { message: '', timer: 0, alertKey: {} }
    } = useUpdateHotel();

    return (
        <>
            <AdminLayout
                children={
                    <Box>
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
                                    <AddButton
                                        handleClick={handleSubmit}
                                        loading={loading}
                                        endIcon={<UpdateIcon />}
                                        content='Cập nhật'
                                    />
                                }
                            />
                        </Box>
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
                                images={images}
                                button={
                                    <AddButton
                                        content="Upload_File"
                                        endIcon={<CloudUploadIcon />}
                                    />
                                }
                            />
                        </Box>

                    </Box>
                }
                title="Chỉnh sửa khách sạn"
                alert={alert}
            />
        </>
    );
}

export default UpdateHotelPartnerPage;