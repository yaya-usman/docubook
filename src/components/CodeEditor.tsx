import Editor, { OnChange, Monaco } from "@monaco-editor/react";
import React, { useRef } from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { editor } from "monaco-editor";
import "bulmaswatch/pulse/bulmaswatch.min.css";
import "./CodeEditor.css";


interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const handleOnChange: OnChange = (value = "", monacoEditor) =>
    onChange(value);

  //only way i could get a reference to the editor itself
  const handleOnMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = editor;
  };

  const handleFormatClick = () => {
    // get the current value
    const unformattedText: string | any = editorRef.current
      ?.getModel()
      ?.getValue();

    //format the text
    const formattedText = prettier
      .format(unformattedText, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");

    //reset the formatted text back to the editor
    editorRef.current?.setValue(formattedText);
  };

  return (
    <div className="editor-wrapper">
      <button
        onClick={handleFormatClick}
        className="button button-format is-primary"
      >
        Format
      </button>
      <Editor
        onMount={handleOnMount}
        onChange={handleOnChange}
        value={initialValue}
        language="javascript"
        theme="vs-dark"
        height="500px"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          lineNumbersMinChars: 3,
          folding: false,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
