
'use client'
import { useEffect, useState } from "react"
import BackToTop from '../elements/BackToTop'
import ButtonClick from '../elements/ButtonClick'
// import DropdownSelect from '../elements/DropdownSelect'
import ItemCollapse from '../elements/ItemCollapse'
import TestimonialBlock from '../elements/TestimonialBlock'
import Breadcrumb from './Breadcrumb'
import MobileMenu from './MobileMenu'
import PopupSignin from './PopupSignin'
import PopupSignup from './PopupSignup'
import Sidebar from './Sidebar'
import Footer1 from './footer/Footer1'
import Footer2 from './footer/Footer2'
import Footer3 from './footer/Footer3'
import Footer4 from './footer/Footer4'
import Footer5 from './footer/Footer5'
import Footer6 from './footer/Footer6'
import Header1 from "./header/Header1"
import Header2 from './header/Header2'
import Header from "./header/Header"
import Axios from "@/helper/axios"
import { GetHeaderData } from "@/util/Header"

interface LayoutProps {
	headerStyle?: Number
	footerStyle?: Number
	children?: React.ReactNode
	breadcrumbTitle?: string,
	headerData?:any
}


export default function Layout({ headerStyle, footerStyle, breadcrumbTitle, children }: LayoutProps) {

	const [scroll, setScroll] = useState<boolean>(false)
	// MobileMenu
	const [isMobileMenu, setMobileMenu] = useState<boolean>(false)
	const handleMobileMenu = (): void => {
		setMobileMenu(!isMobileMenu)
		!isMobileMenu ? document.body.classList.add("mobile-menu-active") : document.body.classList.remove("mobile-menu-active")
	}
	// Sidebar
	const [isSidebar, setSidebar] = useState<boolean>(false)
	const handleSidebar = (): void => {
		setSidebar(!isSidebar)
		!isSidebar ? document.body.classList.add("canvas-menu-active") : document.body.classList.remove("canvas-menu-active")
	}
	// Login
	const [isLogin, setLogin] = useState<boolean>(false)
	const handleLogin = (): void => setLogin(!isLogin)
	// Register
	const [isRegister, setRegister] = useState<boolean>(false)
	const handleRegister = (): void => setRegister(!isRegister)

	useEffect(() => {
		const WOW: any = require('wowjs');
		(window as any).wow = new WOW.WOW({
			live: false
		});

		// Initialize WOW.js
		(window as any).wow.init()

		const handleScroll = (): void => {
			const scrollCheck: boolean = window.scrollY > 100
			if (scrollCheck !== scroll) {
				setScroll(scrollCheck)
			}
		}

		document.addEventListener("scroll", handleScroll)

		return () => {
			document.removeEventListener("scroll", handleScroll)
		}
	}, [scroll])

	return (
		<><div id="top" />
			<ItemCollapse />
			<ButtonClick />
			<TestimonialBlock />
			{isMobileMenu &&
				<div className="body-overlay-1" onClick={handleMobileMenu} />
			}
			{isSidebar &&
				<div className="body-overlay-1" onClick={handleSidebar} />
			}

			<main className="main">
				{breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}

				{children}
			</main>

			{/* <PopupFirstLoad /> */}
			<BackToTop target="top" />
		</>
	)
}
