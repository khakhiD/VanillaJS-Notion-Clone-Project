import { Component, push } from '@/core';
import { PostListStore, PostStore } from '@/store';
import styles from './SideBar.module.css';

export default class SideBar extends Component {
  setup() {
    PostListStore.subscribe({
      listenerKey: this.constructor.name,
      listener: this.render.bind(this),
    });
  }

  templates() {
    const postList = PostListStore.getState().postList;
    return `<h1>Dongja's Notion</h1>
      ${
        Array.isArray(postList)
          ? this.getPostListTemplate(postList)
          : `<h2>로딩중</h2>`
      }
      <footer data-id=null>
        <i class="fa-solid fa-plus add"></i>
        새로운 페이지 추가
      </footer>`;
  }

  getPostListTemplate(postList) {
    return postList
      .map(
        ({ id, title, documents }) => `
    <li data-id=${id} class="parent-list">
    <div class=${styles.container}>
      <div class=${styles.content}>
        ${
          documents.length === 0
            ? ''
            : `<button class=${styles.dropDown}>
        <i class="fa-solid fa-caret-right"></i>
      </button>`
        }
        <h2 class=${styles.title} >${title}</h2>
      </div>
      <div class=${styles.buttons}>
        <button class ='delete'>
          <i class="fa-solid fa-minus"></i>
        </button>
        <button class='add'>
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
    ${
      documents.length === 0
        ? ''
        : `
    <ul class=${styles.childList}>
      ${this.getPostListTemplate(documents)}
    </ul>
    `
    }
    </li>`
      )
      .join('');
  }

  setEvent() {
    this.$target.addEventListener('click', async ({ target }) => {
      const deleteButton = target?.closest('.delete');

      if (!deleteButton) return;

      const deletedId = target.closest('li').dataset.id;
      await PostListStore.dispatch({
        actionType: 'DELETE',
        payload: { id: deletedId },
      });
      const nowId = PostStore.getState()?.post?.id;
      if (parseInt(deletedId) === nowId) push('/');
    });

    this.$target.addEventListener('click', async ({ target }) => {
      const addButton = target?.closest('.add');

      if (!addButton) return;

      const id = target.closest(`[data-id]`).dataset.id;
      await PostStore.dispatch({
        actionType: 'CREATE_POST',
        payload: { parent: id },
      });
      await PostListStore.dispatch({ actionType: 'INIT' });
    });

    this.$target.addEventListener('click', ({ target }) => {
      const dropDownButton = target?.closest(`.${styles.dropDown}`);

      if (!dropDownButton) return;

      const childList = dropDownButton
        .closest('li')
        .querySelector(`.${styles.childList}`);

      if (!childList) return;

      dropDownButton.classList.toggle(`${styles.down}`);
      childList.classList.toggle(`${styles.open}`);
    });
  }
}
