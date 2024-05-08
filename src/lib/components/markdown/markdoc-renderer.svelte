<script lang="ts">
	import type { RenderableTreeNode } from '@markdoc/markdoc';
	import { components } from './markdown-components';

	export let content: RenderableTreeNode;
</script>

{#if content}
	{#if typeof content == 'string' || typeof content == 'boolean' || typeof content == 'number'}
		{content}
	{:else if content.children}
		{#each content.children as child}
			{#if typeof child === 'string'}
				{child}
			{:else if child && child.name in components}
				<div class="mb-4">
					<svelte:component this={components[child.name]} {...child.attributes}>
						<svelte:self content={child} />
					</svelte:component>
				</div>
			{:else}
				<svelte:element this={child.name} {...child.attributes}>
					<svelte:self content={child} />
				</svelte:element>
			{/if}
		{/each}
	{/if}
{/if}
