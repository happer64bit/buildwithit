<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/instrument-sans';
	import Navbar from '../components/Navbar.svelte';
	import Analytics from '../components/Analytics.svelte';

	let { children } = $props();
</script>

<Analytics />
<Navbar />
{@render children()}
