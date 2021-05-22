import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Article from './pages/article/Article';
import BlogArticle from './pages/blogarticle/BlogArticle';
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
import ProfilDoctor from './pages/profildoctor/ProfilDoctor';
import Faq from './pages/faq/Faq';
import OurHospital from './pages/ourhospital/OurHospital';
import Disclaimer from './pages/disclaimer/Disclaimer';
import Publication from './pages/publication/Publication';
import Gallery from './pages/gallery/Gallery';
import SearchResult from './pages/searchresult/SearchResult';
import NavbarMobile from './components/navbarmobile/NavbarMobile';

function App() {

  return (
    <div className="App">
      <WrappContextProvider>
        <BrowserRouter>
          <Navbar />
          <NavbarMobile />

          <Switch>
            <Route path='/search'>
              <SearchResult />
            </Route>

            <Route path='/gallery'>
              <Gallery />
            </Route>

            <Route path='/publication'>
              <Publication />
            </Route>

            <Route path='/disclaimer'>
              <Disclaimer />
            </Route>

            <Route path='/our-hospital/content/:id'>
              <OurHospital />
            </Route>

            <Route path='/faq'>
              <Faq />
            </Route>

            <Route path='/doctor/:id'>
              <ProfilDoctor />
            </Route>

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
