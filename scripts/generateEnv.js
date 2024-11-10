const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '../..');
const envPath = path.join(projectDir, '.env');

if (!fs.existsSync(envPath)) {
  const envContent = `
RSA_PRIVATE_KEY=
RSA_PUBLIC_KEY=
`;

  fs.writeFileSync(envPath, envContent, { encoding: 'utf-8' });
  console.log('The .env file has been created successfully');
}
