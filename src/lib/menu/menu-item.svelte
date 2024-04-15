<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
	export let label: string;

	$: active = href === $page.url.pathname + ($page.url.hash ? `${$page.url.hash}` : '');
</script>

<a
	class={`block py-1 px-4 text-sm rounded-md mb-1 ${
		active
			? 'bg-accent-100/10 text-accent-200 hover:text-stripe-100 font-medium'
			: 'text-stripe-100'
	}`}
	{href}
>
	{label}
</a>
