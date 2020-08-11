import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

declare let window: any; // <--- Declare it like this
document.addEventListener('deviceready', () => {
  if (window.cordova.platformId !== 'android') {
    return;
  }
  const hack = () => {
    const ionApp = document.querySelector('ion-app');
    if (ionApp) {
      // https://github.com/ionic-team/ionic/issues/19065#issuecomment-521370741
      window.requestAnimationFrame(() => {
        ionApp.style.height = '100%';
        window.requestAnimationFrame(() => {
          ionApp.style.height = '';
        });
      });
    }
  };
  if ('ResizeObserver' in window) {
    const ResizeObserver = (window as any).ResizeObserver;
    new ResizeObserver(hack).observe(document.documentElement);
  } else {
    window.addEventListener('keyboardWillShow', hack);
    window.addEventListener('keyboardWillHide', hack);
  }
});

