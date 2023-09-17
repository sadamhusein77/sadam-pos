import { IProduct } from "@/services/data-types";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js"
export function generateNextPlu(dataArray: IProduct[]) {
    const highestPlu = dataArray.reduce((max, item) => {
        const pluNumber = parseInt(item.plu.slice(4));
        return pluNumber > max ? pluNumber : max;
    }, 0);

    const nextPluNumber = highestPlu + 1;
    const nextPlu = `PDCT${nextPluNumber.toString().padStart(7, '0')}`;

    return nextPlu;
}

export function findMaxId(dataArray: any) {
    const maxId = dataArray.reduce((max: number, item: { id: number; }) => {
        return item.id > max ? item.id : max;
    }, 0);

    return maxId;
}

export function getUserData() {
    const dataUser = Cookies.get('token-pos')
    if(dataUser) {
        const bytes  = CryptoJS.AES.decrypt(dataUser, `${process.env.NEXT_PUBLIC_CRYPTO_KEY}`);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData
    } else {
        console.log('token tidak ditemukan')
    }
}

