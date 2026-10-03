import { useState, useEffect } from "react";
import { hotelEnums } from "../presentation/constants/hotelEnums";
import { publicApi } from "../../../shared/api/publicApi";
import hotelApi from "../infrastructure/hotelApi";
import { useNavigate } from 'react-router-dom';
import { ROUTE } from "../../../shared/api/route";

export const useCreateHotel = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        [hotelEnums.Fields.HOTEL_NAME]: '',
        [hotelEnums.Fields.PHONE]: '',
        [hotelEnums.Fields.ADDRESS_SNAPSHOT]: '',
        [hotelEnums.Fields.CITY_ID]: '',
        [hotelEnums.Fields.WARD_ID]: ''
    });

    // 1. Tạo state để lưu danh sách cities & wards cho Autocomplete
    const [cityList, setCityList] = useState([]);
    const [wardList, setWardList] = useState([]);
    const [loading, setLoading] = useState(false);

    // 2. Hàm lấy danh sách tỉnh/thành phố
    const fetchCities = async () => {
        try {
            const res = await publicApi.getCities();

            setCityList(res.data || res); // Lưu vào state

            setFormData((prev) => ({ ...prev, [hotelEnums.Fields.WARD_ID]: '' }));
        } catch (error) {
            console.error("Lỗi fetch cities:", error);
            setCityList([]);
        }
    };

    // 3. Hàm lấy danh sách phường/xã theo city_id
    const fetchWards = async (city_id) => {
        if (!city_id) return;
        try {

            const res = await publicApi.getWardsByCity(city_id);

            setWardList(res.data || res);

        } catch (error) {
            console.error("Lỗi fetch wards:", error);
            setWardList([]);
        }
    };

    // Tự động gọi lấy danh sách cities khi hook khởi tạo
    useEffect(() => {
        fetchCities();
    }, []);

    // Thao tác những label bình thường
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Thao tác cho form Autocomplete
    const handleAutocompleteChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        // 1. Load form khi nhấn submit
        setLoading(!loading);

        try {
            // 2. Gửi request lên serve
            const repo = await hotelApi.store(formData);

            // 3. Nhận thông báo trả về từ serve
            if (repo?.message === 'SUCCESS')
                // them alter roi retun
                return navigate(ROUTE.PARTNER.HOTEL.LIST);

        } catch (error) {
            console.error("Lỗi submit:", error.response?.data); // Thay lai bang alter
        }
        finally {
            setLoading(false);
        }
    };

    return {
        formData,
        cityList,
        wardList,
        fetchCities,
        fetchWards,
        handleChange,
        handleSubmit,
        handleAutocompleteChange,
        loading
    };
}

export default useCreateHotel;