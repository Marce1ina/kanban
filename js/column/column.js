import Card from "../card/card.js";

export default function Column (columnName) {
    this.columnName = columnName;
}

Column.prototype = {
    render: function () {
        const columnsContainer = document.getElementById("columns-container");
        const columnTemplate = document.getElementById("column-template").innerHTML;

        Mustache.parse(columnTemplate);

        columnsContainer.insertAdjacentHTML(
            'beforeend',
            Mustache.render(columnTemplate, {columnName: this.columnName})
        );

        this.instance = document.querySelector(".column");

        document.querySelector("button.create-card").addEventListener("click", this.addCard);
        document.querySelector("button.delete-column").addEventListener("click", this.destroy.bind(this));
    },

    addCard: function () {
        new Card(prompt("New card name")).render();
    },

    destroy: function () {
        this.instance.remove();
    }
}
