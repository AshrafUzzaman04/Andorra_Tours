import Footer5 from "./footer/Footer5"
import Header from "./header/Header"
import Layout from "./Layout"

interface LayoutProps {
	headerStyle?: Number
	footerStyle?: Number
	children?: React.ReactNode
	breadcrumbTitle?: string,
	headerData?:any
}

export default function MasterLayout ({headerStyle, footerStyle , children}:LayoutProps){
    return  <>
                <Header/>
                <Layout headerStyle={headerStyle} footerStyle={footerStyle}>
                    {children}
                </Layout>
                <Footer5/>
            </>
}