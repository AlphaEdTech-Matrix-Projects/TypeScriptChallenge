[X] GET “/users/me” - Ver seu próprio usuário (Todos). Retorna a entidade Usuario.

[X] GET “/users/” - Ver todos os usuários (Administrador). Retorna uma lista da entidade Usuario.

[ ] GET “/users/:user_id” - Ver determinado usuário (Administrador, Líder da equipe, Líder das demais equipes somente se “user_id” designar um líder). Retorna a entidade Usuario.

[X] GET “/teams/” - Ver todas as equipes (Administrador, Líder de qualquer equipe). Retorna uma lista da entidade Equipe.

[X] GET “/teams/:team_id” - Ver determinada equipe (Administrador, Líder de qualquer equipe, Funcionário da equipe). Retorna a entidade Equipe.

[X] GET “/teams/:team_id/members” – Ver os membros de determinada equipe (Administrador, Líder da equipe, Funcionário da equipe). Retorna uma lista da entidade Usuario.

[X] POST “/login” – Se autenticar, ganhando uma sessão (Todos e não autenticado). Retorna um token de acesso.

[ ] POST “/users/” - Criar um novo usuário (Todos e não autenticado). Retorna a entidade Usuario recém-criada.

[X] POST “/teams/” - Criar uma nova equipe (Administrador). Retorna a entidade Equipe recém-criada

[X] POST “/teams/:team_id/member/:user_id” - Adicionar membro na equipe (Administrador, Líder da equipe). Retorna a entidade Usuario.

[ ] PATCH “/users/:user_id” - Atualizar usuário (O próprio usuário, Administrador podeusar essa rota para converter um usuário em admin). Retorna a entidade Usuario.

[X] PATCH “/teams/:team_id” - Atualizar equipe (Administrador, Líder da equipe). Retorna a entidade Equipe.

[X] DELETE “/teams/:team_id/member/:user_id” - Retirar membro da equipe (Administrador, Líder da equipe). Retorna a entidade Usuario.

[ ] DELETE “/users/:user_id” - Deletar usuário (Administrador). Retorna a entidade Usuario deletada.

[X] DELETE “/logout” - Deletar sessão (Todos e autenticado).

[X] DELETE “/teams/:team_id” - Deletar equipe (Administrador). Retorna a entidade equipe deletada.

# Atualizar o login para retornar o token de acesso
