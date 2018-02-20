import { ErrorHandler } from '@angular/core';

// Centralized unhandled errors
export class AppErrorHandler implements ErrorHandler {
    handleError(error) {
        // alert('An unexpected error occurred: ' + error);
        console.error(error);
    }
}
