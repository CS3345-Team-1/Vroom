export class Group {
    // constructor(id, name, members) {
    //     this.id = id
    //     this.name = name
    //     this.members = members
    // }

    parseDetail = (obj) => {
        this.id = obj.groupID
        this.name = obj.groupName
        if (obj.members)
            this.members = JSON.parse(obj.members)
        else
            this.members = []
        return this
    }
}