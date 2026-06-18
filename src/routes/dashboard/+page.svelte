<script lang="ts">
	import H2 from '$lib/components/ui/typography/H2.svelte';
	import H3 from '$lib/components/ui/typography/H3.svelte';
	import TodaysWorkoutCard from './(components)/TodaysWorkoutCard.svelte';

	let { data } = $props();
</script>

<H2>Hi Megan!</H2>

<H3>Today's workout</H3>
<TodaysWorkoutCard {...data} />
