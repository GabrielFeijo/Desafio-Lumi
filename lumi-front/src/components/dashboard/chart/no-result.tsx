import { ComponentPropsWithRef } from 'react';

import { Button } from '@/components/ui/button';

interface NoResultProps extends ComponentPropsWithRef<'button'> {
	text: string;
}

const NoResult = ({ text, ...props }: NoResultProps) => {
	return (
		<div className='flex h-[240px] w-full flex-col items-center justify-center gap-0.5'>
			<span className='text-sm text-muted-foreground'>{text}</span>
			<Button
				variant='link'
				size='default'
				className='text-emerald-500 dark:text-emerald-400'
				{...props}
			>
				Recarregar gráfico
			</Button>
		</div>
	);
};

export default NoResult;
