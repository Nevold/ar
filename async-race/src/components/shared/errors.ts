import type { CustomAxiosError } from '../types/types';

export function isAxiosErrorCustom(error: unknown): error is CustomAxiosError<string> {
  return (
    error instanceof Error &&
    'isAxiosError' in error &&
    error.isAxiosError === true &&
    'response' in error &&
    'request' in error
  );
}
