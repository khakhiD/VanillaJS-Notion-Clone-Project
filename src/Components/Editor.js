export default function Editor({$target, initialState = {
    title: '',
    content: '',
}, onEditing}){
    const $editor = document.createElement('div');
    $editor.innerHTML = `
            <input type="text" name="title" style="width:600px;"/>
            <div contentEditable="true" name="content" style="width:600px; height:400px; border:1px solid black; padding:8px;"></div>
        `
    $target.appendChild($editor);
    this.state = initialState;

    $editor.style.height = '600px'
    $editor.style.width = '600px'

    this.setState = (nextState) => {
        this.state = nextState
        //서버에서 내려오는 개행값 \n으로 인식, but innerHTML은 인식못함
        this.render();
    }
    this.render = () => {
        if(this.state.content === null){
            $editor.querySelector('[name=title]').value = this.state.title;
            $editor.querySelector('[name=content]').innerHTML = '';
            return
        }
        const richContent = this.state.content.split('\n').map(line => {
            if(line.indexOf('# ') === 0){
                return `<h1>${line.substr(2)}</h1>`
            } else if (line.indexOf('## ') === 0){
                return `<h2>${line.substr(3)}</h2>`
            } else if (line.indexOf('### ') === 0) {
                return `<h3>${line.substr(3)}</h3>`
            }
            return line
        }).join('<br>')
        $editor.querySelector('[name=content]').innerHTML = richContent;
        $editor.querySelector('[name=title]').value = this.state.title;
    }

    this.render();
    $editor.querySelector('[name=title]').addEventListener('keyup', e => {
        const nextState  = {
            ...this.state, 
            title: e.target
        }
        this.setState(nextState);
        onEditing(this.state)
    })
    $editor.querySelector('[name=content]').addEventListener('input', e => { 
    })
}