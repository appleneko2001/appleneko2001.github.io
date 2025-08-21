<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import "$lib/themes/theming.css";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app-layout">
	<div class="app-page-host">
		{@render children?.()}
	</div>
</div>

<style>
	.app-layout {
		background-color: var(--background-colour);
	}

	:root{
		font-family: Roboto, sans-serif;
	}

	@media screen and (width > 1000px)
	{
		.app-page-host{
			margin-left: auto;
			margin-right: auto;
			max-width: 1000px;
		}
	}
</style>