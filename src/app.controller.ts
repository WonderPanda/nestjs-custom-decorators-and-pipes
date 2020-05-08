import { Controller, Get, UsePipes, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomPipe } from './custom.pipe';
import { CustomDecorator } from './custom.decorator';
import { ApiProperty, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class ExampleDto {
  @ApiProperty({ required: true, type: 'string' })
  name: any;

  @IsNotEmpty()
  another: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UsePipes(CustomPipe)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: ExampleDto })
  @Post()
  getHello(@CustomDecorator(new CustomPipe()) example: ExampleDto): string {
    return this.appService.getHello();
  }
}
