import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './components/footer'
import Navbar from './components/navbar'
import '@fortawesome/fontawesome-svg-core/styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Marthurt',
	description: 'Marthurt-erp',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.className}`}>
				<Navbar />
				<div className=''>{children}</div>
				<Footer />
			</body>
		</html>
	)
}
