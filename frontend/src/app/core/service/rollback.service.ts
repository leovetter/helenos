import { InjectionToken } from '@angular/core';
import * as Rollbar from 'rollbar';

const rollbarConfig = {
  accessToken: 'd554b9b49e3242d591290b54404fec4e',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');
