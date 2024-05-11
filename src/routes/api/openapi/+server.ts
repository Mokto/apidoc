import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { prepareDatabase } from '$lib/utils/db';

export const PUT: RequestHandler = async ({ request }) => {
	const data = await request.json();

	await prepareDatabase(data);

	return json({});
};
