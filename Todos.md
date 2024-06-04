

[ ] GET “/users/me” - Ver seu próprio usuário (Todos). Retorna a entidade Usuario.
[ ] GET “/users/” - Ver todos os usuários (Administrador). Retorna uma lista da
entidade Usuario.
[ ] GET “/users/:user_id” - Ver determinado usuário (Administrador, Líder da equipe,
Líder das demais equipes somente se “user_id” designar um líder). Retorna a entidade
Usuario.
[ ] GET “/teams/” - Ver todas as equipes (Administrador, Líder de qualquer equipe).
Retorna uma lista da entidade Equipe.
[ ] GET “/teams/:team_id” - Ver determinada equipe (Administrador, Líder de qualquer
equipe, Funcionário da equipe). Retorna a entidade Equipe.
[ ] GET “/teams/:team_id/members” – Ver os membros de determinada equipe
(Administrador, Líder da equipe, Funcionário da equipe). Retorna uma lista da entidade
Usuario.
[ ] POST “/login” – Se autenticar, ganhando uma sessão (Todos e não autenticado).
Retorna um token de acesso.
[ ] POST “/users/” - Criar um novo usuário (Todos e não autenticado). Retorna a
entidade Usuario recém-criada.
[ ] POST “/teams/” - Criar uma nova equipe (Administrador). Retorna a entidade
Equipe recém-criada
[ ] POST “/teams/:team_id/member/:user_id” - Adicionar membro na equipe
(Administrador, Líder da equipe). Retorna a entidade Usuario.
[ ] PATCH “/users/:user_id” - Atualizar usuário (O próprio usuário, Administrador pode
usar essa rota para converter um usuário em admin). Retorna a entidade Usuario.
[ ] PATCH “/teams/:team_id” - Atualizar equipe (Administrador, Líder da equipe).
Retorna a entidade Equipe.
[ ] DELETE “/teams/:team_id/member/:user_id” - Retirar membro da equipe
(Administrador, Líder da equipe). Retorna a entidade Usuario.
[ ] DELETE “/users/:user_id” - Deletar usuário (Administrador). Retorna a entidade Usuario deletada.
[ ] DELETE “/teams/:team_id” - Deletar equipe (Administrador). Retorna a entidade
equipe deletada.
[ ] DELETE “/logout” - Deletar sessão (Todos e autenticado).