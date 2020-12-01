import {Api} from '../api/api'


export class Comment {
    api = new Api()

    parse = (db) => {
        console.log(db)
        this.id = db.commentID
        this.authorId = db.authorID
        this.time = new Date(db.timestamp).toLocaleString()
        this.note = db.comment
        console.log(this)
        return this
    }
}