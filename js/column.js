class Column {
    constructor(name) {
        this.name = name;
        this.cards =[];
    }

    addCard(title, description=""){
        const card= new this.cards(title, description);
        this.cards.push(card);
    }
   
}