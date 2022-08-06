import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { IFile } from '../Types';
import './Editor.css';
import { arraysEqual } from './utils';

interface EditorProps {
  file: IFile;
  onAddSymbol: () => void;
  onCheat: () => void;
}

const CHEAT_STR = 'iddqd';
const CHEAT_ARRAY = [...CHEAT_STR];
const IGNORED_KEYS = new Set([
  'Shift',
  'Alt',
  'Control',
  'Meta',
  'Tab',
  'Enter',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'PageDown',
  'PageUp',
  'Home',
  'End',
  'Backspace',
]);

export default function Editor({ file, onAddSymbol, onCheat }: EditorProps) {
  const [curText, setCurText] = useState<string>(file.text);
  const enteredString = useRef<string[]>([]);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    setCurText(file.text);
  }, [file.text]);
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [file.name]);
  const keyHandler = useCallback(
    (ev: KeyboardEvent) => {
      if (!IGNORED_KEYS.has(ev.key)) {
        enteredString.current?.push(ev.key);
        const lastChars = enteredString.current?.slice(
          enteredString.current?.length - CHEAT_ARRAY.length
        );
        if (arraysEqual(lastChars, CHEAT_ARRAY)) {
          onCheat();
          enteredString.current?.splice(0, enteredString.current?.length);
        }
        if (!file.isDone) {
          ev.preventDefault();
          onAddSymbol();
        }
      }
    },
    [file, onAddSymbol, onCheat]
  );
  return (
    <div className="editor">
      <div className="title">
        {file.name}. Task {file.task}.
      </div>
      <textarea
        ref={editorRef}
        value={curText}
        onChange={(ev) => setCurText(ev.target.value)}
        onKeyDown={keyHandler}
        readOnly={!file.isDone}
        className="textarea"
      />
      {file.isDone && <div>No more help from me.</div>}
    </div>
  );
}
