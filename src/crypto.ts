import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';
import { EncryptionResult } from './types';

export class CryptoService {

    private rsaPrivateKey?: string;
    private rsaPublicKey?: string;

    constructor() {
        this.rsaPrivateKey = process.env.RSA_PRIVATE_KEY || '';
        this.rsaPublicKey = process.env.RSA_PUBLIC_KEY || '';
    }

    private generateSessionKeyAndIV(): { sessionKey: string, iv: string } {
        const sessionKey = CryptoJS.lib.WordArray.random(16).toString();
        const iv = CryptoJS.lib.WordArray.random(16).toString();
        return { sessionKey, iv };
    }

    private encryptSessionWithAES(data: string, sessionKey: string, iv: string): string {
        const sessionKeyArray = CryptoJS.enc.Hex.parse(sessionKey);
        const ivWordarray = CryptoJS.enc.Hex.parse(iv);
        return CryptoJS.AES.encrypt(data, sessionKeyArray, {
            iv: ivWordarray,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }).toString();
    }

    private encryptDataWithRSA(data: string): string | false {
        if (!this.rsaPublicKey) return false;
        const rsa = new JSEncrypt();
        rsa.setPublicKey(this.rsaPublicKey);
        return rsa.encrypt(data);
    }

    private decryptDataWithRSA(data: string): string | false {
        if (!this.rsaPrivateKey) return false;
        const rsa = new JSEncrypt();
        rsa.setPrivateKey(this.rsaPrivateKey);
        return rsa.decrypt(data);
    }

    public encrypt(data: string): EncryptionResult {
        const { sessionKey, iv } = this.generateSessionKeyAndIV();
        const encryptedData = this.encryptSessionWithAES(data, sessionKey, iv);

        const encryptedSessionKey = this.encryptDataWithRSA(sessionKey);

        if (!encryptedSessionKey) {
            console.log('RSA public key not available, only AES encryption applied');
            return {
                encryptedData,
                encryptedSessionKey: sessionKey,
                iv,
            };
        }

        return {
            encryptedData,
            encryptedSessionKey,
            iv,
        };
    }

    public decrypt(encryptedData: string, encryptedSessionKey: string, iv: string): string {
        const sessionKey = this.rsaPrivateKey ? this.decryptDataWithRSA(encryptedSessionKey) : encryptedSessionKey;

        if (!sessionKey) {
            throw new Error('Failed to decrypt the session key');
        }

        const sessionKeyArray = CryptoJS.enc.Hex.parse(sessionKey);
        const ivWordarray = CryptoJS.enc.Hex.parse(iv);

        return CryptoJS.AES.decrypt(encryptedData, sessionKeyArray, {
            iv: ivWordarray,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }).toString(CryptoJS.enc.Utf8);
    }
}
