import { api } from '@/lib/axios';

import { Invoice } from './get-invoices';

export interface UploadInvoicesResponse {
	invoices: Array<Invoice>;
}

export async function uploadInvoices(files: FileList) {
	const formData = new FormData();
	Array.from(files).forEach((file) => {
		formData.append('invoices', file);
	});

	try {
		const response = await api.post<UploadInvoicesResponse>(
			'/invoices/upload',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);

		return response.data;
	} catch (error) {
		throw error;
	}
}
