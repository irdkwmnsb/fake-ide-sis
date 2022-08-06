import { createContext } from 'react';
import { IContestInfo, IFile } from '../Types';

export type IFilesContext = {
  files: IFile[];
  contestInfo: IContestInfo;
};

export const FilesContextDefaultValue: IFilesContext = {
  files: [],
};

export const FilesContext = createContext<IFilesContext>(
  FilesContextDefaultValue
);
