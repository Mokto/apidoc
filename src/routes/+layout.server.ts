import { getGlobalData } from '$lib/utils/db';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	const globalData = await getGlobalData();

	return {
		host: request.headers.get('host'),
		...globalData
	};
};
