import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fakeBrowser } from '..';
import { checkIdExists } from './contextMenus';

describe('Context Menus API', () => {
  beforeEach(fakeBrowser.reset);

  describe('create', () => {
    it('should allow creating a context menu', async () => {
      vi.spyOn(fakeBrowser.contextMenus, 'create');
      fakeBrowser.contextMenus.create({
        id: 'menu-id',
        title: 'menu title',
        contexts: ['all'],
      });
      expect(fakeBrowser.contextMenus.create).toHaveBeenCalled();
    });

    it('should use the supplied id if provided', async () => {
      vi.spyOn(fakeBrowser.contextMenus, 'create');
      fakeBrowser.contextMenus.create({
        id: 'menu-id',
        title: 'menu title',
        contexts: ['all'],
      });
      expect(fakeBrowser.contextMenus.create).toHaveBeenCalled();
      expect(checkIdExists('menu-id')).toBe(true);
    });

    it('should throw error if the supplied id already exists', async () => {
      fakeBrowser.contextMenus.create({
        id: 'menu-id',
        title: 'menu title',
        contexts: ['all'],
      });
      expect(() =>
        fakeBrowser.contextMenus.create({
          id: 'menu-id',
          title: 'menu title',
          contexts: ['all'],
        }),
      ).toThrow();
    });

    it('should call the callback if specified after creating a context menu', async () => {
      const callback = vi.fn();
      await fakeBrowser.contextMenus.create(
        {
          id: 'menu-id',
          title: 'menu title',
          contexts: ['all'],
        },
        callback,
      );
      expect(callback).toHaveBeenCalled();
    });
  });
});
