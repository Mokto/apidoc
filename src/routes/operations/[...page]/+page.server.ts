import { getOperation } from '$lib/utils/db.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const operationId = params.page;
	const operation = await getOperation(operationId);
	if (!operation) {
		return {};
	}

	return {
		operation,
		operationId
	};
};
