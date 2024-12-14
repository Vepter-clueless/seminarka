class App {
    constructor() {
      this.columns = [];
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
        })
  
        columnEl.appendChild(addCardButton);
        board.appendChild(columnEl);
      });
  
      
      this.addColumn(board);
    }
  
    addColumn(board){
      const formContainer = document.createElement("div");
      formContainer.classList.add("add-colunm-form-container");
  
      const addColumnButton = document.createElement("button");
      addColumnButton.textContent = "+ Přidej další sloupec";
      addColumnButton.classList.add("add-column");
  
      addColumnButton.addEventListener("click",()=>{
        formContainer.innerHTML=`
        <form class="add-column-form">
            <textarea class="column-input" placeholder="Zadejte název sloupce"></textarea>
            <button class="submit">Přidat sloupec</button>
            <button type="button" class="cancel-button">✕</button>
          </form>
        `;
  
        const form = formContainer.querySelector(".add-column-form");
        const columnInput = form.querySelector(".column-input");
        const cancelButton = form.querySelector(".cancel-button");
        
        columnInput.focus();
        columnInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault(); 
            const columnName = columnInput.value.trim();
            if (columnName) {
              const newColumn = new Column(columnName);
              this.columns.push(newColumn);
              this.render(); 
            }
          }
        });
  
        form.addEventListener("submit",(e)=>{
          e.preventDefault();
          const columnName = columnInput.value;
          if (columnName) {
            const newColumn = new Column(columnName);
            this.columns.push(newColumn);
            this.render();
          }
        });
  
        cancelButton.addEventListener("click",()=>{
          this.render();
        });
      });
      formContainer.appendChild(addColumnButton);
      board.appendChild(formContainer);
    }
  }
  
  // Initialize the app when the DOM is ready
  document.addEventListener("DOMContentLoaded", function () {
    const app = new App();
    
  });