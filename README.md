# [título-ainda-não-definido]

Escrevo aqui depois

## Proposta

Escrevo aqui depois

## Executando o projeto

### Requisitos de software

Depois de clonar o repositório, para rodar o projeto é necessário ter os seguintes softwares instalados na sua máquina:
- Node.JS v18+ [[Download](https://nodejs.org/en/download)]
    - npm v8.0+ (Vem junto com o NodeJS)
- MySQL Server v8.0+ [[Download](https://dev.mysql.com/downloads/file/?id=518835)]

### Clonar o repositório

Para começar a mexer no projeto é necessário, ter o código dele na sua máquina. Para isso, execute a seguinte sequência de comandos no seu terminal do Git:

```
> cd ~/Desktop
> git clone https://github.com/SmashingThosePumpkins/gestao-tcc.git
> cd gestao-tcc
> git checkout dev
> git checkout -b [nome_do_seu_novo_branch]
```

### Configurar variáveis de ambiente

Para o site funcionar, deve-se configurar corretamente as configurações do banco de dados e outros atributos do ambiente de desenvolvimento. Para fazer isso, crie um arquivo simplesmente com o nome `.env` no diretório raiz do projeto, e escreva o seguinte nele:

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=seu-user-aqui
DB_PASS=sua-senha-aqui
APP_PORT=7075
```
- Os campos de host e porta são o endereço para o site se conectar ao banco de dados. Se você está rodando ele localmente, provavelmente as configurações são host `127.0.0.1` e porta `3306`.
- O usuário e senha do MySQL são configurados no instalador. Caso tenha esquecido ou perdido essas configurações, basta reinstalar o MySQL Server usando o MySQL Installer.
- O campo de porta da aplicação é a porta ao qual você acessará o site.

### Passo 1 - Buildar o projeto

Para fazer o projeto rodar, é necessário primeiro baixar todas as bibliotecas externas que ele usa para funcionar. Para fazer isso, utilize o seguinte comando no terminal, no diretório raiz do projeto:

```
> npm run build
```
Além de baixar as dependências do projeto, esse comando também fará a configuração das tabelas do banco de dados.

### Passo 2 - Iniciar o servidor

Para iniciar o servidor do website, basta executar o seguinte comando no diretório raiz do projeto:

```
> npm run start
```

### Passo 3 - Acessar

Tudo pronto!

Agora basta inserir a URL do site em seu navegador e acessá-lo.

```
http://[seu-host]:[sua-porta]
http://127.0.0.1:7075
```

## Desenvolvedores

- Preguiça, coloco depois
