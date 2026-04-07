import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folder = path.join(__dirname, "productImages");

// create folder if not exists
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

const BASE = "https://images.unsplash.com";

const images = [
  { name: "strat.jpg", url: `${BASE}/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop` },
  { name: "lespaul.jpg", url: `${BASE}/photo-1525201548942-d8732f6617a0?w=500&h=500&fit=crop` },
  { name: "ibanezrg.jpg", url: `${BASE}/photo-1558098329-a11cff621064?w=500&h=500&fit=crop` },
  { name: "f310.jpg", url: `${BASE}/photo-1510915361894-db8b60106cb1?w=500&h=500&fit=crop` },
  { name: "cd60.jpg", url: `${BASE}/photo-1507838153414-b4b713384a76?w=500&h=500&fit=crop` },
  { name: "aw54.jpg", url: `${BASE}/photo-1520166012956-add9ba0835cb?w=500&h=500&fit=crop` },

  { name: "gsr200.jpg", url: `${BASE}/photo-1517263904808-5dc91e3e7044?w=500&h=500&fit=crop` },
  { name: "jazzbass.jpg", url: `${BASE}/photo-1582719478250-c89cae4dc85b?w=500&h=500&fit=crop` },
  { name: "trbx.jpg", url: `${BASE}/photo-1556449895-a33c9dba33dd?w=500&h=500&fit=crop` },

  { name: "u1.jpg", url: `${BASE}/photo-1513883049090-d0b7439799bf?w=500&h=500&fit=crop` },
  { name: "casio.jpg", url: `${BASE}/photo-1507835666535-58a7e3a1e55f?w=500&h=500&fit=crop` },
  { name: "juno.jpg", url: `${BASE}/photo-1598488035139-bdbb2231ce04?w=500&h=500&fit=crop` },
  { name: "kross.jpg", url: `${BASE}/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop` },
  { name: "mpkmini.jpg", url: `${BASE}/photo-1581090700227-1e8b1c36f4e0?w=500&h=500&fit=crop` },
  { name: "launchkey.jpg", url: `${BASE}/photo-1590608897129-79da98d15969?w=500&h=500&fit=crop` },

  { name: "pearl.jpg", url: `${BASE}/photo-1519895609939-d2a6490c1199?w=500&h=500&fit=crop` },
  { name: "yamaha_drum.jpg", url: `${BASE}/photo-1519681393784-d120267933ba?w=500&h=500&fit=crop` },
  { name: "tama.jpg", url: `${BASE}/photo-1506157786151-b8491531f063?w=500&h=500&fit=crop` },
  { name: "pearl_snare.jpg", url: `${BASE}/photo-1497032205916-ac775f0649ae?w=500&h=500&fit=crop` },
  { name: "zildjian.jpg", url: `${BASE}/photo-1516455590571-18256e5bb9ff?w=500&h=500&fit=crop` },
  { name: "meinl.jpg", url: `${BASE}/photo-1485579149621-3123dd979885?w=500&h=500&fit=crop` },

  { name: "sax.jpg", url: `${BASE}/photo-1506157786151-b8491531f063?w=500&h=500&fit=crop` },
  { name: "selmer.jpg", url: `${BASE}/photo-1511192336575-5a79af67a629?w=500&h=500&fit=crop` },
  { name: "trumpet.jpg", url: `${BASE}/photo-1507838153414-b4b713384a76?w=500&h=500&fit=crop` }
];

async function downloadImage(url, filename) {
  const filepath = path.join(folder, filename);

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream"
  });

  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      console.log("Downloaded:", filename);
      resolve();
    });

    writer.on("error", reject);
  });
}

async function run() {
  for (const img of images) {
    try {
      await downloadImage(img.url, img.name);
    } catch (err) {
      console.error("Error:", img.name);
    }
  }
}

run();