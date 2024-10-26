<script>
    import { page } from '$app/stores'
    // import openInExternalIcon from "./../../../static/icons/open-in-external.svg?enhanced"
    const { name, category, link } = $page.data
</script>

<svelte:head>
    <title>{name} - BuildWithIt</title>
    <meta name="keywords" content="{category}, buildwithit">
</svelte:head>

<div class="container my-5">
    <img class="rounded-xl" src="/api/getMedia?id={$page.params.id}" alt="{name}">

    <article class="my-5">
        <div class="flex items-center gap-4">
            <h1 class="text-3xl font-bold">{name}</h1>
            <a href="{link}?ref=buildwithit" target="_blank">
                <img class="rounded-xl" src={"/icons/open-in-external.svg?enhanced"} alt="Open">
            </a>
            {#if $page.data["source-code"]}    
                <a href="{$page.data["source-code"]}?ref=buildwithit" target="_blank">
                    <img class="rounded-xl" src={"/icons/github.svg?enhanced"} alt="Open">
                </a>
            {/if}
        </div>
        <div class="opacity-80 flex gap-4">
            <p class="text-lg">{$page.data.category}</p>
            <p class="text-lg">{$page.data["build-with"]}</p>
        </div>
        <p class="mt-2">{$page.data.description}</p>
    </article>
</div>