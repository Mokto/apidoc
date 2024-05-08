<script lang="ts">
	import './code-block.css';
	import { CodeBlock } from 'svhighlight';

	export let code: string;
	export let language: string;
	export let headerText: string | undefined = undefined;

	$: header = headerText || language;
</script>

{#key code}
	<CodeBlock
		{language}
		background="!text-tinted-grey-900 bg-white border border-tinted-grey-200"
		headerClasses="text-tinted-grey-900 bg-tinted-grey-50 border-b border-tinted-grey-200 font-medium fill-tinted-grey-900"
		headerText={header}
		{code}
		showHeader={!!header}
		showLineNumbers={false}
	/>
{/key}
