import React, {useState} from 'react'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import {FormikHelpers, useFormik} from "formik";
import {loginTC} from "../../store/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppRootStateType, useAppDispatch} from "../../store/store";
import {Navigate} from "react-router-dom";

type FormValuesTypes = {
    email: string,
    password: string,
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state=>state.auth.isLoggedIn)

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required email';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required password';
            } else if (values.password.length < 3) {
                errors.password = 'Invalid password';
            }
            return errors;
        },
        onSubmit: async (values, formikHelpers:FormikHelpers<FormValuesTypes>) => {
            const action = await dispatch(loginTC(values))
           if (loginTC.rejected.match(action)) {
               if (action.payload?.fieldsErrors?.length){
                   const error = action.payload?.fieldsErrors[0]
                   formikHelpers.setFieldError(error.field, error.error)
               }
            }
          //  formik.resetForm()
        },
    })
    if (isLoggedIn) {
        return <Navigate to={'/'} />
    }
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={ formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal" {...formik.getFieldProps("email")}/>
                        {formik.errors.email? <div style={{color: 'red'}}>{formik.errors.email}</div>: null}
                        <TextField type="password" label="Password"
                                   margin="normal" {...formik.getFieldProps("password")}/>
                        {formik.errors.password? <div style={{color: 'red'}}>{formik.errors.password}</div>: null}
                        <FormControlLabel label={'Remember me'} control={<Checkbox/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
