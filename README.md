# Lumi Energia ⚡

## Descrição do Desafio 📝

### Desenvolver um sistema capaz de:

- Extrair automaticamente os dados relevantes de faturas de energia.
- Estruturar e armazenar os dados de forma organizada em um banco de dados PostgreSQL.
- Apresentar essas informações de maneira intuitiva e acessível através de uma aplicação web, utilizando uma API para comunicação com o backend.

## Tecnologias Utilizadas

### Frontend 💻

- Next.js: Framework React para desenvolvimento de aplicações web com renderização no lado do servidor.
- React: Biblioteca JavaScript para construção da interface do usuário.
- Tailwind CSS: Framework CSS para estilização rápida e responsiva.
- ShadcnUI: Biblioteca de componentes UI baseada em React.
- TypeScript: Linguagem de programação para garantir tipagem estática e segurança no desenvolvimento.

### Backend ⚙

- Fastify: Framework web para construção de APIs com alto desempenho.
- Prisma: ORM (Object-Relational Mapping) para interagir com o banco de dados PostgreSQL.
- PostgreSQL: Banco de dados relacional para armazenamento dos dados estruturados.
- TypeScript: Linguagem de programação para garantir tipagem estática e segurança no desenvolvimento.

### Deploy 🚀

- AWS S3: Armazenamento de faturas de energia.
- Azure EC2: Hospedagem do backend utilizando Nginx e PM2 para gerenciamento de processos.
- Vercel: Plataforma de hospedagem para o frontend.
- Neon DB: Banco de dados hospedado para armazenamento de dados estruturados.
- Docker: Opção para hospedagem do banco de dados PostgreSQL no EC2. Tanto o Docker quanto o Neon DB são soluções extremamente funcionais e flexíveis para o deploy.

## Funcionalidades

### Frontend 💻

- Visualização dos dados cadastrados de clientes e faturas através de uma dashboard.
- Apresentação de gráficos com informações úteis, como energia consumida e compensada, valores consumidos e compensados
- Exibição de cartões com informações principais, como total de clientes, total de faturas e consumo de energia.
- Visualização e filtragem das faturas por mês ou por cliente.
- Pré-visualização das faturas e possibilidade de baixá-las.
- Envio de novas faturas, caso necessário.

### Backend ⚙

- Implementação de rotas para gerenciamento de clientes, faturas e métricas.
- Lógica de extração de dados das faturas enviadas.
- Armazenamento das informações das faturas tratadas em um bucket no AWS S3 para disponibilização aos usuários.

## 👾 Experimente

Para testar a aplicação, acesse os seguintes links:

- [Frontend - Dashboard](https://frontendlumi.desafiotecnico.shop/).
- [Backend - Documentação](https://backendlumi.desafiotecnico.shop/api/docs).

<sub>PS: Optei por utilizar o domínio personalizado desafiotecnico.shop para padronizar o projeto. O frontend está hospedado no frontendlumi, enquanto o backend está hospedado no subdomínio backendlumi. Ambos os domínios possuem certificação SSL para garantir a segurança da comunicação.</sub>

## 💻 Imagens da plataforma

<img src="https://i.imgur.com/51dQ8ft.png" width="1920"/>

### Listar faturas

<img src="https://i.imgur.com/YMTIv5x.png" width="1920"/>

### Pré-visualizar fatura

<img src="https://i.imgur.com/dyGVXf7.png" width="1920"/>

### Enviar faturas

<img src="https://i.imgur.com/msolFyO.png" width="1920"/>

## 🚀 Começo

Estas instruções permitirão que você obtenha uma cópia de trabalho do projeto em sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Antes de começar, certifique-se de atender aos seguintes requisitos:

- Você instalou [Git](https://git-scm.com/downloads).
- Você instalou [Node.js](https://nodejs.org/en).
- Você instalou [Docker](https://www.docker.com/products/docker-desktop/).
- Você possui um navegador web moderno.

Também é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

---

### 🎲 Colocando o projeto para funcionar localmente

```bash
# Clone o repositório
$ git clone https://github.com/GabrielFeijo/Desafio-Lumi
# Acesse a pasta do projeto em terminal/cmd
$ cd Desafio-Lumi
```

### BackEnd

```bash
# Acesse a pasta do projeto em terminal/cmd
$ cd lumi-back

# Instale as dependências
npm install

# Inicie o banco de dados PostgreSQL usando Docker Compose
$ docker compose up -d

# Configure as variáveis de ambiente no arquivo .env
DATABASE_URL="postgresql://postgre:Postgres2024!@localhost:5432/lumi?schema=public"

# Credenciais para acessar o Bucket na AWS
AWS_REGION="string"
AWS_ACCESS_KEY_ID="string"
AWS_SECRET_ACCESS_KEY="string"
AWS_BUCKET_NAME="string"

#CORS
ORIGIN="["*"]"

# Execute as migrações do Prisma para configurar o banco de dados.
$ npx prisma migrate dev --name init

# Para popular seu banco de dados com dados iniciais, execute o seguinte comando.
$ npx prisma db seed

# Inicie a aplicação em DEV:
$ npm run start:dev
```

### FrontEnd

```bash
# Acesse a pasta do projeto em terminal/cmd
$ cd lumi-front

# Instale as dependências
npm install

# Configure as variáveis de ambiente no arquivo .env
NEXT_PUBLIC_API_URL="http://localhost:3333/api"

# Inicie a aplicação em DEV:
$ npm run dev
```

## 🧪 Executando Testes

Para executar os testes unitários, navegue até a pasta do projeto (lumi-front ou lumi-back) e execute o seguinte comando:

```bash
# BACKEND - (lumi-back): Para popular seu banco de dados com dados iniciais, execute o seguinte comando.
$ npx prisma db seed

$ npm run test
```

## 🛠️ Feito utilizando

### FrontEnd

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" width="45" height="45"/>

### BackEnd

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastify/fastify-plain.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" width="40" height="45" />

### Deploy

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" width="40" height="45" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" width="40" height="45" /> <img src="https://neon.tech/favicon/favicon-256x256.png" width="40" height="45" />
