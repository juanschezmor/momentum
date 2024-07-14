export class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.username = email.split("@")[0];
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      username: this.username,
    };
  }
}
