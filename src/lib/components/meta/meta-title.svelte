<script lang="ts">
	import { env } from '$env/dynamic/public';

	export let title;
</script>

<svelte:head>
	{#if env.PUBLIC_TITLE}
		<title>{title} - {env.PUBLIC_TITLE}</title>
	{:else}
		<title>{title}</title>
	{/if}
</svelte:head>
