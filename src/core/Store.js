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

    onAddSticker(boardId, obj) {
        this.getData()
        
        let indexBoard = this.data.boards.findIndex(el => el.id === boardId)
        let id = 0
        this.data.boards[indexBoard].stikers.forEach(item => { if (+item.id > id) id = +item.id })
        obj.id = id + 1
        this.data.boards[indexBoard].stikers.push(obj)
        
        localStorage.stickiesStore = JSON.stringify(this.data)

        return this.data.boards[indexBoard].stikers
    }

    addBoard(obj) {}

    removeBoard(id) {}
    removeSticker(id) {}


}