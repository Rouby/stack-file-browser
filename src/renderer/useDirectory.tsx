import { useEffect, useState } from 'react';

export default function useDirectory(path: string) {
  const [dirContent, setDirContent] = useState<
    { name: string; isDirectory: boolean }[]
  >([]);

  useEffect(() => {
    // TODO maybe handle jumbled/unordered event-packages

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).electron.ipcRenderer.once(
      'fileSystem',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (cmd: string, ...args: any[]) => {
        if (cmd === 'readDir') {
          setDirContent(
            (args[0] as { name: string; isDirectory: boolean }[]).sort(
              (a, b) => {
                const typeSorting = a.isDirectory ? -1 : 1;
                const alphabeticSorting = a.name < b.name ? -1 : 1;
                return a.isDirectory === b.isDirectory
                  ? alphabeticSorting
                  : typeSorting;
              }
            )
          );
        }
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).electron.ipcRenderer.readDir(path);
  }, [path]);

  return [dirContent];
}
