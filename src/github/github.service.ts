import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AddRepositoryDto } from "./dto/AddRepositoryDto";
import axios from "axios";
import { GithubResponseDto } from "./dto/GithubResponseDto";

@Injectable()
export class GithubService {
  constructor(private readonly prisma: PrismaService) {}

  async getRepositories(userId: string) {
    return this.prisma.repository.findMany({
      where: { userId },
    });
  }

  async addRepository(addRepositoryDto: AddRepositoryDto, userId: string) {
    const repository = await this.getRepositoryData(addRepositoryDto.url);

    return this.prisma.repository.create({
      data: {
        name: repository.name,
        owner: repository.owner.login,
        url: repository.html_url,
        stars: repository.stargazers_count,
        forks: repository.forks_count,
        issues: repository.open_issues_count,
        repositoryCreatedAt: repository.created_at,
        userId,
      },
    });
  }

  async deleteRepository(repositoryId: string) {
    return this.prisma.repository.delete({
      where: { id: repositoryId },
    });
  }

  async updateRepository(repositoryId: string) {
    const repository = await this.prisma.repository.findUnique({
      where: { id: repositoryId },
    });

    if (!repository) {
      throw new BadRequestException("Repository not found");
    }

    const repositoryData = await this.getRepositoryData(repository.url);

    return this.prisma.repository.update({
      where: { id: repositoryId },
      data: {
        name: repositoryData.name,
        owner: repositoryData.owner.login,
        url: repositoryData.html_url,
        stars: repositoryData.stargazers_count,
        forks: repositoryData.forks_count,
        issues: repositoryData.open_issues_count,
        repositoryCreatedAt: repositoryData.created_at,
      },
    });
  }

  private async getRepositoryData(url: string) {
    try {
      const regex = /https:\/\/github\.com\/(.*)\/(.*)/;
      const match = url.match(regex);
      let owner = "";
      let repositoryName = "";

    // Обробляю й url, й owner/repositoryName
    if (!match) {
      if (url.split("/").length == 2) {
        owner = url.split("/")[0];
        repositoryName = url.split("/")[1];
      } else {
        throw new BadRequestException("Invalid repository URL");
      }
    } else {
      owner = match[1];
      repositoryName = match[2];
    }

    const repositoryData = await axios.get<GithubResponseDto>(
      `https://api.github.com/repos/${owner}/${repositoryName}`
    );
    
    const repository = repositoryData.data;

    if (!repository) {
        throw new BadRequestException("Repository not found");
      }

      return repository;
    } catch (error) {
      throw new BadRequestException("Invalid repository URL");
    }
  }
}
