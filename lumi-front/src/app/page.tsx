import { CustomerCounter } from '@/components/dashboard/customer-counter';
import { InvoiceCounter } from '@/components/dashboard/invoice-counter';
import { TotalEnergyCompensated } from '@/components/dashboard/total-energy-compensated';
import { TotalEnergyConsumption } from '@/components/dashboard/total-energy-consumption';
import Title from '@/components/title';

export default function Home() {
	return (
		<section className='flex flex-col gap-4 w-full'>
			<Title>Dashboard</Title>

			<div className='grid grid-cols-4 gap-4'>
				<InvoiceCounter />
				<CustomerCounter />
				<TotalEnergyConsumption />
				<TotalEnergyCompensated />
			</div>
		</section>
	);
}
