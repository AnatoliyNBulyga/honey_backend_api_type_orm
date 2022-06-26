import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import Post from './posts.entity';
import { PostNotFoundExcaption } from './excaptions/post-not-found.excaption';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async getAllPosts() {
    try {
      return await this.postRepository.find();
    } catch (e) {
      console.log(e, 'e in get posts service');
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
  async getPostById(id) {
    try {
      const post = await this.postRepository.findOne({ where: { id } });
      if (!post) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      return post;
    } catch (e) {
      console.log(e, 'e in get post by id service');
      throw new BadRequestException();
    }
  }
  async createPost(post) {
    try {
      const createdPost = this.postRepository.create(post);
      await this.postRepository.save(createdPost);
      return createdPost;
    } catch (e) {
      console.log(e, 'e in create post service');
      throw new BadRequestException();
    }
  }
  async updatePost(id, post) {
    try {
      await this.postRepository.update(id, post);
      const updatedPost = await this.postRepository.findOne({ where: { id } });
      if (!updatedPost) {
        throw new PostNotFoundExcaption(id);
      }
      return updatedPost;
    } catch (e) {
      console.log(e, 'e in update post service');
      throw new BadRequestException();
    }
  }
  async deletePost(id) {
    try {
      const candidate = await this.postRepository.findOne({ where: { id } });
      if (!candidate) {
        throw new PostNotFoundExcaption(id);
      }
      await this.postRepository.delete(id);
      return candidate;
    } catch (e) {
      console.log(e, 'e in delete post service');
      throw new BadRequestException();
    }
  }
}
