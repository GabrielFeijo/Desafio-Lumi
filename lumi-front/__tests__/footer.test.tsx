import { render } from '@testing-library/react';

import Footer from '@/components/footer';

import '@testing-library/jest-dom';

describe('Footer Component', () => {
	it('should render the footer text correctly', () => {
		const { getByText } = render(<Footer />);
		const footerText = getByText(/Desenvolvido por/i);
		expect(footerText).toBeInTheDocument();
		expect(footerText).toHaveClass('text-center font-medium text-sm');
	});

	it('should render the developer name with a link', () => {
		const { getByText } = render(<Footer />);
		const developerLink = getByText('Gabriel Feijó');
		expect(developerLink).toBeInTheDocument();
		expect(developerLink.closest('a')).toHaveAttribute(
			'href',
			'https://github.com/GabrielFeijo'
		);
		expect(developerLink.closest('a')).toHaveAttribute('target', '_blank');
		expect(developerLink.closest('a')).toHaveAttribute(
			'rel',
			'noopener noreferrer'
		);
		expect(developerLink).toHaveClass('hover:underline');
	});

	it('should display the challenge and year correctly', () => {
		const { getByText } = render(<Footer />);
		const challengeText = getByText(/Desafio Lumi © 2024/i);
		expect(challengeText).toBeInTheDocument();
	});
});
