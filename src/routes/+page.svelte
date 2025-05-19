<script lang="ts">
    import SoundGrid from '$lib/components/SoundGrid.svelte';
    let state = 'organic';
    let showOverlay = true;
</script>


<SoundGrid bind:state="{state}" />

<div on:click={() => showOverlay = false} class="hidden bg-white opacity-100 absolute w-[100w] h-[100vh] inset-0 z-100">
    <img src="/src/photo/cover_content.png" alt="Overlay" class="w-full h-full object-cover" />
    <div class="foil2"></div>
</div>
