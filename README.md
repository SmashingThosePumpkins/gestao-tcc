# [título-ainda-não-definido]

Esse é o repositório do projeto interdisciplinar que está sendo realizado pelos alunos do 4° AMS/DS da Fatec Garça de 2023.

## Proposta

A proposta desse projeto é trazer um sistema para tornar mais prática a gestão de trabalhos de conclusão de curso para 
os coordenadores da faculdade. Esse projeto visa também, no futuro, trazer ferramentas didáticas de feedback dos professores
orientadores aos alunos orientados sobre os projetos em que estão trabalhando.

## Executando o projeto

### Requisitos de software

Antes de tudo, é necessário configurar o ambiente da sua máquina para ter todos os softwares necessários para rodar o projeto. Certifique-se de ter os seguintes programas instalados e configurados:

- Node.JS v18+ / npm v8.0+ [[Download](https://nodejs.org/en/download)]
- MySQL Server v8.0+ [[Download](https://dev.mysql.com/downloads/file/?id=518835)]

### Clonar o repositório

O primeiro passo para começar a mexer no projeto é tê-lo na sua máquina. Para isso, é necessário clonar o repositório no seu ambiente de trabalho. Você pode fazer isso usando a seguinte sequência de comandos no Git Bash:

```
> git clone https://github.com/SmashingThosePumpkins/gestao-tcc.git
> cd gestao-tcc
> git checkout dev
> git checkout -b [nome_do_seu_novo_branch]
```

### Passo 1 - Configurar variáveis de ambiente

Primeiramente, é necessário configurar o projeto para que ele se conecte ao seu banco de dados. Para isso, crie um arquivo com o nome `.env` no diretório raiz do projeto e coloque as seguintes configurações dentro dele:

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=seu-user-aqui
DB_PASS=sua-senha-aqui
APP_PORT=7075
```

| Configuração | Definição |
|-|-|
| `DB_HOST` | É o endereço onde o banco de dados está instalado. Se você possui o banco rodando na mesma máquina que você está rodando o código, esse campo pode ser definido como `127.0.0.1` ou `localhost` |
| `DB_PORT` | É a porta do seu banco, configurada ao instalar o MySQL. Por padrão, é a porta `3306`. |
| `DB_USER` | User do banco de dados, configurado ao instalar o MySQL. |
| `DB_PASS` | Senha do banco de dados, configurado ao instalar o MySQL. |
| `APP_PORT` | É a porta que será utilizada para se conectar ao servidor. |

### Passo 2 - Fazer o build do projeto

O próximo passo é baixar todas as dependências necessárias para o projeto funcionar, e de quebra já fazer o setup das tabelas do banco de dados. Para isso, rode o seguinte comando no terminal:

```
> npm run build
```

### Passo 3 - Iniciar o servidor
 
Agora rode o seguinte comando no terminal para iniciar o servidor:

```
> npm run start
```

### Passo 4 - Acessar

Tudo pronto!

Agora basta inserir a URL do site em seu navegador e acessá-lo.

```
http://[seu-host]:[sua-porta]
http://127.0.0.1:7075
```
