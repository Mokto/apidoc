<script lang="ts">
	import type { PageData } from './$types';
	import MethodTag from '$lib/components/tag/method-tag.svelte';
	import DocumentedProperty from '$lib/components/documented-property/documented-property.svelte';
	import Markdown from '$lib/components/markdown/markdown.svelte';
	import CodeBlock from '$lib/components/code-block/code-block.svelte';

	export let data: PageData;
</script>

{#key data.webhookId}
	{#if data.webhook}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 px-12 py-12 max-w-screen-xl mx-auto">
			<div>
				<h1 class="text-2xl font-bold mb-2">{data.webhook.summary}</h1>
				<div class="mb-4">
					<MethodTag method={data.webhook.method} />
				</div>
				<Markdown markdown={data.webhook.description} />
			</div>
		</div>
		<hr />

		{#if data.webhook.requestBody}
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 px-12 py-12 max-w-screen-xl mx-auto">
				<div>
					<div class="flex items-center">
						<h2 class="!my-2 text-lg font-bold mt-4 mb-2">Body</h2>
						<div class="flex-1"></div>
						<div class="text-sm">{data.webhook.requestBody.type}</div>
					</div>
					<hr class="mb-4" />

					<DocumentedProperty parameter={data.webhook.requestBody?.schema} />
				</div>
				{#if data.webhook?.requestBody?.examples}
					<div>
						{#each data.webhook?.requestBody?.examples as example}
							<CodeBlock
								language="json"
								headerText={`Request example: ${example.mediaType}`}
								code={JSON.stringify(example.examples[0].value, null, 2)}
							/>
						{/each}
					</div>
				{/if}
			</div>
			<hr />
		{/if}
	{:else}
		No webhook found.

		<br />
		<a href="/">Go back to home page</a>
	{/if}
{/key}
