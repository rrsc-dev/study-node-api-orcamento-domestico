# Usa uma imagem leve do Node
FROM node:20-alpine

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências primeiro (para aproveitar cache)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código fonte
COPY . .

# Expõe a porta que a aplicação usa
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]