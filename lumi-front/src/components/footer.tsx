import Link from 'next/link';

const Footer = () => {
	return (
		<footer className='w-full py-2 bg-background'>
			<p className='text-center font-medium text-sm'>
				Desenvolvido por{' '}
				<Link
					className='hover:underline'
					href='https://github.com/GabrielFeijo'
					target='_blank'
					rel='noopener noreferrer'
				>
					Gabriel Feijó
				</Link>{' '}
				- Desafio Lumi © 2024
			</p>
		</footer>
	);
};

export default Footer;
