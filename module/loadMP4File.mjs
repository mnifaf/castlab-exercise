
/**
 * Description. This function will fetch will load MP4 file by using given url. Then it will create
 * ArrayBuffer with TypedArray to populate binary data for further use.
 * @param {URL} url   it should a MP4 file url.
 * @return {array}    array contains binary data.
 */
export async function fetchDecodeDataFromMP4Container(url) {
    try {
        let res = await fetch(url);
        console.log(`Successfully Loaded file ${url}`);
        let responseBuffer = await res.arrayBuffer();
        let typedArray = new Uint8Array(responseBuffer, 0, responseBuffer.byteLength);
        // Array.from(binaryArray or [...typedArray]
        let binaryArray = Array.prototype.slice.call(typedArray);
        return binaryArray;
    }catch (e) {
        throw e;
    }
}

/**
 * Description. This function will take first 4 byte of new box to calculate size of box.
 * @arr {array} arr  Using reset operator we have a new array of first four byte.
 * @return {number}  return decimal number
 */
function calculateSize(...arr){
    let newBuffer = new Uint8Array([ arr[0] , arr[1] , arr[2] , arr[3] ]).buffer;
    newBuffer = [...new Uint8Array(newBuffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
    return parseInt(newBuffer, 16);
}

/**
 * Description. This function take arr as a param. Then iterate throw the array to display size and box type.
 * @param {array} arr  This should be a binary array data.
 * @return {array}     Return array and MDAT data index.
 */
export function generateBox(arr) {
    try {
        let dataIndex = undefined;
        const lastIndex = arr.length;
        const startIndex = 4;
        const boxTypeConstant = ['moof', 'mfhd', 'traf', 'tfhd', 'trun', 'uuid', 'mdat'];
        for (let i = startIndex; i < lastIndex; i++) {
            let boxType = String.fromCharCode(arr[i], arr[i + 1], arr[i + 2], arr[i + 3]);
            if (boxTypeConstant.includes(boxType)) {
                console.log(`Found box of type ${boxType} and size ${calculateSize(arr[i - 4] , arr[i - 3] , arr[i - 2] , arr[i - 1])}`);
                if (boxType === "mdat") {
                    dataIndex = i + 4;
                }
            }
        }
        return [arr, dataIndex];
    }catch (e) {
        throw e;
    }
}

/**
 * Description. This function take arr & dataIndex as a param to get data of MDAT box.
 * @param {array} arr  This should be a binary array data.
 * @param {number} dataIndex  This should be a index number of data. At this point we will start reading
 * data for MDAT box.
 * @return {string}     Return data from MDAT box.
 */
export function generateData(arr, dataIndex) {
    try {
        let data = ""
        do {
            data += String.fromCharCode(arr[dataIndex]);
            dataIndex++;
        } while (arr.length >= dataIndex)
        console.log(data);
        return data;
    }catch (e) {
        throw e;
    }
}

/**
 * Description. This function takes arr & dataIndex as a param to get data of MDAT box.
 * @param {array} arr  This should be a binary array data.
 * @param {number} dataIndex  This should be an index number of data. At this point we will start reading
 * data for MDAT box.
 * @return {data}     Return data from MDAT box.
 */
export function generateImages(data) {
    try{
        let metaDataTag = data.substr(data.lastIndexOf('<metadata>'), data.lastIndexOf('</metadata>'));
        metaDataTag = metaDataTag.split(/\r?\n/g);

        const images = new Map([
            [1, metaDataTag[2]],
            [2, metaDataTag[5]],
            [3, metaDataTag[8]]
        ]);
        return images;
    }catch (e) {
        throw e;
    }

}

export     /**
 * Description. This function will extract images base64 data and convert it into image and put this image on DOM.
 * @param {data} images  Should be images collection.
 */
function displayImages(images) {
    for (const [i, baseUrl] of images) {
        let img = new Image();
        img.src = `data:image/png;base64,${baseUrl}`;
        img.width = "500";
        img.height = "500";
        document.querySelector(`#img${i}`).appendChild(img);
    }
}