<script lang="ts">
	import { load } from 'js-yaml';
	import { onMount } from 'svelte';

	let frameworks = [
		'Next.js',
		'React',
		'Vue',
		'Nuxt',
		'Svelte',
		'Astro',
		'Remix',
		'Svelte Kit',
		'Solid.JS',
		'Qwik',
	].sort();

	interface Website {
		id: string;
		name: string;
		category: string;
		url: string;
		buildWith: string;
	}

	interface ParsedSite {
		name: string;
		category: string;
		link: string;
		'build-with': string;
	}

	let websiteData: Website[] = [];
	let searchQuery = '';

	// Load data on mount
	onMount(async () => {
		await loadData();
	});

	async function loadData() {
		try {
			const response = await fetch('/api/getAllData');
			const yamlText = await response.text();
			const parsedData: Record<string, { default: string }> = load(yamlText) as Record<
				string,
				{ default: string }
			>;

			websiteData = Object.entries(parsedData).map(([key, value]) => {
				const yamlString = value.default;

				const site: ParsedSite = load(yamlString) as ParsedSite;

				return {
					id: key,
					name: site.name,
					category: site.category,
					url: site.link,
					buildWith: site['build-with']
				};
			});
			console.log(websiteData);
		} catch (error) {
			console.error('Error loading data:', error);
		}
	}
</script>

<svelte:head>
	<title>BuildWithIt</title>
	<meta name="description" content="A Web Framework Finder for exploring websites by your favorite frameworks">
</svelte:head>

<div>
	<div
		class="flex flex-col gap-2 items-center justify-center h-[55vh] relative inset-0 w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] bg-[#FCFCFC] dark:bg-black dark:text-white"
	>
		<h1 class="text-6xl font-semibold">Find Website by Framework</h1>
		<p class="opacity-80">
			A Web Framework Finder for exploring websites by your favorite frameworks
		</p>
	</div>
	<section class="dark:bg-black dark:text-white h-full min-h-[40vh]">
		<div class="container py-7">
			<input
				type="text"
				bind:value={searchQuery}
				class="border px-5 py-1.5 w-full bg-black/5 dark:border-none dark:bg-white/10 rounded-lg focus:ring-2 ring-blue-500 outline-none ring-offset-2 dark:placeholder:text-white/80"
				placeholder="Search Website Name"
			/>
			<div class="mt-2 flex flex-wrap gap-2">
				{#each frameworks as framework}
					<button
						class="border dark:border-none rounded-full px-4 py-0.5 hover:bg-black/10 dark:hover:bg-white/5"
					>
						{framework}
					</button>
				{/each}
			</div>
		</div>

		<div class="container grid grid-cols-2 gap-5 mb-10">
			{#each websiteData.filter((site) => site.name
					.toLowerCase()
					.includes(searchQuery.toLowerCase())) as site}
				<a href={`/${site.id}`}>
					<div
						class="bg-gray-100 px-4 py-5 border border-transparent hover:border-gray-300 rounded-lg hover:text-blue-500"
					>
						<img
							src={'/api/getMedia?id=' + site.id}
							alt={site.name}
							class="rounded-lg"
						/>
						<div class="flex items-center justify-between mt-2">
							<h2 class="font-medium text-lg">{site.name}</h2>
							<p class="px-3 py-0.5 border rounded-full shadow-sm text-sm">{site.buildWith.charAt(0).toUpperCase() + site.buildWith.slice(1)}</p>
						</div>
						<div class="flex items-center gap-2 opacity-80 text-sm">
							<!-- Ensure category and URL are visible -->
							<p class="hover:underline">{site.category}</p>
							&bullet;
							<p class="hover:underline">{site.url}</p>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</section>
</div>
