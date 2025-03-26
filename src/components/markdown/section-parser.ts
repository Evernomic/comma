

import {findAndReplace} from 'mdast-util-find-and-replace'
import type {Paragraph, Root} from 'mdast'
import {visit} from 'unist-util-visit'

export default function sectionParser() {
  return function (tree: Root) {
    findAndReplace(tree, [
      /::(\w+(\.\w+)*)::/g,
      (_, component) => {
        return {
          type: "mdxJsxTextElement",
          name: component,
          attributes: [],
          children:[], 
        }
      }
    ])
    visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
      if (
        index !== undefined && 
        parent && 
        node.children.length === 1 && 
        node.children[0].type === 'mdxJsxTextElement'
      ) {
        parent.children.splice(index, 1, node.children[0])
      }
    })
  }
  
}