<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import H2 from '$lib/components/ui/typography/H2.svelte';
	import H3 from '$lib/components/ui/typography/H3.svelte';
	import type { RouterOutputs } from '$lib/trpc/router';
	import { onMount } from 'svelte';
	import ExternalLinkIcon from 'virtual:icons/lucide/external-link';
	import GetStartedComponent from './(components)/GetStartedComponent.svelte';
	import TodaysWorkoutCard from './(components)/TodaysWorkoutCard.svelte';

	let { data } = $props();
	let entityCounts: RouterOutputs['users']['getEntityCounts'] | undefined = $state(undefined);
	let dismissDiscord = $state(false);
	let dismissDomainMove = $state(false);

	onMount(async () => {
		if (data.entityCounts === undefined) {
			entityCounts = null;
			return;
		}
		entityCounts = await data.entityCounts;
	});

	$effect(() => {
		if (typeof window === 'undefined') return;
		dismissDiscord = Boolean(window.localStorage.getItem('discord-dismiss'));
		dismissDomainMove = Boolean(window.localStorage.getItem('domain-move-dismiss'));
	});
</script>

<H2>Hi Megan!</H2>


<H3>Today's workout</H3>
<TodaysWorkoutCard {...data} />



