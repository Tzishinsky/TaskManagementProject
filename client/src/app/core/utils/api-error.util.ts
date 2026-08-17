import { HttpErrorResponse } from '@angular/common/http';

import { ApiError } from '../../models/api-error';

export function getApiError(
  error: HttpErrorResponse
): ApiError {
  if (
    error.error &&
    typeof error.error === 'object' &&
    'message' in error.error
  ) {
    return error.error as ApiError;
  }

  return {
    statusCode: error.status,
    message: error.message || 'An unexpected error occurred.',
    errors: null
  };
}
