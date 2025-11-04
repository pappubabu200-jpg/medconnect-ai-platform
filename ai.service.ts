import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiService {
  async draftPost(data: any) {
    // proxy to AI microservice - replace URL in prod
    const res = await axios.post(process.env.AI_SERVICE_URL + '/v1/draft', data, { timeout: 30000 });
    return res.data;
  }

  async summarizeSession(data: any) {
    const res = await axios.post(process.env.AI_SERVICE_URL + '/v1/summarize', data, { timeout: 60000 });
    return res.data;
  }
}
