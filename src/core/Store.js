import exampleStore from './example.store.js'

export default class Store {

    constructor() {
        this.data = JSON.parse(localStorage.getItem('stickiesStore')) || Object.assign({}, exampleStore);
    }
    
    saveData() {
        localStorage.stickiesStore = JSON.stringify(this.data)
    }

    getData() {
        this.data = JSON.parse(localStorage.getItem('stickiesStore')) || Object.assign({}, exampleStore);
        return this.data
    }

    onSaveStickers(boardId, stickers) {
        this.getData()

        let indexBoard = this.data.boards.findIndex(el => el.id === boardId)
        this.data.boards[indexBoard].stikers = stickers
        
        localStorage.stickiesStore = JSON.stringify(this.data)
    }
    
    onSaveSticker(stickerId, boardId, data) {        
        this.getData()
        
        let indexBoard   = this.data.boards.findIndex(el => el.id === boardId),
            indexSticker = this.data.boards[indexBoard].stikers.findIndex(el => el.id === stickerId)

        this.data.boards[indexBoard].stikers[indexSticker].top  = data.top
        this.data.boards[indexBoard].stikers[indexSticker].left = data.left
        this.data.boards[indexBoard].stikers[indexSticker].text = data.text

        localStorage.stickiesStore = JSON.stringify(this.data)
    }

}