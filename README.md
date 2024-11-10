# Combined Symmetric and Asymmetric Encryption (AES and RSA)

This package aims to encrypt data using a combination of symmetric (AES) and asymmetric (RSA) encryption, leveraging the strengths of each. AES uses a symmetric key to encrypt the content, allowing for the processing of data of any size. RSA uses an asymmetric key, but it is more suitable for encrypting limited-size data.

## Example of an Encrypted Request
```javascript
import { CryptoService } from './CryptoAesRSA';

const cryptoService = new CryptoService();

async function sendEncryptedRequest(url, data) {
    try {
        // Encrypt the data
        const { encryptedData, encryptedSessionKey, iv } = cryptoService.encrypt(JSON.stringify(data));

        // Send the request with the encrypted body
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                encryptedData,
                encryptedSessionKey,
                iv,
            }),
        });

        const responseData = await response.json();
        console.log("Response from server:", responseData);
    } catch (error) {
        console.error("Encryption or request failed:", error);
    }
}

// Usage example
const data = {
    message: "Hello, this is a secure message!",
};

sendEncryptedRequest('https://example.com/api/secure-endpoint', data);
```

## Example of Decrypting on Backend with TypeScript
```typescript
import { CryptoService } from './CryptoAesRSA';

const cryptoService = new CryptoService();

async function handleEncryptedRequest(req, res) {
    try {
        const { encryptedData, encryptedSessionKey, iv } = req.body;

        // Decrypt the data
        const decryptedData = cryptoService.decrypt(encryptedData, encryptedSessionKey, iv);

        // Process the decrypted data
        const data = JSON.parse(decryptedData);
        console.log("Decrypted data:", data);

        // Send a response back to the client
        res.json({ message: "Data received and decrypted successfully", data });
    } catch (error) {
        console.error("Decryption failed:", error);
        res.status(500).json({ error: "Decryption failed" });
    }
}

// Example usage with an Express server
import express from 'express';
const app = express();

app.use(express.json());

app.post('/api/secure-endpoint', handleEncryptedRequest);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

## Environment Variables

This package uses the following environment variables:

- `RSA_PRIVATE_KEY`: PRIVATE KEY, required for decryption
- `RSA_PUBLIC_KEY`: PUBLIC KEY, required for encryption

### Configuration Example

Create a `.env` file in the root directory of your project and add:

```plaintext
RSA_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
...
-----END PRIVATE KEY-----"

RSA_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----"
```

To run the tests, create a `.env.test` file.
