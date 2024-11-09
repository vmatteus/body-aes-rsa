import { CryptoService } from "./crypto";

test('should encrypt and decrypt', () => {

     const rsaPrivateKey = `-----BEGIN PRIVATE KEY-----
MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKlv3Z1oZs038k3m
s0gu3eDtTsvXJNDceq/YZV7pwFroCnJhCFAIrK0ClHEBFHZqFWLZ1O8Hbbo+WWlQ
iS21A0DyQv0nrwN1j49r8ojFhjoN6xHpkTkRezPgD126H6X9JTThMoaVP+k+qGEs
pbdaC2lVNa+P75Cb04JE/t0qFaq5AgMBAAECgYBvaTwqpZx7Ml9kM98NBqwkm0Xl
qPjvURpnB/5X85Hk9JDx9rW1ko6gUIL070XaOxUG478s0RColxjJtAgPgue4udBH
07C24uaygoHBcq2Ycw3ut8wIp8gFLS2vD3WEx/UewaV/50sY/tmKlaF9aL19U+RX
zvZrIdw2vH3F5oc30QJBANaIlRLiipMIzx6kwOUeFhjixGRcpvELNur1vlrjTCVd
D1HZE2YC/aVUyqR6Wq7KIqlSwZrlEAm3ycjnEdfXqwUCQQDKL9fg2b171T+UNzZp
WB+tELRIe0qbwtkxjw5CV80cvERjJ8z9i2T6eHoQNy18rlP23X7glgeL3lmsgxd8
ApclAkEAhq4yICv2YP47wPofWvc7Wh4quvLrnxGyRWlHOpnNePtmHbUQl48zG3MS
0JU7jtW5UuFwR8Sb/+3QkP53VjC/3QJAHZ6usJkVgku2Wb9Q8FPhqBf3YVr2jiUY
boM3oo58VQZbum79P/Oo4my97Rw4RLjBQjwmtz4jcuErH/PAgAFdJQJAAi1iiI5I
QjjN3kdQLXefcgmrxQx0yjWe43fwjRiwVro9ax/TfjrMeSoE/O8dSf8KOzQO32IJ
uZLw/HO6EFdwUQ==
-----END PRIVATE KEY-----`;


    const rsaPublicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpb92daGbNN/JN5rNILt3g7U7L
1yTQ3Hqv2GVe6cBa6ApyYQhQCKytApRxARR2ahVi2dTvB226PllpUIkttQNA8kL9
J68DdY+Pa/KIxYY6DesR6ZE5EXsz4A9duh+l/SU04TKGlT/pPqhhLKW3WgtpVTWv
j++Qm9OCRP7dKhWquQIDAQAB
-----END PUBLIC KEY-----`;

    const cryptoService = new CryptoService();
    cryptoService.setRsaPrivateKey(rsaPrivateKey);
    cryptoService.setRsaPublicKey(rsaPublicKey);
    
    const data = 'Hello World';
    const { encryptedData, encryptedSessionKey, iv } = cryptoService.encrypt(data);

    expect(encryptedData).toBeDefined();
    expect(encryptedSessionKey).toBeDefined();
    expect(iv).toBeDefined();

    const decryptedData = cryptoService.decrypt(encryptedData, encryptedSessionKey, iv);

    expect(decryptedData).toBe(data);

});