import GetAboutUs from "./aboutus/get";
import GetBanner from "./banner/get";
import GetCareer from "./career/get";
import GetCarouselHome from "./carouselhome/get";
import PostContactUs from "./contactus/post";
import GetDisclaimer from "./disclaimer/get";
import GetEmailUser from "./emailuser/get";
import PostEmailUser from "./emailuser/post";
import GetFindADoctor from "./findadoctor/get";
import GetFooter from "./footer/get";
import GetGeneral from "./general/get";
import GetHeader from "./header/get";
import GetHealthArticle from "./healtharticle/get";
import GetListDoctor from "./listdoctor/get";
import GetNavbar from "./navbar/get";
import PostOnlineReservation from "./onlinereservation/post";
import GetOurHospital from "./ourhospital/get";
import GetPromo from "./promo/get";
import GetTestimonial from "./testimonial/get";
import GetVisitorPatientInformation from "./visitorpatientinformation/get";

// health article
const APIGetHealthArticle = () => GetHealthArticle('health-articles/get')

// carousel-home
const APIGetCarouselHome = () => GetCarouselHome('carousel-home/get')

// About Us
const APIGetAboutUs = () => GetAboutUs('about-us/get')

// header
const APIGetHeader = () => GetHeader('header/get')

// testimonial
const APIGetTestimonial = () => GetTestimonial('testimonial/get')

// banner
const APIGetBanner = () => GetBanner('banner/get')

// email-user
const APIPostEmailUser = (data) => PostEmailUser('email-user/post', data)
const APIGetEmailUser = () => GetEmailUser('email-user/get')

// list-doctor
const APIGetListDoctor = () => GetListDoctor('list-doctor/get')

// online-reservation
const APIPostOnlineReservation = (data) => PostOnlineReservation('online-reservation/post', data)

// promo
const APIGetPromo = () => GetPromo('promo/get')

// career
const APIGetCareer = () => GetCareer('career/get')

// contact-us
const APIPostContactUs = (data) => PostContactUs('contact-us/post', data)

// find-doctor
const APIGetFindADoctor = () => GetFindADoctor('find-doctor/get')

// general
const APIGetGeneral = () => GetGeneral('faq/general/get')

// visitor-patient-information
const APIGetVisitorPatientInformation = () => GetVisitorPatientInformation('faq/visitor-patient-information/get')

// our-hospital
const APIGetOurHospital = () => GetOurHospital('our-hospital/get')

// navbar
const APIGetNavbar = () => GetNavbar('navbar/get')

// Footer
const APIGetFooter = () => GetFooter('footer/get')

// Disclaimer
const APIGetDisclaimer = () => GetDisclaimer('disclaimer/get')

const API = {
    APIGetHealthArticle,
    APIGetCarouselHome,
    APIGetAboutUs,
    APIGetHeader,
    APIGetTestimonial,
    APIGetBanner,
    APIPostEmailUser,
    APIGetEmailUser,
    APIGetListDoctor,
    APIPostOnlineReservation,
    APIGetPromo,
    APIGetCareer,
    APIPostContactUs,
    APIGetFindADoctor,
    APIGetGeneral,
    APIGetVisitorPatientInformation,
    APIGetOurHospital,
    APIGetNavbar,
    APIGetFooter,
    APIGetDisclaimer
}

export default API;