import React from 'react';
import HomePageCSS from './styles.module.css';
import { Button, Typography } from '@mui/material';
import PiggyBank from '../../assets/images/PiggyBank.svg'
import { Footer } from 'components/Footer';


export const HomePage = () => {
  return (
    <div className={HomePageCSS.HomePage}>
        <div className={HomePageCSS.Image}>
            <img src={PiggyBank} alt="PiggyBank"></img>
        </div>
        <div className={HomePageCSS.Text}>
      <Typography variant="h1" gutterBottom>
      Welcome to Sparks Banking System
      </Typography>
        </div>
        <Footer />
    </div>
  )
};
