import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  async create(authorId: string, content: string, tags: string[] = []) {
    return this.prisma.post.create({ data: { authorId, content, tags } });
  }
  async list(cursor?: string, limit = 20) {
    return this.prisma.post.findMany({ orderBy: { createdAt: 'desc' }, take: limit });
  }
}
