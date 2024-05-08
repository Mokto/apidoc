<script lang="ts">
	import type { Operation } from '$lib/models/operation';
	import CodeBlock from '../code-block/code-block.svelte';

	export let operation: Operation;
</script>

<div class="mb-5">
	<CodeBlock
		language="bash"
		headerText={`Endpoints`}
		code={`${operation.method.toUpperCase()} ${operation.path}`}
	/>
</div>
