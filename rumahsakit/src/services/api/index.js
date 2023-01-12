import useGetFetch from "./useGetFetch";
import usePostFetch from "./usePostFetch";

// health article
const APIGetHealthArticle = () => useGetFetch('health-articles/get')

// carousel-home
const APIGetCarouselHome = () => useGetFetch('carousel-home/get')

// About Us
const APIGetAboutUs = () => useGetFetch('about-us/get')

// header
const APIGetHeader = () => useGetFetch('header/get')

// testimonial
const APIGetTestimonial = () => useGetFetch('testimonial/get')

// banner
const APIGetBanner = () => useGetFetch('banner/get')

// email-user
const APIPostEmailUser = (data) => usePostFetch('email-user/post', data)
const APIGetEmailUser = () => useGetFetch('email-user/get')

// list-doctor
const APIGetListDoctor = () => useGetFetch('list-doctor/get')

// online-reservation
const APIPostOnlineReservation = (data) => usePostFetch('online-reservation/post', data)

// promo
const APIGetPromo = () => useGetFetch('promo/get')

// career
const APIGetCareer = () => useGetFetch('career/get')

// contact-us
const APIPostContactUs = (data) => usePostFetch('contact-us/post', data)
const APIGetContactUs = () => useGetFetch('contact-us/get')

// find-doctor
const APIGetFindADoctor = () => useGetFetch('find-doctor/get')

// general
const APIGetGeneral = () => useGetFetch('faq/general/get')

// visitor-patient-information
const APIGetVisitorPatientInformation = () => useGetFetch('faq/visitor-patient-information/get')

// our-hospital
const APIGetOurHospital = () => useGetFetch('our-hospital/get')

// navbar
const APIGetNavbar = () => useGetFetch('navbar/get')

// Footer
const APIGetFooter = () => useGetFetch('footer/get')

// Disclaimer
const APIGetDisclaimer = () => useGetFetch('disclaimer/get')

// Publication
const APIGetPublication = () => useGetFetch('publication/get')

// Gallery
const APIGetGallery = () => useGetFetch('gallery/get')

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
    APIGetDisclaimer,
    APIGetPublication,
    APIGetGallery,
    APIGetContactUs
}

export default API;