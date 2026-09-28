import React from "react";
import { Autocomplete, TextField } from "@mui/material";

export const AutocompleteCustom = ({
    noOptionsText = 'Chưa có dữ liệu',
    value,
    options = [],
    label,
    sx,
    getOptionLabel,
    isOptionEqualToValue,
    onChange
}) => {
    return (
        <Autocomplete
            value={value}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            disablePortal
            options={options}
            sx={sx}
            renderInput={(params) => <TextField {...params} label={label} />}
            onChange={onChange}
            noOptionsText={noOptionsText}
        />
    )
}
export default AutocompleteCustom;