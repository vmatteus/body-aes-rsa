import { CryptoService } from "./crypto";

test('should encrypt and decrypt', () => {

    const cryptoService = new CryptoService();

    const data = 'Hello World';
    const { encryptedData, encryptedSessionKey, iv } = cryptoService.encrypt(data);

    expect(encryptedData).toBeDefined();
    expect(encryptedSessionKey).toBeDefined();
    expect(iv).toBeDefined();

    const decryptedData = cryptoService.decrypt(encryptedData, encryptedSessionKey, iv);

    expect(decryptedData).toBe(data);

});