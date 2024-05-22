import { CustomerCounter } from '@/components/dashboard/customer-counter';
import { InvoiceCounter } from '@/components/dashboard/invoice-counter';
import Title from '@/components/title';

export default function Home() {
	return (
		<div className='flex flex-col gap-4'>
			<Title>Dashboard</Title>

			<div className='grid grid-cols-4 gap-4'>
				<InvoiceCounter />
				<CustomerCounter />
			</div>
		</div>
	);
}
