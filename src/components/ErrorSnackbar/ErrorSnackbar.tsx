import React from "react";
import {Snackbar} from "@material-ui/core";
import {ErrorType, setAppErrorAC} from "../../store/app-reducer";
import {useAppSelector} from "../../store/store";
import {useDispatch} from "react-redux";
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const error = useAppSelector<ErrorType>((state)=>state.app.error)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC({error: null}))
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" >
                {error}
            </Alert>
        </Snackbar>
    );
}