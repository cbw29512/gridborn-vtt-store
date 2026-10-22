/** Original nonbinary Elf court performer, with actual long-neck archlute pluck and notation magic. */
export const COURT_BARD_STATES=Object.freeze(['idle','move','attack','rest']);
const MOTIONS=Object.freeze({
 "idle": ".court-core{animation:court-poise 3.2s steps(1,end) infinite}.court-plucking-hand{transform-origin:145px 158px;animation:court-gentle-arpeggio 3.2s steps(1,end) infinite}\n@keyframes court-poise{0%,85%,100%{transform:translate(0,0)}30%{transform:translate(-1px,-2px)}61%{transform:translate(1px,0)}}\n@keyframes court-gentle-arpeggio{0%,85%,100%{transform:rotate(0)}25%{transform:rotate(7deg)}44%{transform:rotate(-5deg)}61%{transform:rotate(3deg)}}",
 "move": ".court-core{animation:court-step 1.2s steps(1,end) infinite}.court-left-leg{transform-origin:116px 169px;animation:court-left-step 1.2s steps(1,end) infinite}.court-right-leg{transform-origin:147px 169px;animation:court-right-step 1.2s steps(1,end) infinite}\n@keyframes court-step{0%,84%,100%{transform:translate(0,0)}27%{transform:translate(-3px,-2px)}56%{transform:translate(4px,-1px)}}\n@keyframes court-left-step{0%,84%,100%{transform:rotate(0)}27%{transform:rotate(-11deg)}56%{transform:rotate(13deg)}}\n@keyframes court-right-step{0%,84%,100%{transform:rotate(0)}27%{transform:rotate(12deg)}56%{transform:rotate(-11deg)}}",
 "attack": ".court-core{animation:court-performance-stance 1.4s steps(1,end) 1 both}.court-plucking-hand{transform-origin:144px 157px;animation:court-arpeggio-strike 1.4s steps(1,end) 1 both}.court-strings{animation:court-notes-resonate 1.4s steps(1,end) 1 both}.court-notation{animation:court-melodic-cast 1.4s linear 1 both}\n@keyframes court-performance-stance{0%,100%{transform:translate(0,0)}24%{transform:translate(-1px,-2px)}55%{transform:translate(1px,-3px)}78%{transform:translate(0,0)}}\n@keyframes court-arpeggio-strike{0%,100%{transform:rotate(0)}21%{transform:rotate(-12deg)}35%{transform:rotate(18deg)}49%{transform:rotate(-9deg)}61%{transform:rotate(11deg)}}\n@keyframes court-notes-resonate{0%,100%{opacity:.9}30%{opacity:1}43%{opacity:.5}60%{opacity:1}}\n@keyframes court-melodic-cast{0%,31%{opacity:0;transform:translate(0,0)}41%{opacity:.7;transform:translate(0,0)}54%{opacity:1;transform:translate(1px,-1px)}67%{opacity:1;transform:translate(4px,-3px)}75%,100%{opacity:0;transform:translate(4px,-3px)}}",
 "rest": ".court-core{animation:court-calm-rest 4s steps(1,end) infinite}.court-archlute{transform-origin:150px 159px;animation:court-lute-lower 4s steps(1,end) infinite}\n@keyframes court-calm-rest{0%,85%,100%{transform:translateY(8px)}51%{transform:translateY(9px)}}\n@keyframes court-lute-lower{0%,85%,100%{transform:rotate(-7deg)}51%{transform:rotate(-8deg)}}"
});
const REDUCED='@media(prefers-reduced-motion:reduce){.court-core,.court-plucking-hand,.court-left-leg,.court-right-leg,.court-strings,.court-notation,.court-archlute{animation:none!important}}';
export function renderCourtBard(mode,source){
 try{
  if(!COURT_BARD_STATES.includes(mode))throw new Error('Unsupported Court Bard state: '+mode);
  if(typeof source!=='string'||!source.includes('data-instrument="court-long-neck-archlute"')||
     !source.includes('data-instrument-action="court-string-pluck"')||!source.includes('data-spell-effect="court-silver-notes"')||!source.endsWith('</svg>\n'))
   throw new Error('Court Bard canonical instrument/grip geometry changed');
  return source.replace('<svg xmlns=','<svg data-gridborn-mode="'+mode+'" xmlns=')
   .replace('</title>',' — '+mode+' performance study</title>')
   .replace('</desc>','</desc>\n<style>\n'+MOTIONS[mode]+'\n'+REDUCED+'\n</style>');
 }catch(error){console.error('Court Bard source generation failed',mode,error);throw error;}
}
