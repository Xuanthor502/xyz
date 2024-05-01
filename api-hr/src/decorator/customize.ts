import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';


export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);


export const RESPONSE_MESSAGE = 'response_message';
export const ResponseMessage = (message :string ) => SetMetadata(RESPONSE_MESSAGE , message);


export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const CheckRefreshToken = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user; // Assume user object is stored in request, adjust if needed
  },
);