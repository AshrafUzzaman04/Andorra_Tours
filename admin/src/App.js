import { Suspense, useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard PRO React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard PRO React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Soft UI Dashboard PRO React routes
//import routes from "routes";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateOutlet from "./components/PrivateOutlet";
import Signin from "./pages/Signin";

import Dashboard from './pages/Dashboard';

import RoleIndex from './pages/user_settings/role/RoleIndex';
import RoleEdit from './pages/user_settings/role/RoleEdit';
import RoleCreate from './pages/user_settings/role/RoleCreate';

import EmployeeCreate from './pages/hr/employee/EmployeeCreate';
import EmployeeIndex from './pages/hr/employee/EmployeeIndex';
import EmployeeEdit from './pages/hr/employee/EmployeeEdit';

import FormCreate from './pages/form/FormCreate';
import FormIndex from './pages/form/FormIndex';
import FormEdit from './pages/form/FormEdit';
import FormShow from './pages/form/FormShow';

import CustomerIndex from './pages/customer_management/customer/CustomerIndex';
import CustomerCreate from './pages/customer_management/customer/CustomerCreate';
import CustomerEdit from './pages/customer_management/customer/CustomerEdit';
import CustomerDetails from "pages/customer_management/customer/CustomerDetails";

import QuotationIndex from './pages/sales_and_distribution/quations/QuotationIndex';
import QuotationCreate from './pages/sales_and_distribution/quations/QuotationCreate';
import QuotationEdit from './pages/sales_and_distribution/quations/QuotationEdit';

import ProjectIndex from './pages/project_management/ProjectIndex';
import ProjectCreate from './pages/project_management/ProjectCreate';
import ProjectShow from './pages/project_management/ProjectShow';
import ProjectEdit from './pages/project_management/ProjectEdit';

// import ProductIndex from "pages/product_management/ProductIndex";
// import ProductCreate from "pages/product_management/ProductCreate";
// import ProductEdit from "pages/product_management/ProductEdit";

import SupplierCreate from "pages/customer_management/supplier/SupplierCreate";
import SupplierEdit from "pages/customer_management/supplier/SupplierEdit";
import SupplierIndex from "pages/customer_management/supplier/SupplierIndex";

import ChatIndex from './pages/chat/Index';
import ChatSendMessage from './pages/chat/ChatSendMessage';
import Message from './pages/chat/Message';

import StudentIndex from "pages/check_list/StudentIndex";
import StudentCreate from "pages/check_list/StudentCreate";
import StudentEdit from "pages/check_list/StudentEdit";

import WorkshopIndex from "pages/work_shop/WorkshopIndex";
import WorkshopCreate from "pages/work_shop/WorkshopCreate";
import WorkshopEdit from "pages/work_shop/WorkshopEdit";

import SeminarIndex from "pages/seminar/SeminarIndex";
import SeminarwiseStudent from "pages/seminar/SeminarwiseStudent";
import SeminarCreate from "pages/seminar/SeminarCreate";
import SeminarEdit from "pages/seminar/SeminarEdit";

import OrderIndex from "pages/customer_management/orders/OrderIndex";
import OrderCreate from "pages/customer_management/orders/OrderCreate";
import OrderEdit from "pages/customer_management/orders/OrderEdit";
import InvoiceIndex from "pages/Finance/InvoiceIndex";
import InvoiceCreate from "pages/Finance/InvoiceCreate";
import InvoiceEdit from "pages/Finance/InvoiceEdit";
import InvoiceCreateAsOrder from "pages/Finance/InvoiceCreateAsOrder";
import OverView from "pages/sales_and_distribution/OverView";
import EmployeeDetails from "pages/hr/employee/EmployeeDetails";

import Settings from './pages/settings/Index';

import SmtpIndex from './pages/user_settings/smtp/SmtpIndex';
import SmtpCreate from './pages/user_settings/smtp/SmtpCreate';
import SmtpEdit from './pages/user_settings/smtp/SmtpEdit';
import CategoryIndex from "pages/Category/CategoryIndex";
import CategoryCreate from "pages/Category/CategoryCreate";
import CategoryEdit from "pages/Category/CategoryEdit";
import SubCategoryIndex from "pages/Sub_Category/SubCategoryIndex";
import SubCategoryCreate from "pages/Sub_Category/SubCategoryCreate";
import SubCategoryEdit from "pages/Sub_Category/SubCategoryEdit";
import HeaderIndex from "pages/Theme/Header/HeaderIndex";
import HeroIndex from "pages/Theme/Hero/HeroIndex";
import HeroCreate from "pages/Theme/Hero/HeroCreate";
import HeroEdit from "pages/Theme/Hero/HeroEdit";
import VeranoIndex from "pages/Verano/VeranoIndex";
import VeranoCreate from "pages/Verano/VeranoCreate";
import VeranoEdit from "pages/Verano/VeranoEdit";
import InveranoIndex from "pages/Theme/Inverano/InveranoIndex";
import InveranoCreate from "pages/Theme/Inverano/InveranoCreate";
import InveranoEdit from "pages/Theme/Inverano/InveranoEdit";
import OfferBannerCreate from "pages/Theme/OfferBanner/OfferBannerCreate";
import OfferBannerEdit from "pages/Theme/OfferBanner/OfferBannerEdit";
import OfferBannerIndex from "pages/Theme/OfferBanner/OfferBannerIndex";
import ServicesIndex from "pages/Theme/Services/ServicesIndex";
import ServicesCreate from "pages/Theme/Services/ServicesCreate";
import ServicesEdit from "pages/Theme/Services/ServicesEdit";
import CategorySliderIndex from "pages/Theme/CategorySlider/CategorySliderIndex";
import CategorySliderCreate from "pages/Theme/CategorySlider/CategorySliderCreate";
import CategorySliderEdit from "pages/Theme/CategorySlider/CategorySliderEdit";
import AdvertisementIndex from "pages/Theme/Advertisement/AdvertisementIndex";
import AdvertisementCreate from "pages/Theme/Advertisement/AdvertisementCreate";
import AdvertisementEdit from "pages/Theme/Advertisement/AdvertisementEdit";
import WhyTravelIndex from "pages/Theme/WhyTravel/WhyTravelIndex";
import WhyTravelCreate from "pages/Theme/WhyTravel/WhyTravelCreate";
import WhyTravelEdit from "pages/Theme/WhyTravel/WhyTravelEdit";
import TestimonialsIndex from "pages/Theme/Testimonials/TestimonialsIndex";
import TestimonialsCreate from "pages/Theme/Testimonials/TestimonialsCreate";
import TestimonialsEdit from "pages/Theme/Testimonials/TestimonialsEdit";
import FooterDetails from "pages/Footer/FooterDetails";
import FooterPageTitle from "pages/Footer/FooterPageTitle";
import FooterPages from "pages/Footer/FooterPages";
import FooterPartners from "pages/Footer/FooterPartners";
import FooterSocialLinks from "pages/Footer/FooterSocialLinks";
import PageTitleCreate from "pages/Footer/PageTitle/PageTitleCreate";
import PageCategoryEdit from "pages/Footer/PageTitle/PageCategoryEdit";
import PagesCreate from "pages/Footer/Pages/PagesCreate";
import PagesEdit from "pages/Footer/Pages/PagesEdit";
import PartnerCreate from "pages/Footer/Partner/PartnerCreate";
import PartnerEdit from "pages/Footer/Partner/PartnerEdit";
import SocialLinksCreate from "pages/Footer/SocialLinks/SocialLinksCreate";
import SocialLinksEdit from "pages/Footer/SocialLinks/SocialLinksEdit";
import VeranoDetailsIndex from "pages/Details/Verano/VeranoDetailsIndex";
import VeranoDetailsCreate from "pages/Details/Verano/VeranoDetailsCreate";
import VeranoDetailsEdit from "pages/Details/Verano/VeranoDetailsEdit";
import InveranoDetailsIndex from "pages/Details/Inverano/InveranoDetailsIndex";
import InveranoDetailsCreate from "pages/Details/Inverano/InveranoDetailsCreate";
import InveranoDetailsEdit from "pages/Details/Inverano/InveranoDetailsEdit";
import FormBuilder from "pages/Theme/Services/FormBuilder";
import Translatioin from "pages/Translation/Translatioin";
import TranslationTable from "pages/Translation/TranslationTable";
import TranslationEditor from "pages/Translation/TranslationEditor";
import HotelIndex from "pages/Hotel/HotelIndex";
import HotelCreate from "pages/Hotel/HotelCreate";
import HotelEdit from "pages/Hotel/HotelEdit";
import ProductIndex from "pages/Products/ProductIndex";
import ProductCreate from "pages/Products/ProductCreate";
import ProductEdit from "pages/Products/ProductEdit";
import BlogIndex from "pages/Blog/BlogIndex";
import BlogCreate from "pages/Blog/BlogCreate";
import BlogEdit from "pages/Blog/BlogEdit";
import PartnersIndex from "pages/Others/Partners/PartnersIndex";
import PartnersCreate from "pages/Others/Partners/PartnersCreate";
import PartnersEdit from "pages/Others/Partners/PartnersEdit";


function App() {
    const [controller, dispatch] = useSoftUIController();
    const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
    const [onMouseEnter, setOnMouseEnter] = useState(false);
    const [rtlCache, setRtlCache] = useState(null);

    // Cache for the rtl
    useMemo(() => {
        const cacheRtl = createCache({
            key: "ltl",
        });

        setRtlCache(cacheRtl);
    }, []);

    // Open sidenav when mouse enter on mini sidenav
    const handleOnMouseEnter = () => {
        if (miniSidenav && !onMouseEnter) {
            setMiniSidenav(dispatch, false);
            setOnMouseEnter(true);
        }
    };

    // Close sidenav when mouse leave mini sidenav
    const handleOnMouseLeave = () => {
        if (onMouseEnter) {
            setMiniSidenav(dispatch, true);
            setOnMouseEnter(false);
        }
    };

    // Change the openConfigurator state
    const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

    // Setting the dir attribute for the body element
    useEffect(() => {
        document.body.setAttribute("dir", direction);
    }, [direction]);

    // Setting page scroll to 0 when changing the route
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, []);

    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            if (route.collapse) {
                return getRoutes(route.collapse);
            }

            if (route.route) {
                return <Route exact path={route.route} element={route.component} key={route.key} />;
            }

            return null;
        });

    const configsButton = (
        <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="3.5rem"
            height="3.5rem"
            bgColor="white"
            shadow="sm"
            borderRadius="50%"
            position="fixed"
            right="2rem"
            bottom="2rem"
            zIndex={99}
            color="dark"
            sx={{ cursor: "pointer" }}
            onClick={handleConfiguratorOpen}
        >
            <Icon fontSize="default" color="inherit">
                settings
            </Icon>
        </SoftBox>
    );

    return (
        <Suspense fallback="loading ...">
            <BrowserRouter>
                <ToastContainer theme="dark" />
                <CacheProvider value={rtlCache}>
                    <ThemeProvider theme={theme}>
                        <Routes>
                            <Route path="/" element={<Signin />} />
                            <Route path="/*" element={<PrivateOutlet />}>
                                <Route path="dashboard" element={<Dashboard />} />
                                <Route path="profile/settings" element={<Settings />} />

                                {/* categories routes */}
                                <Route path="categories/category" element={<CategoryIndex />} />
                                <Route path="categories/category/create" element={<CategoryCreate />} />
                                <Route path="categories/category/:id/edit" element={<CategoryEdit />} />

                                <Route path="categories/sub-category" element={<SubCategoryIndex />} />
                                <Route path="categories/sub-category/create" element={<SubCategoryCreate />} />
                                <Route path="categories/sub-category/:id/edit" element={<SubCategoryEdit />} />

                                {/*theme customization*/}
                                <Route path="theme-customization/header" element={<HeaderIndex />} />
                                <Route path="theme-customization/hero" element={<HeroIndex />} />
                                <Route path="theme-customization/hero/create" element={<HeroCreate />} />
                                <Route path="theme-customization/hero/:id/edit" element={<HeroEdit />} />

                                {/*verano customization*/}
                                <Route path="theme-customization/verano" element={<VeranoIndex />} />
                                <Route path="theme-customization/verano/create" element={<VeranoCreate />} />
                                <Route path="theme-customization/verano/:id/edit" element={<VeranoEdit />} />

                                <Route path="theme-customization/inverano" element={<InveranoIndex />} />
                                <Route path="theme-customization/inverano/create" element={<InveranoCreate />} />
                                <Route path="theme-customization/inverano/:id/edit" element={<InveranoEdit />} />

                                <Route path="theme-customization/banner-slider" element={<OfferBannerIndex />} />
                                <Route path="theme-customization/banner-slider/create" element={<OfferBannerCreate />} />
                                <Route path="theme-customization/banner-slider/:id/edit" element={<OfferBannerEdit />} />

                                <Route path="theme-customization/servcios-exclusivos" element={<ServicesIndex />} />
                                <Route path="theme-customization/servcios-exclusivos/create" element={<ServicesCreate />} />
                                <Route path="theme-customization/servcios-exclusivos/:id/edit" element={<ServicesEdit />} />
                                <Route path="theme-customization/servcios-exclusivos/:id/form-build" element={<FormBuilder />} />

                                <Route path="theme-customization/category-slider" element={<CategorySliderIndex />} />
                                <Route path="theme-customization/category-slider/create" element={<CategorySliderCreate />} />
                                <Route path="theme-customization/category-slider/:id/edit" element={<CategorySliderEdit />} />


                                <Route path="theme-customization/advertisement" element={<AdvertisementIndex />} />
                                <Route path="theme-customization/advertisement/create" element={<AdvertisementCreate />} />
                                <Route path="theme-customization/advertisement/:id/edit" element={<AdvertisementEdit />} />


                                <Route path="theme-customization/why-travels" element={<WhyTravelIndex />} />
                                <Route path="theme-customization/why-travels/create" element={<WhyTravelCreate />} />
                                <Route path="theme-customization/why-travels/:id/edit" element={<WhyTravelEdit />} />

                                <Route path="theme-customization/testimonials" element={<TestimonialsIndex />} />
                                <Route path="theme-customization/testimonials/create" element={<TestimonialsCreate />} />
                                <Route path="theme-customization/testimonials/:id/edit" element={<TestimonialsEdit />} />

                                <Route path="details/verano" element={<VeranoDetailsIndex />} />
                                <Route path="details/verano/create" element={<VeranoDetailsCreate />} />
                                <Route path="details/verano/:id/edit" element={<VeranoDetailsEdit />} />

                                <Route path="details/inverano" element={<InveranoDetailsIndex />} />
                                <Route path="details/inverano/create" element={<InveranoDetailsCreate />} />
                                <Route path="details/inverano/:id/edit" element={<InveranoDetailsEdit />} />

                                <Route path="footer/details" element={<FooterDetails />} />

                                <Route path="footer/page-category" element={<FooterPageTitle />} />
                                <Route path="footer/page-category/create" element={<PageTitleCreate />} />
                                <Route path="footer/page-category/:id/edit" element={<PageCategoryEdit />} />

                                <Route path="footer/pages" element={<FooterPages />} />
                                <Route path="footer/pages/create" element={<PagesCreate />} />
                                <Route path="footer/pages/:id/edit" element={<PagesEdit />} />

                                <Route path="footer/partners" element={<FooterPartners />} />
                                <Route path="footer/partners/create" element={<PartnerCreate />} />
                                <Route path="footer/partners/:id/edit" element={<PartnerEdit />} />

                                <Route path="footer/social-links" element={<FooterSocialLinks />} />
                                <Route path="footer/social-links/create" element={<SocialLinksCreate />} />
                                <Route path="footer/social-links/:id/edit" element={<SocialLinksEdit />} />

                                <Route path="translations" element={<Translatioin />} />
                                <Route path="translations/:id" element={<TranslationTable />} />
                                <Route path="translations/translate/:code/:id" element={<TranslationEditor />} />

                                <Route path="hotels" element={<HotelIndex/>} />
                                <Route path="hotels/create" element={<HotelCreate/>} />
                                <Route path="hotels/:id/edit" element={<HotelEdit/>} />

                                <Route path="products/:slug/product" element={<ProductIndex/>} />
                                <Route path="products/:slug/product/create" element={<ProductCreate/>} />
                                <Route path="products/:slug/product/:id/edit" element={<ProductEdit/>} />

                                <Route path="blogs" element={<BlogIndex/>} />
                                <Route path="blogs/create" element={<BlogCreate/>} />
                                <Route path="blogs/:slug/edit" element={<BlogEdit/>} />


                                <Route path="others/partners" element={<PartnersIndex/>} />
                                <Route path="others/partners/create" element={<PartnersCreate/>} />
                                <Route path="others/partners/:id/edit" element={<PartnersEdit/>} />

                                <Route path="others/cameras" element={<BlogIndex/>} />
                                <Route path="others/cameras/create" element={<BlogCreate/>} />
                                <Route path="others/cameras/:id/edit" element={<BlogEdit/>} />

                                <Route path="others/resorts" element={<BlogIndex/>} />
                                <Route path="others/resorts/create" element={<BlogCreate/>} />
                                <Route path="others/resorts/:id/edit" element={<BlogEdit/>} />

                                <Route path="human-resources/employees" element={<EmployeeIndex />} />
                                <Route path="human-resources/employees/create" element={<EmployeeCreate />} />
                                <Route path="human-resources/employees/:id/edit" element={<EmployeeEdit />} />
                                <Route path="human-resources/employees/:id/profile" element={<EmployeeDetails/>} />

                                {/*customer route start form here */}
                                <Route path="customer-management/overview" element={<OverView/>} />                                
                                <Route path="customer-management/customers" element={<CustomerIndex />} />
                                <Route path="customer-management/customers/create" element={<CustomerCreate />} />
                                <Route path="customer-management/customers/:id/edit" element={<CustomerEdit />} />
                                <Route path="customer-management/customers/:id/details" element={<CustomerDetails/>}/>
                                <Route path="customer-management/quotations" element={<QuotationIndex />} />
                                <Route path="customer-management/quotations/create" element={<QuotationCreate />} />
                                <Route path="customer-management/quotations/:id/edit" element={<QuotationEdit />} />
                                <Route path="customer-management/orders" element={<OrderIndex />} />
                                <Route path="customer-management/orders/create" element={<OrderCreate />} />
                                <Route path="customer-management/orders/:id/create" element={<OrderCreate />} />
                                <Route path="customer-management/orders/:id/edit" element={<OrderEdit />} />

                                <Route path="course-management/students" element={<StudentIndex />} />
                                <Route path="course-management/students/create" element={<StudentCreate/>} />
                                <Route path="course-management/students/:id/edit" element={<StudentEdit/>} />
                                
                                <Route path="course-management/workshops" element={<WorkshopIndex/>} />
                                <Route path="course-management/workshops/create" element={<WorkshopCreate/>} />
                                <Route path="course-management/workshops/:id/edit" element={<WorkshopEdit/>} />
                                
                                <Route path="course-management/seminars" element={<SeminarIndex/>} />
                                <Route path="course-management/seminars/create" element={<SeminarCreate/>} />
                                <Route path="course-management/seminars/:id/students" element={<SeminarwiseStudent/>} />
                                <Route path="course-management/seminars/:id/edit" element={<SeminarEdit/>} />
                                
                                <Route path="finance/invoice" element={<InvoiceIndex/>} />
                                <Route path="finance/invoice/create" element={<InvoiceCreate/>} />
                                <Route path="finance/invoice/:id/edit" element={<InvoiceEdit/>} />
                                <Route path="finance/invoice/:id/create" element={<InvoiceCreateAsOrder/>} />
                                
                                <Route path="product-management/suppliers" element={<SupplierIndex />} />
                                <Route path="product-management/suppliers/create" element={<SupplierCreate />} />
                                <Route path="product-management/suppliers/:id/edit" element={<SupplierEdit />} />

                                {/* <Route path="product-management/products" element={<ProductIndex />} />
                                <Route path="product-management/products/create" element={<ProductCreate />} />
                                <Route path="product-management/products/:id/edit" element={<ProductEdit />} /> */}

                                <Route path="forms" element={<FormIndex />} />
                                <Route path="forms/create" element={<FormCreate />} />
                                <Route path="forms/:id/edit" element={<FormEdit />} />
                                <Route path="forms/:id" element={<FormShow />} />

                                <Route path="project-management/projects" element={<ProjectIndex />} />
                                <Route path="project-management/projectscreate" element={<ProjectCreate />} />
                                <Route path="project-management/projects/:id" element={<ProjectShow />} />
                                <Route path="project-management/projects/:id/edit" element={<ProjectEdit />} />

                                <Route path="course-management/students" element={<StudentIndex />} />
                                <Route path="course-management/students/create" element={<StudentCreate/>} />
                                <Route path="course-management/students/:id/edit" element={<StudentEdit/>} />
                                
                                <Route path="user-settings/roles" element={<RoleIndex />} />
                                <Route path="user-settings/roles/create" element={<RoleCreate />} />
                                <Route path="user-settings/roles/:id/edit" element={<RoleEdit />} />

                                <Route path="chat" element={<ChatIndex />} />
                                <Route path="chat/send-message" element={<ChatSendMessage />} />
                                <Route path="chat/message/:id" element={<Message />} />

                                <Route path="user-settings/smtp" element={<SmtpIndex />} />
                                <Route path="user-settings/smtp/create" element={<SmtpCreate />} />
                                <Route path="user-settings/smtp/:id/edit" element={<SmtpEdit />} />
                            </Route>
                        </Routes>
                    </ThemeProvider>
                </CacheProvider>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
