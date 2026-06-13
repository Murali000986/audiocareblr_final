const https = require('https');
const fs = require('fs');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const brands = [
    'Bowers Wilkins', 'Monitor Audio', 'Q Acoustics', 'Mission Audio', 'Jamo Speakers', 'Dali Speakers', 
    'Sonos', 'Bang Olufsen', 'REL Acoustics', 'Wharfedale', 'Burmester Audio', 'Tannoy', 'NAD Electronics', 
    'Cambridge Audio', 'Arcam Audio', 'audiolab', 'Optoma'
  ];

  for (const b of brands) {
    console.log(`Searching for ${b}...`);
    const q = encodeURIComponent(b);
    const res = await fetchJson(`https://api.brandfetch.io/v2/search/${q}`);
    
    if (res && res.length > 0) {
      const best = res[0];
      const iconUrl = best.icon;
      if (iconUrl) {
        console.log(`Found: ${iconUrl}`);
      } else {
        console.log(`No icon for ${b}`);
      }
    } else {
      console.log(`No results for ${b}`);
    }
  }
}

run();
