import fs from 'fs';

async function run() {
  const brands = [
    { key: 'bw', query: 'Bowers Wilkins' },
    { key: 'monitoraudio', query: 'Monitor Audio' },
    { key: 'qacoustics', query: 'Q Acoustics' },
    { key: 'mission', query: 'Mission Audio' },
    { key: 'jamo', query: 'Jamo Speakers' },
    { key: 'dali', query: 'Dali Speakers' },
    { key: 'sonos', query: 'Sonos' },
    { key: 'bangolufsen', query: 'Bang Olufsen' },
    { key: 'rel', query: 'REL Acoustics' },
    { key: 'wharfedale', query: 'Wharfedale' },
    { key: 'burmester', query: 'Burmester Audio' },
    { key: 'tannoy', query: 'Tannoy' },
    { key: 'nad', query: 'NAD Electronics' },
    { key: 'cambridgeaudio', query: 'Cambridge Audio' },
    { key: 'arcam', query: 'Arcam Audio' },
    { key: 'audiolab', query: 'audiolab' },
    { key: 'optoma', query: 'Optoma' }
  ];

  for (const b of brands) {
    const q = encodeURIComponent(b.query);
    try {
      const res = await fetch(`https://api.brandfetch.io/v2/search/${q}`);
      const data = await res.json();
      
      if (data && data.length > 0 && data[0].icon) {
        const url = data[0].icon;
        console.log(`Downloading ${b.key}...`);
        
        const imgRes = await fetch(url);
        const arrayBuffer = await imgRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        fs.writeFileSync(`./public/logos/${b.key}.png`, buffer);
      } else {
        console.log(`No icon for ${b.query}`);
      }
    } catch (e) {
      console.log(`Failed ${b.query}: ${e.message}`);
    }
  }
}

run();
