# body-aes-rsa

## Variáveis de Ambiente

Este pacote usa as seguintes variáveis de ambiente:

- `RSA_PRIVATE_KEY`: Chave da API, usada para autenticação.
- `RSA_PUBLIC_KEY`: URL de conexão com o banco de dados.

### Exemplo de Configuração

Crie um arquivo `.env` no diretório raiz do seu projeto e adicione:

```plaintext
RSA_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
...
-----END PRIVATE KEY-----"

RSA_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----"
```

Para rodar os testes, crie o `.env.test`.