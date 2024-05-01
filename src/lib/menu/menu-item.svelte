<script lang="ts">
	import { page } from '$app/stores';
	import { urlStore } from '$lib/utils/url-store';

	export let href: string;
	export let label: string;

	$: pathname = $urlStore || $page.url.pathname;
	$: active = href === pathname;
</script>

<a
	class={`block py-1 px-4 text-sm rounded-md mb-1 line-clamp-2	 ${
		active
			? 'bg-accent-100/10 text-accent-200 hover:text-stripe-100 font-medium'
			: 'text-stripe-100'
	}`}
	{href}
	on:click={(event) => {
		if (
			(window.location.pathname === '/' || window.location.pathname.indexOf('/topics') === 0) &&
			(href === '/' || href.indexOf('/topics') === 0)
		) {
			if (href === '/') {
				const element = document.getElementById('main-container');
				if (element) {
					element.scrollTo(0, 0);
				}
			} else {
				const element = document.getElementById(href.split('/topics/')[1]);
				if (element) {
					element.scrollIntoView();
				}
			}
			urlStore.set(href);
			window.history.pushState({}, '', window.location.origin + href);
			event.preventDefault();
		}
	}}
>
	{label}
</a>
