import { DashboardPartnerPage } from "../modules/hotel/presentation/partner/DashboardPartnerPage";
import HotelsPartnerPage from "../modules/hotel/presentation/partner/HotelsPartnerPage";

export const partnerRoutes = [
    {
        path: '/partner/dashboard',
        element: DashboardPartnerPage,
    },
    {
        path: '/partner/hotels',
        element: HotelsPartnerPage,
    },
];