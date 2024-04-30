<script lang="ts">
	import type { PageData } from './$types';
	import OperationTag from '$lib/components/tag/method-tag.svelte';
	import DocumentedProperty from '$lib/components/documented-property/documented-property.svelte';
	import Markdown from '$lib/components/markdown/markdown.svelte';
	import CodeBlock from '$lib/components/code-block/code-block.svelte';
	import UsageExample from '$lib/components/usage-example/usage-example.svelte';
	import Tabs from '$lib/components/tab/tabs.svelte';
	import Tab from '$lib/components/tab/tab.svelte';
	import TabHead from '$lib/components/tab/tab-head.svelte';
	import TabHeadItem from '$lib/components/tab/tab-head-item.svelte';

	/** @type {import('./$types').PageData} */
	export let data: PageData;
</script>

{#key data.operationId}
	{#if data.operation}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 px-12 py-12 max-w-screen-xl mx-auto">
			<div>
				<h1 class="text-2xl font-bold mb-2">{data.operation.summary}</h1>
				<div class="mb-4">
					<OperationTag method={data.operation.method} />
					{data.operation.path}
				</div>
				<Markdown markdown={data.operation.description} />
			</div>
			<UsageExample operation={data.operation} servers={data.servers} />
		</div>
		<hr />

		{#if data.operation.pathParameters?.length || data.operation.queryParameters?.length || data.operation.cookieParameters?.length || data.operation.headerParameters?.length}
			<div class="grid grid-cols-1 gap-12 px-12 py-12 max-w-screen-xl mx-auto">
				<div>
					<h2 class="text-lg font-bold mt-4 mb-2">Parameters</h2>
					{#each data.operation.pathParameters as parameter}
						<DocumentedProperty {parameter} />
					{/each}
					{#each data.operation.queryParameters as parameter}
						<DocumentedProperty {parameter} />
					{/each}
					{#each data.operation.headerParameters as parameter}
						<DocumentedProperty {parameter} />
					{/each}
					{#each data.operation.cookieParameters as parameter}
						<DocumentedProperty {parameter} />
					{/each}
				</div>
			</div>
			<hr />
		{/if}

		{#if data.operation.requestBody}
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 px-12 py-12 max-w-screen-xl mx-auto">
				<div>
					<div class="flex items-center">
						<h2 class="!my-2 text-lg font-bold mt-4 mb-2">Body</h2>
						<div class="flex-1"></div>
						<div class="text-sm">{data.operation.requestBody.type}</div>
					</div>
					<hr class="mb-4" />

					<DocumentedProperty parameter={data.operation.requestBody?.schema} />
				</div>
				{#if data.operation?.requestBody?.examples}
					<div>
						{#each data.operation?.requestBody?.examples as example}
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
		{#if data.operation.responses}
			<div class="px-12 py-12 max-w-screen-xl mx-auto">
				<Tabs>
					<TabHead>
						{#each Object.keys(data.operation.responses) as statusCode}
							<TabHeadItem>
								<div class="flex align-center items-center gap-x-1">
									<div>{statusCode}</div>
									<div
										class={`h-2 w-2 rounded-full ${statusCode == '200' || statusCode == '201' ? 'bg-green-400' : 'bg-red-400'}`}
									></div>
								</div>
							</TabHeadItem>
						{/each}
					</TabHead>
					{#each Object.keys(data.operation.responses) as statusCode}
						<Tab>
							<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
								<div>
									<div class="flex items-center">
										<h2 class="text-lg font-bold mt-4 mb-2">
											Response {statusCode}
										</h2>
										<div class="flex-1"></div>
										<div class="text-sm">{data.operation.responses[statusCode].type}</div>
									</div>

									<DocumentedProperty parameter={data.operation.responses[statusCode].schema} />
								</div>
								<div>
									<CodeBlock
										language="json"
										headerText={`Response ${statusCode}`}
										code={JSON.stringify(data.operation.responses[statusCode].example, null, 2)}
									/>
								</div>
							</div>
						</Tab>
					{/each}
				</Tabs>
			</div>
		{/if}
	{:else}
		No operation found.

		<br />
		<a href="/">Go back to home page</a>
	{/if}
{/key}
