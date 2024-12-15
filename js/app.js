class App {
  constructor() {
    this.columns = [];
    this.render();
  }

  render() {
    const board = document.querySelector(".board");
    board.innerHTML = ""; 

    this.columns.forEach((column, columnIndex) => {
      const columnEl = document.createElement("div");
      columnEl.classList.add("column");

      const header = this.createColumnHeader(column, columnIndex);
      columnEl.appendChild(header);

      column.cards.forEach((card, cardIndex) => {
        const cardEl = this.createCardElement(column, card, cardIndex);
        columnEl.appendChild(cardEl);
      });

      // Přidání formuláře pro přidání karet
      this.addCardCol(column, columnEl);

      board.appendChild(columnEl);
    });

    // Přidání formuláře pro přidání sloupců
    this.addColumn(board);
  }

  createColumnHeader(column, columnIndex) {
    const header = document.createElement("div");
    header.classList.add("column-header");

    const headerTitle = document.createElement("h2");
    headerTitle.textContent = column.name;
    headerTitle.setAttribute("contenteditable", "false");
    headerTitle.addEventListener("blur", () => this.editColumn(headerTitle, column));
    headerTitle.addEventListener("keydown", (e)=>{
      if (e.key === "Enter") {
        e.preventDefault();
        headerTitle.blur();
      }
    })

    const editIcon = document.createElement("span");
    editIcon.textContent = "✏️";
    editIcon.classList.add("edit-icon");
    editIcon.addEventListener("click", () => this.enableEdit(headerTitle));

    const deleteIcon = document.createElement("span");
    deleteIcon.textContent = "🗑️";
    deleteIcon.classList.add("delete-icon");
    deleteIcon.addEventListener("click", () => this.deleteColumn(columnIndex));

    header.appendChild(headerTitle);
    header.appendChild(editIcon);
    header.appendChild(deleteIcon);

    return header;
  }

  createCardElement(column, card, cardIndex) {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");

    const cardTextCont = document.createElement("div");
    cardTextCont.classList.add("card-text");

    const cardTitle = document.createElement("p");
    cardTitle.textContent = card.title;
    cardTitle.setAttribute("contenteditable", "false");
    cardTitle.addEventListener("blur", () => this.editCard(cardTitle, column, card));
    cardTitle.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        cardTitle.blur();
      }
    });

    const editIcon = document.createElement("span");
    editIcon.textContent = "✏️";
    editIcon.classList.add("edit-icon");
    editIcon.addEventListener("click", () => this.enableEdit(cardTitle));

    const deleteIcon = document.createElement("span");
    deleteIcon.textContent = "🗑️";
    deleteIcon.classList.add("delete-icon");
    deleteIcon.addEventListener("click", () => this.deleteCard(column, cardIndex));

    // Přidání cardTitle do cardTextCont
    cardTextCont.appendChild(cardTitle);
    cardTextCont.appendChild(editIcon);
    cardTextCont.appendChild(deleteIcon);
    cardEl.appendChild(cardTextCont);

    return cardEl;
}


  enableEdit(element) {
    element.setAttribute("contenteditable", "true");
    element.focus();
  }

  editColumn(headerTitle, column) {
    column.name = headerTitle.textContent.trim();
    this.render();
  }

  editCard(cardTitle, column, card) {
    card.title = cardTitle.textContent.trim();
    this.render();
  }

  deleteColumn(columnIndex) {
    if (confirm(`Opravdu chcete odstranit tento sloupec?`)) {
      this.columns.splice(columnIndex, 1);
      this.render();
    }
  }

  deleteCard(column, cardIndex) {
    if (confirm(`Opravdu chcete odstranit tuto kartu?`)) {
      column.cards.splice(cardIndex, 1);
      this.render();
    }
  }

  addColumn(board) {
    const formContainer = document.createElement("div");
    formContainer.classList.add("add-column-form-container");

    const addColumnButton = document.createElement("button");
    addColumnButton.textContent = "+ Přidej další sloupec";
    addColumnButton.classList.add("add-column");

    addColumnButton.addEventListener("click", () => {
      formContainer.innerHTML = `
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

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const columnName = columnInput.value;
        if (columnName) {
          const newColumn = new Column(columnName);
          this.columns.push(newColumn);
          this.render();
        }
      });
      columnInput.addEventListener("keydown", (e)=>{
        if (e.key === "Enter") {
          e.preventDefault();
          const columnName = columnInput.value;
          if (columnName) {
            const newColumn = new Column(columnName);
            this.columns.push(newColumn);
            this.render();
          } 
        }
      })

      cancelButton.addEventListener("click", () => {
        this.render();
      });
    });

    formContainer.appendChild(addColumnButton);
    board.appendChild(formContainer);
  }

  addCardCol(column, columnEl) {
    const formContainer = document.createElement("div");
    formContainer.classList.add("add-card-form-container");

    const addCardButton = document.createElement("button");
    addCardButton.textContent = "+ Přidej další kartu";
    addCardButton.classList.add("add-card");

    addCardButton.addEventListener("click", () => {
      formContainer.innerHTML = `
        <form class="add-card-form">
            <textarea class="card-input" placeholder="Zadejte název karty"></textarea>
            <button class="submit">Přidat kartu</button>
            <button type="button" class="cancel-button">✕</button>
          </form>
        `;

      const form = formContainer.querySelector(".add-card-form");
      const cardInput = form.querySelector(".card-input");
      const cancelButton = form.querySelector(".cancel-button");

      cardInput.focus();

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const cardTitle = cardInput.value;
        if (cardTitle) {
          column.addCard(cardTitle);
          this.render();
        }
      });
      cardInput.addEventListener("keydown", (e)=>{
        if (e.key === "Enter") {
          e.preventDefault();
          const cardTitle = cardInput.value;
          if (cardTitle) {
            column.addCard(cardTitle);
            this.render();
          }
        }
      })

      cancelButton.addEventListener("click", () => {
        this.render();
      });
    });

    formContainer.appendChild(addCardButton);
    columnEl.appendChild(formContainer);
  }
}

// Initialize the app when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  const app = new App();
});
