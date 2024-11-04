# Dockerfile para o serviço Node.js
FROM node:14

# Diretório de trabalho
WORKDIR /usr/src/app

# Copiar os arquivos package.json para instalar dependências
COPY package.json ./
RUN npm install

# Copiar o código-fonte para o contêiner
COPY . .

# Baixar o script wait-for-it.sh para aguardar o MySQL estar pronto
RUN chmod +x wait-for-it.sh

# Expor a porta do aplicativo
EXPOSE 3000

# Usar o wait-for-it.sh para esperar o MySQL antes de iniciar o app
CMD ["./wait-for-it.sh", "db:3306", "--", "node", "index.js"]