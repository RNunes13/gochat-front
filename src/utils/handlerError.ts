
export interface IError {
  code: string;
  message: string;
}

export class HandlerError {
  public static getErrorMessage(error: any): string {
    if ('code' in error) {
      const { code, message } = error;

      switch(code) {
        case 'auth/incorrect-credentials': return 'Credenciais de login incorretas';
        case 'user/bad-body': return 'Todos os campos são obrigatórios';
        default: return message;
      }
    } else if ('message' in error) {
      const { message } = error;

      switch(message) {
        case 'Username already exists': return 'Nome de usuário já existe';
        default: return message;
      }
    } else {
      return error.message ? error.message : error;
    }
  }
}
