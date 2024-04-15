<script lang="ts">
	export let method: string;

	let color = '';
	$: switch (method.toUpperCase()) {
		case 'GET':
			color = 'bg-green-200 text-green-800';
			break;
		case 'POST':
			color = 'bg-accent-200 text-white';
			break;
		case 'PUT':
			color = 'bg-yellow-200 text-yellow-800';
			break;
		case 'DELETE':
			color = 'bg-red-200 text-red-800';
			break;
		default:
			color = 'bg-gray-200 text-gray-800';
			break;
	}
</script>

<div class={`inline-flex items-center justify-center py-1 px-2 rounded-md text-sm ${color}`}>
	{method.toUpperCase()}
</div>
