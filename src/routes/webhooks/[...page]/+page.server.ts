import { getWebhook } from '$lib/utils/db.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const webhookId = params.page;
	const webhook = await getWebhook(webhookId);
	if (!webhook) {
		return {};
	}

	return {
		webhook,
		webhookId
	};
};
