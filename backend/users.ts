export class User {
  constructor(
    public email: string,
    public name: string,
    private password: string
  ) {}

  matches(another: User): boolean {
    return (
      another !== undefined &&
      another.email === this.email &&
      another.password === this.password
    );
  }
}

export const users: { [key: string]: User } = {
  'fabio@meatapp.com': new User('fabio@meatapp.com', 'fabio', 'fabio22'),
  'admin@meatapp.com': new User('admin@meatapp.com', 'admin', 'admin12')
};
