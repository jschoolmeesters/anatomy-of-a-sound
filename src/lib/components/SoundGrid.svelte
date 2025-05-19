<script lang="ts">
  import SoundCell from '$lib/components/SoundCell.svelte';
  import { mutatedSounds, organicSounds } from '$lib/sounds';
  export let state: string = '';
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { CustomEase } from 'gsap/CustomEase';
  import { tick } from 'svelte';
  import { switchLayer } from '$lib/layers';

    CustomEase.create("primary-ease", "0.62, 0.05, 0.01, 0.99");
    CustomEase.create("primary-ease-out", ".34, 1.56, 0.64, 1");

    let selectedVid: string | null = null;
  let currentAudio: HTMLAudioElement | null = null;
  let gridOrganic: HTMLDivElement;
  let fillOrganic: HTMLDivElement;
    let gridMutated: HTMLDivElement;
    let fillMutated: HTMLDivElement;
    let gridShell: HTMLDivElement;

  function handlePlay(src: string) {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    currentAudio = new Audio(src);
    currentAudio.play();
  }

  function setSelectedVid(sound: string) {
    selectedVid = `/src/video/${(sound as string).split('/').pop()?.replace('.mp3', '.mp4')}`
  }



  onMount(() => {
    gsap.set(gridOrganic, {
      opacity: 1,
      scale: 1,
      transformOrigin: 'center'
    });
  });

  function setToMutated() {
    state = 'mutated';
  }

    function setToOrganic() {
        state = 'organic';
    }

    function setToShell() {
        state = 'shell';
    }

  const mSounds = Object.values(mutatedSounds);
  const oSounds = Object.values(organicSounds);
</script>

