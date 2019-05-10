import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsJSON, IsDateString } from 'class-validator';

export class SwaggerExampleDto {
  @ApiModelProperty()
  @IsString()
  readonly userGithub: string;
  // @ApiModelProperty()
  // @IsString()
  // readonly comment: string;
  // @ApiModelProperty()
  // @IsDateString()
  // readonly createdAt: string;
  // @ApiModelProperty()
  // @IsDateString()
  // readonly updatedAt: string;
}
