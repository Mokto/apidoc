import { getGlobalData } from '$lib/utils/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ request }) {
	const globalData = await getGlobalData();

	return {
		host: request.headers.get('host'),
		...globalData
	};
}
