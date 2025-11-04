import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async list() {
    return this.postsService.list();
  }

  @Post()
  async create(@Body() body: any) {
    return this.postsService.create(body.authorId || 'unknown', body.content || '', body.tags || []);
  }
}
