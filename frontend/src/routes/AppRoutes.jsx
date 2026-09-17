// import { publicRoutes } from './publicRoutes';
import { Route, Routes } from 'react-router-dom';
import { partnerRoutes } from './partnerRoutes';
import ProtectedRoute from './ProtectedRoute';
import { UserRole } from '../shared/constants/roles';

export const AppRoutes = () => {
    return (
        <Routes>
            {/*  Danh sách route Khách hàng / Public */}
            {/* {publicRoutes.map(({ path, component: Component, layout: Layout }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        Layout ? (
                            <Layout>
                                <Component />
                            </Layout>
                        ) : (
                            <Component />
                        )
                    }
                />
            ))} */}

            {/* Danh sách route Partner */}
            {partnerRoutes.map(({ path, element: Component, layout: Layout, roles = [UserRole.PARTNER] }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        // <ProtectedRoute allowedRoles={roles}>
                        //     {Layout ? (
                        //         <Layout>
                        <Component />
                        //         </Layout>
                        //     ) : (
                        //         <Component />
                        //     )}
                        // </ProtectedRoute>
                    }
                />
            ))}
        </Routes>
    );
};
