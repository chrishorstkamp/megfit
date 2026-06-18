<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';
	import '../app.pcss';
	import DesktopLayout from './(components)/layout/DesktopLayout.svelte';
	import MobileLayout from './(components)/layout/MobileLayout.svelte';
	import UpdateDataLossDialog from './(components)/layout/UpdateDataLossDialog.svelte';
	import TermsOfServiceDialog from '$lib/components/TermsOfServiceDialog.svelte';

	import { overrideItemIdKeyNameBeforeInitialisingDndZones } from 'svelte-dnd-action';
	overrideItemIdKeyNameBeforeInitialisingDndZones('name');

	const { children } = $props();
	let isMobile: undefined | boolean = $state(undefined);

	onMount(() => {
		isMobile = window.innerWidth < 1024;
		window.addEventListener('resize', () => {
			isMobile = window.innerWidth < 1024;
		});
	});
</script>

<ModeWatcher />
<Toaster />

<UpdateDataLossDialog />
<TermsOfServiceDialog />

{#if isMobile === true}
	<MobileLayout>{@render children()}</MobileLayout>
{:else if isMobile === false}
	<DesktopLayout>{@render children()}</DesktopLayout>
{/if}
