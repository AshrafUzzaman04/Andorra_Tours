import 'react-perfect-scrollbar/dist/css/styles.css'
import "/public/assets/css/style.css"
import type { Metadata } from "next"
import { Manrope, Merienda } from "next/font/google"
import { FacebookPixelEvents } from '@/components/elements/FacebookPixelEvents'
import { Suspense } from 'react'

const manrope_init = Manrope({
    weight: ['300', '400', '500', '600', '700','800'],
    subsets: ['latin'],
    variable: "--manrope",
    display: 'swap',
})
const merienda_init = Merienda({
    weight: ['300', '400', '500', '600', '700','800'],
    subsets: ['latin'],
    variable: "--merienda",
    display: 'swap',
})

export const metadata: Metadata = {
    title: "Tours Andorra",
    description: "Portal de Actividades / Experiencias #1 en Andorra",
    keywords:"tours andorra, andorra tours, travel andorra, travel, explore andorra,",
    openGraph:{
        title: "Tours Andorra",
        description: "Portal de Actividades / Experiencias #1 en Andorra",
        images:["https://api.ownchoose.com/storage/logos/UVjUj1HNq6CfrXQU57QINTJH8abBZ1dxpF7DqNQo.png"],
        url:"https://andorra-tours.vercel.app/"
    },
    twitter:{
        title: "Tours Andorra",
        description: "Portal de Actividades / Experiencias #1 en Andorra",
        images:["https://api.ownchoose.com/storage/logos/UVjUj1HNq6CfrXQU57QINTJH8abBZ1dxpF7DqNQo.png"],
        card:"summary_large_image",
        creator:"Seba Diaz"
    }
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${manrope_init.variable} ${merienda_init.variable}`}>
            <body>
                {children}
                <Suspense fallback={null}>
                    <FacebookPixelEvents/>
                </Suspense>
            </body>
        </html>
    )
}
