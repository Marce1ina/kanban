import Column from "../column/column.js";
import generateId from "../../../utils.js";

export default function Board (name) {
    this.name = name;
    this.id = generateId();
}

Board.prototype = {
    render: function () {
        const boardContainer = document.getElementById("board-container");
        const boardTemplate = document.getElementById("board-template").innerHTML;

        Mustache.parse(boardTemplate);

        boardContainer.insertAdjacentHTML(
            'beforeend',
            Mustache.render(boardTemplate, {
                name: this.name,
                id: this.id
            })
        );

        const columnsContainer = document.querySelector(`#${this.id} #columns-container`);

        Sortable.create(columnsContainer, {
            group: 'columns',
            sort: true
        });

        this.instance = document.getElementById(this.id);

        this
            .instance
            .querySelector("button.create-column")
            .addEventListener("click", this.addColumn.bind(this));
    },

    addColumn: function () {
        new Column({
            name: prompt("New column name"),
            parentBoardId: this.id
        }).render();
    }
}
