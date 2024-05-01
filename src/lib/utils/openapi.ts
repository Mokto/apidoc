import type { Operation, Webhook } from '$lib/models/operation';
import Oas from 'oas';
import type { OAS31Document } from 'oas/types';
import type { OpenAPIV3_1 } from 'openapi-types';

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

const addToMenu = (menu: Menu, title: string, label: string, link: string) => {
	// Find the group first and add an item to it. If the group doesn't exist, create it.
	const group = menu.find((group) => group.title === title);
	if (group) {
		group.items.push({ label, link });
	} else {
		menu.push({
			title,
			items: [{ label, link }]
		});
	}
};

export interface GlobalData {
	menu: Menu;
	topics: Topic[] | undefined;
	logo: string | undefined;
	description: string;
	version: string;
	servers: OpenAPIV3_1.ServerObject[];
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
	const servers = oas.api.servers || [];

	if (topics?.length) {
		addToMenu(menu, 'Topics', 'Introduction', '/');
		topics.forEach((topic) => {
			addToMenu(menu, 'Topics', topic.title, `/topics/${topic.id}`);
		});
	} else {
		addToMenu(menu, '', 'Introduction', '/introduction');
	}

	const operations: { [operationId: string]: Operation } = {};

	for (const operation of Object.values(oas.getPaths())) {
		for (const method in operation) {
			const op = operation[method as OpenAPIV3_1.HttpMethods];
			if (!op.hasOperationId()) {
				continue;
			}

			let requestBody: Operation['requestBody'] = null;
			const requestBodyData = op.getRequestBody() as [string, OpenAPIV3_1.MediaTypeObject];
			if (requestBodyData?.length) {
				requestBody = {
					type: requestBodyData[0],
					schema: requestBodyData[1].schema as OpenAPIV3_1.SchemaObject,
					examples: op.getRequestBodyExamples()
				};
			}

			const responses: Operation['responses'] = {};
			const allResponseExamples = op.getResponseExamples();
			op.getResponseStatusCodes().forEach((statusCode) => {
				const response = op.getResponseByStatusCode(statusCode);
				if (typeof response != 'boolean') {
					for (const contentType in response.content) {
						const schema = response.content[contentType]?.schema as OpenAPIV3_1.SchemaObject;
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
				addToMenu(menu, 'Default', op.getSummary(), `/operations/${op.getOperationId()}`);
			}
			tags.forEach((tag) => {
				addToMenu(menu, tag.name, op.getSummary(), `/operations/${op.getOperationId()}`);
			});
		}
	}

	const webhooks: { [webhookId: string]: Webhook } = {};

	for (const operation of Object.values(oas.getWebhooks())) {
		for (const method in operation) {
			const op = operation[method as OpenAPIV3_1.HttpMethods];
			if (!op.hasOperationId()) {
				continue;
			}

			let requestBody: Webhook['requestBody'] = null;
			const requestBodyData = op.getRequestBody() as [string, OpenAPIV3_1.MediaTypeObject];
			if (requestBodyData?.length) {
				requestBody = {
					type: requestBodyData[0],
					schema: requestBodyData[1].schema as OpenAPIV3_1.SchemaObject,
					examples: op.getRequestBodyExamples()
				};
			}

			webhooks[op.getOperationId()] = {
				description: op.getDescription(),
				summary: op.getSummary(),
				// path: op.path,
				method: method,
				requestBody
			};

			addToMenu(menu, 'Webhooks', `${op.getOperationId()}`, `/webhooks/${op.getOperationId()}`);
		}
	}

	// const webhookKeys = Object.keys(webhooks);
	// webhookKeys.forEach((key) => {
	// 	const methodKeys = Object.keys(webhooks[key]);
	// 	methodKeys.forEach((method) => {
	// 		addToMenu(menu, 'Webhooks', `${key}`, `/webhooks/${method}_${key}`);
	// 	});
	// });

	return {
		global: {
			menu,
			topics,
			logo,
			description,
			version,
			servers
		},
		operations,
		webhooks
	};
};
