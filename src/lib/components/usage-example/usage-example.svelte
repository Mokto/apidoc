<script lang="ts">
	import type { Operation } from '$lib/models/operation';
	import type { SchemaObject, ServerObject } from 'openapi3-ts/oas31';
	import CodeBlock from '../code-block/code-block.svelte';

	export let operation: Operation;
	export let servers: ServerObject[];

	$: urlSearchParams = new URLSearchParams();
	$: operation.queryParameters.map((parameter) => {
		const schema = parameter.schema as SchemaObject;
		urlSearchParams.set(parameter.name, schema?.type || 'string');
	});

	$: fullUrl = `${servers?.[0].url || ''}${operation.path}${
		urlSearchParams.size ? `?${urlSearchParams.toString()}` : ''
	}`;

	$: codeCurl = `
		curl -X ${operation.method.toUpperCase()}
	${fullUrl}
	${operation.requestBody?.type ? `-H "Content-Type: ${operation.requestBody?.type}"` : ''}
	${
		operation.requestBody?.examples[0].examples[0].value
			? `-d '${JSON.stringify(operation.requestBody?.examples[0].examples[0].value)}'`
			: ''
	}
	    `;
</script>

<CodeBlock language="bash" headerText={`Curl example`} code={codeCurl} />
