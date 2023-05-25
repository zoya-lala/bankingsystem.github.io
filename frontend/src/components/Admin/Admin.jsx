import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import CSS from './styles.module.css';

export default function CustomerDetails() {
  const [userName, setUserName] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [result, setResult] = useState("");

  const handleName = (e) => {
    setUserName(e.target.value);
  };

  const handleBal = (e) => {
    setCurrentBalance(e.target.value);
  };

  const handleSubmit = async () => {
    const name = userName;
    const currentBal = currentBalance;

    const config = {
      Headers: {
        "Content-type": "application/json",
      },
    };

    console.log("Name coming from API call: ", name);

    await axios
      .post("/api/users/addUser", { name, currentBal }, config)
      .then((res) => {
        console.log(res);
        setResult("Success");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      })
  };

  const handleLogin = async () => {
    const name = "Zoya Lala";

    const config = {
      Headers: {
        "Content-type": "application/json",
      },
    };

    await axios
      .post("/api/users/loginAdmin", { name }, config)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err.response.data.message);
      })
  }

  return (
    <div className={CSS.CustomerDetails}>
      <div className={CSS.Head}>
        Add New User
      </div>
      <div className={CSS.UpperC}>
        <div className={CSS.UserDetails}>
          <div className={CSS.Name}>
            <b>Name</b>
            <TextField id="outlined-basic" variant="outlined" onChange={handleName} />
          </div>
          <div className={CSS.CurrentBalance}>
            <b>Current Balance</b>
            <TextField id="outlined-basic" variant="outlined" onChange={handleBal} />
          </div>
          <div className={CSS.Buttons}>
            <Button variant='contained' onClick={handleSubmit}>Submit</Button>
            <Button variant='contained' onClick={handleLogin}>Login as Admin</Button>
          </div>
          <h1>{result === "Success" ? "User Added" : "Failed to Add"}</h1>
        </div>
      </div>
    </div>
  )
}

