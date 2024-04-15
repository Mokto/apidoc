<script lang="ts">
	import MenuGroup from './menu-group.svelte';
	import MenuItem from './menu-item.svelte';
	import type { Menu } from './menu-type';

	export let logo: string = '';
	export let menu: Menu;
</script>

<div class="flex h-screen pt-16 sm:pt-0">
	<div
		class="border-r border-apihero-200 px-4 overflow-auto pb-6 hidden sm:block w-60 min-w-60 md:w-72 md:min-w-72"
	>
		{#if logo}
			<img src={logo} alt="" class="w-full" />
		{/if}
		{#each menu as menuGroup}
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
