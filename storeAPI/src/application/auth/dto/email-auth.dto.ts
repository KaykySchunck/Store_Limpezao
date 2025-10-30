export interface EmailAuthDto {
  email: string;
  password: string;
}

export interface EmailAuthResponseDto {
  token: string;
  id: string;
}
