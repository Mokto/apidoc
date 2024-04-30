<script>
	import { getContext } from 'svelte';
	import { TABS } from './tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);

	$: isSelected = $selectedTab === tab;
</script>

<button
	class={`px-4 py-2 w-full text-lg font-bold border-b-2 ${
		isSelected ? 'border-b-accent-200 ' : 'border-b-transparent'
	}`}
	on:click={() => selectTab(tab)}
>
	<slot />
</button>
