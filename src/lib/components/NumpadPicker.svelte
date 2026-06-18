<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { slide, fade } from 'svelte/transition';

	let {
		value = $bindable(),
		id,
		disabled,
		placeholder,
		allowDecimal = false
	} = $props<{
		value: number | undefined;
		id?: string;
		disabled?: boolean;
		placeholder?: string | number | undefined;
		allowDecimal?: boolean;
	}>();

	let open = $state(false);
	let displayValue = $state(value !== undefined ? value.toString() : '');

	// THE MAGIC FIX: This teleports the modal to the very top of the app,
	// escaping the drag-and-drop layout trap!
	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return {
			destroy() {
				if (node.parentNode) {
					node.parentNode.removeChild(node);
				}
			}
		};
	}

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
		class="flex h-10 w-full items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
		onclick={() => (open = true)}
	>
		{value !== undefined ? value : (placeholder ?? '')}
	</button>

	{#if open}
		<div use:portal class="fixed inset-0 z-[100] flex flex-col justify-end">
			<button
				class="absolute inset-0 bg-black/60 backdrop-blur-sm"
				onclick={() => (open = false)}
				transition:fade={{ duration: 150 }}
				aria-label="Close"
			></button>

			<div
				class="relative w-full rounded-t-3xl border-t border-border bg-background p-6 pb-12 shadow-2xl"
				transition:slide={{ duration: 250, axis: 'y' }}
			>
				<div class="mx-auto mb-6 h-1.5 w-12 rounded-full bg-muted"></div>
				<div class="mx-auto w-full max-w-sm">
					<div
						class="mb-6 flex h-20 items-center justify-center rounded-2xl bg-muted text-5xl font-bold text-foreground shadow-inner"
					>
						{displayValue || placeholder || '0'}
					</div>

					<div class="grid grid-cols-3 gap-3">
						{#each ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as key}
							<Button
								variant="secondary"
								class="h-16 rounded-2xl text-2xl font-medium shadow-sm"
								onclick={() => handlePress(key)}
							>
								{key}
							</Button>
						{/each}

						{#if allowDecimal}
							<Button
								variant="secondary"
								class="h-16 rounded-2xl text-2xl font-medium shadow-sm"
								onclick={() => handlePress('.')}>.</Button
							>
							<Button
								variant="secondary"
								class="h-16 rounded-2xl text-2xl font-medium shadow-sm"
								onclick={() => handlePress('0')}>0</Button
							>
						{:else}
							<Button
								variant="secondary"
								class="col-span-2 h-16 rounded-2xl text-2xl font-medium shadow-sm"
								onclick={() => handlePress('0')}>0</Button
							>
						{/if}

						<Button
							variant="secondary"
							class="h-16 rounded-2xl text-2xl font-medium text-destructive shadow-sm hover:bg-destructive/20"
							onclick={() => handlePress('backspace')}>⌫</Button
						>
					</div>

					<Button class="mt-8 h-14 w-full rounded-2xl text-xl font-bold shadow-md" onclick={() => (open = false)}>
						Done
					</Button>
				</div>
			</div>
		</div>
	{/if}
</div>
