<script lang="ts">
	import { CodeBlock } from 'svhighlight';

	export let content: string;
	export let code: string;
	export let language: string;
	export let headerText: string | undefined = undefined;

	// $: console.log('content', content);

	$: computedCode = content || code;
	$: header = headerText || language;
</script>

{#key computedCode}
	<CodeBlock
		{language}
		background="!text-black bg-slate-100"
		headerClasses="bg-accent-200 text-white"
		headerText={header}
		code={computedCode}
		showHeader={!!header}
		showLineNumbers={false}
	/>
{/key}

<!-- <span class="hidden" bind:this={data}><slot></slot></span> -->
