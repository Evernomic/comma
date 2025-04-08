import { useCurrentEditor } from "@tiptap/react";
import Moveable from "react-moveable";

export function ImageResizer() {
  const { editor } = useCurrentEditor();

  if (!editor?.isActive("image")) return null;

  const imageInfo = document.querySelector(
    ".ProseMirror-selectednode",
  ) as HTMLImageElement;

  if (imageInfo.classList.contains("inline-image")) return null;

  const updateMediaSize = () => {
    if (imageInfo) {
      const selection = editor.state.selection;
      const setImage = editor.commands.setImage as (options: {
        src: string;
        width: number;
        height: number;
      }) => boolean;

      const src = new URL(imageInfo.src);
      const [width, height] = [
        Math.floor(Number(imageInfo.style.width.replace("px", ""))),
        Math.floor(Number(imageInfo.style.height.replace("px", ""))),
      ];
      src.searchParams.set("width", width.toString());
      src.searchParams.set("height", height.toString());
      setImage({
        src: src.toString(),
        width,
        height,
      });
      editor.commands.setNodeSelection(selection.from);
    }
  };

  return (
    <Moveable
      target={
        document.querySelector(".ProseMirror-selectednode") as HTMLDivElement
      }
      container={null}
      origin={false}
      edge={false}
      throttleDrag={0}
      keepRatio={true}
      resizable={true}
      throttleResize={0}
      onResize={({ target, width, height, delta }) => {
        if (delta[0]) target.style.width = `${width}px`;
        if (delta[1]) target.style.height = `${height}px`;
      }}
      onResizeEnd={() => {
        updateMediaSize();
      }}
      scalable={true}
      throttleScale={0}
      renderDirections={["w", "e"]}
      onScale={({ target, transform }) => {
        target.style.transform = transform;
      }}
    />
  );
}
