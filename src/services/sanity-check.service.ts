import { HttpBasedService } from 'src/services/httb-based.service';

const BASE_PATH = '/';

interface ServerState {
  status: number;
}

class SanityCheckService extends HttpBasedService {
  async check() {
    const res = await this.httpClient.get<ServerState>(BASE_PATH);
    return res.data;
  }
}

const sanityCheckService = new SanityCheckService();

export { sanityCheckService };
