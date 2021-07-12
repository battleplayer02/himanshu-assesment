import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FormControlLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRecoilState } from 'recoil';
import { tableAtom } from '../../state/state';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    spacing: {
        '& > *': {
            marginTop: "20px"
        }
    }
}));

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    number: yup
        .string('Enter Phone Number')
        .min(10, 'Phone Number is of 10 digits.')
        .required('Password is required'),
    val: yup.string("Enter Value"),
    criteria: yup.string("Enter Value"),
});

const FormComp = () => {

    let [data, setData] = useRecoilState(tableAtom)

    const formik = useFormik({
        initialValues: {
            email: '',
            number: "",
            days: `Monday`,
            val: `greater`,
            criteria: "greater"
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            let { email, number, criteria, val, days } = values;
            // console.log(values);
            try {
                let res = await axios.post("https://dashboard-reactjsapp.herokuapp.com/insert", { email, phone: number, criteria, values: val, day: days });
                if (res.data.success === 0) {
                    alert(JSON.stringify(res.data));
                } else {
                    formik.resetForm()
                    setData([...data, { email, phone: number, criteria, values: val, day: days }])
                }
            } catch (error) {
                console.log(error);
            }
        },
    });

    const classes = useStyles()

    return (
        <div style={{ padding: 10 }}>
            <Typography variant="h4">Create Alert</Typography>
            <form onSubmit={formik.handleSubmit} className={classes.spacing}>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                />
                <TextField
                    fullWidth
                    id="number"
                    type="number"
                    name="number"
                    label="Phone Number"
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    error={formik.touched.number && Boolean(formik.errors.number)}
                />
                <TextField
                    fullWidth
                    id="val"
                    type="number"
                    name="val"
                    label="Enter Value"
                    value={formik.values.val}
                    onChange={formik.handleChange}
                />
                <RadioGroup name="criteria" onChange={formik.handleChange} value={formik.values.criteria}>
                    <Typography varient="h6">Criteria</Typography>
                    <FormControlLabel value="lesser" control={<Radio />} label="Lesser" />
                    <FormControlLabel value="greater" control={<Radio />} label="Greater" />
                </RadioGroup>
                <Select
                    fullWidth
                    id="days"
                    name="days"
                    value={"Monday"}
                    onChange={formik.handleChange}>
                    <MenuItem selected value="Monday">Monday</MenuItem>
                    <MenuItem value="Tuesday">Tuesday</MenuItem>
                    <MenuItem value="Wednesday">Wednesday</MenuItem>
                </Select>
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};
export default FormComp