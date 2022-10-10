import {fetchDecodeDataFromMP4Container, generateBox, generateData, generateImages, displayImages} from "./loadMP4File.mjs";
const MP4_URL = "https://demo.castlabs.com/tmp/text0.mp4";

async function main() {
    let binaryDataSet = await fetchDecodeDataFromMP4Container(MP4_URL);
    const [arr, dataIndex] = generateBox(binaryDataSet);
    const dataOfMDAT = generateData(arr, dataIndex);
    const imagesCollection = generateImages(dataOfMDAT);
    displayImages(imagesCollection);
}

main();