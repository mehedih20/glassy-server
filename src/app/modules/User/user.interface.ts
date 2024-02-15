export type TUser = {
  username: string;
  email: string;
  role: "user" | "manager" | "super-admin";
  password: string;
};

export type TUserLogin = {
  username: string;
  password: string;
};
