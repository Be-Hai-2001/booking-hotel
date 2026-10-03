import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import AutocompleteCustom from "../../../../../shared/components/AutocompleteCustom"

export const HotelForm = ({
    fields = [],
    formData,
    cityList = [],
    wardList = [],
    fetchWards,
    handleChange,
    handleAutocompleteChange,
    ward = {},
    buttonSubmit = <></>,
    sxButton = { textAlign: "end" }
}) => {

    return (
        <Box>
            <Paper
                sx={{
                    padding: "1rem 1rem"
                }}
            >
                {
                    fields.map(({
                        name,
                        label,
                        sizeLabel = { xs: 8, md: 8 },
                        sizeTypography = { xs: 2.5, md: 2.5 },
                        xs = 12,
                        options,
                        required,
                        variant = "outlined",
                        typography,
                        type
                    }) => (
                        <Grid
                            key={name}
                            xs={xs}
                            container
                            sx={{
                                marginBottom: 3
                            }}
                        >
                            <Grid
                                sx={{
                                    textAlign: 'start',
                                    alignContent: 'end',
                                }}
                                size={sizeTypography}
                            >
                                <Typography>  {typography} </Typography>
                            </Grid>

                            <Grid size={sizeLabel}>
                                {
                                    // Nếu là name là ['city_id', 'ward_id'] sẽ là AutocompleteCustom
                                    ['city_id', 'ward_id'].includes(name)
                                        ?
                                        <>
                                            {
                                                name === 'city_id'
                                                    ?
                                                    <AutocompleteCustom
                                                        value={
                                                            cityList.find((c) => c.id === (formData?.city_id || ward?.city_id)) ??
                                                            ward?.city ??
                                                            null
                                                            // ward?.city?.id
                                                            // cityList.find((item) => item.id === formData?.city_id) ?? null
                                                        }
                                                        onChange={(event, newValue) => {
                                                            handleAutocompleteChange('city_id', newValue?.id ?? '');
                                                            handleAutocompleteChange('ward_id', '');   // reset ward khi đổi city
                                                            // handleAutocompleteChange('ward', null);
                                                            fetchWards(newValue?.id);
                                                        }}
                                                        options={cityList}
                                                        getOptionLabel={(option) => (option && option.name) ? option.name : ''}
                                                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                paddingTop: '0px',
                                                                paddingBottom: '0px',
                                                                borderRadius: 0,
                                                            }
                                                        }}
                                                    />
                                                    :
                                                    <>
                                                        <AutocompleteCustom
                                                            key={formData?.city_id || 'no-city'}
                                                            onChange={
                                                                (event, newValue) => handleAutocompleteChange('ward_id', newValue?.id ?? '')
                                                            }
                                                            // value={ward}
                                                            options={wardList}
                                                            // getOptionLabel={(option) => option.name}
                                                            // value={wardList.find((w) => w.id === formData.ward_id) ?? null}

                                                            value={
                                                                wardList.find((w) => w.id === formData?.ward_id) ??
                                                                ward ??
                                                                null
                                                            }
                                                            getOptionLabel={(option) => (option && option.name) ? option.name : ''}
                                                            isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                                            sx={{
                                                                '& .MuiOutlinedInput-root': {
                                                                    paddingTop: '0px',
                                                                    paddingBottom: '0px',
                                                                    borderRadius: 0,
                                                                }
                                                            }}
                                                        />
                                                    </>
                                            }
                                        </>

                                        :
                                        <TextField
                                            fullWidth
                                            name={name}
                                            label={label}
                                            required={required}
                                            select={Boolean(options)}
                                            onChange={handleChange}
                                            variant={variant}
                                            sx={{
                                                '& .MuiOutlinedInput-input': {
                                                    paddingTop: '4px',
                                                    paddingBottom: '4px',
                                                },

                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 0
                                                },
                                            }}
                                            value={formData[name] ?? ''}
                                            type={type}
                                        />
                                }
                            </Grid>
                        </Grid>
                    ))
                }
                <Box
                    sx={sxButton}
                >
                    {
                        buttonSubmit
                    }
                </Box>
            </Paper>
        </Box >
    );
}
export default HotelForm;