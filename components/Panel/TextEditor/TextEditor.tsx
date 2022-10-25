import { useRef, Dispatch, SetStateAction, ChangeEvent, MouseEvent } from "react";
import { Editor, EditorState, RichUtils, AtomicBlockUtils } from "draft-js";
import { FaBold, FaItalic, FaUnderline, FaLink, FaImage, FaStrikethrough } from "react-icons/fa";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { fileUploader } from "@/utils/fileUploader";
import { mediaBlockRenderer } from "./Media";

import "draft-js/dist/Draft.css";
import EditorButton from "./EditorButton";

interface Props {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
}
function TextEditor({ editorState, setEditorState }: Props) {
  const imageInput = useRef<HTMLInputElement>(null);

  const handleToggleClick = (e: React.MouseEvent, inlineStyle: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleInsertImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files![0];
    const { url } = await fileUploader(file);
    if (!url) return;

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity("image", "IMMUTABLE", { src: url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    return setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " "));
  };

  const handleAddLink = () => {
    const selection = editorState.getSelection();
    const link = prompt("Please enter the URL of your link");
    if (!link) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
      return;
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
      url: link,
    });
    const newEditorState = EditorState.push(editorState, contentWithEntity, "apply-entity");
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
  };
  const handleBlockClick = (e: React.MouseEvent, blockType: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };
  return (
    <div className="border border-gray-300 rounded-sm h-96 max-h-96 mt-2 overflow-hidden">
      <div className="flex gap-2 flex-wrap justify-center border-b-gray-300 border-b p-2 ">
        <EditorButton onMouseDown={(e: MouseEvent) => handleToggleClick(e, "BOLD")}>
          <FaBold />
        </EditorButton>
        <EditorButton onMouseDown={(e: MouseEvent) => handleToggleClick(e, "UNDERLINE")}>
          <FaUnderline />
        </EditorButton>
        <EditorButton onMouseDown={(e: MouseEvent) => handleToggleClick(e, "ITALIC")}>
          <FaItalic />
        </EditorButton>
        <EditorButton onMouseDown={(e: MouseEvent) => handleToggleClick(e, "STRIKETHROUGH")}>
          <FaStrikethrough />
        </EditorButton>
        <EditorButton onMouseDown={(e: MouseEvent) => handleBlockClick(e, "unstyled")}>Normal</EditorButton>
        <EditorButton onMouseDown={(e: MouseEvent) => handleBlockClick(e, "header-one")}>H1</EditorButton>
        <EditorButton onMouseDown={(e: MouseEvent) => handleBlockClick(e, "header-two")}>H2</EditorButton>
        <EditorButton onMouseDown={(e: MouseEvent) => handleBlockClick(e, "header-three")}>H3</EditorButton>
        <EditorButton onMouseDown={(e: MouseEvent) => handleBlockClick(e, "ordered-list-item")}>
          <AiOutlineOrderedList />
        </EditorButton>
        <EditorButton onMouseDown={(e: MouseEvent) => handleBlockClick(e, "unordered-list-item")}>
          <AiOutlineUnorderedList />
        </EditorButton>
        <EditorButton
          onMouseDown={(e: MouseEvent) => {
            e.preventDefault();
            imageInput.current?.click();
          }}
        >
          <FaImage />
        </EditorButton>
        <EditorButton
          disabled={editorState.getSelection().isCollapsed()}
          onMouseDown={(e: MouseEvent) => {
            e.preventDefault();
            handleAddLink();
          }}
        >
          <FaLink />
        </EditorButton>
      </div>
      <input type="file" className="hidden" ref={imageInput} onChange={handleInsertImage} />
      <Editor editorState={editorState} onChange={setEditorState} blockRendererFn={mediaBlockRenderer} />
    </div>
  );
}

export default TextEditor;
