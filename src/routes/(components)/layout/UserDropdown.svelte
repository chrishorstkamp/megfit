<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import UserIcon from 'virtual:icons/lucide/user';
	import SettingsIcon from 'virtual:icons/lucide/settings';
</script>

<DropdownMenu.Content align="start">
	<DropdownMenu.Group>
		<DropdownMenu.Item class="gap-2" href="/profile">
			<UserIcon />
			Profile
		</DropdownMenu.Item>
		<DropdownMenu.Item class="gap-2" href="/settings">
			<SettingsIcon />
			Settings
		</DropdownMenu.Item>
	</DropdownMenu.Group>
</DropdownMenu.Content>
