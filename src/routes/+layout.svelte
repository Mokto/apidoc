<script lang="ts">
	import MenuGroup from '$lib/menu/menu-group.svelte';
	import MenuItem from '$lib/menu/menu-item.svelte';
	import '../app.css';
	import 'highlight.js/styles/github.css';
	import '@fontsource-variable/rethink-sans';
	import '@fontsource-variable/source-code-pro';

	import type { LayoutData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { urlStore } from '$lib/utils/url-store';
	import { env } from '$env/dynamic/public';

	export let data: LayoutData;

	page.subscribe((val) => urlStore.set(val.url.pathname));
</script>

<svelte:head>
	<link rel="icon" href="https://www.ocean.io/favicon.svg" type="image/svg+xml" />
	{#if env.PUBLIC_FAVICON_SVG}
		<link rel="icon" href={env.PUBLIC_FAVICON_SVG} type="image/svg+xml" />
	{/if}
	{#if env.PUBLIC_TITLE}
		<title>{env.PUBLIC_TITLE}</title>
	{/if}
</svelte:head>

<div class="h-16 bg-apihero-200 fixed inset-x-0 sm:hidden">
	<div class="px-4">
		<select class="bg-apihero-200 h-16 w-full" on:change={(e) => goto(e.target?.value)}>
			{#each data.menu as menuGroup}
				<optgroup label={menuGroup.title}>
					{#each menuGroup.items as menuItem}
						<option value={menuItem.link}>{menuItem.label}</option>
					{/each}
				</optgroup>
			{/each}
		</select>
	</div>
</div>

<div class="flex h-screen pt-16 sm:pt-0">
	<div
		class="border-r border-apihero-200 px-4 overflow-auto pb-6 hidden sm:block w-60 min-w-60 md:w-72 md:min-w-72"
	>
		{#if data.logo}
			<img src={data.logo} alt="" class="w-full" />
		{/if}
		{#each data.menu as menuGroup}
			<MenuGroup label={menuGroup.title} />

			{#each menuGroup.items as menuItem}
				<MenuItem label={menuItem.label} href={menuItem.link} />
			{/each}
		{/each}
	</div>
	<div class="flex-1 overflow-auto" id="main-container">
		<slot />
	</div>
</div>
