export type UserType = {
  email: string;
  password: string;
  role: "BASIC" | "ADMIN" | "SUPER_ADMIN";
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
