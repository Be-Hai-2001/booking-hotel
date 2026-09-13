
import { use, useEffect, useState } from 'react';
import { AdminLayout } from '../../../shared/components/AdminLayout';
import { DataGrid } from '../../../shared/components/DataGrid';
import { hotelApi } from '../infrastructure/hotelApi';

const columns = [];

export const Hotels = () => {

    const [hotel, setHotel] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchHotels = async () => {
    //         setLoading(true);
    //         try {
    //             const data = await hotelApi.getMyHotels();



    //         } catch (error) {
    //             console.error('Lỗi khi tải danh sách khách sạn:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    // });

    return (
        <>
            <DataGrid
                columns={columns}
            />
        </>
    )
};


export const HotelsPage = () => {
    return (
        <AdminLayout
            title={'Danh sách khách sạn'}
            children={<Hotels />}
        />
    );
};
export default HotelsPage;