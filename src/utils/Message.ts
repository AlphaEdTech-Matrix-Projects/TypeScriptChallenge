export const Message = {
  UNAUTHORIZED_ACTION: "Sem permissão de ação",
  UNAUTHORIZED_ACCESS: "Sem permissão de acesso",
  JWT_MALFORMATED: "Jwt incorreto",
  USERNAME_OR_PASSWORD_INCORRECT: "Usuario ou senha incorretos",
  LOGIN_SUCCESS: "Login realizado com sucesso",
  LOGOUT_SUCCESS: "Desconectou com sucesso",

  TEAM_NOT_FOUND: "Time não encontrado",
  USER_NOT_FOUND: "Usuário não encontrado",
  USER_ALREADY_TEAM: "Usuário já está em um time",
  USER_ALREADY_LEADER: "Usuário já é lider de um time",
  ADMIN_CANNOT_JOIN_TEAM: "Adminstrador não pode particpar de um time",

  FAILED_ADD_MEMBER: "Falha ao adicionar membro ao time",
  FAILED_REMOVE_MEMBER: "Falha ao remover membro do time",
  FAILED_DELETE_TEAM: "Falha ao deletar o time",
  FAILED_UPDATE_TEAM: "Falha ao atualizar o time",
  TEAM_ALREADY_MEMBERS: "O time ainda tem membros",

  LEADER_NOT_REMOVE_SELF: "O líder não pode se remover do time",
  USER_NOT_ALREADY_TEAM: "Usuário não pertece a esse time",
  TEAM_MAX_SIZE: "Tamanho do máximo do time atingido",
  USER_IS_ADMIN: "Usuário é um administrador",
} as const;
