import {Provider} from "../../utils/decorators/provider";
import {IRouter} from "../../utils/router";
import {HealthController} from "./health.controller";

@Provider()
export class HealthRouter implements IRouter{
    constructor(
        private readonly controller: HealthController,
    ) { }

    async getRoutes() {
        return [{
            method: 'GET',
            path: '/health',
            handler: this.controller.listAll.bind(this.controller),
        }];
    }
}
