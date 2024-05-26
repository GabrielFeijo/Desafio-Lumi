import { render } from '@testing-library/react';

import Title from '@/components/title';

describe('Title Component', () => {
	it('should display the correct text with the expected style', () => {
		const wrapper = render(<Title>Título Teste</Title>);

		const text = wrapper.getByText('Título Teste');

		expect(text).toBeInTheDocument();
		expect(text).toHaveClass('text-3xl');
	});
});

it('should display the correct text with the large style', () => {
	const wrapper = render(<Title className='text-large'>Texto Grande</Title>);

	const largeText = wrapper.getByText('Texto Grande');

	expect(largeText).toBeInTheDocument();
	expect(largeText).toHaveClass('text-large');
});

it('should display the correct text with the small style', () => {
	const wrapper = render(<Title className='text-small'>Texto Pequeno</Title>);

	const smallText = wrapper.getByText('Texto Pequeno');

	expect(smallText).toBeInTheDocument();
	expect(smallText).toHaveClass('text-small');
});

it('should display the correct text with a custom style', () => {
	const wrapper = render(
		<Title className='custom-class'>Texto Customizado</Title>
	);

	const customText = wrapper.getByText('Texto Customizado');

	expect(customText).toBeInTheDocument();
	expect(customText).toHaveClass('custom-class');
});
