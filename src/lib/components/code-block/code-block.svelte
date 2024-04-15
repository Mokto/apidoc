<script lang="ts">
	import { CodeBlock } from 'svhighlight';

	export let code: string;
	export let language: string;
	export let headerText: string | undefined = undefined;
</script>

{#key code}
	<CodeBlock
		{language}
		background="!text-black bg-slate-100"
		headerClasses="bg-accent-200 text-white"
		{headerText}
		{code}
		showHeader={!!headerText}
		showLineNumbers={false}
	/>
{/key}
