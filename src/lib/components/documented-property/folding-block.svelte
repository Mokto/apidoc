<script lang="ts">
	export let label: string;
	export let disabled = false;

	let isOpen = false;
</script>

{#if disabled}
	<slot />
{:else}
	<div
		class={`rounded-3xl ${isOpen ? 'block' : 'inline-block'} border-stripe-200 border mt-4 mb-4`}
	>
		<button
			class={`px-4 py-2 border-stripe-200 text-sm text-stripe-100 hover:text-stripe-300 font-semibold flex items-center  ${
				isOpen ? 'w-full' : ''
			}`}
			on:click={() => (isOpen = !isOpen)}
		>
			<svg
				aria-hidden="true"
				width="12"
				height="12"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class={`fill-stripe-100 mr-2 ${
					isOpen ? 'transform rotate-90' : ''
				} transition-transform duration-200`}
				role="img"
				><path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M8 .25c.483 0 .875.392.875.875v6h6a.875.875 0 0 1 0 1.75h-6v6a.875.875 0 0 1-1.75 0v-6h-6a.875.875 0 1 1 0-1.75h6v-6c0-.483.392-.875.875-.875Z"
				></path></svg
			>
			{isOpen ? 'Hide' : 'Show'}
			{label} parameters
		</button>
		{#if isOpen}
			<div class="animate-fade"><slot /></div>
		{/if}
	</div>
{/if}
