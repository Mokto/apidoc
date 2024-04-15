import type { SchemaObject } from 'openapi3-ts/oas31';

export const getFormattedType = (type: SchemaObject) => {
	if (!type.items) {
		const typeTitle = type.enum ? 'enum' : type.type;
		return `${type.nullable ? 'nullable ' : ''}${typeTitle}`;
	}
	const itemsType = type.items as SchemaObject;

	return `array<${itemsType.enum ? 'enum' : itemsType.type || itemsType.title}>`;
};

export const anyOfType = (schema: SchemaObject) => {
	const anyOf = schema.anyOf as SchemaObject[];
	if (anyOf.length === 2 && anyOf.find((type) => type.type === 'null')) {
		return `nullable ${getFormattedType(
			anyOf.find((type) => type.type !== 'null') as SchemaObject
		)}`;
	}
	return anyOf?.map(getFormattedType).join(' | ');
};
