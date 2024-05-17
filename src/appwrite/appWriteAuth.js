import config from "../config/config";
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId)
        this.account = new Account(this.client)
    }

    // async createAccount({ email, password, name }) {
    //     try {
    //         const userAccount = await this.account.create(ID.unique(), email, password, name)
    //         if (userAccount) {
    //             //login the user
    //             return await this.login({email,password});
    //         } else {
    //             return userAccount;
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            await this.login({ email, password })
            console.log("login done")
            await this.createVerification()
            console.log("creat verification")
            await this.logout()
            console.log("logout done")
            console.log("Appwrite service :: createAccount");
        } catch (error) {
            throw error;
        }
    }

    async createVerification() {
        try {
            await this.account.createVerification("https://wondrous-gumption-b2857b.netlify.app/verify")
            // await this.account.createVerification("http://localhost:5173/verify")
            console.log("Appwrite service :: createVerification");
        } catch (error) {
            throw error
        }
    }

    async updateVerification({ userId, secret }) {
        try {
            await this.account.updateVerification(userId, secret);
            console.log("Appwrite service :: updateVarification");
        } catch (error) {
            console.log("Appwrite service :: updateVerification :: error", error);
            throw error
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Appwrite service :: login :: error", error);
            throw error
        }
    }

    async getCurrentUser() {
        try {
            console.log("Appwrite service :: getCurrentUser")
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions()
            console.log("Appwrite service :: logout")
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

    async passwordRecovery({ email }) {
        try {
            const token = await this.account.createRecovery(email, 'https://wondrous-gumption-b2857b.netlify.app/recover-password')
            // const token = await this.account.createRecovery(email, 'http://localhost:5173/recover-password')
            console.log('Appwrite service :: passwordRecovery')
        } catch (error) {
            console.log("Appwrite service :: passwordRecovery :: error", error)
            throw error
        }
    }

    async updatePasswordRecovery({ userId, secret, password }) {
        try {
            return await this.account.updateRecovery(userId, secret, password)
        } catch (error) {
            console.log("Appwrite service :: passwordRecovery :: error", error)
            throw error
        }
    }

}

const authService = new AuthService();

export default authService