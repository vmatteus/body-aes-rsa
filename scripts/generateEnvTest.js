// scripts/generateEnvTest.js
const fs = require('fs');
const path = require('path');

const envTestPath = path.join(__dirname, '../.env.test');

if (!fs.existsSync(envTestPath)) {
  const envTestContent = `
RSA_PRIVATE_KEY=
RSA_PUBLIC_KEY=
  `;

  fs.writeFileSync(envTestPath, envTestContent, { encoding: 'utf-8' });
  console.log('The .env.test file has been created successfully');
} 