import config from "../config/config";
import { Client, ID, Databases, Query } from "appwrite";

class DatabaseService {
    client = new Client()
    databases

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId)

        this.databases = new Databases(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        console.log(title, slug, content, featuredImage, status, userId)
        try {
            return await this.databases.createDocument(
                config.appWriteDatabseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabseId,
                config.appWriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error)
            return false
        }
    }

    async getPost(slug) {
        try {
            await this.databases.getDocument(
                config.appWriteDatabseId,
                config.appWriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error)
            return false

        }
    }

    async getPosts() {
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabseId,
                config.appWriteCollectionId
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }
}

const databaseService = new DatabaseService()
export default databaseService