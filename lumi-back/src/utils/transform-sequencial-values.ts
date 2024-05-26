import { formatStringToFloat } from './format-to-float';

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

		const formattedQuantity = quantity ? formatStringToFloat(quantity) : 0;
		const formattedAmount = formatStringToFloat(amount);

		switch (name) {
			case 'Energia Elétrica':
				result.energyQuantity = formattedQuantity;
				result.energyAmount = formattedAmount;
				break;
			case 'Energia SCEE s/ ICMS':
			case 'Energia SCEE ISENTA':
			case 'En comp. s/ ICMS':
				result.exemptEnergyQuantity = formattedQuantity;
				result.exemptEnergyAmount = formattedAmount;
				break;
			case 'Energia compensada GD I':
			case 'Energia injetada HFP':
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
