<script lang="ts">
	import type { PageData } from './$types';
	import Markdown from '$lib/components/markdown/markdown.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { urlStore } from '$lib/utils/url-store';

	/** @type {import('./$types').PageData} */
	export let data: PageData;

	page.subscribe((value) => {
		if (typeof window === 'undefined') return;
		const splitted = value.url.pathname.split('/topics/');
		if (splitted.length > 1) {
			const element = document.getElementById(splitted[1]);
			if (element) {
				element.scrollIntoView();
			}
		} else {
			const element = document.getElementById('main-container');
			if (element) {
				element.scrollTo(0, 0);
			}
		}
	});

	const onScroll = (e: Event) => {
		const menuItems = document.querySelectorAll('.scrolled-item');
		const values = Array.from(menuItems).map((menuItem) => {
			const rect = menuItem.getBoundingClientRect();
			const value = rect.y + rect.height;
			if (value < 0) {
				return 10000000;
			}
			return value;
		});

		const id = menuItems[values.findIndex((y) => y === Math.min(...values))].id;

		const newPathname = id ? '/topics/' + id : '/';
		if (newPathname !== window.location.pathname) {
			window.history.pushState({}, '', window.location.origin + newPathname);
			urlStore.set(newPathname);
		}
	};

	onMount(() => {
		document.getElementById('main-container')?.addEventListener('scroll', onScroll);
		return () => document.getElementById('main-container')?.removeEventListener('scroll', onScroll);
	});
</script>

<div
	class="scrolled-item max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-12 py-12"
>
	<div>
		<h1 class="text-2xl font-bold mb-4">Introduction</h1>
		<Markdown markdown={data.description} />
		<div class="mt-4">
			This is the documentation for version {data.version} of the API.
		</div>
	</div>
	<div></div>
</div>
<hr />

{#if data.topics}
	{#each data.topics as topic, index}
		<div
			class={`scrolled-item max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-12 py-12 ${index == data.topics.length - 1 ? 'h-screen' : ''}`}
			id={topic.id}
		>
			<div class={`${!topic.example ? 'col-span-2' : ''}`}>
				<h1 class="text-2xl font-bold mb-4">{topic.title}</h1>
				<Markdown markdown={topic.content} />
			</div>
			{#if topic.example}
				<Markdown markdown={topic.example} />
			{/if}
		</div>
		{#if index < data.topics.length - 1}
			<hr />
		{/if}
	{/each}
{/if}
