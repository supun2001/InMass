import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthIntercepter implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const localToken = localStorage.getItem('token');
    
    if (localToken) { // Check if token exists in local storage
      const authReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localToken // Add token to the headers
        }
      });
      return next.handle(authReq);
    } else {
      return next.handle(req); // No token, proceed with the original request
    }
  }
}
