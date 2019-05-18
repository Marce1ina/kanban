import Column from "../column/column.js";

export default function Board (boardName) {
    this.boardName = boardName;
}

Board.prototype = {
    render: function () {
        const boardContainer = document.getElementById("board-container");
        const boardTemplate = document.getElementById("board-template").innerHTML;

        Mustache.parse(boardTemplate);

        boardContainer.insertAdjacentHTML(
            'beforeend',
            Mustache.render(boardTemplate, {boardName: this.boardName})
        );

        document.querySelector("button.create-column").addEventListener("click", this.addColumn);
    },

    addColumn: function () {
        new Column(prompt("New column name")).render();
    }
}
