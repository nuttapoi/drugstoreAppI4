import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Platform } from '@ionic/angular';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete' | 'upload' | 'download';

@Injectable()
export class NativeHttpInterceptor implements HttpInterceptor {
  constructor(
    private nativeHttp: HTTP,
    private platform: Platform,
  ) {
    this.nativeHttp.setDataSerializer('json');
  }
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.platform.is('cordova')) { return next.handle(request); }

    return from(this.handleNativeRequest(request));
  }

  private async handleNativeRequest(request: HttpRequest<any>): Promise<HttpResponse<any>> {
    const headerKeys = request.headers.keys();
    const header = {};

    headerKeys.forEach((key) => {
      header[key] = request.headers.get(key);
    });

    try {
      await this.platform.ready();

      const method =  request.method.toLowerCase() as HttpMethod;
      console.log('— Request obj');
      console.log({
        method: method ,
        data: request.body,
        headers: header,
        serializer: 'json',
      });

      // const options = {
      //   method: method,
      //   data: request.body,
      //   headers: header,
      //   serializer: 'json',
      // };
      let nativeHttpResponse: HTTPResponse;
      const jdata = JSON.parse(request.body);
      // if (method !== 'put') {
      nativeHttpResponse = await this.nativeHttp.sendRequest(request.url, { method: method,
        data: jdata,  headers: header });
      // } else {
      //   console.log('http put');
      //   nativeHttpResponse = await this.nativeHttp.put(request.url, jdata,  header);
      //   // nativeHttpResponse = await this.nativeHttp.put(request.url,
      //   //   { productID: '005276', businessName: 'LAEVOSAN 500g',
      //   //   latestCost: 160, qtyNowAll: 7, unitNameA: 'ห่อ                 ',
      //   //   saleA: 190, qtyActual: 7 },
      //   //   { headers: header });
      // }

      let body;

      try {
        body = JSON.parse(nativeHttpResponse.data);
      } catch (error) {
        body = { response: nativeHttpResponse.data };
      }

      const response = new HttpResponse({
        body: body,
        status: nativeHttpResponse.status,
        headers:  new HttpHeaders(nativeHttpResponse.headers),
        url: nativeHttpResponse.url,
      });

      console.log('— Response success');
      console.log(response);
      return Promise.resolve(response);
    } catch (error) {
      if (!error.status) { return Promise.reject(error); }

      const response = new HttpResponse({
        body: JSON.parse(error.error),
        status: error.status,
        headers: error.headers,
        url: error.url,
      });
      console.log('— Response Error');
      console.log(error);

      return Promise.reject(response);
    }
  }
}
