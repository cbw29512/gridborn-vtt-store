import {ancestryProductionQueue} from '../src/ancestry-production-queue.mjs';
import {foundationFor} from '../src/species-foundations.mjs';
try{
 const report=ancestryProductionQueue();
 console.log('Catalog '+report.totalCatalog+' | matched '+report.matched+
  ' | unassigned '+report.unassigned.length);
 console.log('Generic humanoid enemies needing explicit ancestry: '+
  report.flexibleHumanoidEnemies.length);
 for(const x of report.families)
  console.log(x.ancestry+': '+x.total+' concepts, '+x.animated+' animated, '+
   x.stillOnly+' stills, '+x.unproduced+' pending | Heroes '+x.categories.Characters+
   ', NPCs '+x.categories.NPCs+', Monsters '+x.categories.Monsters+
   ' | '+foundationFor(x.ancestry).sourceMode);
 if(process.argv.includes('--missing-human'))
  for(const entry of report.families[0].entries.filter(x=>x.status!=='animated-study'))
   console.log('PENDING '+entry.category+' '+entry.id+' '+entry.name);
}catch(error){console.error('Ancestry production report failed',error);process.exitCode=1;}
