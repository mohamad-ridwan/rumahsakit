import GetAboutUs from "./aboutus/get";
import GetBanner from "./banner/get";
import GetCareer from "./career/get";
import GetCarouselHome from "./carouselhome/get";
import PostContactUs from "./contactus/post";
import GetEmailUser from "./emailuser/get";
import PostEmailUser from "./emailuser/post";
import GetFindADoctor from "./findadoctor/get";
import GetHeader from "./header/get";
import GetHealthArticle from "./healtharticle/get";
import GetListDoctor from "./listdoctor/get";
import PostOnlineReservation from "./onlinereservation/post";
import GetPromo from "./promo/get";
import GetTestimonial from "./testimonial/get";

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
    APIGetFindADoctor
}

export default API;