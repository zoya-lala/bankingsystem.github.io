import React, { useEffect, useState } from 'react'
import TransactionsCSS from './styles.module.css'
import axios from 'axios';

export const Transactions = () => {

  const [loggedUser, setLoggedUser] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    }
  }, []);

  useEffect(() => {
    if (loggedUser) {
      if (loggedUser._id) {
        fetchTransactions();
      }
    }
  }, [loggedUser, setLoggedUser]);

  const fetchTransactions = async () => {
    const currentUser = loggedUser._id;

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    await axios.get(`/api/transaction?loggedUser=${currentUser}`, config)
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      })

  };

  const dateSplitter = (timeStamp) => {
    const date = new Date(timeStamp);
    const isoString = date.toISOString();
    const dateString = isoString.split('T')[0];
    return (dateString);
  }

  return (
    <div className={TransactionsCSS.Transactions}>
      <div className={TransactionsCSS.Header}>
        Transaction Details
      </div>
      <div className={TransactionsCSS.Grid}>
        <div className={TransactionsCSS.Head}>Sr.</div>
        <div className={TransactionsCSS.Head}>Date</div>
        <div className={TransactionsCSS.Head}>Transferred from</div>
        <div className={TransactionsCSS.Head}>Transferred to</div>
        <div className={TransactionsCSS.Head}>Debit</div>
        <div className={TransactionsCSS.Head}>Credit</div>
        <div className={TransactionsCSS.Head}>Balance</div>
      </div>
      {
        transactions.length > 0 &&
        transactions.map((transaction, index) => {
          return (
            <div className={TransactionsCSS.Grid} key={index}>
              <div className={TransactionsCSS.Data}>{index}</div>
              <div className={TransactionsCSS.Data}>{dateSplitter(transaction.createdAt)}</div>
              <div className={TransactionsCSS.Data}>{transaction.sender.userName}</div>
              <div className={TransactionsCSS.Data}>{transaction.receiver.userName}</div>
              <div className={TransactionsCSS.Data}>- ₹{transaction.amount}</div>
              <div className={TransactionsCSS.Data}>+ ₹{transaction.amount}</div>
              <div className={TransactionsCSS.Data}>₹{transaction.balance}</div>
            </div>
          )
        })
      }
    </div>
  )
}

