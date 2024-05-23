import { Home, PlugZap, ReceiptText } from 'lucide-react';

import { Separator } from './ui/separator';
import { NavLink } from './nav-link';
import { ModeToggle } from './theme-toggle';

export function Header() {
	return (
		<header className='border-b'>
			<div className='flex h-16 items-center gap-6 px-6'>
				<div className='flex items-center justify-center gap-2'>
					<PlugZap className='size-6' />
					<h1 className='font-semibold'>Lumi</h1>
				</div>

				<Separator
					orientation='vertical'
					className='h-6'
				/>

				<nav className='flex items-center space-x-4 lg:space-x-6'>
					<NavLink href='/'>
						<Home className='size-4' />
						Início
					</NavLink>
					<NavLink href='/invoices'>
						<ReceiptText className='size-4' />
						Faturas
					</NavLink>
				</nav>

				<div className='ml-auto flex items-center space-x-2'>
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
