'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentPropsWithoutRef } from 'react';

interface NavLinkProps extends ComponentPropsWithoutRef<'a'> {
	href: string;
}

export function NavLink({ children, href, ...props }: NavLinkProps) {
	const pathname = usePathname();
	const isCurrent = href === pathname;

	return (
		<Link
			href={href}
			{...props}
			className={`${isCurrent ? 'text-foreground' : 'text-muted-foreground'}
            flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-foreground`}
		>
			{children}
		</Link>
	);
}
