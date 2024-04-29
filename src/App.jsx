import {Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx"
import NotFound from "./pages/NotFound/NotFound.jsx";
import Quiz from "./pages/Quiz/Quiz.jsx"
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";
import ProductOverview from "./pages/ProductOverview/ProductOveriew.jsx";
import Header from "./components/Header/Header.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import ShoppingBasket from "./pages/ShoppingBasket/ShoppingBasket.jsx";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";


function App() {

    const {isAuth} = useContext(AuthContext);

  return (
      <>
          <Header/>
              <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="/quiz" element={<Quiz />}/>
                  <Route path="/productdetail/:id" element={<ProductDetail />}/>
                  <Route path="/productoverview" element={<ProductOverview />}/>
                  <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/login"/>}/>
                  <Route path="/register" element={<Register />}/>
                  <Route path="/login" element={<Login />}/>
                  <Route path="/shoppingbasket" element={<ShoppingBasket />}/>
                  <Route path="*" element={<NotFound />}/>
              </Routes>
          <Footer/>
      </>
  );
}

export default App
