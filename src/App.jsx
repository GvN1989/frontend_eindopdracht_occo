import {Routes,Route} from 'react-router-dom';
import './App.css';
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx"
import NotFound from "./pages/NotFound/NotFound.jsx";
import Quiz from "./pages/Quiz/Quiz.jsx"
import QuizResult from "./pages/QuizResult/QuizResult.jsx";
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";
import ProductOverview from "./pages/ProductOverview/ProductOveriew.jsx";
import styles from "./components/Header/Header.module.css";
import Nav from "./components/Nav/Nav.jsx";
import Header from "./components/Header/Header.jsx";



function App() {

  return (
      <>
          <Header/>
          <main>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/quiz" element={<Quiz/>}/>
                  <Route path="/quizresult" element={<QuizResult/>}/>
                  <Route path="/productdetail/:id" element={<ProductDetail/>}/>
                  <Route path="/productoverview" element={<ProductOverview/>}/>
                  <Route path="*" element={<NotFound/>}/>
              </Routes>
          </main>
          <Footer/>
      </>
  );
}

export default App
