import { render } from '@testing-library/react';

import { Header } from '@/components/header';

import '@testing-library/jest-dom';

describe('Header Component', () => {
	it('should display the brand name with correct class', () => {
		const { getByText } = render(<Header />);
		const title = getByText('Lumi');
		expect(title).toBeInTheDocument();
		expect(title).toHaveClass('font-semibold');
	});

	it('should display the PlugZap icon', () => {
		const { container } = render(<Header />);
		const plugZapIcon = container.querySelector('.size-6');
		expect(plugZapIcon).toBeInTheDocument();
	});

	it('should display navigation links with correct icons', () => {
		const { getByText, container } = render(<Header />);

		const homeLink = getByText('Início');
		const invoicesLink = getByText('Faturas');

		expect(homeLink).toBeInTheDocument();
		expect(invoicesLink).toBeInTheDocument();

		const homeIcon = container.querySelector('.size-4');
		const receiptIcon = container.querySelector('.size-4');

		expect(homeIcon).toBeInTheDocument();
		expect(receiptIcon).toBeInTheDocument();
	});

	it('should render the vertical separator', () => {
		const { container } = render(<Header />);
		const separator = container.querySelector('.h-6');
		expect(separator).toBeInTheDocument();
	});

	it('should contain a navigation section', () => {
		const { container } = render(<Header />);
		const nav = container.querySelector('nav');
		expect(nav).toBeInTheDocument();
		expect(nav).toHaveClass('flex items-center space-x-4 lg:space-x-6');
	});
});
