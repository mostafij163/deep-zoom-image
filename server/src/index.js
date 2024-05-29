const express = require("express");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const xmlbuilder = require("xmlbuilder");

const app = express();

const inputImagePath = "path/to/your/high-resolution-image.jpg";
const outputDir = "output/dzi";
const tileSize = 256;
const overlap = 1;
const format = "jpg";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// function generateDziFile(width, height, levels) {
//   const dzi = xmlbuilder
//     .create("Image", { version: "1.0", encoding: "UTF-8" })
//     .att("xmlns", "http://schemas.microsoft.com/deepzoom/2008")
//     .att("Format", format)
//     .att("Overlap", overlap)
//     .att("TileSize", tileSize);

//   dzi.ele("Size").att("Width", width).att("Height", height);

//   const dziPath = path.join(outputDir, "image.dzi");
//   fs.writeFileSync(dziPath, dzi.end({ pretty: true }));

//   console.log(`DZI file created at ${dziPath}`);
// }

app.get("/image/dzi", async (req, res) => {
  async function generateTiles() {
    const image = sharp("./../public/images/cell.jpg");

    const metadata = await image.metadata();
    const { width, height } = metadata;

    // const levels = Math.ceil(Math.log2(Math.max(width, height)));

    // for (let level = levels; level >= 0; level--) {
    //   const scale = Math.pow(2, level);
    //   const levelWidth = Math.ceil(width / scale);
    //   const levelHeight = Math.ceil(height / scale);

    //   const levelDir = path.join(outputDir, `level${level}`);
    //   if (!fs.existsSync(levelDir)) {
    //     fs.mkdirSync(levelDir, { recursive: true });
    //   }

    //   const levelImage = await image.resize(levelWidth, levelHeight).toBuffer();

    //   const rows = Math.ceil(levelHeight / tileSize);
    //   const cols = Math.ceil(levelWidth / tileSize);

    //   for (let row = 0; row < rows; row++) {
    //     for (let col = 0; col < cols; col++) {
    //       const left = col * tileSize - (col > 0 ? overlap : 0);
    //       const top = row * tileSize - (row > 0 ? overlap : 0);
    //       const width =
    //         tileSize + (col > 0 ? overlap : 0) + (col < cols - 1 ? overlap : 0);
    //       const height =
    //         tileSize + (row > 0 ? overlap : 0) + (row < rows - 1 ? overlap : 0);

    //       const tile = await sharp(levelImage)
    //         .extract({ left, top, width, height })
    //         .toFormat(format)
    //         .toBuffer();

    //       const tilePath = path.join(levelDir, `${col}_${row}.${format}`);
    //       fs.writeFileSync(tilePath, tile);
    //     }
    //   }
    // }

    generateDziFile(metadata.width, metadata.height, levels);
  }

  generateTiles().catch(console.error);
});

app.listen(5000, () => {
  console.log("waiting for request...");
});
