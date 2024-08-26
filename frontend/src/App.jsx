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

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout showHero={true}><HomePage/></Layout>}/>
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/registerRestaurant' element={<RestaurantRegister/>} />
      <Route path='/userRestaurant' element={<Layout><ManageRestaurant/></Layout>}/>
      <Route path='/search/:city' element={<Layout><SearchPage/></Layout>} />
      <Route path='/user-profile' element={<Layout><UserProfilePage/></Layout>} />

    </Routes>
  )
}

export default App
