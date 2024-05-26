import CryptoJS from 'crypto-js'

const kunci_akses      =        'Code-Jouney';

export default {
    encryption: function(data) {
        try {
            if (data == null) {
                return null;
            } else {
                let enkripsi   =   CryptoJS.AES.encrypt(data, kunci_akses).toString();
                return enkripsi;
            }
        } catch (error) {
            window.console.log(error);
            return null;
        }
    },
    dencrytion: function(data) {
        try {
            if (data == null) {
                return null;
            } else {
                let bytes     =    CryptoJS.AES.decrypt(data, kunci_akses);
                let terjemaah =    bytes.toString(CryptoJS.enc.Utf8);
                return terjemaah;
            }
        } catch (error) {
            window.console.log(error);
            return null;
        }
    }
}