class App {
  constructor() {
    this.columns = [];
    this.loadData();
    this.render();
  }

  saveData() {
    localStorage.setItem("data", JSON.stringify(this.columns));
  }

  loadData() {
    const data = localStorage.getItem("data");
    if (data) {
      this.columns = JSON.parse(data).map((columnData) => {
        const column = new Column(columnData.name);
        column.cards = columnData.cards.map((cardData) => new Card(cardData.title));
        return column;
      });
    }
  }

  render() {
    const board = document.querySelector(".board");
    board.innerHTML = ""; // Vymaže obsah před tím, než přidáme nový

    this.columns.forEach((column, columnIndex) => {
      const columnEl = document.createElement("div");
      columnEl.classList.add("column");

      columnEl.addEventListener("dragover", (e) => e.preventDefault());
      columnEl.addEventListener("drop", (e) => this.handleDrop(e, columnIndex));

      const header = this.createColumnHeader(column, columnIndex);
      columnEl.appendChild(header);

      column.cards.forEach((card, cardIndex) => {
        const cardEl = this.createCardElement(column, card, cardIndex);
        columnEl.appendChild(cardEl);
      });

      this.addCardForm(columnEl, column);
      board.appendChild(columnEl);
    });

    this.addColumnForm(board);
  }

  createColumnHeader(column, columnIndex) {
    const header = document.createElement("div");
    header.classList.add("column-header");

    const headerTitle = document.createElement("h2");
    headerTitle.textContent = column.name;
    headerTitle.setAttribute("contenteditable", "false");
    headerTitle.addEventListener("blur", () => {
      column.editColunmName(headerTitle.textContent.trim());
      headerTitle.setAttribute("contenteditable", "false")
      this.updateAndRender();
    });

    headerTitle.addEventListener("keydown", (e) => this.handleEnterKey(e, headerTitle));

    header.appendChild(headerTitle);
    header.appendChild(this.createButton("✏️", "edit-icon", () => this.enableEdit(headerTitle)));
    header.appendChild(
      this.createButton("🗑️", "delete-icon", () => {
        this.deleteColumn(columnIndex);
      })
    );

    return header;
  }

  createCardElement(column, card, cardIndex) {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.setAttribute("draggable", "true");

    cardEl.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", JSON.stringify({ columnIndex: this.columns.indexOf(column), cardIndex }));
    });

    const cardText = document.createElement("div");
    cardText.classList.add("card-text");

    const cardTitle = document.createElement("p");
    cardTitle.textContent = card.title;
    cardTitle.setAttribute("contenteditable", "false");
    cardTitle.addEventListener("blur", () => {
      card.editTitle(cardTitle.textContent.trim());
      this.updateAndRender();
    });

    cardTitle.addEventListener("keydown", (e) => this.handleEnterKey(e, cardTitle));

    
    cardText.appendChild(cardTitle);
    cardText.appendChild(this.createButton("✏️", "edit-icon", () => this.enableEdit(cardTitle)));
    cardText.appendChild(
      this.createButton("🗑️", "delete-icon", () => {
        column.removeCard(cardIndex);
        this.updateAndRender();
      })
    );
    
    cardEl.appendChild(cardText);

    return cardEl;
  }

  createButton(icon, className, callback) {
    const button = document.createElement("span");
    button.textContent = icon;
    button.classList.add(className);
    button.addEventListener("click", callback);
    return button;
  }

  handleEnterKey(e, element) {
    if (e.key === "Enter") {
      e.preventDefault();
      element.blur();
    }
  }

  enableEdit(element) {
    element.setAttribute("contenteditable", "true");
    element.focus();
  }

  deleteColumn(columnIndex) {
    if (confirm("Opravdu chcete odstranit tento sloupec?")) {
      this.columns.splice(columnIndex, 1);
      this.updateAndRender();
    }
  }

  handleDrop(e, columnIndex) {
    const { columnIndex: fromColumnIndex, cardIndex } = JSON.parse(e.dataTransfer.getData("text/plain"));
    const [movedCard] = this.columns[fromColumnIndex].cards.splice(cardIndex, 1);
    this.columns[columnIndex].cards.push(movedCard);
    this.updateAndRender();
  }

  addCardForm(container, column) {
    const formContainer = document.createElement("div");
    formContainer.classList.add("add-card-form-container");

    const button = document.createElement("button");
    button.textContent = "+ Přidej další kartu";
    button.classList.add("add-card");
    button.addEventListener("click", () => {
      formContainer.innerHTML = `
        <form class="add-card-form">
          <textarea class="card-input" placeholder="Zadejte název karty"></textarea>
          <button type="submit" class="submit">Přidat</button>
          <button type="button" class="cancel-button">✕</button>
        </form>
      `;

      const form = formContainer.querySelector(".add-card-form");
      const textarea = form.querySelector(".card-input");
      const cancelButton = form.querySelector(".cancel-button");

      textarea.focus();

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (textarea.value.trim()) {
          column.addCard(textarea.value.trim());
          this.updateAndRender();
        }
      });
      form.addEventListener("keydown",(e)=>{
        if (e.key === "Enter" && textarea.value.trim()) {
          column.addCard(textarea.value.trim());
          this.updateAndRender();
        }
      })

      cancelButton.addEventListener("click", () => this.render());
    });

    formContainer.appendChild(button);
    container.appendChild(formContainer);
  }

  addColumnForm(container) {
    const formContainer = document.createElement("div");
    formContainer.classList.add("add-column-form-container");

    const button = document.createElement("button");
    button.textContent = "+ Přidej další sloupec";
    button.classList.add("add-column");
    button.addEventListener("click", () => {
      formContainer.innerHTML = `
        <form class="add-column-form">
          <textarea class="column-input" placeholder="Zadejte název sloupce"></textarea>
          <button type="submit" class="submit">Přidat</button>
          <button type="button" class="cancel-button">✕</button>
        </form>
      `;

      const form = formContainer.querySelector(".add-column-form");
      const columnInput = form.querySelector(".column-input");
      const cancelButton = form.querySelector(".cancel-button");

      columnInput.focus();

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (columnInput.value.trim()) {
          const newColumn = new Column(columnInput.value.trim());
          this.columns.push(newColumn);
          this.updateAndRender();
        }
      });
      form.addEventListener("keydown",(e)=>{
        if (e.key ==="Enter" &&columnInput.value.trim()) {
          const newColumn = new Column(columnInput.value.trim());
            this.columns.push(newColumn);
            this.updateAndRender();
        }
      })

      cancelButton.addEventListener("click", () => this.render());
    });

    formContainer.appendChild(button);
    container.appendChild(formContainer);
  }

  updateAndRender() {
    this.saveData();
    this.render();
  }
}
//scroll pomocí myši
let isMouseDown = false;
let startX;
let scrollLeft;

const container = document.querySelector('.board'); 

container.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  startX = e.pageX - container.offsetLeft; 
  scrollLeft = container.scrollLeft; 
  container.style.cursor = 'grabbing'; 
});

container.addEventListener('mouseleave', () => {
  isMouseDown = false;
  container.style.cursor = 'auto'; 
});

container.addEventListener('mouseup', () => {
  isMouseDown = false;
  container.style.cursor = 'auto'; 
});

container.addEventListener('mousemove', (e) => {
  if (!isMouseDown) return; 

  const x = e.pageX - container.offsetLeft; 
  const walk = (x - startX); 
  container.scrollLeft = scrollLeft - walk; 
});

document.addEventListener("DOMContentLoaded", () => new App());
