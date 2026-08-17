import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { catchError, throwError } from 'rxjs';

import { ApiError } from '../../models/api-error';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      const apiError = error.error as ApiError;

      console.error('API Error:', {
        statusCode: apiError?.statusCode ?? error.status,
        message: apiError?.message ?? error.message,
        errors: apiError?.errors ?? null
      });

      return throwError(() => error);
    })
  );
};
