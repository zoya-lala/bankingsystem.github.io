import React, { useEffect, useState } from 'react'
import CSS from './styles.module.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export const MoreDetailsModal = ({ AccountID, DateCreated, TimeModified, isActive }) => {
    const [open1, setOpen1] = useState(false);

    useEffect(() => {
        if (isActive) {
            setOpen1(true);
        } else {
            setOpen1(false);
        }
    }, [isActive]);


    // const handleClickOpen1 = () => {
    //     setOpen1(true);
    // };

    const handleClose1 = () => {
        setOpen1(false);
    };
    return (
        <div className={CSS.MoreDetails}>
            <Dialog open={open1} onClose={handleClose1} fullWidth>
                <DialogTitle>Account Holder Details</DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        Account ID: {AccountID} <br></br>
                        Created On: {DateCreated} <br></br>
                        Last Transaction On: {TimeModified} <br></br>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose1}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
