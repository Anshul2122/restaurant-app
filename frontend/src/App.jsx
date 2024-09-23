import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import Register from './pages/Register';
import Login from './pages/Login';
import RestaurantRegister from './pages/RestaurantRegister';
import ManageRestaurant from './pages/ManageRestaurant';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import OrderStatus from './pages/OrderStatus';

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/register' element={<Layout><Register/></Layout>} />
      <Route path='/login' element={<Layout><Login/></Layout>} />
      <Route path='/registerRestaurant' element={<RestaurantRegister/>} />
      <Route path='/userRestaurant' element={<Layout><ManageRestaurant/></Layout>}/>
      <Route path='/search/:city' element={<Layout><SearchPage/></Layout>} />
      <Route path='/user-profile' element={<Layout><UserProfilePage/></Layout>} />
      <Route path='/details/:restaurantId' element={<Layout><DetailPage/></Layout>} />
      <Route path='/order-status' element={<Layout><OrderStatus/></Layout>}/>

    </Routes>
  )
}

export default App
