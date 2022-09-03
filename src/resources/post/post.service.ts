import postModel from "./post.model";
import Post from '@/resources/post/post.interface'

class PostService {

    /**
     * create a new post
     * @params title: string, body: string
     * 
     */
    public async create(title: string, body: string): Promise<Post>{
        try {
            const post = await postModel.create({title, body})
            return post;
        } catch (error) {
            throw new Error("unable to create post");
        }
    }
}

export default PostService;