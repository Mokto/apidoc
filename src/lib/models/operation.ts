import type { OpenAPIV3_1 } from 'openapi-types';

export type RequestBodyExamples = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	examples: any;
	mediaType: string;
}[];

export interface Operation {
	path: string;
	method: string;
	description: string;
	summary: string;
	requestBody: {
		type: string;
		schema: OpenAPIV3_1.SchemaObject;
		examples: RequestBodyExamples;
	} | null;
	responses: {
		[statusCode: string]: {
			type: string;
			schema: OpenAPIV3_1.SchemaObject;
			example: unknown;
		};
	};
	headerParameters: OpenAPIV3_1.ParameterObject[];
	pathParameters: OpenAPIV3_1.ParameterObject[];
	queryParameters: OpenAPIV3_1.ParameterObject[];
	cookieParameters: OpenAPIV3_1.ParameterObject[];
}

export interface Webhook {
	method: string;
	description: string;
	summary: string;
	requestBody: {
		type: string;
		schema: OpenAPIV3_1.SchemaObject;
		examples: RequestBodyExamples;
	} | null;
}
