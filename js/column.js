class Column {
    constructor(name) {
        this.name = name;
        this.cards =[];
    }

    addCard(title){
        const newCard = new Card(title);
        this.cards.push(newCard);
    }

    editCard(newName){
        this.name = newName.trim();
    }
    removeCard(index){
        if (index>=0 && index < this.cards.length) {
            this.cards.splice(index,1)
        }
    }
   
}