<script lang="ts">
	import { page } from '$app/stores';
	import { urlStore } from '$lib/utils/url-store';

	export let href: string;
	export let label: string;

	$: pathname = $urlStore || $page.url.pathname;
	$: active = href === pathname;
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
