import { getWebhook } from '$lib/utils/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const webhookId = params.page;
	const webhook = await getWebhook(webhookId);
	if (!webhook) {
		return {};
	}

	return {
		webhook,
		webhookId
	};
}
