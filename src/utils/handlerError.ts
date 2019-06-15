
export interface IError {
  code: string;
  message: string;
}

export class HandlerError {
  public static getErrorMessage(error: IError): string {
    const { code, message } = error;

    switch(code) {
      case 'auth/incorrect-credentials':
        return 'Credenciais de login incorretas';
      default:
        return message;
    }
  }
}
