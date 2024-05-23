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
import { defaultSelectOption } from '@/constants/default-select-option';
import { capitalizeWords } from '@/utils/capitalize-words';

const ChartSelect = ({
	handleChange,
	value,
}: {
	handleChange: (value: string) => void;
	value: string;
}) => {
	const [options, setOptions] = useState([defaultSelectOption]);

	const { data: customers } = useQuery({
		retry: false,
		queryKey: ['metrics', 'get-customers'],
		queryFn: getCustomers,
	});

	useEffect(() => {
		if (customers) {
			setOptions((prevOptions) => [
				...prevOptions,
				...customers.map((customer) => {
					return {
						value: String(customer.customerNumber),
						label: capitalizeWords(customer.name),
					};
				}),
			]);
		}
	}, [customers]);

	return (
		<div className='flex items-center gap-2'>
			<Label>Cliente:</Label>
			<Select
				onValueChange={handleChange}
				value={value}
			>
				<SelectTrigger>
					<SelectValue placeholder='Escolha um cliente' />
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
