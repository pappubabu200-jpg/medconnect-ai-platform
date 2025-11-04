import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private ai: AiService) {}

  @Post('draft-post')
  async draft(@Body() body: any) {
    return this.ai.draftPost(body);
  }

  @Post('summarize-session')
  async summarize(@Body() body: any) {
    return this.ai.summarizeSession(body);
  }
}
