type Role = "BASIC" | "ADMIN" | "SUPER_ADMIN"
export type UserType = {
  email: string;
  password: string;
  role: Role;
};

export type Auth = Pick<UserType, "email" | "password">;

export type Profile = {
  fistName: string;
  lastName: string;
  city: string;
  dob: Date;
  postalCode: string;
};

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}


export type AccessTokenPayload = {
  userId: string;
  email: string;
  role:Role;
}


export type RefreshTokenPayload = Pick<AccessTokenPayload, "userId" | "email">