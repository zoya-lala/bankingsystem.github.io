import { ChatRounded, LoginRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import Logo from '../../assets/images/Logo.png';
import AppBarCSS from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export const AppBar = () => {
      const navigate = useNavigate();
    return (
    <div className={AppBarCSS.AppBar}>
        <div className={AppBarCSS.Logo} onClick={() => navigate("/")}>
              <img src={Logo} alt='Logo' />
        </div>
        
        <div className={AppBarCSS.NavButtons}>
            <Button variant='filled' onClick={() => navigate("/sendmoney")}><b>Send Money</b></Button>
            <Button variant='filled' onClick={() => navigate("/viewcustomers")}><b>View All Users</b></Button>
            <Button variant='filled' onClick={() => navigate("/transactions")}><b>Transactions</b></Button>
    </div>
    </div>
  )
}
