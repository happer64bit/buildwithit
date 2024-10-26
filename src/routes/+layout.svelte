<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/instrument-sans';
	import Navbar from '../components/Navbar.svelte';
	let { children } = $props();
</script>

<Navbar />
{@render children()}
