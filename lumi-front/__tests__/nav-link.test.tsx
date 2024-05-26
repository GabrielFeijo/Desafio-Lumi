import { render } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import { NavLink } from '@/components/nav-link';

import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
	usePathname: jest.fn(),
}));

describe('NavLink Component', () => {
	const mockUsePathname = usePathname as jest.Mock;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render the link with children', () => {
		mockUsePathname.mockReturnValue('/home');
		const { getByText } = render(<NavLink href='/home'>Home</NavLink>);
		const linkElement = getByText('Home');
		expect(linkElement).toBeInTheDocument();
	});

	it('should apply the current class when href matches pathname', () => {
		mockUsePathname.mockReturnValue('/home');
		const { getByText } = render(<NavLink href='/home'>Home</NavLink>);
		const linkElement = getByText('Home');
		expect(linkElement).toHaveClass('text-foreground');
	});

	it('should apply the muted class when href does not match pathname', () => {
		mockUsePathname.mockReturnValue('/about');
		const { getByText } = render(<NavLink href='/home'>Home</NavLink>);
		const linkElement = getByText('Home');
		expect(linkElement).toHaveClass('text-muted-foreground');
	});

	it('should have the correct href attribute', () => {
		mockUsePathname.mockReturnValue('/about');
		const { getByText } = render(<NavLink href='/home'>Home</NavLink>);
		const linkElement = getByText('Home');
		expect(linkElement.closest('a')).toHaveAttribute('href', '/home');
	});
});
