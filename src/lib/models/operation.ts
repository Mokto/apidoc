import type { SchemaObject, ParameterObject } from 'openapi3-ts/oas31';

type RequestBodyExamples = {
	examples: { value: string }[];
	mediaType: string;
}[];
export interface Operation {
	path: string;
	method: string;
	description: string;
	summary: string;
	requestBody: {
		type: string;
		schema: SchemaObject;
		examples: RequestBodyExamples;
	} | null;
	responses: {
		[statusCode: string]: {
			type: string;
			schema: SchemaObject;
			example: unknown;
		};
	};
	headerParameters: ParameterObject[];
	pathParameters: ParameterObject[];
	queryParameters: ParameterObject[];
	cookieParameters: ParameterObject[];
}
