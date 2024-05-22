import { TooltipProps } from 'recharts';

export const CustomTooltip = ({
	active,
	payload,
	label,
}: TooltipProps<number, number>) => {
	if (active && payload && payload.length) {
		return (
			<div className='flex flex-col gap-1 rounded-l border bg-card p-2 text-sm text-card-foreground shadow-sm items-center'>
				<span className='font-semibold'>Mês: {label}</span>
				{payload.map((item) => (
					<div key={item.name}>
						<span className='font-semibold'>
							{item.dataKey === 'consumedEnergyValue'
								? 'Consumido'
								: 'Compensado'}
						</span>
						<span> | </span>
						<span className='font-semibold'>
							{item.value?.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							})}
						</span>
					</div>
				))}
			</div>
		);
	}

	return null;
};
