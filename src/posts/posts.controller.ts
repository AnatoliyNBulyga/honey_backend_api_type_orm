import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto, UpdateIdPostDto } from './dto/post.dto';
import JwtAccessAuthGuard from '../auth/guards/jwt-access-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts() {
    return await this.postsService.getAllPosts();
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get(':id')
  async getPostById(@Param() params: UpdateIdPostDto) {
    return await this.postsService.getPostById(params.id);
  }

  @UseGuards(JwtAccessAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async createPost(@Body() post: PostDto) {
    return await this.postsService.createPost(post);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Put(':id')
  async updatePost(@Param() params: UpdateIdPostDto, @Body() post: PostDto) {
    return await this.postsService.updatePost(params.id, post);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Delete(':id')
  async deletePost(@Param() params: UpdateIdPostDto) {
    return await this.postsService.deletePost(params.id);
  }
}
