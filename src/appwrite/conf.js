import config from "../config/config"
import { Client, ID, Databases, Query, Storage } from "appwrite"


export class Service {

    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, { title, content, featuredImage, status, userId })
        } catch (error) {
            console.log("appwrite service error :", error);

        }
    }

    async updatePost(slug,{title, content, featuredImage, status, userId })
    {
       try {
            return await this.databases.updateDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,{title,content,featuredImage,status})
       } catch (error) {
         console.log("appwrite updation service error : ",error);
         
       } 
    }

     async deletePost(slug)
    {
       try {
             await this.databases.deleteDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug)

             return true
       } catch (error) {
         console.log("appwrite deletation service error : ",error);
         return false
       } 
    }

    async getPost(slug)
    {
        try {

            return await this.databases.getDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug)
            
        } catch (error) {
            console.log("appwrite getting post error : ", error);
            return false
            
        }
    }

    async getPosts(queries = [Query.equal("status","active")])
    {
        try {
            
           return await this.databases.listDocuments(config.appwriteDatabaseId,config.appwriteCollectionId,queries)
        } catch (error) {
            console.log("appwrite getPosts error : ",error);
            return false
            
        }
    }

    //file upload service 


    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )

        } catch (error) {
            console.log("appwrite uploadfile error:",error);
            return false;
            
        }
    }

    //file delete service

    async deleteFile(fileId)
    {
        try {
            
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("appwrite deletefile error:",error);
            return false;
            
        }
    }

    //file preview

   getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
}

}

const service = new Service();
export default service


