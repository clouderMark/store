import {makeAutoObservable} from 'mobx';
import {IRegistration} from '../types/types';

class UserStore {
  id: number | null = null;

  email: string | null = null;

  isAuth: boolean = false;

  isAdmin: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  login({id, email, role}: IRegistration): void {
    this.id = id;
    this.email = email;
    this.isAuth = true;
    this.isAdmin = role === 'ADMIN';
  }

  logout(): void {
    this.id = null;
    this.email = null;
    this.isAuth = false;
    this.isAdmin = false;
  }
}

export default UserStore;
