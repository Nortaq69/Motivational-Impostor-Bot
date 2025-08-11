// utils/soundEngine.js

const SFX = {
  hover: '/assets/sound/hover.mp3',
  press: '/assets/sound/press.mp3',
  success: '/assets/sound/success.mp3',
  error: '/assets/sound/error.mp3',
  tab: '/assets/sound/tab.mp3',
  modal: '/assets/sound/modal.mp3',
};
let ambienceAudio = null;
let volume = 0.5;

export function playSFX(name) {
  if (!SFX[name]) return;
  const audio = new Audio(SFX[name]);
  audio.volume = volume;
  audio.play();
}

export function playAmbience(src) {
  if (ambienceAudio) { ambienceAudio.pause(); ambienceAudio = null; }
  ambienceAudio = new Audio(src);
  ambienceAudio.loop = true;
  ambienceAudio.volume = volume * 0.3;
  ambienceAudio.play();
}

export function setVolume(v) {
  volume = Math.max(0, Math.min(1, v));
  if (ambienceAudio) ambienceAudio.volume = volume * 0.3;
}
