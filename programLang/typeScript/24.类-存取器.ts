class Name {
    constructor(private firstName: string, private lastName: string) {

    }

    get fullName() {
        return this.firstName + this.lastName
    }

    set fullName(fullName: string) {
        let names = fullName.split('-')
        this.firstName = names[0]
        this.lastName = names[1]
    }
}

let zhangsanfeng = new Name('张', '三丰')
zhangsanfeng.fullName='张-三'
console.log(zhangsanfeng)