import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common";
import { GithubService } from "./github.service";
import { AddRepositoryDto } from "./dto/AddRepositoryDto";
import { AuthenticationToken } from "src/auth/auth.decorator";
import { UserFromTokenPipe } from "src/auth/auth.pipe";
import { User } from "@prisma/client";

@Controller("github")
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get("repositories")
  getRepositories(@AuthenticationToken(UserFromTokenPipe) user: User) {
    return this.githubService.getRepositories(user.id);
  }

  @Post("repository")
  addRepository(@Body() addRepositoryDto: AddRepositoryDto, @AuthenticationToken(UserFromTokenPipe) user: User) {
    return this.githubService.addRepository(addRepositoryDto, user.id);
  }

  @Delete("repository/:id")
  deleteRepository(@Param("id") id: string) {
    return this.githubService.deleteRepository(id);
  }

  @Put("repository/:id")
  updateRepository(@Param("id") id: string) {
    return this.githubService.updateRepository(id);
  }
}
