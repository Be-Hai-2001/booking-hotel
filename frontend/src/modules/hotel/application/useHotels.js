
import { useState, useEffect } from 'react';
import { hotelApi } from '../infrastructure/hotelApi';

export const useHotels = () => {

    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHotels = async () => {
        setLoading(true);
        try {
            const response = await hotelApi.getMyHotels();
            const hotelList = Array.isArray(response?.data)
                ? response.data
                : (Array.isArray(response) ? response : []);
            setHotels(hotelList);
        } catch (error) {
            console.error('Lỗi khi tải danh sách khách sạn:', error);
        } finally {
            setLoading(!loading);
        }
    }

    useEffect(() => {
        fetchHotels();
    }, []);

    return {
        hotels,
        loading,
        refetch: fetchHotels, // Để tái sử dụng khi có nút Refresh hoặc sau khi Thêm/Sửa/Xóa
    }

}

export default useHotels;

