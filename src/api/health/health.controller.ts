import {Provider} from "../../utils/decorators/provider";
import * as Hapi from '@hapi/hapi';
import {HealthService} from "./health.service";

@Provider()
export class HealthController {
    constructor(
        private readonly service: HealthService,
    ) { }

    async listAll(_request: Hapi.Request, _h: Hapi.ResponseToolkit) {
        return await this.service.getHealth();
    }
}
