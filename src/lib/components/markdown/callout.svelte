<script lang="ts">
	export let title: string;
	export let type: 'caution' | 'check' | 'note' | 'warning';
</script>

<div class="rounded-lg overflow-hidden">
	{#if title}
		<div class="py-2.5 px-4 bg-accent-300 text-white">
			{title}
		</div>
	{/if}
	<div class="p-no-margin py-3 px-4 bg-accent-200 text-white">
		<slot />
	</div>
</div>
