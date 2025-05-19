// src/lib/switchLayer.ts
import gsap from 'gsap';
import { tick } from 'svelte';
import { CustomEase } from 'gsap/CustomEase';

let transitionOffset = 1100;
let staggerDefault = 0.07;
let durationDefault = 1.47;
let durationDefaultFaster = 1.2;
let durationDefaultFastest = 0.9;
let durationDefaultUltraFast = 0.6;
let durationDefaultCrazyFast = 0.3;

CustomEase.create("primary-ease", "0.62, 0.05, 0.01, 0.99");
CustomEase.create("primary-ease-out", ".34, 1.56, 0.64, 1");

export async function switchLayer(
  fromEl: HTMLElement,
  toEl: HTMLElement,
  updateState: () => void,
  ease: string = 'primary-ease-out',
  duration: number = 0.4
) {
  // Animate out
  await gsap.to(fromEl, {
    opacity: 0,
    scale: 0.97,
    yPercent: 5,
    duration: 0.2,
    ease
  });

  // Trigger state switch (e.g. to show toEl)
  updateState();
  await tick();

  // Prepare toEl
  gsap.set(toEl, {
    opacity: 0,
    scale: 0.95
  });

  // Animate in
  await gsap.to(toEl, {
    opacity: 1,
    scale: 1,
    duration,
    ease
  });

  gsap.set(fromEl, {
    scale: 1,
    yPercent: 0,
  });
}
