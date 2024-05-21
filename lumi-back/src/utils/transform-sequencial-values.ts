type Result = {
	energyQuantity: number;
	energyAmount: number;
	exemptEnergyQuantity: number;
	exemptEnergyAmount: number;
	compensatedEnergyQuantity: number;
	compensatedEnergyAmount: number;
	municipalPublicLightingContribution: number;
};

export const transformValues = (
	sequencialValues: {
		[key: string]: string;
	}[]
) => {
	const result: Result = {
		energyQuantity: 0,
		energyAmount: 0,
		exemptEnergyQuantity: 0,
		exemptEnergyAmount: 0,
		compensatedEnergyQuantity: 0,
		compensatedEnergyAmount: 0,
		municipalPublicLightingContribution: 0,
	};

	for (const item of sequencialValues) {
		const { name, quantity, amount } = item;

		const formattedQuantity = quantity
			? parseFloat(quantity.replace(',', '.'))
			: 0;
		const formattedAmount = parseFloat(amount.replace(',', '.'));

		switch (name) {
			case 'Energia Elétrica':
				result.energyQuantity = formattedQuantity;
				result.energyAmount = formattedAmount;
				break;
			case 'Energia SCEE s/ ICMS':
				result.exemptEnergyQuantity = formattedQuantity;
				result.exemptEnergyAmount = formattedAmount;
				break;
			case 'Energia compensada GD I':
				result.compensatedEnergyQuantity = formattedQuantity;
				result.compensatedEnergyAmount = formattedAmount;
				break;
			case 'Contrib Ilum Publica Municipal':
				result.municipalPublicLightingContribution = formattedAmount;
				break;
			default:
				break;
		}
	}

	return result;
};