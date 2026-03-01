const { execSync } = require('child_process');
const path = require('path');

const sites = [
  { name: 'realestate', url: 'https://ramyradad1.github.io/riyadh-residences/' },
  { name: 'coffee', url: 'https://ramyradad1.github.io/saudi-coffee-co/' },
  { name: 'agency', url: 'https://ramyradad1.github.io/jeddah-tech-hub/' },
  { name: 'photography', url: 'https://ramyradad1.github.io/vision-photography/' },
  { name: 'logistics', url: 'https://ramyradad1.github.io/horizon-logistics/' },
  { name: 'education', url: 'https://ramyradad1.github.io/eduplay-learning/' },
];

const outDir = path.join(__dirname, 'public', 'projects');

async function main() {
  // dynamically import puppeteer
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  
  for (const site of sites) {
    console.log(`Capturing ${site.name} from ${site.url} ...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    try {
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });
      // Wait for animations
      await new Promise(r => setTimeout(r, 3000));
      const outPath = path.join(outDir, `${site.name}.png`);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`  ✅ Saved ${outPath}`);
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}`);
    }
    await page.close();
  }
  
  await browser.close();
  console.log('\nDone capturing all screenshots!');
}

main();
