import './App.css';
import { AppBar, HomePage, Footer, SendMoney, Transactions, ViewCustomers } from 'components';
import '@fontsource/roboto/400.css';
import { Route, Routes } from 'react-router-dom';
import CustomerDetails from 'components/Admin/Admin';


function App() {
  return (
    <div className="App">
        <AppBar />
        <div className='ScrollableContainer'>
          <Routes>
				<Route path="/" element={<HomePage />} exact />
        <Route path="/sendmoney" element={<ViewCustomers />} exact />
        <Route path='/transactions' element={<Transactions />} exact/>
        <Route path='/viewcustomers' element={<ViewCustomers />} exact/>
        <Route path='/footer' element={<Footer />} exact/>
        <Route path='/admin' element={<CustomerDetails />} exact/>
        </Routes>
        {/* <SendMoney /> */}
        {/* <Transactions /> */}
        {/* <ViewCustomers /> */}
        {/* <Footer /> */}
        </div>
    </div>
  );
}

export default App;
