# DESAFIO JAZIDA

##  Tecnologias: 
  - Express
  - Node
  - Typescript
  - Sequelize
  - Postgres
  - Docker
  - Jest

### Instruções para executar o projeto;

1.  Use as sugestões de váriaveis de ambiente que estão no arquivo **env.example**
2.  Clone o repositório ````git clone git@github.com:JoaoVFerreira/challenge_Jazida.git````
3.  Execute o shell scprit ````db.sh```` ele é responsável por subir um container docker com a imagem do postgres:12
4.  Instale as dependencias via **yarn** ou **npm**
5.  Execute as migrations via ````npx sequelize-cli db:migrate```` (**Cria a tabela**)
6.  Execute as seeds via ````npx sequelize-cli db:seed:all```` (**Popula a tabela com alguns pokemon**s)
7.  Execute o scprit definido como dev no package.json (````yarn dev```` **ou** ````npm run dev````)
8.  Importe o arquivo **jazida_http** no insomnia caso queira

### Instruções para executar os testes;

1.  Execute ````npx jest````;
2.  Caso os testes de integração falhem, execute-os separadamente, isto é, por arquivo; Erros podem acontecem por conta da assincronicidade;