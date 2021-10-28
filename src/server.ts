import express from 'express';
import {v4 as uuid} from 'uuid';
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// Métodos HTTP -> GET | POST | PUT | DELETE

// Tipos de parâmetros:
// Query Params, Route Params, Request Body

// http://api.meusite.com/users
// em particular, http://localhost:3333/users
// req(uest); res(ponse). definindo os métodos com função de call back

interface User {
    id: string
    name: string
    email: string
}

const users:User[] = []

app.get('/users', (request, response) => {
    // buscar no banco de dados, os usuários (nesse caso, como é uma api exemplo, não tem banco de dados)

    // retornar os usuários
    return response.json(users)
})

app.post('/users', (request, response) => {
    // receber os dados do novo usuários
    const { name, email } = request.body

    // criar o novo usuário
    const user = { id: uuid(), name, email }

    // registrar esse usuário na base de dados
    users.push(user)

    // retornar os dados do usuário criado
    return response.json(user)
}) ;

app.put('/users/:id', (request, response) => {
    //receber os dados do usuários
    const { id } = request.params
    const { name, email } = request.body

    // localizar o usuário na base de dados
    const userIndex = users.findIndex((user) => user.id === id)

    // se o usuário não existe, retornar um erro
    if (userIndex < 0) {
        return response.status(404).json({ error: 'User not found.'})
    }

    const user = { id, name, email }

    // atualiza o usuário na base de dados
    users[userIndex] = user 

    // retorna os dados do usuário atualizado
    return response.json(user)
});

app.delete('/users/:id', (request, response) => {
    // receber id do usuário
    const { id } = request.params

    // localizar o usuário na base da dados 
    const userIndex = users.findIndex((user) => user.id === id)

    // se o usuário não existir, retornar um erro
    if (userIndex < 0) {
        return response.status(404).json({ error: 'User not found.'})
    }

    // excluir usuário da base de dados
    users.splice(userIndex, 1)

    // retorna status de sucesso
    return response.status(204).send()
});

app.listen('3333', () => {
    console.log('Back-end Started!\nLocalhost:3333') // \n quebra linha
})
