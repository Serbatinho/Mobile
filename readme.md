###############################################

# Projeto de Monitoramento de Poluição Ambiental com IA

###############################################

Este aplicativo permite que usuários comuniquem a localização de poluição ambiental por meio de fotos.
As imagens passam por uma AI de detecção de resíduos e os relatórios são direcionados diretamente para ONGs.

=========================

# Integrantes

=========================

- Ronald de Oliveira Farias - RM552364
- Gabriel Souza de Queiroz – RM98570
- Gustavo Carvalho Noia - RM552466
- Lucas Serbato de Barros - RM551821
- Vitor Teixeira Silva - RM552228

=========================

# Chave de Criação de Conta de Administrador

=========================

- **Chave**: `12345`

=========================

# Explicação da Criação de Contas no Firebase

=========================
Processo de Criação de Contas

---

1. **Cadastro de Usuário**: O usuário fornece um nome de usuário, email, senha e uma imagem de avatar (opcional).
2. **Verificação de Nome de Usuário**: O aplicativo verifica se o nome de usuário já existe no Firestore. Caso exista, o usuário é notificado.
3. **Código de Administrador**: Se o usuário desejar se registrar como administrador, ele deve fornecer o código de administrador correto (`12345`).
4. **Criação da Conta**: Com as informações verificadas, a conta é criada no Firebase Authentication e o perfil do usuário é salvo no Firestore.
5. **Avatar**: Se o usuário enviou uma imagem de avatar, ela é carregada no Firebase Storage e a URL é salva no perfil do usuário no Firestore.

## Estrutura do Firestore para Usuários

- **Coleção**: `users`
- **Documento**: ID do usuário (gerado automaticamente pelo Firebase Authentication)
- **Campos**:
  - `email`: O email do usuário.
  - `username`: O nome de usuário.
  - `isAdmin`: Booleano indicando se o usuário é administrador.
  - `avatar`: URL da imagem de avatar do usuário.

=========================

# Explicação da Criação e Consulta de Chamados no Firebase

=========================
Processo de Criação de Chamados

---

1. **Abertura de Chamado**: O usuário envia uma descrição, coordenadas e uma imagem da poluição ambiental.
2. **Armazenamento de Imagem**: A imagem é carregada no Firebase Storage e a URL é obtida.
3. **Salvamento do Chamado**: As informações do chamado (descrição, coordenadas, URL da imagem, ID do usuário, status inicial e timestamp) são salvas em um documento na coleção `chamados` no Firestore.

## Estrutura do Firestore para Chamados

- **Coleção**: `chamados`
- **Documento**: ID do chamado (gerado automaticamente)
- **Campos**:
  - `description`: Descrição do chamado.
  - `coordinate`: Coordenadas da localização.
  - `imageURL`: URL da imagem do chamado.
  - `userId`: ID do usuário que abriu o chamado.
  - `status`: Status do chamado (por exemplo, "em andamento", "resolvido", "inválido").
  - `createdAt`: Timestamp da criação do chamado.
  - `comments`: Lista de comentários de administradores com status e descrições.

## Processo de Consulta de Chamados

1. **Consulta de Chamados do Usuário**: Os chamados são consultados na coleção `chamados` filtrando pelo `userId` do usuário logado.
2. **Consulta de Chamados para Administradores**: Todos os chamados são consultados e ordenados por `createdAt` para que os administradores possam visualizá-los e atualizá-los.

=========================

# Projeto

=========================
Este aplicativo permite que usuários comuniquem a localização de poluição ambiental por meio de fotos, que passarão por uma AI de detecção de resíduos, e direcionem os relatórios diretamente para ONGs.
O objetivo é facilitar a denúncia de poluição e promover ações rápidas de limpeza e preservação ambiental por parte das ONGs.

=========================

# Github repository

=========================
https://github.com/Serbatinho/global_mobile
