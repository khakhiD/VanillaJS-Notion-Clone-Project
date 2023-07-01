import { postDocument } from "../../api/document.js";
import { push } from "../../utils/route.js";

export default function DocumentItem({
  parentElement,
  getChildDocument,
  ...data
}) {
  const containerElement = document.createElement("div");

  containerElement.addEventListener("click", async (e) => {
    if (e.target.closest(".child-button")) {
      const temp = await postDocument({ title: "", parent: data.id });
      console.log(temp);
      return;
    }

    if (Number(e.target.closest("li").id) === data.id) {
      push(`/document/edit?document-id=${data.id}`);
    }
  });

  this.render = () => {
    parentElement.append(containerElement);

    containerElement.innerHTML = `
      <li id="${data.id}" class="document-item">
        <span>${data.title === null ? "제목 없음" : data.title}</span>
        <div class="child-button">🆕</div>
      </li>
    `;

    getChildDocument(containerElement);
  };
}