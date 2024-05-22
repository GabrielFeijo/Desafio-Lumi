import { LegendProps } from 'recharts';

export const CustomLegend = (props: LegendProps) => {
	const { payload } = props;
	if (payload && payload.length) {
		return (
			<div className='flex justify-center'>
				{payload?.map((entry, index) => (
					<div
						key={`item-${index}`}
						className='flex items-center mx-2'
					>
						<div
							style={{
								backgroundColor: entry.color,
								width: 10,
								height: 10,
								borderRadius: '50%',
								marginRight: 5,
							}}
						></div>
						<span>
							{entry.value === 'consumedEnergyValue'
								? 'Valor Consumido'
								: 'Valor Compensado'}
						</span>
					</div>
				))}
			</div>
		);
	}

	return null;
};
