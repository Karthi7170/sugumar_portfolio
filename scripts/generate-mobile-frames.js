const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const FRAMES_DIR = path.join(__dirname, '..', 'public', 'frames')
const MOBILE_DIR = path.join(FRAMES_DIR, 'mobile')
const MANIFEST = path.join(FRAMES_DIR, 'manifest.json')
const OUT_MANIFEST = path.join(FRAMES_DIR, 'manifest.mobile.lowres.json')

const TARGET_WIDTH = 720 // mobile width

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

async function run() {
  await ensureDir(MOBILE_DIR)
  if (!fs.existsSync(MANIFEST)) {
    console.error('Manifest not found at', MANIFEST)
    process.exit(1)
  }
  const files = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))
  const mobileFiles = []

  for (const relative of files) {
    const src = path.join(FRAMES_DIR, relative)
    const dest = path.join(MOBILE_DIR, path.basename(relative))
    try {
      // resize only if source exists
      if (!fs.existsSync(src)) {
        console.warn('Source not found, skipping', src)
        continue
      }
      await sharp(src)
        .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
        .toFile(dest)
      mobileFiles.push(path.join('mobile', path.basename(relative)).replace(/\\/g, '/'))
      console.log('Wrote', dest)
    } catch (err) {
      console.error('Failed to process', src, err)
    }
  }

  fs.writeFileSync(OUT_MANIFEST, JSON.stringify(mobileFiles, null, 2), 'utf8')
  console.log('Wrote mobile manifest:', OUT_MANIFEST)
}

run().catch(err=>{ console.error(err); process.exit(1) })
