class Auth {
  constructor() {
    this.Validator();
  }

  Validator() {
    this.isValid(() => {
      return false;
    });

    this.isAuthorized((user) => {
      return false;
    });

    this.isAuthenticated((user) => {
      return false;
    });

    this.Authenticate((user) => {
      // authenticate the user for all requests and return the new Autheticated user
    });
  }
}

export default new Auth();
