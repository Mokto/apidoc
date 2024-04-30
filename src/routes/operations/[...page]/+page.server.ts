import { getOperation } from '$lib/utils/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const operationId = params.page;
	const operation = await getOperation(operationId);
	if (!operation) {
		return {};
	}

	return {
		operation,
		operationId
	};
}
