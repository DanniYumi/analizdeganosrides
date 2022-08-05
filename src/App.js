
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Rides from './pages/Rides';
import Service from './pages/Service';
import Faq from'./pages/Faq'
import Terms from './pages/Terms'
import { AuthContextProvider } from './context/AuthContext';
import UserAccount from './pages/UserAccount';
import Protected from './components/Protected';
import Reset from './pages/Reset';
import Reviews from './pages/Reviews';



function App() {
  
  return (
    <div className="App">
      <AuthContextProvider>
      <BrowserRouter>
      
        <Navbar/>
        
        <Routes>
        
          <Route exact path='/' element={<Home />} />
          <Route exact path='/contact' element={<Contact/>} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/signup' element={<Signup/>} />
          <Route exact path='/signin' element={<Signin />} />
          <Route exact path='/rides' element={<Rides/>} />
          <Route exact path='/services' element={<Service/>} />
          <Route exact path='/faq' element={<Faq/>} />
          <Route exact path='/terms' element={<Terms/>} />
          <Route exact path='/reset' element={<Reset/>} />
          <Route exact path='/reviews' element={<Reviews/>} />
          <Route exact path='/account' element={<Protected><UserAccount/></Protected>} />
          </Routes>
          
          <Footer/>
         
        </BrowserRouter>
        </AuthContextProvider>
    </div>
  );
}

export default App;
