let backgroundMusic = null;

if (typeof window !== 'undefined') {
  backgroundMusic = new Audio('./assets/music/background.mp3');
}
export { backgroundMusic };
