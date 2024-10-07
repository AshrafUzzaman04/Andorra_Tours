"use client"
import CurrencyDropdown from '@/components/elements/CurrencyDropdown'
import LanguageDropdown from '@/components/elements/LanguageDropdown'
import Axios from '@/helper/axios'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import MobileMenu from '../MobileMenu'
import Sidebar from '../Sidebar'
import PopupSignin from '../PopupSignin'
import PopupSignup from '../PopupSignup'
import { useTranslations } from 'next-intl'
const ThemeSwitch = dynamic(() => import('@/components/elements/ThemeSwitch'), {
	ssr: false,
})
export default function Header1({ data }: { data: any }) {
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
		<>
			<header className={`header sticky-bar ${scroll ? "stick" : ""} float-none`}>
				{/* <div className="top-bar">
					<div className="container-fluid">
						<div className="text-header">
							<div className="text-unlock text-sm-bold">Unlock the Magic of Travel with Travila - Your Gateway to
								Extraordinary Experiences</div><Link className="link-secondary-2" href="#">Get This Now
								<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" >
									<path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg></Link>
						</div>
					</div>
				</div> */}
				<div className="container-fluid background-body">
					<div className="main-header">
						<div className="header-left">
							<div className="header-logo"><Link className="d-flex" href="/"><img className="light-mode" alt="light-logo" src={process?.env?.NEXT_PUBLIC_STORAGE_URL + data?.header?.light_logo} /><img className="dark-mode" alt="dark-logo" src={process?.env?.NEXT_PUBLIC_STORAGE_URL + data?.header?.dark_logo} /></Link></div>
							<div className="header-nav">
								<nav className="nav-main-menu">
									<ul className="main-menu">
										{
											data?.categories?.map((category: any, index: number) => (
												category?.sub?.length === 0 ?
													<li key={index}><Link href={category?.link}>{category?.category_name}</Link></li> :
													<li key={index} className="has-children"><Link href={category?.link}>{category?.category_name}</Link>
														<ul className="sub-menu">
															{
																category?.sub?.map((subCat: any, index: any) => (
																	<li key={index}><Link href={subCat?.link}>{subCat?.sub_category_name}</Link></li>
																))
															}
														</ul>
													</li>
											))
										}

									</ul>
								</nav>
							</div>
						</div>
						<div className="header-right">
							{data?.header?.show_language === 1 && <LanguageDropdown languages={data?.languages} />}
							{data?.header?.show_currency === 1 && <CurrencyDropdown />}
							<div className="d-none d-xxl-inline-block align-middle mr-15">
								{data?.header?.show_light_dark === 1 && <ThemeSwitch />}
								{data?.header?.show_signin_button === 1 && <a className="btn btn-default btn-signin" onClick={handleLogin}>Signin</a>}

							</div>
							{data?.header?.show_signin_button === 1 &&
								<div className="burger-icon-2 burger-icon-white" onClick={handleSidebar}>
									<img src="/assets/imgs/template/icons/menu.svg" alt="Travila" />
								</div>}
							<div className="burger-icon burger-icon-white" onClick={handleMobileMenu}>
								<span className="burger-icon-top" />
								<span className="burger-icon-mid" />
								<span className="burger-icon-bottom" />
							</div>

						</div>
					</div>
				</div>
			</header>
			<MobileMenu data={data} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
			<Sidebar isSidebar={isSidebar} handleSidebar={handleSidebar} />
			<PopupSignin
				isLogin={isLogin}
				handleLogin={handleLogin}
				isRegister={isRegister}
				handleRegister={handleRegister}
			/>
			<PopupSignup
				isRegister={isRegister}
				handleRegister={handleRegister}
				isLogin={isLogin}
				handleLogin={handleLogin}
			/>
		</>
	)
}
