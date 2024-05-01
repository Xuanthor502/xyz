import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs";


export interface Response<T> {
  statusCode: number;
  message: string;
  data: any;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
    constructor (private reference : Reflector){
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