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
        // This will fetch .mp4 file in arrayBuffer then Uint8Array to get binary data
        let binaryDataSet = await fetchDecodeDataFromMP4Container(MP4_URL);

        // This will iterate the binary and console log appropriate size and type of boxes
        // then it will return same binary arr with data index of MDAT
        const [arr, dataIndex] = generateBox(binaryDataSet);

        // This will convert MDAT box data by using fromCharCode
        const dataOfMDAT = generateData(arr, dataIndex);

        // This will fetch base64 images from Data
        const imagesCollection = generateImages(dataOfMDAT);

        // Display images on browser
        displayImages(imagesCollection);
    }catch (e) {
        alert(`Something went wrong. err.name = ${e.name}, err.message =  ${e.message}`);
    }
}
main();