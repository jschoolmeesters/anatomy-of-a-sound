export const organicSounds = import.meta.glob('../sound/organic/*.mp3', {
  eager: true,
  import: 'default'
});

export const mutatedSounds = import.meta.glob('../sound/mutated/*.mp3', {
  eager: true,
  import: 'default'
});