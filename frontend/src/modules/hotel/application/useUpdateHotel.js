import { useCallback, useEffect, useRef, useState } from "react"
import { hotelEnums } from "../presentation/constants/hotelEnums";
import { publicApi } from "../../../shared/api/publicApi";
import hotelApi from "../infrastructure/hotelApi";
import { useParams } from "react-router-dom";
import { MESSAGES } from "../../../shared/constants/messages";

export const useUpdateHotel = () => {

    const [formData, setFormData] = useState({
        [hotelEnums.Fields.HOTEL_NAME]: '',
        [hotelEnums.Fields.PHONE]: '',
        [hotelEnums.Fields.ADDRESS_DETAIL]: '',
        [hotelEnums.Fields.CITY_ID]: '',
        [hotelEnums.Fields.WARD_ID]: '',
    });

    const [cityList, setCityList] = useState([]);
    const [wardList, setWardList] = useState([]);
    const [images, setImages] = useState([]);
    const [imagesDelete, setImagesDelete] = useState([]);



    const [loading, setLoading] = useState(false);
    const [ward, setWard] = useState({});
    const [alert, setAlert] = useState({ message: '', timer: 0, alertKey: {} });
    const [openUpload, setOpenUpload] = useState(false);


    // -- Lấy id hotel trên url
    const { id } = useParams();
    // const message = alert?.message || '';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleAutocompleteChange = (name, value) => {
        if (name === 'city_id') {
            setWard({});
            setFormData(
                (prev) => ({
                    ...prev,
                    [name]: value
                })
            );
        }

        setFormData(
            (prev) => ({
                ...prev,
                [name]: value
            })
        );
    }

    // -- funtion lấy danh sách thành phố
    const fetchCities = async () => {
        try {
            const repo = await publicApi.getCities();

            typeof (repo) === 'object' ? setCityList(repo?.data || repo) : setCityList([]);

            // Trả lại null khi người đùng muốn chọn cái khác
            setFormData((prev) => ({
                ...prev,
                [hotelEnums.Fields.WARD_ID]: ''
            }));

        } catch (e) {
            setCityList([]);
        }
    }

    // -- funtion lấy danh sách phường/xã theo mã thành phố
    const fetchWards = async (cityId) => {
        try {
            const repo = await publicApi.getWardsByCity(cityId);

            typeof (repo) === 'object' ? setWardList(repo?.data || repo) : [];
        } catch (e) {
            setWardList([]);
        }
    }

    // -- funtion khởi tạo dữ liệu ban đầu của form 
    const fetHotels = async () => {
        try {
            const repo = await hotelApi.getHotelById(id);
            const {
                hotel_name,
                sdt,
                diaChiChiTiet,
                ward_id
            } = repo?.data ?? {};

            if (ward_id) {
                const address = await publicApi.getWardById(ward_id);

                // if (address?.success) {
                setWard(address?.data?.[0] || {});
                // }
            }

            setFormData({
                ...formData,
                [hotelEnums.Fields.HOTEL_NAME]: hotel_name ?? '',
                [hotelEnums.Fields.PHONE]: sdt ?? '',
                [hotelEnums.Fields.ADDRESS_DETAIL]: diaChiChiTiet ?? '',
                [hotelEnums.Fields.WARD_ID]: ward_id ?? ''
            });

        } catch (error) {
            // Cập nhật thông báo lỗi alter sau
            console.log('lỗi');
        }
    }

    // -- funtion lấy danh sách ảnh
    const fetImagesHotel = async () => {
        try {
            const { data, success } = await publicApi.getListImageHotel(id);

            if (success && Array.isArray(data))
                setImages(data);
            else
                setImages([]);


        } catch (error) {

        }
    }

    useEffect(() => {
        const init = async () => {
            await fetchCities();   // danh sách tỉnh xong trước
            await fetHotels();     // rồi mới điền dữ liệu khách sạn
            await fetImagesHotel();
        };
        init();

    }, []);


    // -- funtion submit form cập nhật
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const { success, data } = await hotelApi.update(id, formData);

            if (success) {
                setAlert(
                    (pre) => ({
                        ...pre,
                        message: MESSAGES.VI.HOTEL.UPDATE_SUCCESS,
                        timer: 5,
                        alertKey: Math.random()
                    })
                );
            }

        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    // -- funtion lấy dữ liệu callback từ dialog con cập nhật hình ảnh
    const handleChangeImagesChild = (newImages) => {

        // -- Đã thêm ảnh thành công thì sẽ đóng cái dialog lại
        setOpenUpload(false);

        console.log('newimg', newImages);
        setImages((prev) => {
            return [
                ...newImages,
                ...prev
            ]
        });

        setAlert(
            (pre) => ({
                ...pre,
                message: MESSAGES.VI.HOTEL.IMAGE_UPLOAD_SUCCESS,
                timer: 5,
                alertKey: Math.random(),
                severity: 'success'
            }));
    }

    // -- Lấy danh sách ảnh càn xóa
    const handleDeleteImage = useCallback((id) => {
        setImagesDelete((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }, []);

    // -- Xóa hình ảnh ( Xóa cứng )
    const handleSubmitDeleteImage = async () => {

        // -- Kiểm tra mảng có dữ liệu hay không
        if (imagesDelete.length === 0) {
            setAlert(
                (pre) => ({
                    ...pre,
                    message: MESSAGES.VI.HOTEL.IMAGE_DELETE_EMPTY,
                    timer: 5,
                    alertKey: Math.random(),
                    severity: 'warning'
                })
            );

            return;
        }

        try {
            const data = {
                images: imagesDelete
            }

            // Gọi API xóa danh sách ảnh
            await hotelApi.deleteHotelImages({ data });

            // -- Cập nhật lại danh sách hình ảnh
            setImages((prev) => prev.filter((img) => !imagesDelete.includes(img.id)));

            // -- Hiển thị thông báo xóa thành công
            setAlert(
                (pre) => ({
                    ...pre,
                    message: MESSAGES.VI.HOTEL.IMAGE_DELETE_SUCCESS,
                    timer: 5,
                    alertKey: Math.random(),
                    severity: 'success'
                })
            );

            // -- Trả về danh sách xóa rỗng
            setImagesDelete([]);

        } catch (error) {
            console.log('error', error);
        }

    }

    const openViewUpload = () => {
        setOpenUpload(!openUpload);
    }

    return {
        formData,
        cityList,
        wardList,
        fetchWards,
        handleChange,
        handleAutocompleteChange,
        loading,
        handleSubmit,
        ward,
        // handdleUploadFile,
        images,
        alert,
        openViewUpload,
        openUpload,
        handleChangeImagesChild,
        id,

        handleDeleteImage,
        handleSubmitDeleteImage,
        imagesDelete
    }

}
export default useUpdateHotel;