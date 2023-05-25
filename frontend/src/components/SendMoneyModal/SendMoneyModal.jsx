import React, { useEffect, useState } from 'react'
import CSS from './styles.module.css'
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, TextField } from '@mui/material';

export const SendMoneyModal = ({ UserName, UserBalance, AccountID, currentAccId, isActive, isSuccessful }) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (isActive) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isActive]);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendMoney = async () => {
    const senderId = currentAccId;
    const receiverId = AccountID;
    const amt = amount;

    const config = {
      Headers: {
        "Content-type": "application/json",
      },
    };

    if (senderId !== "" && receiverId !== "") {
      await axios
        .post("/api/transaction/send", { senderId, receiverId, amt }, config)
        .then((res) => {
          console.log(res.data);
          alert("Transaction Successful");
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          isSuccessful(true);
          handleClose();
        })
        .catch((err) => {
          console.log(err.response.data.stack);
        })
    }
  }

  return (
    <div className={CSS.SendMoney}>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Send Money To {UserName}</DialogTitle>
        <DialogContent>
          <DialogContentText >
            Account ID: {AccountID} <br></br>
            Amount to be Transferred:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Amount"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  ₹
                </InputAdornment>
              ),
            }}
            type="amount"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={sendMoney}>Send Money</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
