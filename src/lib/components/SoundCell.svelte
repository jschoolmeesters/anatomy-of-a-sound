<script lang="ts">
  export let label: string;
  export let src: string;
  export let clss: string = '';
  export let vidSrc: string = '';
  export let imgSrc: string = '';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function handleMouseEnter() {
    dispatch('mouseenter');
  }

  function handleMouseLeave() {
    dispatch('mouseleave');
  }
</script>

<div on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave} class="{clss} relative overflow-hidden" on:click={() => dispatch('playSound')}>
  {#if vidSrc}
    <video
      class="absolute inset-0 w-full h-full object-cover z-0"
      autoplay
      muted
      loop
      playsinline
      src={vidSrc}
    />
  {:else if imgSrc}
    <img
      class="absolute inset-0 w-full h-full object-cover z-0"
      src={imgSrc}
      alt={label}
    />
  {/if}
  
  <div class="relative z-10 inline-block invert px-2 bg-white opacity-90 backdrop-blur-sm">
    <span class="mix-blend-difference">{label}</span>
  </div>
</div>