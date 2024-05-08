<script lang="ts">
	import CodeBlock from '../code-block/code-block.svelte';

	export let content: string;
	export let language: string;
</script>

<CodeBlock {language} code={content} headerText={language || 'Code'} />
