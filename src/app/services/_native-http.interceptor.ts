import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse,
HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete' | 'upload' | 'download';
declare var cordova;

@Injectable()
export class NativeHttpInterceptor implements HttpInterceptor {
constructor(
    private platform: Platform,
) {}
public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const headerKeys = request.headers.keys();
  const headers = {};

  headerKeys.forEach((key) => {
    headers[key] = request.headers.get(key);
  });
  const method =  request.method.toLowerCase() as HttpMethod;
  const url = request.url;
  const options = {
    method: method,
    data: request.body || {},
    headers: headers,
    serializer: 'json',
  };

  return (this.platform.is('cordova') ? this.callNative(url, options) : next.handle(request)).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.type === 4) { }
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
          }
        }
      )
    );
  }

callNative(url, options) {
  console.log('— Request obj');
  console.log(options);
  return new Observable(ob => {
      cordova.plugin.http.sendRequest(url, options, this.successCallback(ob),
        this.errorCallback(ob));
    // switch (method) {
    //   case 'GET':
    //     cordova.plugin.http.get(url, headers, params, this.successCallback(ob),
    //       this.errorCallback(ob));
    //     break;
    //   case 'POST':
    //     cordova.plugin.http.post(url, headers, params, this.successCallback(ob),
    //       this.errorCallback(ob));
    //     break;
    //   case 'PUT':
    //     cordova.plugin.http.put(url, headers, params, this.successCallback(ob),
    //       this.errorCallback(ob));
    //     break;
    //   case 'DELTER':
    //     cordova.plugin.http.delete(url, headers, params, this.successCallback(ob),
    //       this.errorCallback(ob));
    //     break;
    //  }
   });
  }

  successCallback(ob) {
    return (response: any) => {
      ob.next(new HttpResponse({ body: JSON.parse(response.data) }));
      ob.complete();
    };
  }

  errorCallback(ob) {
    return (response: any) => {
      ob.next(new HttpErrorResponse({ error: JSON.parse(response.error) }));
      ob.complete();
    };
  }
}
