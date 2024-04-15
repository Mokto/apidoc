<script lang="ts">
	import MenuGroup from '$lib/menu/menu-group.svelte';
	import MenuItem from '$lib/menu/menu-item.svelte';
	import '../app.css';
	import 'highlight.js/styles/github.css';
	import '@fontsource-variable/open-sans';

	import type { PageData } from './$types';

	/** @type {import('./$types').LayoutData} */
	export let data: PageData;
</script>

<div class="flex h-screen">
	<div class="w-80 min-w-80 border-r border-stripe-200 px-4 overflow-auto pb-6">
		{#if data.logo}
			<img src={data.logo} alt="" class="w-full" />
		{/if}
		{#if data.topics}
			<MenuGroup label="Topics" />
			<MenuItem label="Introduction" href="/" />
			{#each data.topics as topic}
				<MenuItem label={topic.title} href={`/#${topic.id}`} />
			{/each}
		{:else}
			<div class="mt-4"></div>
			<MenuItem label="Introduction" href="/" />
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
