# SPACE X - BACKEND

_This is a challenge by [Coodesh](https://coodesh.com/)._


### Sobre o projeto
Este é o backend de uma aplicação que faz parte de um desafio técnico. O projeto foi desenvolvido para fornecer informações detalhadas sobre os lançamentos de foguetes realizados pela Space X.


### Tecnologias Utilizadas
* Typescript
* Node
* Express
* MongoDB
* Mongoose
* Axios
* NodeJS Streams (Processamento sob demanda)
* Swagger


### Instruções para executar o projeto

_Existem duas formas de executar o projeto:_

-   _Executando o projeto localmente com Docker_
-   _Executando o projeto localmente de forma manual_
-   _Acessando a URL de deploy_

### Executando o projeto localmente com Docker
- _Clone o repositório_
-   _Crie um arquivo **.env** na raíz da projeto_
-   _Siga o exemplo abaixo para criar as variávies de ambiente necessárias para a execução do projeto_

---

```
# A variável MONGO_URI deve ser preenchida com uma string de conexão MongoDB

MONGO_URI=
PORT=4000
```

---


- _Após configurar o arquivo **.env**, inicie a aplicação com o comando:_

```
docker-compose up
```
_Durante o processo, o banco de dados será alimentado de forma automática._


_Quando o processo terminar, a aplicação estará sendo executa na porta indicada no valor da variável PORT do arquivo .env. Caso não seja especificada, a aplicação estará em funcionamento na porta 4000._

### Executando o projeto localmente de forma manual
-  _Clone o repositório_
-   _Crie um arquivo **.env** na raíz da projeto_
-   _Siga o exemplo abaixo para criar as variávies de ambiente necessárias para a execução do projeto_

---

```
# A variável MONGO_URI deve ser preenchida com uma string de conexão MongoDB

MONGO_URI=
PORT=4000
```

---

- _Após configurar o arquivo **.env**, instale as dependências do projeto:_

```
npm i
```

-   _Após instalar as dependências, execute o comando abaixo para alimentar o banco de dados:_

```
npm run seed
```

- _Execute o projeto:_

```
npm run dev
```

_Quando o processo terminar, a aplicação estará sendo executa na porta indicada no valor da variável PORT do arquivo .env. Caso não seja especificada, a aplicação estará em funcionamento na porta 4000._


### Acessando a URL de deploy

_A forma mais rápida para executar a aplicação, basta usar a seguinte url:_

```
https://marcenaria-diferente-full-stack.onrender.com
```
**_Ao acessar a aplicação por meio do deploy, é possível notar uma leve lentidão nas primeiras requisições. Isso ocorre devido à execução da aplicação em um servidor gratuito._**


## Documentação dos Endpoints

A API está totalmente documentada com Swagger, seguindo os padrões Open API. A Documentação pode ser acessada tanto ao executar o projeto localmente, quanto através da URL de deploy, basta acessar o endpoint **/docs**:

```
# Acessando a documentação

http://localhost:4000/docs
https://marcenaria-diferente-full-stack.onrender.com/docs/
```
