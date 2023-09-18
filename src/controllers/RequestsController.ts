import UserController from "./UserController";

class RequestsController {

    private userController = UserController;

    async redirectRequests(req: any): Promise<Response> {
        const path = new URL(req.url).pathname;
        if (req.method === 'POST') {
            if (path === '/users/create') return await this.userController.save(req);
        }

        if (req.method === 'GET') {
            if (path === '/users') return await this.userController.findAll();
            if (path === '/users/find-by') return await this.userController.entrypoint(req).findBy();
        }

        if (req.method === 'DELETE') {
            if (path === '/users/all') return await this.userController.deleteAll();
            if (path.includes('/users')) return await this.userController.deleteById(req);
        }

        return new Response('404 Not Found', { status: 404 });
    }
}

export default new RequestsController();
