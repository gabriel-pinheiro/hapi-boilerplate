import {IRouter} from "./utils/router";
import {Provider} from "./utils/decorators/provider";
import {HealthRouter} from "./api/health/health.router";

@Provider()
export class MainRouter implements IRouter {
    constructor(
        private readonly healthRouter: HealthRouter,
    ) { }

    async getRoutes() {
        const routes = await Promise.all([
            this.healthRouter.getRoutes(),
        ]);

        return routes.flat();
    }
}
