import { Suspense } from 'react';

import { CustomerCounter } from '@/components/dashboard/customer-counter';
import { EnergyStatsChart } from '@/components/dashboard/energy-stats-chart';
import { EnergyValuesChart } from '@/components/dashboard/energy-values-chart';
import { InvoiceCounter } from '@/components/dashboard/invoice-counter';
import { TotalEnergyCompensated } from '@/components/dashboard/total-energy-compensated';
import { TotalEnergyConsumption } from '@/components/dashboard/total-energy-consumption';
import Title from '@/components/title';

export default function Home() {
	return (
		<section className='flex flex-col gap-4 w-full'>
			<Title>Dashboard</Title>

			<div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4'>
				<InvoiceCounter />
				<CustomerCounter />
				<TotalEnergyConsumption />
				<TotalEnergyCompensated />
			</div>

			<EnergyStatsChart />
			<EnergyValuesChart />
		</section>
	);
}
