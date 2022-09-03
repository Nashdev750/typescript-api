import { Router, Request, Response,NextFunction} from "express";
import Controller from "@/utils/interfaces/controller.interfaces";
import validate from "./post.validation";
import PostService from "./post.service";
import HttpExcemptions from "../../utils/excemptions/http.excemption";
import validationMiddleware from "../../middleware/validation.middleware";


class PostController implements Controller {
    public path: string = "/post";
    public router: Router = Router();
    private postService = new PostService();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(): void{
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.create),
            this.create
            )
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {title, body} = req.body;
            const post = await this.postService.create(title,body)
            res.status(201).send(post);
        } catch (error:any) {
           next(new HttpExcemptions(500,error?.message));
           
        }
    }
}

export default PostController