
export interface CustomResponse {
  success: boolean;
  data?: any;
  error?: {
    code: string;
    message: string;
  }
}
