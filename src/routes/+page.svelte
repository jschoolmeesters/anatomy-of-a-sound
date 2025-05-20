<script lang="ts">
    import SoundGrid from '$lib/components/SoundGrid.svelte';
    import { fadeOutCover } from '$lib/layers';
    let state = 'organic';
    let showOverlay = true;

    let cover: HTMLDivElement | null = null;

    function handleClick() {
    showOverlay = false;
    if (cover) fadeOutCover(cover);
    }


</script>



<SoundGrid bind:state="{state}" />

<div bind:this={cover} on:click={handleClick} class="{!showOverlay ? 'pointer-events-none' : ''} bg-white opacity-100 absolute w-[100w] h-[100vh] inset-0 z-100">
    <img src="/src/photo/cover_content.png" alt="Overlay" class="cursor-pointer w-full h-full object-cover" />
    <div class="foil2 z-101"></div>
</div>
