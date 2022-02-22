import { useState } from 'react';
import './App.css';
import fileIcon from './file.png';
import folderIcon from './folder.png';
import useDirectory from './useDirectory';

export default function App() {
  return (
    <div
      style={{
        display: 'grid',
        gridAutoColumns: '300px',
        gridAutoFlow: 'column',
        gridTemplateRows: 'calc(100vh - 20px)',
        padding: 10,
        overflowX: 'auto',
      }}
    >
      <FilePanel dir="~" />
    </div>
  );
}

function FilePanel({ dir }: { dir: string }) {
  const [dirContent] = useDirectory(dir);
  const [opened, setOpened] = useState(null as string | null);

  return (
    <>
      <FileList files={dirContent} onOpen={setOpened} />
      {opened && (
        <FilePanel key={`${dir}/${opened}`} dir={`${dir}/${opened}`} />
      )}
    </>
  );
}

function FileList({
  files,
  onOpen,
}: {
  files: { name: string; isDirectory: boolean }[];
  onOpen: (file: string) => void;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridAutoRows: '32px',
        alignItems: 'stretch',
        maxWidth: '100%',
        overflow: 'auto',
      }}
    >
      {files.map(({ name, isDirectory }) => (
        <button
          key={name}
          onClick={isDirectory ? () => onOpen(name) : undefined}
          type="button"
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gridGap: 8,
            alignItems: 'center',

            textAlign: 'left',
          }}
        >
          <span>
            <img
              src={isDirectory ? folderIcon : fileIcon}
              alt={isDirectory ? 'Folder' : 'File'}
              height="24"
            />
          </span>
          <span
            style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
            title={name}
          >
            {name}
          </span>
          <span>{isDirectory && '>'}</span>
        </button>
      ))}
    </div>
  );
}
