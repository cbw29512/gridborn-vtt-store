/** Race proportions applied to the full humanoid preview, preserving feet on the grid. */
const BODY_SCALES=Object.freeze({
  Gnome:[0.80,0.80],Halfling:[0.84,0.84],Goblin:[0.85,0.85],
  Dwarf:[1.05,0.88]
});
export function rigProportions(ancestry) {
  try {
    const [width,height]=BODY_SCALES[ancestry]||[1,1];
    // Ground reference: baseline y=208. Keep character centered at x=128.
    const x=128*(1-width);
    const y=208*(1-height);
    return 'translate('+x.toFixed(2)+' '+y.toFixed(2)+') scale('+width+' '+height+')';
  } catch(error) {
    console.error('Unable to resolve humanoid body scale', {ancestry,error});
    throw error;
  }
}
