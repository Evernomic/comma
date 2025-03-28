import { cn } from "@/lib/utils";
import { type EditorState, Plugin } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

const Placeholder = new Plugin({
  state: {
    init() {
      return DecorationSet.empty;
    },
    apply(tr, set) {
      set = set.map(tr.mapping, tr.doc);
      // @ts-expect-error

      const action = tr.getMeta(this);
      if (action?.add) {
        const { id, pos, src, isInline } = action.add;
        const widget = document.createElement("div");
        widget.className = cn("image-placeholder", isInline && "inline");
        widget.dataset.type = "img-placeholder";
        const img = document.createElement("img");
        img.src = src;
        widget.appendChild(img);
        const deco = Decoration.widget(pos, widget, {
          id: id,
        });
        set = set.add(tr.doc, [deco]);
      } else if (action?.remove) {
        set = set.remove(
          set.find(
            undefined,
            undefined,
            (spec) => spec.id === action.remove.id,
          ),
        );
      }
      return set;
    },
  },
  props: {
    decorations(state) {
      return this.getState(state);
    },
  },
});

function findPlaceholder(state: EditorState, id: any) {
  const decos = Placeholder.getState(state) as DecorationSet;
  const found = decos.find(undefined, undefined, (spec) => spec.id === id);
  return found.length ? found[0].from : null;
}

export { findPlaceholder, Placeholder };
