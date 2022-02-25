/* eslint-disable */
import { mount } from '@cypress/react';
import App from './App';

describe('App', () => {
  it('should render sub-folders on click', () => {
    cy.window().then((win) => {
      (win as any).electron = {
        ipcRenderer: {
          _handler: [] as any[],
          _fakeFs: {
            '~': [
              { name: 'folder1', isDirectory: true },
              { name: 'file1', isDirectory: false },
            ],
            '~/folder1': [{ name: 'file2', isDirectory: false }],
          },
          once(_: unknown, handler: (cmd: string, ...args: any[]) => void) {
            this._handler.push(handler);
          },
          readDir(path: keyof typeof this['_fakeFs']) {
            if (this._fakeFs[path]) {
              this._handler.forEach((handler) =>
                handler('readDir', this._fakeFs[path])
              );
            }
            this._handler = [];
          },
        },
      };
    });

    mount(<App />);

    cy.get('button').first().click();
    cy.document().trigger('keydown', { key: 'ArrowRight' });
    cy.contains('button', 'file2').should('be.visible');
  });

  it('should work with key navigation', () => {
    cy.window().then((win) => {
      (win as any).electron = {
        ipcRenderer: {
          _handler: [] as any[],
          _fakeFs: {
            '~': [
              { name: 'folder1', isDirectory: true },
              { name: 'file1', isDirectory: false },
            ],
            '~/folder1': [{ name: 'file2', isDirectory: false }],
          },
          once(_: unknown, handler: (cmd: string, ...args: any[]) => void) {
            this._handler.push(handler);
          },
          readDir(path: keyof typeof this['_fakeFs']) {
            if (this._fakeFs[path]) {
              this._handler.forEach((handler) =>
                handler('readDir', this._fakeFs[path])
              );
            }
            this._handler = [];
          },
        },
      };
    });

    mount(<App />);

    cy.document().trigger('keydown', { key: 'ArrowDown' });
    cy.contains('button', 'folder1').should('have.focus').click();
    cy.document().trigger('keydown', { key: 'ArrowDown' });
    cy.contains('button', 'file1').should('have.focus');
    cy.document().trigger('keydown', { key: 'ArrowRight' });
    cy.contains('button', 'file2').should('have.focus');
  });
});
