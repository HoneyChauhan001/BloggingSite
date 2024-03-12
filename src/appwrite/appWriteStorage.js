import config from "../config/config";
import { Client, Storage, ID } from "appwrite";

class StorageService {
    client = new Client()
    bucket

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId)

        this.bucket = new Storage(this.client)
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appWriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error)
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appWriteBucketId,
            fileId
        )
    }

}

const storageService = new StorageService();
export default storageService