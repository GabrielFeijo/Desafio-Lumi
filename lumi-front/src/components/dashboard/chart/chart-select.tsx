import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getCustomers } from '@/api/get-customers';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

function capitalizeFirstTwoWords(sentence: string) {
	const words = sentence.split(' ');

	const firstTwoWords = words.slice(0, 2);

	const capitalizedWords = firstTwoWords.map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	});

	return capitalizedWords.join(' ');
}

const ChartSelect = ({
	handleChange,
}: {
	handleChange: (value: string) => void;
}) => {
	const [options, setOptions] = useState([{ value: 'Todos', label: 'Todos' }]);

	const { data: customers } = useQuery({
		retry: false,
		queryKey: ['metrics', 'get-customers'],
		queryFn: getCustomers,
	});

	useEffect(() => {
		if (customers) {
			setOptions([
				{ value: 'Todos', label: 'Todos' },
				...customers.map((customer) => {
					return {
						value: String(customer.customerNumber),
						label: capitalizeFirstTwoWords(customer.name),
					};
				}),
			]);
		}
	}, [customers]);

	return (
		<div className='flex items-center gap-2'>
			<Label>Cliente:</Label>
			<Select onValueChange={handleChange}>
				<SelectTrigger>
					<SelectValue placeholder='Todos' />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem
							key={option.value}
							value={option.value}
						>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

export default ChartSelect;
