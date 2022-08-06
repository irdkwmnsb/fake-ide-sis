import { useCallback, useEffect, useState } from 'react';
import './App.css';
import {
  FilesContext,
  FilesContextDefaultValue,
  IFilesContext,
} from './Context';
import Editor from './Editor';
import Selector from './Selector';
import { IContestInfo } from '../Types';
import { choice } from './utils';
import Cheating from './Cheating';

export default function App() {
  const [curOpen, setCurOpen] = useState<number | undefined>(undefined);
  const [files, setFiles] = useState<IFilesContext>(FilesContextDefaultValue);
  const [contestInfo, setContestInfo] = useState<IContestInfo | undefined>(
    undefined
  );
  const [isCheating, setIsCheating] = useState<number | undefined>(undefined);
  useEffect(() => {
    window.electron.ipcRenderer.once(
      'read-config',
      (newContestInfo: IContestInfo) => {
        // eslint-disable-next-line no-console
        console.log('newContestInfo', newContestInfo);
        return setContestInfo(JSON.parse(JSON.stringify(newContestInfo)));
      }
    );
    window.electron.ipcRenderer.sendMessage('read-config');
  }, []);
  const createNewFile = useCallback(() => {
    if (contestInfo !== undefined) {
      const newLocal = Object.entries(contestInfo.tasks);
      const [taskName, variants] = choice(newLocal);
      const items = Object.entries(variants);
      const [variantName, variant] = choice(items);
      setFiles((curFiles) => ({
        ...curFiles,
        files: [
          ...curFiles.files,
          {
            name: `File ${curFiles.files.length + 1}.cpp`,
            task: taskName,
            variant: variantName,
            text: '',
            isDone: false,
          },
        ],
      }));
      setCurOpen(files.files.length);
    }
  }, [contestInfo, files.files]);
  const addSymbol = useCallback(() => {
    if (curOpen !== undefined && contestInfo !== undefined) {
      setFiles((curFiles) => {
        const curFile = curFiles.files[curOpen];
        const curContestFile = contestInfo.tasks[curFile.task][curFile.variant];
        let newText = curFile.text;
        let isDone = false;
        if (curFile.text.length < curContestFile.text.length) {
          newText = curFile.text + curContestFile.text[curFile.text.length];
        }
        if (newText.length === curContestFile.text.length) {
          isDone = true;
        }
        return {
          ...curFiles,
          files: Object.assign([], curFiles.files, {
            [curOpen]: {
              ...curFiles.files[curOpen],
              text: newText,
              isDone,
            },
          }),
        };
      });
    }
  }, [curOpen, contestInfo]);

  const onCheat = useCallback(() => {
    setIsCheating(
      window.setTimeout(() => {
        setIsCheating(undefined);
      }, 3000)
    );
    if (contestInfo !== undefined) {
      const newLocal = Object.entries(contestInfo.tasks);
      const [taskName, variants] = choice(newLocal);
      setFiles((curFiles) => ({
        ...curFiles,
        files: [
          ...curFiles.files,
          {
            name: `Correct solution ${curFiles.files.length + 1}.cpp`,
            task: taskName,
            variant: 'cheat',
            text: '',
            isDone: false,
          },
        ],
      }));
      setCurOpen(files.files.length);
    }
  }, [contestInfo, files.files.length]);

  return (
    <FilesContext.Provider value={files}>
      <div className="app">
        <div className="selectorCont">
          <Selector onOpen={setCurOpen} onCreateNew={createNewFile} />
        </div>
        <div className="editorCont">
          {curOpen !== undefined && (
            <Editor
              file={files.files[curOpen]}
              onAddSymbol={addSymbol}
              onCheat={onCheat}
            />
          )}
        </div>
        {isCheating !== undefined && <Cheating />}
      </div>
    </FilesContext.Provider>
  );
}
