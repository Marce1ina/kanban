import Column from "../column/column.js";
import httpRequest from "../httpRequest.js";
import renderFromTemplate from "../renderFromTemplate.js";

export default function Board() {}

Board.prototype = {
    render: function() {
        const boardContainer = document.getElementById("board-container");
        const boardTemplate = document.getElementById("board-template").innerHTML;

        httpRequest("/board", "GET").then(resp => {
            this.name = resp.name;
            this.id = resp.id;

            renderFromTemplate.call(this, boardContainer, boardTemplate);
            this.instance = document.querySelector(`[data-id="${this.id}"]`);
            if (resp.columns) this.setupColumns(resp.columns);

            const columnsContainer = this.instance.querySelector("#columns-container");

            Sortable.create(columnsContainer, {
                group: "columns",
                sort: true
            });

            this.instance.querySelector("button.create-column").addEventListener("click", this.createColumn.bind(this));
        });
    },

    setupColumns: function(columns) {
        columns.forEach(column => this.addColumn(column));
    },

    createColumn: function() {
        const name = prompt("New column name:");

        httpRequest("/column", "POST", { name }).then(resp => this.addColumn({ name, id: resp.id }));
    },

    addColumn: function({ name, id, cards }) {
        new Column({ name, id, cards, parentBoardId: this.id }).render();
    }
};
