import conf from '../config/config.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
    try {
        return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
        throw error;
    }
}


   

async getCurrentUser() {
    let cachedUser = null;
    if (cachedUser) return cachedUser;
    try {
        cachedUser = await this.account.get();
        return cachedUser;
    } catch (error) {
        console.log("Appwrite service :: getCurrentUser :: error", error);
    }
    return null;
}

    async logout() {
    try {
        const user = await this.account.get(); // Will throw if not logged in
        if (user) {
            await this.account.deleteSessions();
        }
    } catch (error) {
        console.log("Logout error: probably no active session", error);
    }
}

}

const authService = new AuthService();

export default authService

