import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import Article from './pages/article/Article';
import BlogArticle from './pages/blogarticle/BlogArticle';
import { useEffect } from 'react';
import WrappContextProvider from './services/context/WrappContext';
import AboutUs from './pages/aboutus/AboutUs';
import Testimonial from './pages/testimonial/Testimonial';
import Footer from './components/footer/Footer';
import OnlineReservation from './pages/onlinereservation/OnlineReservation';
import Promo from './pages/promo/Promo';
import DetailPromo from './pages/detailpromo/DetailPromo';
import Career from './pages/career/Career';
import DetailCareer from './pages/detailcareer/DetailCareer';
import ContactUs from './pages/contactus/ContactUs';
import FindADoctor from './pages/findadoctor/FindADoctor';

function App() {

  return (
    <div className="App">

      <WrappContextProvider>
        <BrowserRouter>
          <Navbar />

          <Switch>
            <Route path='/findadoctor'>
              <FindADoctor />
            </Route>

            <Route path='/contact'>
              <ContactUs />
            </Route>

            <Route path='/career/details/:id'>
              <DetailCareer />
            </Route>

            <Route path='/career'>
              <Career />
            </Route>

            <Route path='/promo/details/:id'>
              <DetailPromo />
            </Route>

            <Route path='/promo'>
              <Promo />
            </Route>

            <Route path='/online-reservation'>
              <OnlineReservation />
            </Route>

            <Route path='/testimonial'>
              <Testimonial />
            </Route>

            <Route path='/about'>
              <AboutUs />
            </Route>

            <Route path='/articles/read/:id'>
              <BlogArticle />
            </Route>

            <Route path='/articles'>
              <Article />
            </Route>

            <Route path='/'>
              <Home />
            </Route>
          </Switch>

          <Footer />
        </BrowserRouter>
      </WrappContextProvider>
    </div>
  );
}

export default App;
