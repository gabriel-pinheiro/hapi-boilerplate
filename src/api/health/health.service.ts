import {Service} from "../../utils/decorators/service";

@Service()
export class HealthService {

    async getHealth(): Promise<boolean> {
        return true;
    }
}
