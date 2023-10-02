import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

// CE CODE MARCHE MAIS EST SIMPLE & BASIQUE
// export class SerializerInterceptor implements NestInterceptor {
//   intercept(
//     context: ExecutionContext,
//     next: CallHandler<any>,
//   ): Observable<any> | Promise<Observable<any>> {
//     return next.handle().pipe(
//       map((data: any) => {
//         return plainToClass(UserDto, data, {
//           excludeExtraneousValues: true,
//         });
//       }),
//     );
//   }
// }

// CUSTOM INTERCEPTOR
export class SerializerInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

interface ClassConstructor {
  new (args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
// export function Serialize(dto: any) {
  return UseInterceptors(new SerializerInterceptor(dto));
}
