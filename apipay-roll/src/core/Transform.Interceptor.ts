import {Injectable,NestInterceptor,ExecutionContext,CallHandler} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: any;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
    constructor (private reference : Reflector,private configService : ConfigService ){
    }
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next
      .handle()
      .pipe(
        map((data) => ({
          author: "*",
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: this.reference.get<string>('response_message',context.getHandler(),)||' ',
          data: data
          
        })),
      );
  }
}