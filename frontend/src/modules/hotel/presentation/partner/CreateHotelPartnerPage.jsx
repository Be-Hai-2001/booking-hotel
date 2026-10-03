import HotelForm from "./components/HotelForm";
import { AdminLayout } from "../../../../shared/components/AdminLayout";
import useCreateHotel from "../../application/useCreateHotel";
import SendButton from "../../../../shared/components/SendButton";
import { hotelEnums } from "../constants/hotelEnums";

export const CreateHotelPartnerPage = () => {

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
        fetchCities,
        fetchWards,
        handleChange,
        handleSubmit,
        handleAutocompleteChange,
        loading,
    } = useCreateHotel();

    return (
        <AdminLayout
            title={'Thêm mới khách sạn'}
            children={
                <>
                    <HotelForm
                        fields={fields}
                        formData={formData}
                        cityList={cityList}
                        wardList={wardList}
                        fetchCities={fetchCities}
                        fetchWards={fetchWards}
                        handleChange={handleChange}
                        handleAutocompleteChange={handleAutocompleteChange}
                    />

                    <SendButton
                        handleClick={handleSubmit}
                        loading={loading}
                    />
                </>
            }
        />
    );
}

export default CreateHotelPartnerPage;