<div id="shell-layer" class="h-[100vh] w-[100vw] grid grid-rows-10 overflow-hidden">
    <img src="src/photo/shell_content.png" class="{state !== 'shell' ? 'opacity-0' : 'opacity-100'} transition-opacity duration-400 absolute size-full object-cover pointer-events-none"/>

    <div class="foil1 {state !== 'shell' ? 'opacity-50' : 'opacity-100'}"></div>

    <div class="text-2xl col-span-full m-4 flex flex-row">
        <span class="grow cursor-pointer" on:click={(e) => { void switchLayer(gridMutated, gridShell, setToShell) }}>Shell Layer </span>
        <button class:hidden={state !== 'shell'} class="bg-neutral-200 px-3 h-8 rounded-lg text-base cursor-pointer" on:click={(e) => { void switchLayer(gridShell, gridMutated, setToMutated) }}>Go Back<img class="inline-block ml-0.5 h-5 mb-0.75" src="src/photo/undo_icon.svg"/></button>
    </div>
    
    <div id="mutated-layer-wrapper" class="col-span-full row-span-9">
        
        <div id="mutated-layer" class="size-full relative z-20 grid-rows-10 grid {state !== 'shell' ? 'bg-neutral-800' : ''} text-white rounded-t-lg">
            
            {#if state !== 'shell'}
                <div class="foil {state !== 'mutated' ? 'opacity-50' : 'opacity-100'}"></div>
                <div class="text-2xl col-span-full m-4 mb-8 flex flex-row">
                    <span class="cursor-pointer grow" on:click={(e) => { void switchLayer(gridOrganic, gridMutated, setToMutated) }}>Mutated Layer </span>
                    <button class:hidden={state === 'organic'} class="cursor-pointer h-8 flex-shrink-0 bg-neutral-700 px-3 rounded-lg text-base" on:click={(e) => { void switchLayer(gridMutated, gridOrganic, setToOrganic) }}>Go Back<img class="inline-block ml-0.5 h-5 mb-0.75 invert" src="src/photo/undo_icon.svg"/></button>
                </div>
            {/if}
        
                <div class:hidden={state !== 'organic'} bind:this={gridOrganic} class="opacity-0 grid grid-cols-12 grid-rows-9 gap-2 col-span-full row-span-9 overflow-hidden relative bg-black text-white rounded-t-lg p-4 z-50">
                    <div class="text-2xl col-span-full" on:click={() => state = 'organic'}>Organic Layer</div>
                    {#each oSounds as sound, i}

                        {#if [0,2,8,10].includes(i)}
                            <SoundCell 
                                clss="col-span-2 row-span-2 opacity-70 hover:opacity-100 transition-opacity duration-300" 
                                label={`Sound ${i + 1}`} 
                                src={sound as string}
                                vidSrc={`/src/video/${(sound as string).split('/').pop()?.replace('.mp3', '.mp4')}`}
                                on:playSound={() => handlePlay(sound as string)}
                                on:mouseenter={() => setSelectedVid(sound as string)}
                                on:mouseleave={() => setSelectedVid('')}
                            />
                        {:else if [1,3,9,11].includes(i)}
                            <SoundCell 
                                clss={`col-span-4 row-span-2 hover:filter-none opacity-70 hover:opacity-100 transition-opacity duration-300`} 
                                label={`Sound ${i + 1}`} 
                                src={sound as string}
                                vidSrc={`/src/video/${(sound as string).split('/').pop()?.replace('.mp3', '.mp4')}`}
                                on:playSound={() => handlePlay(sound as string)}
                                on:mouseenter={() => setSelectedVid(sound as string)}
                                on:mouseleave={() => setSelectedVid('')}
                            />
                        {:else if [4,6].includes(i)}
                            <SoundCell 
                                clss={`col-span-3 row-span-3 hover:filter-none opacity-70 hover:opacity-100 transition-opacity duration-300`} 
                                label={`Sound ${i + 1}`} 
                                src={sound as string}
                                vidSrc={`/src/video/${(sound as string).split('/').pop()?.replace('.mp3', '.mp4')}`}
                                on:playSound={() => handlePlay(sound as string)}
                                on:mouseenter={() => setSelectedVid(sound as string)}
                                on:mouseleave={() => setSelectedVid('')}
                            />
                        {:else if [5,7].includes(i)}
                            <SoundCell 
                                clss={`col-span-3 row-span-1 hover:filter-none opacity-70 hover:opacity-100 transition-opacity duration-300`} 
                                label={`Sound ${i + 1}`} 
                                src={sound as string}
                                vidSrc={`/src/video/${(sound as string).split('/').pop()?.replace('.mp3', '.mp4')}`}
                                on:playSound={() => handlePlay(sound as string)}
                                on:mouseenter={() => setSelectedVid(sound as string)}
                                on:mouseleave={() => setSelectedVid('')}
                            />
                        {:else if i!= 0}
                            <SoundCell 
                                clss={`col-span-3 row-span-2 hover:filter-none opacity-70 hover:opacity-100 transition-opacity duration-300`} 
                                label={`Sound ${i + 1}`} 
                                src={sound as string}
                                vidSrc={`/src/video/${(sound as string).split('/').pop()?.replace('.mp3', '.mp4')}`}
                                on:playSound={() => handlePlay(sound as string)}
                                on:mouseenter={() => setSelectedVid(sound as string)}
                                on:mouseleave={() => setSelectedVid('')}
                                
                            />
                        {/if}

                    {/each}
                    <div bind:this={fillOrganic} class="col-start-4 row-start-4 col-span-6 row-span-4 relative">
                        {#if selectedVid}
                            <video
                            class="absolute inset-0 w-full h-full object-cover z-100 opacity-20 blur-sm"
                            autoplay
                            muted
                            loop
                            playsinline
                            src={selectedVid}
                            />
                        {/if}
                        Raw recordings of organic sounds collected during a walk through town. We aimed to capture a wide range of frequencies and tonal qualities, spanning typical categories like hits, scratches, textures, and ambient layers. These sounds are used as the sole source material for the outer layers.
                        
                    </div>
                </div>

                <div class:hidden={state !== 'mutated'} bind:this={gridMutated} class="opacity-0 grid grid-cols-12 grid-rows-9 gap-2 col-span-full row-span-9 rounded-t-lg p-4">
                    {#each mSounds as sound, i}
                    <SoundCell 
                        clss={`col-span-3
                        ${[2, 3, 6, 7, 18, 19,14,15,20,21,22,23].includes(i) ? 'row-span-1' : ([0,1,4,5,8,9,10,11,12,13,16,17].includes(i) ? 'row-span-2' : 'row-span-2')}
                        hover:filter-none opacity-50 invert transition-opacity duration-300`} 
                        label={`Sound ${i + 1}`} 
                        src={sound as string}
                        imgSrc={`/src/photo/${(sound as string).split('/').pop()?.replace('.mp3', '').split('-')[1]}.png`}
                        on:playSound={() => handlePlay(sound as string)}
                    />
                    {/each}
                    <div bind:this={fillMutated} class="col-start-4 row-start-4 col-span-6 row-span-4">
                        These processed sounds are exclusively used for the final layer—the shell (song). Not every sample made it into the track, but even unused sounds influence the selection, character and texture of those that do, and thus also the end result. This is why I chose to include them: they are part of the process.
                    </div>
                </div>

                <div on:click={() => handlePlay('src/sound/song.mp3')} class:hidden={state !== 'shell'} bind:this={gridShell} class="opacity-0 grid grid-cols-12 grid-rows-9 gap-2 p-4 col-span-full row-span-9 rounded-t-lg">
                    <div class="col-start-4 row-start-4 col-span-6 row-span-4">
                    </div>
                </div>

        </div>
    </div>
</div>