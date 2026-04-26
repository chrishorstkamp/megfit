<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { slide, fade } from 'svelte/transition';
	
	let { value = $bindable(), id, disabled, placeholder, allowDecimal = false } = $props<{
		value: number | undefined;
		id?: string;
		disabled?: boolean;
		placeholder?: string | number | undefined;
		allowDecimal?: boolean;
	}>();

	let open = $state(false);
	let displayValue = $state(value !== undefined ? value.toString() : '');

	function handlePress(key: string) {
		if (key === 'backspace') {
			displayValue = displayValue.slice(0, -1);
		} else if (key === '.') {
			if (allowDecimal && !displayValue.includes('.')) {
				displayValue += displayValue === '' ? '0.' : '.';
			}
		} else {
			displayValue += key;
		}
		
		const parsed = allowDecimal ? parseFloat(displayValue) : parseInt(displayValue, 10);
		value = isNaN(parsed) ? undefined : parsed;
	}

	$effect(() => {
		if (!open) {
			displayValue = value !== undefined ? value.toString() : '';
		}
	});
</script>

<div class="relative w-full">
	<button
		{id}
		{disabled}
		type="button"
		class="flex h-10 w-full items-center justify-center rounded-md border border-input bg-background/50 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
		onclick={() => open = true}
	>
		{value !== undefined ? value : (placeholder ?? '')}
	</button>

	{#if open}
		<div class="fixed inset-0 z-50 flex flex-col justify-end">
			<button class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick={() => open = false} transition:fade={{ duration: 150 }} aria-label="Close"></button>
			
			<div class="relative w-full rounded-t-[20px] bg-background p-4 pb-12 shadow-2xl border-t" transition:slide={{ duration: 250, axis: 'y' }}>
				<div class="mx-auto w-12 h-1.5 rounded-full bg-muted mb-4"></div>
				<div class="mx-auto w-full max-w-sm">
					
					<div class="mb-4 flex items-center justify-center rounded-md bg-muted/50 h-16 text-4xl font-bold text-pink-500">
						{displayValue || placeholder || '0'}
					</div>
					
					<div class="grid grid-cols-3 gap-2">
						{#each ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as key}
							<Button variant="secondary" class="h-16 text-2xl font-semibold bg-pink-100 hover:bg-pink-200 text-pink-900 dark:bg-pink-900/30 dark:text-pink-100" onclick={() => handlePress(key)}>
								{key}
							</Button>
						{/each}
						
						{#if allowDecimal}
							<Button variant="secondary" class="h-16 text-2xl font-semibold bg-secondary" onclick={() => handlePress('.')}>.</Button>
						{:else}
							<div></div> {/if}

						<Button variant="secondary" class="h-16 text-2xl font-semibold bg-pink-100 hover:bg-pink-200 text-pink-900 dark:bg-pink-900/30 dark:text-pink-100" onclick={() => handlePress('0')}>0</Button>
						
						<Button variant="secondary" class="h-16 text-2xl font-semibold bg-secondary/50" onclick={() => handlePress('backspace')}>⌫</Button>
					</div>
					
					<Button class="w-full mt-6 h-14 text-xl font-bold bg-pink-500 hover:bg-pink-600 text-white shadow-lg" onclick={() => open = false}>
						Done
					</Button>
				</div>
			</div>
		</div>
	{/if}
</div>