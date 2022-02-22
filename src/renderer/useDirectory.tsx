import { useEffect, useState } from 'react';

export default function useDirectory(path: string) {
  const [dirContent, setDirContent] = useState<
    { name: string; isDirectory: boolean }[]
  >([]);

  useEffect(() => {
    // TODO maybe handle jumbled event-packages
    window.electron.ipcRenderer.once(
      'fileSystem',
      (cmd: string, ...args: any[]) => {
        if (cmd === 'readDir') {
          setDirContent(
            args[0].sort((a, b) => {
              const typeSorting = a.isDirectory ? -1 : 1;
              const alphabeticSorting = a.name < b.name ? -1 : 1;
              return a.isDirectory === b.isDirectory
                ? alphabeticSorting
                : typeSorting;
            })
          );
        }
      }
    );
    window.electron.ipcRenderer.readDir(path);
  }, [path]);

  return [dirContent];
}
