import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

import { uploadInvoices } from '@/api/upload-invoices';
import { Button } from '@/components/ui/button';
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
	file: z.instanceof(FileList),
});

export function UploadDialog() {
	const searchParams = useSearchParams();
	const queryClient = useQueryClient();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const customerNumber = searchParams.get('customerNumber') ?? undefined;
	const referenceMonth = searchParams.get('referenceMonth') ?? undefined;

	const pageIndex = z.coerce
		.number()
		.transform((page) => page - 1)
		.parse(searchParams.get('page') ?? '1');

	const fileRef = form.register('file');

	const onSubmit = async ({ file }: z.infer<typeof formSchema>) => {
		if (file.length === 0) {
			form.setError('file', {
				type: 'required',
				message: 'Envie pelo menos uma fatura',
			});
			return;
		}

		try {
			await uploadInvoices(file);

			queryClient.invalidateQueries({
				queryKey: ['invoices', customerNumber, referenceMonth, pageIndex],
			});

			form.reset();
			toast.success('Fatura(s) cadastrada(s) com sucesso!');
		} catch (err) {
			console.error(err);
			if (err instanceof AxiosError) {
				if (err.response?.status === 409) {
					return toast.error('Erro ao registrar fatura(s)', {
						description:
							'As faturas enviadas já estão registradas em nosso sistema.',
					});
				}
			}

			toast.error('Erro ao registrar fatura(s)!');
		}
	};

	return (
		<DialogContent className='sm:max-w-[520px]'>
			<DialogHeader>
				<DialogTitle className='flex items-center gap-2'>
					Enviar fatura
					{form.formState.isSubmitting && (
						<Loader2 className='size-4 animate-spin text-muted-foreground' />
					)}
				</DialogTitle>
			</DialogHeader>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full'
				>
					<FormField
						control={form.control}
						name='file'
						render={({ field }) => {
							return (
								<FormItem>
									<FormControl>
										<Input
											{...fileRef}
											type='file'
											placeholder='Envie aqui a(s) fatura(s)'
											className='cursor-pointer'
											accept='.pdf'
											multiple
										/>
									</FormControl>
									<FormMessage className='text-red-500' />
								</FormItem>
							);
						}}
					/>
					<Button
						className='mt-4 w-full'
						disabled={form.formState.isSubmitting}
					>
						Enviar fatura(s)
					</Button>
				</form>
			</Form>
		</DialogContent>
	);
}
