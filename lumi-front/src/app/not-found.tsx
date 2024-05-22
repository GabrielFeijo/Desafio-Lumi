'use client';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='flex flex-1 flex-col items-center justify-center gap-2 h-[calc(100vh-10rem)]'>
			<h1 className='text-4xl font-bold'>Oh não, algo deu errado...</h1>
			<p className='text-accent-foreground'>
				A página que você tentou acessar não existe! 😢
			</p>
			<p className='text-accent-foreground'>
				Voltar para o{' '}
				<Link
					href='/'
					className='text-emerald-600 dark:text-emerald-400 hover:underline'
				>
					Dashboard
				</Link>
			</p>
		</div>
	);
}
