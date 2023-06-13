import { proxy } from "valtio";

// Set-up our state
const state = proxy({
  // intro meaning are we currently on the Home page, or are we not
  intro: true,
  // shirt color
  color: "#EFBD48",
  // logo shirt
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecalL: "./threejs.png",
});

export default state;
