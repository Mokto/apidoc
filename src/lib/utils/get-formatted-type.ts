import type { OpenAPIV3_1, OpenAPIV3 } from 'openapi-types';

export const getFormattedType = (type: OpenAPIV3_1.SchemaObject) => {
	const typeAsArrayType = type as OpenAPIV3_1.ArraySchemaObject;
	if (!typeAsArrayType.items) {
		const typeTitle = type.enum ? 'enum' : type.type;
		return `${(type as OpenAPIV3.SchemaObject).nullable ? 'nullable ' : ''}${typeTitle}`;
	}
	const itemsType = typeAsArrayType.items as OpenAPIV3_1.SchemaObject;

	return `array<${itemsType.enum ? 'enum' : itemsType.type || itemsType.title}>`;
};

export const anyOfType = (schema: OpenAPIV3_1.SchemaObject) => {
	const anyOf = schema.anyOf as OpenAPIV3_1.SchemaObject[];
	if (anyOf.length === 2 && anyOf.find((type) => type.type === 'null')) {
		return `nullable ${getFormattedType(
			anyOf.find((type) => type.type !== 'null') as OpenAPIV3_1.SchemaObject
		)}`;
	}
	return anyOf?.map(getFormattedType).join(' | ');
};
