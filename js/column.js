class Column {
    constructor(name) {
        this.name = name;
        this.cards =[];
    }

    addCard(title){
        const newCard = new Card(title);
        this.cards.push(newCard);
    }

    editColunmName(newName){
        this.name = newName.trim();
        
    }
    removeCard(index){
        if (index>=0 && index < this.cards.length && confirm("Opravdu chcete odstranit tuto kartu?")) {
            this.cards.splice(index,1)
        }
    }
   
}