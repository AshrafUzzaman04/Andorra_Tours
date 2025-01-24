
'use client'
import { useState } from "react"
import BackToTop from '../elements/BackToTop'
import ButtonClick from '../elements/ButtonClick'
// import DropdownSelect from '../elements/DropdownSelect'
import ItemCollapse from '../elements/ItemCollapse'
import TestimonialBlock from '../elements/TestimonialBlock'
import Breadcrumb from './Breadcrumb'

interface LayoutProps {
	headerStyle?: Number
	footerStyle?: Number
	children?: React.ReactNode
	breadcrumbTitle?: string,
	headerData?:any
}


export default function Layout({ headerStyle, footerStyle, breadcrumbTitle, children }: LayoutProps) {
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

			<main className="main background-body">
				{breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}

				{children}
			</main>

			{/* <PopupFirstLoad /> */}
			<BackToTop target="top" />
		</>
	)
}
