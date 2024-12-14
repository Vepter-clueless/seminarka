class Column {
    constructor(name) {
        this.name = name;
        this.cards =[];
    }

    addCard(desc){
        this.cards.push(new Card(desc));
    }

    editCard(newName){
        this.name = newName;
    }
    removeCard(index){
        this.cards.splice(index, 1);
    }
   
}