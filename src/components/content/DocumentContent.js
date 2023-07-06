import { request } from "../../api.js";
import Editor from "./Editor.js";

export default function DocumentContent({ $target, initialId, onEditing }) {
  const $contentSection = document.createElement("section");
  $contentSection.setAttribute("id", "contentSection");

  this.id = initialId;

  this.setId = async (nextId) => {
    this.id = nextId;
    await fetchData();
    this.render();
  };

  const editor = new Editor({
    $target: $contentSection,
    onEditing: onEditing,
  });

  const fetchData = async () => {
    const document = await request(`/documents/${this.id}`);
    console.log(document);
    editor.setState({
      title: document.title,
      content: document.content,
    });
    editor.setId(document.id);
  };

  this.render = () => {
    $target.appendChild($contentSection);
  };
}