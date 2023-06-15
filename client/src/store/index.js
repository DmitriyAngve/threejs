import { proxy } from "valtio";

// Set-up our state
const state = proxy({
  // intro meaning are we currently on the Home page, or are we not
  intro: true,
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "./threejs.png",
});

export default state;
