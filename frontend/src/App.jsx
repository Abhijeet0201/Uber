import {Route, Routes} from 'react-router-dom';
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSigup';
import Home from './pages/Home';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />}/>
        <Route path='/captains-login' element={<CaptainLogin />}/>
        <Route path='/captains-signup' element={<CaptainSignup />}/>
      </Routes>
    </div>
  )
}

export default App
