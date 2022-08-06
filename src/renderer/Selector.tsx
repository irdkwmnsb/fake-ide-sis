import { FC, useContext } from 'react';
import { FilesContext } from './Context';
import { IFile } from '../Types';
import './Selector.css';

interface FileProps {
  file: IFile;
  onSelect: () => unknown;
}

const File = ({ file, onSelect }: FileProps) => {
  return (
    <button onClick={onSelect} type="button">
      {file.name}
    </button>
  );
};

interface SelectorProps {
  onOpen: (index: number) => unknown;
  onCreateNew: () => unknown;
}

export default function Selector({ onOpen, onCreateNew }: SelectorProps) {
  const { files } = useContext(FilesContext);
  return (
    <div className="selector">
      <button onClick={onCreateNew} type="button">
        Create new file
      </button>
      {files.map((file, index) => {
        return (
          <File file={file} onSelect={() => onOpen(index)} key={file.name} />
        );
      })}
    </div>
  );
}
