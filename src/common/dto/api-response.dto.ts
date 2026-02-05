import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty()
  data: T;

  @ApiPropertyOptional()
  message?: string;

  constructor(data: T, message?: string) {
    this.data = data;
    if (message) {
      this.message = message;
    }
  }
}

export class ErrorDetailDto {
  @ApiProperty()
  field: string;

  @ApiProperty()
  message: string;

  @ApiPropertyOptional()
  code?: string;
}

export class ErrorResponseDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;

  @ApiPropertyOptional({ type: [ErrorDetailDto] })
  details?: ErrorDetailDto[];

  @ApiPropertyOptional()
  requestId?: string;

  @ApiProperty()
  timestamp: string;

  constructor(code: string, message: string, details?: ErrorDetailDto[]) {
    this.code = code;
    this.message = message;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}
