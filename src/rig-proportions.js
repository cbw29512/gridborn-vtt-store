/** Race proportions applied to the full humanoid preview, preserving feet on the grid. */
import {foundationFor} from './species-foundations.mjs';
export function rigProportions(ancestry) {
  try {
    const [width,height]=foundationFor(ancestry)?.scale||[1,1];
    // Ground reference: baseline y=208. Keep character centered at x=128.
    const x=128*(1-width);
    const y=208*(1-height);
    return 'translate('+x.toFixed(2)+' '+y.toFixed(2)+') scale('+width+' '+height+')';
  } catch(error) {
    console.error('Unable to resolve humanoid body scale', {ancestry,error});
    throw error;
  }
}
