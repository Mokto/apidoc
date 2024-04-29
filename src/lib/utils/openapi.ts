import type { Operation } from '$lib/models/operation';
import Oas from '../../oas/packages/oas/src';

import type { MediaTypeObject, SchemaObject, ServerObject } from 'openapi3-ts/oas31';
import type { OAS31Document } from '../../oas/packages/oas/src/types';
type Menu = MenuGroup[];
interface MenuGroup {
	title: string;
	items: {
		label: string;
		tag?: string;
		link: string;
	}[];
}

interface Topic {
	id: string;
	title: string;
	content: string;
	example: string;
}

const addToMenu = (menu: Menu, title: string, label: string, tag: string, link: string) => {
	// Find the group first and add an item to it. If the group doesn't exist, create it.
	const group = menu.find((group) => group.title === title);
	if (group) {
		group.items.push({ label, tag, link });
	} else {
		menu.push({
			title,
			items: [{ label, tag, link }]
		});
	}
};

export interface GlobalData {
	menu: Menu;
	topics: Topic[] | undefined;
	logo: string | undefined;
	description: string;
	version: string;
	servers: ServerObject[];
}

export const parseOpenAPI = async (openapi: OAS31Document) => {
	const oas = Oas.init(openapi);
	await oas.dereference();
	const menu: Menu = [];
	const topics = oas.getExtension('x-introduction-pages') as Topic[] | undefined;
	// @ts-expect-error - x-logo is not a standard OpenAPI field
	const logo = oas.getDefinition().info['x-logo']?.url;
	const description = oas.getDefinition().info.description;
	const version = oas.getDefinition().info.version;
	const servers: ServerObject[] = oas.api.servers || [];

	if (topics?.length) {
		addToMenu(menu, 'Topics', 'Introduction', 'introduction', '/');
		topics.forEach((topic) => {
			addToMenu(menu, 'Topics', topic.title, topic.id, `/topics/${topic.id}`);
		});
	} else {
		addToMenu(menu, '', 'Introduction', 'introduction', '/introduction');
	}

	const operations: { [operationId: string]: Operation } = {};

	for (const operation of Object.values(oas.getPaths())) {
		for (const method in operation) {
			const op = operation[method as OpenAPIV3_1.HttpMethods];
			if (!op.hasOperationId()) {
				continue;
			}

			let requestBody: Operation['requestBody'] = null;
			const requestBodyData = op.getRequestBody() as [string, MediaTypeObject];
			if (requestBodyData?.length) {
				requestBody = {
					type: requestBodyData[0],
					schema: requestBodyData[1].schema as SchemaObject,
					examples: op.getRequestBodyExamples()
				};
			}

			const responses: Operation['responses'] = {};
			const allResponseExamples = op.getResponseExamples();
			op.getResponseStatusCodes().forEach((statusCode) => {
				const response = op.getResponseByStatusCode(statusCode);
				if (typeof response != 'boolean') {
					for (const contentType in response.content) {
						const schema = response.content[contentType]?.schema as SchemaObject;
						responses[statusCode] = {
							type: contentType,
							schema,
							example: allResponseExamples.find((e) => e.status === statusCode)?.mediaTypes?.[
								contentType
							]?.[0]?.value
						};
					}
				} else {
					// throw new Error('Unhandled boolean response');
				}
			});

			const allParameters = op.getParameters();
			const headerParameters = allParameters?.filter((p) => p.in === 'header');
			const queryParameters = allParameters?.filter((p) => p.in === 'query');
			const pathParameters = allParameters?.filter((p) => p.in === 'path');
			const cookieParameters = allParameters?.filter((p) => p.in === 'cookie');

			operations[op.getOperationId()] = {
				description: op.getDescription(),
				summary: op.getSummary(),
				path: op.path,
				method: method,
				requestBody,
				responses,
				headerParameters,
				queryParameters,
				pathParameters,
				cookieParameters
			};

			const tags = op.getTags();
			if (!tags?.length) {
				addToMenu(menu, 'Default', op.getSummary(), method, `/operations/${op.getOperationId()}`);
			}
			tags.forEach((tag) => {
				addToMenu(menu, tag.name, op.getSummary(), method, `/operations/${op.getOperationId()}`);
			});
		}
	}
	return {
		global: {
			menu,
			topics,
			logo,
			description,
			version,
			servers
		},
		operations
	};
};
