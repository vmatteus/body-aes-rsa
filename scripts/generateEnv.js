// scripts/generateEnv.js
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env');

// Verifica se o arquivo .env já existe
if (!fs.existsSync(envPath)) {
  const envContent = `
RSA_PRIVATE_KEY=
RSA_PUBLIC_KEY=
`;

  // Cria o arquivo .env
  fs.writeFileSync(envPath, envContent, { encoding: 'utf-8' });
  console.log('The .env file has been created successfully');
}
