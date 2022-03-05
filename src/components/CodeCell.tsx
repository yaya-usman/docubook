import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";

import { Cell } from "../state";
import { useActions } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/use-typed-selector";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "calc(100% - 10px)", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={bundle.code} err={bundle.err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
