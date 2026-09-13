import React from 'react';
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

/**
 * @prop 
 *  columns: Header name
 *      [
 *          field, headerName, width ,...
 *      ]
 *  rows: Data của Header
 *      [
 *          field, ... field
 *      ]
 * @returns 
 */

export const DataGrid = ({ rows = [], columns = [] }) => {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <MuiDataGrid rows={rows} columns={columns} />
        </Box>
    );
};