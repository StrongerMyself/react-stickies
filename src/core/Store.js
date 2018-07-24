import exampleStore from './example.store.js'

export default class Store {

    constructor() {
        this.data = JSON.parse(localStorage.getItem('stickiesStore')) || JSON.parse(JSON.stringify(exampleStore));
    }
    
    saveData() {
        localStorage.stickiesStore = JSON.stringify(this.data)
    }

    getData() {
        this.data = JSON.parse(localStorage.getItem('stickiesStore')) || JSON.parse(JSON.stringify(exampleStore));
        return this.data
    }

    getBoardTemplate() {
        return JSON.parse(JSON.stringify(exampleStore.boards[0]))
    }

    onSaveStickers(boardId, stickers) {
        this.getData()

        let indexBoard = this.data.boards.findIndex(el => el.id === boardId)
        this.data.boards[indexBoard].stickers = stickers
        
        localStorage.stickiesStore = JSON.stringify(this.data)
    }
    
    onSaveSticker(stickerId, boardId, data) {        
        this.getData()
        
        let indexBoard   = this.data.boards.findIndex(el => el.id === boardId),
            indexSticker = this.data.boards[indexBoard].stickers.findIndex(el => el.id === stickerId)

        this.data.boards[indexBoard].stickers[indexSticker].top  = data.top
        this.data.boards[indexBoard].stickers[indexSticker].left = data.left
        this.data.boards[indexBoard].stickers[indexSticker].text = data.text

        localStorage.stickiesStore = JSON.stringify(this.data)
    }

    onAddSticker(boardId, obj) {
        this.getData()
        
        let indexBoard = this.data.boards.findIndex(el => el.id === boardId)
        let id = 0
        this.data.boards[indexBoard].stickers.forEach(item => { if (+item.id > id) id = +item.id })
        obj.id = id + 1
        this.data.boards[indexBoard].stickers.push(obj)
        
        localStorage.stickiesStore = JSON.stringify(this.data)
        return this.data.boards[indexBoard].stickers
    }
    
    onRemoveSticker(boardId, stickerId) {
        this.getData()

        let indexBoard = this.data.boards.findIndex(el => el.id === boardId),
            indexSticker = this.data.boards[indexBoard].stickers.findIndex(el => el.id === stickerId)

        this.data.boards[indexBoard].stickers.splice(indexSticker, 1)
        
        localStorage.stickiesStore = JSON.stringify(this.data)
        return this.data.boards[indexBoard].stickers
    }

    onSaveBoard(boardId, obj) {
        this.getData()

        let indexBoard = this.data.boards.findIndex(el => el.id === boardId)
        this.data.boards[indexBoard].title = obj.title
        
        localStorage.stickiesStore = JSON.stringify(this.data)
        return this.data
    }

    onAddBoard() {
        this.getData()

        let obj = this.getBoardTemplate()
        this.data.boards.forEach(item => { if (+item.id > +obj.id) obj.id = +item.id })
        obj.id++
        this.data.boards.push(obj)

        localStorage.stickiesStore = JSON.stringify(this.data)
        return this.data
    }

    onRemoveBoard(boardId) {
        this.getData()
        
        let indexBoard = this.data.boards.findIndex(el => el.id === boardId)
        this.data.boards.splice(indexBoard, 1)
        if (!this.data.boards.length) {
            this.data.boards.push(this.getBoardTemplate())
            this.data.boards[0].id = 1
        }

        localStorage.stickiesStore = JSON.stringify(this.data)
        return this.data
    }


}