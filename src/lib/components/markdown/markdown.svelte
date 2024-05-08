<script lang="ts">
	import Markdoc from '@markdoc/markdoc';

	import MarkdocRenderer from './markdoc-renderer.svelte';
	import { markdownConfig } from './markdown-components';

	export let markdown: string | undefined;

	$: ast = markdown ? Markdoc.parse(markdown.trim()) : null;
	$: content = ast ? Markdoc.transform(ast, markdownConfig) : null;
</script>

{#if content}
	{#if typeof content == 'string' || typeof content == 'number' || typeof content == 'boolean'}
		{content}
	{:else}
		<MarkdocRenderer {content} />
	{/if}
{:else}
	{markdown}
{/if}
