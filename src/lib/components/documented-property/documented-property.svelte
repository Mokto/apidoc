<script lang="ts">
	import FoldingBlock from './folding-block.svelte';
	import Unhandled from './unhandled.svelte';
	import Markdown from '../markdown/markdown.svelte';
	import PropertyDetails from './property-details.svelte';
	import { anyOfType, getFormattedType } from '$lib/utils/get-formatted-type';
	import type { OpenAPIV3_1 } from 'openapi-types';

	export let parameter:
		| OpenAPIV3_1.ParameterObject
		| OpenAPIV3_1.ReferenceObject
		| OpenAPIV3_1.RequestBodyObject
		| OpenAPIV3_1.SchemaObject;
	export let prefix: string = '';
	export let level = 0;
	export let helperPrefix = '';

	let parameterObject: OpenAPIV3_1.ParameterObject | undefined;
	let schemaObject: OpenAPIV3_1.SchemaObject | undefined;
	$: parameterObject =
		parameter &&
		!('items' in parameter) &&
		!('type' in parameter) &&
		!('anyOf' in parameter) &&
		!('allOf' in parameter)
			? (parameter as OpenAPIV3_1.ParameterObject)
			: undefined;
	$: schemaObject =
		parameter &&
		('items' in parameter || 'type' in parameter || 'anyOf' in parameter || 'allOf' in parameter)
			? (parameter as OpenAPIV3_1.SchemaObject)
			: undefined;
</script>

{#if parameterObject}
	{#if parameterObject.name}
		<h4>
			<span class="font-medium">{parameterObject.name}</span>
			{#if parameterObject.required}
				<span class="text-red-500 text-xs">required</span>
			{/if}
			<svelte:self
				parameter={parameterObject.schema}
				{prefix}
				level={prefix ? level + 1 : 0}
				helperPrefix={`${parameterObject.in} parameter - `}
			/>
		</h4>
	{:else}
		<Unhandled data={{ marker: '1000', parameterObject }} />
	{/if}
{:else if schemaObject}
	<div>
		{#if schemaObject.properties}
			<FoldingBlock label={schemaObject.title || ''} disabled={level == 0}>
				{#each Object.keys(schemaObject.properties) as propertyName}
					{@const property = schemaObject.properties[propertyName]}
					<div class={prefix ? 'px-4 py-4 border-t border-apihero-200' : ''}>
						<span class="font-semibold text-apihero-300"
							>{#if prefix}<span class="text-apihero-100">{prefix}</span>{/if}{propertyName}</span
						>
						<svelte:self
							parameter={property}
							prefix={`${prefix}${propertyName}.`}
							level={prefix ? level + 1 : 0}
						/>
					</div>
				{/each}
			</FoldingBlock>
		{:else if ['string', 'boolean', 'number', 'integer'].includes(schemaObject.type?.toString() || '')}
			<div class="text-xs text-apihero-100 mb-2">
				{helperPrefix}{getFormattedType(schemaObject)}
			</div>
			<div class="text-sm"><Markdown markdown={schemaObject.description} /></div>
			<PropertyDetails schema={schemaObject} />
		{:else if schemaObject.anyOf}
			<div>
				<div class="text-xs text-apihero-100 mb-2 flex">
					{anyOfType(schemaObject)}
				</div>
				<div class="text-sm">
					<Markdown markdown={schemaObject.description} />
				</div>
				{#each schemaObject.anyOf as object}
					{#if ['string', 'boolean', 'number', 'integer'].includes(object.items?.type?.toString() || object.type?.toString() || '')}
						<PropertyDetails schema={object.items || object} />
					{:else}
						<svelte:self parameter={object} {prefix} level={level + 1} />
					{/if}
				{/each}
			</div>
		{:else if schemaObject.items}
			<div class="text-xs text-apihero-100 mb-2">{getFormattedType(schemaObject)}</div>
			<div class="text-sm"><Markdown markdown={schemaObject.description} /></div>
			<svelte:self parameter={schemaObject.items} prefix={prefix + '[*].'} level={level + 1} />
		{:else if schemaObject.allOf}
			<div class="text-sm"><Markdown markdown={schemaObject.description} /></div>
			{#if schemaObject.allOf.length < 1}
				<Unhandled data={schemaObject} />
			{/if}
			{#each schemaObject.allOf as subParam}
				<svelte:self parameter={subParam} {prefix} level={level + 1} />
			{/each}
		{:else if schemaObject.type == 'object'}
			<div class="text-xs text-apihero-100 mb-2">{getFormattedType(schemaObject)}</div>
			<div class="text-sm"><Markdown markdown={schemaObject.description} /></div>
			<svelte:self
				parameter={schemaObject.additionalProperties?.items}
				prefix={`${prefix}[string].`}
				level={level + 1}
			/>
		{:else if typeof schemaObject.type == 'object' && schemaObject.type.length}
			<div class="text-xs text-apihero-100 mb-2">{schemaObject.type.join(' | ')}</div>
			<div class="text-sm"><Markdown markdown={schemaObject.description} /></div>
		{:else if schemaObject.type != 'null'}
			<Unhandled data={schemaObject} />
		{/if}
	</div>
{/if}

{#if level == 0 && prefix}
	<hr class="my-4" />
{/if}
