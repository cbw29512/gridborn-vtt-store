/** Original male Dwarf Songweaver: genuine compact lute with thumb-strum and standalone rune soundwave. */
export const DWARF_BARD_STATES=Object.freeze(['idle','move','attack','rest']);
const MOTIONS=Object.freeze({
 "idle": ".dwarf-bard-core{animation:dwarf-bard-sway 3.2s steps(1,end) infinite}.dwarf-bard-strum-hand{transform-origin:146px 159px;animation:dwarf-bard-light-pick 3.2s steps(1,end) infinite}\n@keyframes dwarf-bard-sway{0%,85%,100%{transform:translate(0,0)}26%{transform:translate(-2px,-2px)}56%{transform:translate(1px,0)}}\n@keyframes dwarf-bard-light-pick{0%,85%,100%{transform:rotate(0)}26%{transform:rotate(8deg)}45%{transform:rotate(-7deg)}56%{transform:rotate(4deg)}}",
 "move": ".dwarf-bard-core{animation:dwarf-bard-march 1.2s steps(1,end) infinite}.dwarf-bard-left-leg{transform-origin:111px 172px;animation:dwarf-bard-left-step 1.2s steps(1,end) infinite}.dwarf-bard-right-leg{transform-origin:148px 172px;animation:dwarf-bard-right-step 1.2s steps(1,end) infinite}\n@keyframes dwarf-bard-march{0%,84%,100%{transform:translate(0,0)}27%{transform:translate(-4px,-2px)}58%{transform:translate(4px,-1px)}}\n@keyframes dwarf-bard-left-step{0%,84%,100%{transform:rotate(0)}27%{transform:rotate(-10deg)}58%{transform:rotate(12deg)}}\n@keyframes dwarf-bard-right-step{0%,84%,100%{transform:rotate(0)}27%{transform:rotate(12deg)}58%{transform:rotate(-10deg)}}",
 "attack": ".dwarf-bard-core{animation:dwarf-bard-performance-plant 1.4s steps(1,end) 1 both}.dwarf-bard-strum-hand{transform-origin:146px 159px;animation:dwarf-bard-heavy-strum 1.4s steps(1,end) 1 both}.dwarf-bard-strings{animation:dwarf-bard-string-shiver 1.4s steps(1,end) 1 both}.dwarf-bard-rune{animation:dwarf-bard-chord-launch 1.4s linear 1 both}\n@keyframes dwarf-bard-performance-plant{0%,100%{transform:translate(0,0)}23%{transform:translate(-2px,-2px)}55%{transform:translate(2px,-1px)}78%{transform:translate(0,0)}}\n@keyframes dwarf-bard-heavy-strum{0%,100%{transform:rotate(0)}21%{transform:rotate(-18deg)}38%{transform:rotate(23deg)}56%{transform:rotate(-15deg)}66%{transform:rotate(5deg)}}\n@keyframes dwarf-bard-string-shiver{0%,100%{opacity:.95}25%{opacity:1}42%{opacity:.4}58%{opacity:1}65%{opacity:.55}}\n@keyframes dwarf-bard-chord-launch{0%,28%{opacity:0;transform:translate(0,0)}39%{opacity:.7;transform:translate(0,0)}55%{opacity:1;transform:translate(3px,-1px)}65%{opacity:1;transform:translate(7px,-2px)}75%,100%{opacity:0;transform:translate(7px,-2px)}}",
 "rest": ".dwarf-bard-core{animation:dwarf-bard-rest 4s steps(1,end) infinite}.dwarf-bard-lute{transform-origin:151px 158px;animation:dwarf-bard-instrument-down 4s steps(1,end) infinite}\n@keyframes dwarf-bard-rest{0%,85%,100%{transform:translateY(10px)}50%{transform:translateY(12px)}}\n@keyframes dwarf-bard-instrument-down{0%,85%,100%{transform:rotate(-9deg)}50%{transform:rotate(-11deg)}}"
});
const REDUCED='@media(prefers-reduced-motion:reduce){.dwarf-bard-core,.dwarf-bard-strum-hand,.dwarf-bard-left-leg,.dwarf-bard-right-leg,.dwarf-bard-strings,.dwarf-bard-rune,.dwarf-bard-lute{animation:none!important}}';
export function renderDwarfBard(mode,art){
 try{
  if(!DWARF_BARD_STATES.includes(mode))throw new Error('Unsupported Dwarf Songweaver state: '+mode);
  if(typeof art!=='string'||!art.includes('data-instrument="dwarf-eight-course-lute"')||
    !art.includes('data-instrument-action="thumb-strum"')||!art.includes('data-spell-effect="stonehall-chord"')||!art.endsWith('</svg>\n'))
   throw new Error('Dwarf Songweaver source or physical lute grip changed');
  return art.replace('<svg xmlns=','<svg data-gridborn-mode="'+mode+'" xmlns=')
   .replace('</title>',' — '+mode+' source animation study</title>')
   .replace('</desc>','</desc>\n<style>\n'+MOTIONS[mode]+'\n'+REDUCED+'\n</style>');
 }catch(error){console.error('Dwarf Songweaver source generation failed',mode,error);throw error;}
}
