import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Search, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';

import { getCustomers } from '@/api/get-customers';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { defaultSelectOption } from '@/constants/default-select-option';
import { monthOptions } from '@/constants/month-options';
import { capitalizeWords } from '@/utils/capitalize-words';

const invoicesFiltersSchema = z.object({
	customerNumber: z.string().optional(),
	referenceMonth: z.string().optional(),
});

type InvoiceFiltersSchema = z.infer<typeof invoicesFiltersSchema>;

export function InvoiceTableFilters() {
	const { replace } = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const customerNumber = searchParams.get('customerNumber') ?? undefined;
	const referenceMonth = searchParams.get('referenceMonth') ?? undefined;

	const { handleSubmit, reset, control } = useForm<InvoiceFiltersSchema>({
		defaultValues: {
			customerNumber: customerNumber ?? defaultSelectOption.value,
			referenceMonth: referenceMonth ?? defaultSelectOption.value,
		},
	});

	const { data: customers } = useQuery({
		retry: false,
		queryKey: ['get-customers'],
		queryFn: getCustomers,
	});

	const handleFilter = (data: InvoiceFiltersSchema) => {
		const customerNumber = data.customerNumber;
		const referenceMonth = data.referenceMonth;

		const params = new URLSearchParams(searchParams);

		if (customerNumber && customerNumber !== defaultSelectOption.value) {
			params.set('customerNumber', customerNumber);
		} else {
			params.delete('customerNumber');
		}
		if (referenceMonth && referenceMonth !== defaultSelectOption.value) {
			params.set('referenceMonth', referenceMonth);
		} else {
			params.delete('referenceMonth');
		}

		params.set('page', '1');

		replace(`${pathname}?${params.toString()}`);
	};

	const handleClearFilters = () => {
		const params = new URLSearchParams(searchParams);

		params.delete('customerNumber');
		params.delete('referenceMonth');

		replace(`${pathname}?${params.toString()}`);

		reset({
			customerNumber: defaultSelectOption.value,
			referenceMonth: defaultSelectOption.value,
		});
	};

	const hasAnyFilter = !!customerNumber || !!referenceMonth;

	return (
		<form
			onSubmit={handleSubmit(handleFilter)}
			className='flex items-center gap-2'
		>
			<span className='text-sm font-semibold'>Filtros:</span>

			<Controller
				control={control}
				name='customerNumber'
				render={({ field: { name, onChange, value, disabled } }) => {
					return (
						<Select
							name={name}
							onValueChange={onChange}
							value={value}
							disabled={disabled}
						>
							<SelectTrigger className='h-8 w-fit'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={defaultSelectOption.value}>
									Todos clientes
								</SelectItem>
								{customers?.map((customer) => (
									<SelectItem
										key={customer.customerNumber}
										value={String(customer.customerNumber)}
									>
										{capitalizeWords(customer.name)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					);
				}}
			/>

			<Controller
				control={control}
				name='referenceMonth'
				render={({ field: { name, onChange, value, disabled } }) => {
					return (
						<Select
							name={name}
							onValueChange={onChange}
							value={value}
							disabled={disabled}
						>
							<SelectTrigger className='h-8 w-[180px]'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={defaultSelectOption.value}>
									Todos meses
								</SelectItem>
								{monthOptions.map((month) => (
									<SelectItem
										key={month.value}
										value={month.value}
									>
										{month.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					);
				}}
			/>

			<Button
				type='submit'
				variant='secondary'
				size='default'
			>
				<Search className='mr-2 h-4 w-4' />
				Filtrar resultados
			</Button>

			<Button
				type='button'
				variant='outline'
				size='default'
				disabled={!hasAnyFilter}
				onClick={handleClearFilters}
			>
				<X className='mr-2 h-4 w-4' />
				Remover filtros
			</Button>
		</form>
	);
}
