import {
    fetchDecodeDataFromMP4Container,
    generateBox,
    generateData,
    generateImages,
    displayImages
} from "./loadMP4File.mjs";
import {MP4_URL} from "./constants.mjs";

async function main() {
    try{
        let binaryDataSet = await fetchDecodeDataFromMP4Container(MP4_URL);
        const [arr, dataIndex] = generateBox(binaryDataSet);
        const dataOfMDAT = generateData(arr, dataIndex);
        const imagesCollection = generateImages(dataOfMDAT);
        displayImages(imagesCollection);
    }catch (e) {
        alert(`Something went wrong. err.name = ${e.name}, err.message =  ${e.message}`);
    }
}

main();