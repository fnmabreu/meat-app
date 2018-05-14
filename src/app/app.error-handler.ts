import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

export class ErrorHandler {
    static handleError(error: Response | any) {
        let errMsg: string;

        if (error instanceof HttpErrorResponse) {
            errMsg = `Erro ${error.status} ao obter o URL ${error.url} - ${error.statusText}`;
        } else {
            console.log('Error2');
            errMsg = error.toString();
        }
        console.log(errMsg);
        return Observable.throw(errMsg);
    }
}
