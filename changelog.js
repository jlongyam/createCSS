import Changelog from 'generate-changelog';
import Fs from 'fs';
 
Changelog.generate({})
.then(function (changelog) {
  Fs.writeFileSync('./CHANGELOG.md', changelog);
});