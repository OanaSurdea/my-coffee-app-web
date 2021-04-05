// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiEndpoint: 'http://localhost:4000',
  useEmulators : false,
  firebaseConfig: {
    apiKey: 'AIzaSyDisiIP5zGlj9sM3sBV22NVGRzYUIByo6c',
    authDomain: 'my-coffee-app-2.firebaseapp.com',
    projectId: 'my-coffee-app-2',
    storageBucket: 'my-coffee-app-2.appspot.com',
    messagingSenderId: '924425636227',
    appId: '1:924425636227:web:34dbbf4d566470ecd60eb6',
    measurementId: 'G-SYN35SMVLB'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
