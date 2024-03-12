const config = {
    appWriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinyMCEApiKey : String(import.meta.env.VITE_TINY_API_KEY)
}

export default config