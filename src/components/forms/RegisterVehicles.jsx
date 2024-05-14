import React, { useContext } from "react";
import {
    Box,
    Typography, FormControl,
    FormHelperText
} from "@mui/material";
import { useFormik } from "formik";
import { CreateVehicles } from "@/schemas/index";
import { VehiclesContext } from "@/context/Vehicles/VehiclesContext";
import ButtonPrimary from "@/components/buttons/button-primary";
import { styleForm, ImageInputBanner, StyledFormControl, CustomStyledInput } from "./register-vehicles";


export default function RegisterVehicles(props) {
    const { RegisterVehicles } = useContext(VehiclesContext);
    const formik = useFormik({
        initialValues: {
            fileigmvehicles: "",
            model: "",
            ability: "",
            vehicleregistration: "",
            mileage: "",
            drivers: "",
            vehiclegps: "",
            branchofficesone: "",
            branchofficestwo: "",
            branchofficestree: "",
        },
        validationSchema: CreateVehicles,
        onSubmit: (values, { resetForm }) => {
            console.log(JSON.stringify(values));
            RegisterVehicles(values);
            // resetForm();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box>
                <Typography variant="subtitle1" color="text.fourth">
                    {props.tilte ? `Vehicle` : ` Register Vehicles`}
                </Typography>
                <Box sx={styleForm}>
                    <FormControl
                        variant="standard"
                        sx={{
                            display: "flex",
                            flex: "1",
                            flexDirection: "column",
                            gap: "10px",
                            alignSelf: { xs: "center", lg: "start" },
                        }}
                    >
                        <ImageInputBanner
                            onChangeImageNft={(fileigmvehicles) => formik.setFieldValue("fileigmvehicles", fileigmvehicles)} />
                    </FormControl>
                    <Box sx={StyledFormControl}>
                        <FormControl sx={StyledFormControl}>
                            <Typography variant="h4" color="text.fourth">
                                Model
                            </Typography>
                            <CustomStyledInput
                                onBlur={formik.handleBlur}
                                error={formik.touched.model && Boolean(formik.errors.model)}
                                onChange={formik.handleChange}
                                value={formik.values.model}
                                id="model"
                                name="model"
                                autoComplete="model" />
                            {formik.touched.model && (
                                <FormHelperText
                                    error
                                    id="model-error"
                                    sx={{
                                        textAlign: "center",
                                    }}
                                >
                                    {formik.errors.model}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl sx={StyledFormControl}>
                            <Typography variant="h4" color="text.fourth">
                                Ability
                            </Typography>
                            <CustomStyledInput
                                onBlur={formik.handleBlur}
                                error={formik.touched.ability && Boolean(formik.errors.ability)}
                                onChange={formik.handleChange}
                                value={formik.values.ability}
                                id="ability"
                                name="ability"
                                autoComplete="ability" />
                            {formik.touched.ability && (
                                <FormHelperText
                                    error
                                    id="ability-error"
                                    sx={{
                                        textAlign: "center",
                                    }}
                                >
                                    {formik.errors.ability}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <Box
                            sx={{
                                display: "flex",
                                gap: "20px",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <FormControl sx={StyledFormControl}>
                                <Typography variant="h4" color="text.fourth">
                                    Vehicle Registration
                                </Typography>
                                <CustomStyledInput
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.vehicleregistration &&
                                        Boolean(formik.errors.vehicleregistration)}
                                    onChange={formik.handleChange}
                                    value={formik.values.vehicleregistration}
                                    id="vehicleregistration"
                                    name="vehicleregistration"
                                    autoComplete="vehicleregistration" />
                                {formik.touched.vehicleregistration && (
                                    <FormHelperText
                                        error
                                        id="vehicleregistration-error"
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        {formik.errors.vehicleregistration}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl sx={StyledFormControl}>
                                <Typography variant="h4" color="text.fourth">
                                    Mileage
                                </Typography>
                                <CustomStyledInput
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.mileage && Boolean(formik.errors.mileage)}
                                    onChange={formik.handleChange}
                                    value={formik.values.mileage}
                                    id="mileage"
                                    name="mileage"
                                    autoComplete="mileage" />
                                {formik.touched.mileage && (
                                    <FormHelperText
                                        error
                                        id="mileage-error"
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        {formik.errors.mileage}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Box>
                        <FormControl sx={StyledFormControl}>
                            <Typography variant="h4" color="text.fourth">
                                Driver or Drivers
                            </Typography>
                            <CustomStyledInput
                                onBlur={formik.handleBlur}
                                error={formik.touched.drivers && Boolean(formik.errors.drivers)}
                                onChange={formik.handleChange}
                                value={formik.values.drivers}
                                id="drivers"
                                name="drivers"
                                autoComplete="drivers" />
                            {formik.touched.drivers && (
                                <FormHelperText
                                    error
                                    id="drivers-error"
                                    sx={{
                                        textAlign: "center",
                                    }}
                                >
                                    {formik.errors.drivers}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl sx={StyledFormControl}>
                            <Typography variant="h4" color="text.fourth">
                                Vehicle GPS
                            </Typography>
                            <CustomStyledInput
                                onBlur={formik.handleBlur}
                                error={formik.touched.vehiclegps && Boolean(formik.errors.vehiclegps)}
                                onChange={formik.handleChange}
                                value={formik.values.vehiclegps}
                                id="vehiclegps"
                                name="vehiclegps"
                                autoComplete="vehiclegps" />
                            {formik.touched.vehiclegps && (
                                <FormHelperText
                                    error
                                    id="vehiclegps-error"
                                    sx={{
                                        textAlign: "center",
                                    }}
                                >
                                    {formik.errors.vehiclegps}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl sx={StyledFormControl}>
                            <Typography variant="h4" color="text.fourth">
                                Branch Offices
                            </Typography>
                            <CustomStyledInput
                                onBlur={formik.handleBlur}
                                error={formik.touched.branchofficesone &&
                                    Boolean(formik.errors.branchofficesone)}
                                onChange={formik.handleChange}
                                value={formik.values.branchofficesone}
                                id="branchofficesone"
                                name="branchofficesone"
                                autoComplete="branchofficesone"
                                placeholder="Branch Offices 1" />
                            {formik.touched.branchofficesone && (
                                <FormHelperText
                                    error
                                    id="branchofficesone-error"
                                    sx={{
                                        textAlign: "center",
                                    }}
                                >
                                    {formik.errors.branchofficesone}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl sx={StyledFormControl}>
                            <CustomStyledInput
                                onBlur={formik.handleBlur}
                                error={formik.touched.branchofficestwo &&
                                    Boolean(formik.errors.branchofficestwo)}
                                onChange={formik.handleChange}
                                value={formik.values.branchofficestwo}
                                id="branchofficestwo"
                                name="branchofficestwo"
                                autoComplete="branchofficestwo"
                                placeholder="Branch Offices 2" />
                            {formik.touched.branchofficestwo && (
                                <FormHelperText
                                    error
                                    id="branchofficestwo-error"
                                    sx={{
                                        textAlign: "center",
                                    }}
                                >
                                    {formik.errors.branchofficestwo}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl sx={StyledFormControl}>
                            <CustomStyledInput
                                onBlur={formik.handleBlur}
                                error={formik.touched.branchofficestree &&
                                    Boolean(formik.errors.branchofficestree)}
                                onChange={formik.handleChange}
                                value={formik.values.branchofficestree}
                                id="branchofficestree"
                                name="branchofficestree"
                                autoComplete="branchofficestree"
                                placeholder="Branch Offices 3" />
                            {formik.touched.branchofficestree && (
                                <FormHelperText
                                    error
                                    id="branchofficestree-error"
                                    sx={{
                                        textAlign: "center",
                                    }}
                                >
                                    {formik.errors.branchofficestree}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                            type="submit"
                        >
                            <ButtonPrimary>To register</ButtonPrimary>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </form>
    );
}
