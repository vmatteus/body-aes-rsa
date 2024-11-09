import CryptoJS from 'crypto-js';
import JSEcrypt from 'jsencrypt';
import { EncryptionResult } from './types';

export class CryptoService {

    private rsaPrivateKey: string;
    private rsaPublicKey: string;

    constructor() {
        this.rsaPrivateKey = '';
        this.rsaPublicKey = '';
    }

    private generateSessionKeyAndIV(): { sessionKey: string, iv: string } {
        const sessionKey = CryptoJS.lib.WordArray.random(16).toString();
        const iv = CryptoJS.lib.WordArray.random(16).toString();
        return { sessionKey, iv };
    }

    private encryptSessionWithRSA(data: string, sessionKey: string, iv: string): string {   
        const sessionKeyArray = CryptoJS.enc.Hex.parse(sessionKey)
        const ivWordarray = CryptoJS.enc.Hex.parse(iv);

        return CryptoJS.AES.encrypt(data, sessionKeyArray, {
            iv: ivWordarray,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
    }

    private encryptDataWithRSA(data: string): string | false {
        const rsa = new JSEcrypt();
        rsa.setPublicKey(this.rsaPublicKey);
        return rsa.encrypt(data);
    }

    private decryptDataWithRSA(data: string): string | false {
        const rsa = new JSEcrypt();
        rsa.setPrivateKey(this.rsaPrivateKey);
        return rsa.decrypt(data);
    }
    
    public setRsaPrivateKey(rsaPrivateKey: string): void {
        this.rsaPrivateKey = rsaPrivateKey;
    }

    public setRsaPublicKey(rsaPublicKey: string): void {
        this.rsaPublicKey = rsaPublicKey;
    }

    public encrypt(data: string): EncryptionResult {
        const { sessionKey, iv } = this.generateSessionKeyAndIV();
        const encryptedData = this.encryptSessionWithRSA(data, sessionKey, iv);
        const encryptedSessionKey = this.encryptDataWithRSA(sessionKey);

        if (!encryptedSessionKey) {
            throw new Error('Failed to encrypt session key');
        }

        return {
            encryptedData,
            encryptedSessionKey,
            iv
        };
    }

    public decrypt(encryptedData: string, encryptedSessionKey: string, iv: string): string {
        const decryptedSessionKey = this.decryptDataWithRSA(encryptedSessionKey);

        if (!decryptedSessionKey) {
            throw new Error('Failed to decrypt session key');
        }

        const sessionKeyArray = CryptoJS.enc.Hex.parse(decryptedSessionKey);
        const ivWordarray = CryptoJS.enc.Hex.parse(iv);

        return CryptoJS.AES.decrypt(encryptedData, sessionKeyArray, {
            iv: ivWordarray,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
    }
}