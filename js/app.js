class App {
    constructor() {
      this.columns = [];
      this.init();
    }
  
    init() {
      // Default columns
      const p = new Column("pokus");
      p.addCard("dbahdba");
      p.addCard("asjdjka");
  
      const b = new Column("bdjabd");
      b.addCard("adnasnd");
  
      this.columns.push(p, b);
  
      // Render board
      this.render();
    }
  
    render() {
      const board = document.querySelector(".board");
      board.innerHTML = ""; // Clear board
  
      this.columns.forEach(column => {
        const columnEl = document.createElement("div");
        columnEl.classList.add("column");
  
        const header = document.createElement("h2");
        header.textContent = column.name;
        columnEl.appendChild(header);
  
        column.cards.forEach(card => {
          const cardEl = document.createElement("div");
          cardEl.classList.add("card");
          cardEl.textContent = card.title;
          columnEl.appendChild(cardEl);
        });
  
        const addCardButton = document.createElement("button");
        addCardButton.textContent = "+ Přidat kartu";
        addCardButton.classList.add("add-card");
        addCardButton.addEventListener("click", () => {
          const cardTitle = prompt("Zadejte název karty:");
          if (cardTitle) {
            column.addCard(cardTitle);
            this.render();
          }
        });
  
        columnEl.appendChild(addCardButton);
        board.appendChild(columnEl);
      });
  
      const addColumnButton = document.createElement("button");
      addColumnButton.textContent = "+ Přidej další sloupec";
      addColumnButton.classList.add("add-column");
      addColumnButton.addEventListener("click", () => {
        const columnName = prompt("Zadejte název sloupce:");
        if (columnName) {
          const newColumn = new Column(columnName);
          this.columns.push(newColumn);
          this.render();
        }
      }); 
  
      board.appendChild(addColumnButton); 
    }
  }
  
  // Initialize the app when the DOM is ready
  document.addEventListener("DOMContentLoaded", function () {
    const app = new App();
  });