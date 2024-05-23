import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import Footer from '@/components/footer';
import { Header } from '@/components/header';
import { ReactQueryProvider } from '@/providers/react-query-provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Desafio Lumi - Gabriel Feijó',
	description:
		'Sistema capaz de analisar os documentos de fatura de energia elétrica e extrair os dados importantes deles de forma automatizada.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-BR'>
			<body className={inter.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<ReactQueryProvider>
						<div className='antialiased'>
							<Header />
							<main className='p-8 pt-6 flex'>{children}</main>
							<Footer />
						</div>
					</ReactQueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
