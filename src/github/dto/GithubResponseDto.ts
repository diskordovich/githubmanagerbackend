import { IsString, IsNumber, IsBoolean, IsOptional, IsUrl, IsDateString, ValidateNested, IsArray, IsEnum, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class GithubResponseDto {
    @IsString()
    name: string;

    @IsObject()
    owner: GithubOwner;

    @IsString()
    html_url: string;

    @IsNumber()
    stargazers_count: number;

    @IsNumber()
    forks_count: number;

    @IsString()
    open_issues_count: number;

    @IsDateString()
    created_at: Date;

    @IsDateString()
    updated_at: Date;
}

class GithubOwner {
    @IsString()
    login: string;
}

