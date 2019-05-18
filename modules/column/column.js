import Card from "../card/card.js";
import generateId from "../../../utils.js";

export default function Column ({ name, parentBoardId }) {
    this.name = name;
    this.id = generateId();
    this.parentBoardId = parentBoardId;
}

Column.prototype = {
    render: function () {
        const columnsContainer = document.querySelector(`#${this.parentBoardId} #columns-container`);
        const columnTemplate = document.getElementById("column-template").innerHTML;

        Mustache.parse(columnTemplate);

        columnsContainer.insertAdjacentHTML(
            'beforeend',
            Mustache.render(columnTemplate, {
                name: this.name,
                id: this.id
            })
        );

        this.instance = document.querySelector(`#${this.parentBoardId} #${this.id}`);

        this
            .instance
            .querySelector("button.create-card")
            .addEventListener("click", this.addCard.bind(this));

        this
            .instance
            .querySelector("button.delete-column")
            .addEventListener("click", this.destroy.bind(this));
    },

    addCard: function () {
        new Card({
            name: prompt("New card name"),
            parentColumnId: this.id
        }).render();
    },

    destroy: function () {
        this.instance.remove();
    }
}
