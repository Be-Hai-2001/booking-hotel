import React from "react";
import { Box } from '@mui/material';
import BaseButton from "../../../../../shared/components/BaseButton";
import { DataGrid } from "../../../../../shared/components/DataGrid";
import { ROUTE } from "../../../../../shared/api/route";


// Content UI danh sacch khach san

export const HotelDataGrid = ({
    navigate,
    hotels,
    loading,
    columns,
    canCreate = true
}) => {

    return (
        <>
            {canCreate
                ? (
                    <Box sx={{ textAlign: 'end', marginBottom: '15px' }}>
                        <BaseButton
                            handleClick={() => navigate(ROUTE.PARTNER.HOTEL.CREATE)}
                        />
                    </Box>
                )
                : null
            }

            <DataGrid
                columns={columns}
                rows={hotels}
                loading={loading}
                columnVisibilityModel={{
                    ward_id: false
                }}
                sx={{
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: '#334155',
                        color: '#fff',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        color: '#fff',
                        fontWeight: 700,
                    },

                    // nút sắp xếp + nút 3 chấm: nền trong suốt, icon trắng
                    '& .MuiDataGrid-columnHeader .MuiIconButton-root': {
                        backgroundColor: 'transparent',
                        color: '#fff',
                    },
                    '& .MuiDataGrid-columnHeader .MuiIconButton-root:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '& .MuiDataGrid-columnHeader .MuiSvgIcon-root': {
                        color: '#fff',
                    },
                }}
            />
        </>
    );
}

export default HotelDataGrid;