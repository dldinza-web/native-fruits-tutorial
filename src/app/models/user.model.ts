export class User {
  constructor(
    public id: number,
    public email: string,
    public passwd: string
  ) {
    this.id = id || null;
    this.email = email || '';
    this.passwd = passwd || '';
  }
}
