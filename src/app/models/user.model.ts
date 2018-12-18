export class User {
  email: string;
  passwd: string;

  constructor(email, passwd) {
    this.email = email || '';
    this.passwd = passwd || '';
  }
}
