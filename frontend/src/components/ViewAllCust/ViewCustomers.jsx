import { Button, Divider } from '@mui/material';
import { MoreDetailsModal } from 'components/MoreDetails';
import { SendMoneyModal } from 'components/SendMoneyModal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ViewCustomersCSS from './styles.module.css';
import axios from 'axios';
export const ViewCustomers = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const [accountID, setAccountID] = useState("");
  const [SMactive, setSMactive] = useState(false);
  const [dateCreated, setDateCreated] = useState("");
  const [timeModified, setTimeModified] = useState("");
  const [MDactive, setMDactive] = useState(false);

  const [loggedUser, setLoggedUser] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    }
  }, []);

  useEffect(() => {
    if (loggedUser) {
      if (loggedUser._id) {
        fetchUsers();
      }
    }
  }, [loggedUser, setLoggedUser]);

  const fetchUsers = async () => {
    const currentUser = loggedUser._id;

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    await axios.get(`/api/users?loggedUser=${currentUser}`, config)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      })

  };

  const handleSModal = (name, accID, bal) => {
    setUserName(name);
    setUserBalance(bal);
    setAccountID(accID);
    setSMactive(true);
  }

  const handleMoreDetailsModal = (accID, dateCreated, timeModified) => {
    setAccountID(accID);
    setDateCreated(dateCreated);
    setTimeModified(timeModified);
    setMDactive(true);
  }

  const handleSuccess = (e) => {
    if (e === true) {
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    }
  };

  const timeAgo = (date) => {
    const inputDate = new Date(date);
    const now = new Date();
    const seconds = Math.round((now - inputDate) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const weeks = Math.round(days / 7);
    const months = Math.round(days / 30);
    const years = Math.round(days / 365);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 7) {
      return `${days} days ago`;
    } else if (weeks < 4) {
      return `${weeks} weeks ago`;
    } else if (months < 12) {
      return `${months} months ago`;
    } else {
      return `${years} years ago`;
    }
  }


  return (
    <div className={ViewCustomersCSS.ViewCustomers}>
      <div className={ViewCustomersCSS.List}>
        <div className={ViewCustomersCSS.Top}>
          <div className={ViewCustomersCSS.Basic}>Hi <b> {loggedUser.userName}!</b> </div>
          <div className={ViewCustomersCSS.Centre}>Your Current Balance is: </div>
          <div className={ViewCustomersCSS.CurrentBalance}>₹{loggedUser.currentBalance}</div>
        </div>
        <div className={ViewCustomersCSS.Header}>
          Send Money
        </div>
        <Divider />
        <div className={ViewCustomersCSS.Users}>
          {
            users.map((user) => {
              return (
                <div className={ViewCustomersCSS.Banner} key={user._id}>
                  <div className={ViewCustomersCSS.Left}>
                    <div className={ViewCustomersCSS.Name}>Name: {user.userName}</div>
                    <div className={ViewCustomersCSS.Balance}>Current Balance: {user.currentBalance}</div>
                  </div>
                  <div className={ViewCustomersCSS.Right}>
                    <Button variant="contained" component="label" onClick={() => { handleSModal(user.userName, user._id, user.currentBalance) }} >
                      Send Money
                    </Button>

                    <Button variant="contained" component="label" onClick={() => { handleMoreDetailsModal(user._id, timeAgo(user.created_at), timeAgo(user.updated_at)) }}>
                      More Details
                    </Button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <SendMoneyModal UserName={userName} AccountID={accountID} UserBalance={userBalance} currentAccId={loggedUser._id} isActive={SMactive} isSuccessful={handleSuccess} />
      <MoreDetailsModal AccountID={accountID} DateCreated={dateCreated} TimeModified={timeModified} isActive={MDactive} />
    </div >
  )
}

