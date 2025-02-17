import { alarms } from './apis/alarms';
import { contextMenus } from './apis/contextMenus';
import { notifications } from './apis/notifications';
import { runtime } from './apis/runtime';
import { storage } from './apis/storage';
import { tabs } from './apis/tabs';
import { webNavigation } from './apis/webNavigation';
import { windows } from './apis/windows';
import { BrowserOverrides, FakeBrowser } from './types';
import { GeneratedBrowser } from './base.gen';
import merge from 'lodash.merge';

export type { FakeBrowser };

const overrides: BrowserOverrides = {
  reset() {
    for (const [name, api] of Object.entries(fakeBrowser)) {
      if (name !== 'reset') (api as any).resetState?.();
    }
  },

  // Implemented
  alarms,
  contextMenus,
  notifications,
  runtime,
  storage,
  tabs,
  webNavigation,
  windows,
};

/**
 * An in-memory implementation of the `browser` global.
 */
export const fakeBrowser: FakeBrowser = merge(GeneratedBrowser, overrides);
