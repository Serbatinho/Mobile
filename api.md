###############################################

# API Documentation

###############################################

=========================

# Endpoints

=========================

###############################################

# 1. Criação de Usuário

###############################################

### Endpoint:

- POST `/api/users`

### Descrição:

Cria um novo usuário no sistema.

### Requisição:

{
"email": "example@example.com",
"username": "exampleUser",
"password": "examplePassword",
"isAdmin": false,
"adminCode": "12345", // opcional, necessário apenas se isAdmin for true
"avatar": "data:image/png;base64,iVBORw0KGgoAAA..." // opcional
}

### Retorno:

{
"message": "Usuário criado com sucesso!",
"userId": "abcd1234efgh5678"
}

### Notas:

- Se o usuário não fornecer um avatar, será utilizada a imagem padrão do sistema.
- A imagem padrão do sistema é armazenada em: `https://firebasestorage.googleapis.com/v0/b/global2tdss-e49ce.appspot.com/o/system%2Fuser.jpg?alt=media&token=3de90bcd-239e-4934-99af-9b012aec3757`

###############################################

# 2. Login de Usuário

###############################################

### Endpoint:

- POST `/api/auth/login`

### Descrição:

Realiza o login de um usuário.

### Requisição:

{
"identifier": "exampleUser", // pode ser email ou nome de usuário
"password": "examplePassword"
}

### Retorno:

{
"message": "Login realizado com sucesso!",
"user": {
"userId": "abcd1234efgh5678",
"email": "example@example.com",
"username": "exampleUser",
"isAdmin": false,
"avatar": "https://example.com/avatar.png"
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

###############################################

# 3. Abertura de Chamado

###############################################

### Endpoint:

- POST `/api/chamados`

### Descrição:

Cria um novo chamado de poluição ambiental.

### Requisição:

{
"description": "Lixo na praia",
"coordinate": "12345,67890",
"image": "data:image/png;base64,iVBORw0KGgoAAA...",
"userId": "abcd1234efgh5678"
}

### Retorno:

{
"message": "Chamado criado com sucesso!",
"chamadoId": "ijkl9012mnop3456"
}

###############################################

# 4. Consulta de Chamados do Usuário

###############################################

### Endpoint:

- GET `/api/chamados/user/{userId}`

### Descrição:

Consulta todos os chamados abertos por um usuário específico.

### Requisição:

- Nenhuma

### Retorno:

[
{
"id": "ijkl9012mnop3456",
"description": "Lixo na praia",
"coordinate": "12345,67890",
"status": "em_andamento",
"createdAt": "2023-06-01T12:34:56Z",
"imageURL": "https://example.com/image.png",
"comments": [
{
"adminEmail": "admin@example.com",
"description": "Estamos verificando",
"timestamp": "2023-06-02T14:56:78Z"
}
]
}
]

###############################################

# 5. Consulta de Todos os Chamados (Admin)

###############################################

### Endpoint:

- GET `/api/chamados`

### Descrição:

Consulta todos os chamados no sistema. (Apenas para administradores)

### Requisição:

- Nenhuma

### Retorno:

[
{
"id": "ijkl9012mnop3456",
"description": "Lixo na praia",
"coordinate": "12345,67890",
"status": "em_andamento",
"createdAt": "2023-06-01T12:34:56Z",
"imageURL": "https://example.com/image.png",
"userEmail": "user@example.com",
"comments": [
{
"adminEmail": "admin@example.com",
"description": "Estamos verificando",
"timestamp": "2023-06-02T14:56:78Z"
}
]
}
]

###############################################

# 6. Atualização de Status de Chamado (Admin)

###############################################

### Endpoint:

- PUT `/api/chamados/{chamadoId}`

### Descrição:

Atualiza o status de um chamado e adiciona um comentário. (Apenas para administradores)

### Requisição:

{
"status": "resolvido",
"description": "O problema foi resolvido"
}

### Retorno:

{
"message": "Chamado atualizado com sucesso!"
}

###############################################

# 7. Exclusão de Chamado (Admin)

###############################################

### Endpoint:

- DELETE `/api/chamados/{chamadoId}`

### Descrição:

Exclui um chamado do sistema. (Apenas para administradores)

### Requisição:

- Nenhuma

### Retorno:

{
"message": "Chamado excluído com sucesso!"
}

###############################################

# 8. Exclusão de Chamado pelo Usuário

###############################################

### Endpoint:

- DELETE `/api/chamados/user/{chamadoId}`

### Descrição:

Exclui um chamado do sistema feito pelo próprio usuário.

### Requisição:

- Nenhuma

### Retorno:

{
"message": "Chamado excluído com sucesso!"
}

###############################################

# 9. Modificação de Avatar do Usuário

###############################################

### Endpoint:

- PUT `/api/users/{userId}/avatar`

### Descrição:

Modifica o avatar do usuário.

### Requisição:

{
"avatar": "data:image/png;base64,iVBORw0KGgoAAA..."
}

### Retorno:

{
"message": "Avatar atualizado com sucesso!",
"avatarURL": "https://example.com/new-avatar.png"
}

### Notas:

- Se o usuário já possui um avatar, a imagem anterior é deletada do armazenamento.
- A nova imagem é carregada e a URL do novo avatar é atualizada no perfil do usuário.
