<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';

	let { value = $bindable(), label = "Reps" } = $props();
	let open = $state(false);

	const options = Array.from({ length: 21 }, (_, i) => i); // 0 to 20

	function selectValue(num: number) {
		value = num;
		open = false;
	}
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger asChild let:builder>
		<Button 
			builders={[builder]} 
			variant="outline" 
			class="h-12 w-full text-lg font-bold border-2 border-primary/20 bg-card"
		>
			{value}
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="bottom" class="rounded-t-[2rem] px-6 pb-10">
		<Sheet.Header>
			<Sheet.Title class="text-center text-xl pb-4">Select {label}</Sheet.Title>
		</Sheet.Header>
		
		<div class="grid grid-cols-5 gap-3">
			{#each options as num}
				<Button 
					variant={value === num ? "default" : "secondary"}
					class="h-14 text-xl font-bold rounded-xl"
					onclick={() => selectValue(num)}
				>
					{num}
				</Button>
			{/each}
		</div>
	</Sheet.Content>
</Sheet.Root>