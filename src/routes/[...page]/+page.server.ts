import type { Operation } from '$lib/models/operation.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, parent }) {
	const data = await parent();

	const operationId = params.page.split('/').pop();
	if (!operationId) {
		return {
			isHomepage: true
		};
	}
	const operation: Operation = data.operations[operationId];
	if (!operation) {
		return {};
	}

	return {
		operation
	};
}
