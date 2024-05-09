<script lang="ts">
	import Menu from '$lib/components/menu/menu.svelte';
	import '$lib';
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

{#if data?.menu}
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

	<Menu logo={data.logo} menu={data.menu}>
		<slot />
	</Menu>
{:else}
	You haven't uploaded a documentation menu yet. Please refer to the documentation to learn how to
	do so.
{/if}
