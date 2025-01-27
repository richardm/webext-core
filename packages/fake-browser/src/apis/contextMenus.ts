import type { ContextMenus, Menus, Tabs } from 'webextension-polyfill';
import { vi } from 'vitest';
import { defineEventWithTrigger } from '../utils/defineEventWithTrigger';
import { BrowserOverrides } from '../types';

interface OnClickedCallback {
  (info: ContextMenus.Static['OnClickedCallback'], tab?: Tabs.Tab): void;
}

interface OnShownCallback {
  (info: ContextMenus.Static['OnShownCallback'], tab?: Tabs.Tab): void;
}

interface OnHiddenCallback {
  (): void;
}

const onClicked = defineEventWithTrigger<OnClickedCallback>();
const onShown = defineEventWithTrigger<OnShownCallback>();
const onHidden = defineEventWithTrigger<OnHiddenCallback>();

let menuItems: Record<string, Menus.CreateCreatePropertiesType> = {};

// Reference: https://browserext.github.io/browserext/#contextMenus
export const contextMenus: BrowserOverrides['contextMenus'] = {
  ACTION_MENU_TOP_LEVEL_LIMIT: 6,
  create: (createProperties: Menus.CreateCreatePropertiesType, callback?: () => void) => {
    const menuId = createProperties.id || `menu-${Date.now()}`;
    if (menuId in menuItems) {
      throw new Error(`Menu item with id ${menuId} already exists`);
    }
    menuItems[menuId] = createProperties;
    if (typeof callback === 'function') callback();
    return menuId;
  },
  getTargetElement: vi.fn(),
  removeAll: vi.fn(),
  onClicked: onClicked,
  update: vi.fn(),
  refresh: vi.fn(),
  remove: async (menuItemId: string | number) => {
    delete menuItems[menuItemId];
  },
  resetState: () => {
    menuItems = {};
    onClicked.removeAllListeners();
    onShown.removeAllListeners();
    onHidden.removeAllListeners();
  },
  onShown: onShown,
  onHidden: onHidden,
  overrideContext: vi.fn(),
};

// Internal method used for testing only
export const checkIdExists = (menuItemId: string | number) => {
  return menuItems[menuItemId] !== undefined;
};
