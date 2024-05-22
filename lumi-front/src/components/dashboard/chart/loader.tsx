import { Loader2 } from 'lucide-react';

const Loader = () => {
	return (
		<div className='flex h-[240px] w-full items-center justify-center'>
			<Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
		</div>
	);
};

export default Loader;
