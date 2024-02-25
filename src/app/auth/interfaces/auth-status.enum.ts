export enum AuthStatus {
  // si se deja asi
  // checking ,
  // authenticated,
  // noAuthenticated
  // la enumeracion les va a dar los valores por defecto de 0, 1 y 2
  // por eso mejor los igualamos para que sus valores sean los mismos que el key
  checking = 'checking',
  authenticated = 'authenticated',
  noAuthenticated = 'noAuthenticated'
}
