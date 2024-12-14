class Column {
    constructor(name) {
        this.name = name;
        this.cards =[];
    }

    addCard(title, description=""){
        const card= new Card(title, description);
        this.cards.push(card);
    }
   
}