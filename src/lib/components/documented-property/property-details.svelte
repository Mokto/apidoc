<script lang="ts">
	import Tag from '../tag/tag.svelte';
	import type { OpenAPIV3_1 } from 'openapi-types';

	export let schema: OpenAPIV3_1.SchemaObject;

	let schemaAdditionalKeys = Object.keys(schema).filter(
		(key) =>
			!['type', 'title', 'description', 'examples', 'example', 'default', 'nullable'].includes(key)
	);

	$: shouldBeDisplayed =
		schema.default ||
		(schema.type?.toString() === 'string' && schemaAdditionalKeys.length > 0) ||
		((schema.type?.toString() === 'integer' || schema.type?.toString() === 'number') &&
			(schema.minimum || schema.maximum || schema.exclusiveMinimum || schema.exclusiveMaximum)) ||
		(schema.type?.toString() === 'boolean' && schemaAdditionalKeys.length > 0);
</script>

{#if shouldBeDisplayed}
	<div class="mt-2 space-x-1">
		{#if schema.type?.toString() === 'integer' || schema.type?.toString() === 'number'}
			{#if schema.minimum}
				<Tag>{'>='} {schema.minimum}</Tag>
			{/if}
			{#if schema.maximum}
				<Tag>{'<='} {schema.maximum}</Tag>
			{/if}
			{#if schema.exclusiveMinimum}
				<Tag>{'>'} {schema.exclusiveMinimum}</Tag>
			{/if}
			{#if schema.exclusiveMaximum}
				<Tag>{'<'} {schema.exclusiveMaximum}</Tag>
			{/if}
		{:else if schema.enum}
			{#each schema.enum as enumValue}
				<Tag>
					{enumValue}
				</Tag>
			{/each}
		{:else if schema.type?.toString() === 'string'}
			{#if schema.format}
				<Tag>
					Format length: {schema.format}
				</Tag>
			{/if}
			{#if schema.minLength}
				<Tag>
					Min length: {schema.minLength}
				</Tag>
			{/if}
			{#if schema.maxLength}
				<Tag>
					Max length: {schema.maxLength}
				</Tag>
			{/if}
			{#if schema.pattern}
				<Tag>
					Pattern: {schema.pattern}
				</Tag>
			{/if}
		{:else}
			<div class="bg-red-500 my-4 rounded-md p-2">
				{JSON.stringify(schema)}
			</div>
		{/if}
		{#if typeof schema.default !== 'undefined'}
			<Tag>Default: {schema.default}</Tag>
		{/if}
	</div>
{/if}
