import CreateHotelPartnerPage from "../modules/hotel/presentation/partner/CreateHotelPartnerPage";
import { DashboardPartnerPage } from "../modules/hotel/presentation/partner/DashboardPartnerPage";
import HotelsPartnerPage from "../modules/hotel/presentation/partner/HotelsPartnerPage";
import UpdateHotelPartnerPage from "../modules/hotel/presentation/partner/UpdateHotelPartnerPage";
import DetailHotelPartnerPage from "../modules/hotel/presentation/partner/DetailHotelPartnerPage";

export const partnerRoutes = [
    {
        path: '/partner/dashboard',
        element: DashboardPartnerPage
    },

    // Trang danh sách
    {
        path: '/partner/hotels',
        element: HotelsPartnerPage
    },

    // Trang thêm mới
    {
        path: '/partner/hotels/create',
        element: CreateHotelPartnerPage
    },

    // Trang chi tiết
    {
        path: `/partner/hotel/detail/:id`,
        element: DetailHotelPartnerPage
    },

    // Trang cập nhật
    {
        path: `/partner/hotel/edit/:id`,
        element: UpdateHotelPartnerPage
    }
];