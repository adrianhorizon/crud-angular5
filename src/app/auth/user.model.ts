export class User {
    // recibe nombre y apellido
    constructor (
        public email: string,
        public password: string,
        // ? es para opcional el nombre y apellido
        public firstName?: string,
        public lastName?: string
    ) { }

    fullName() {
        // comillas `` importantes
        return `${this.firstName}${this.lastName}`;
      }
}
