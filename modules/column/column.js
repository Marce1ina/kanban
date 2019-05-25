import Card from "../card/card.js";
import httpRequest from "../httpRequest.js";
import renderFromTemplate from "../renderFromTemplate.js";

export default function Column({ name, id, cards, parentBoardId }) {
    this.name = name;
    this.id = id;
    this.parentBoardId = parentBoardId;
    this.cards = cards;
}

Column.prototype = {
    render: function() {
        const columnsContainer = document.querySelector(`[data-id="${this.parentBoardId}"] #columns-container`);
        const columnTemplate = document.getElementById("column-template").innerHTML;

        renderFromTemplate.call(this, columnsContainer, columnTemplate);
        this.instance = document.querySelector(`[data-id="${this.id}"]`);
        if (this.cards) this.setUpCards(this.cards);

        const cardsContainer = this.instance.querySelector("#cards-container");

        Sortable.create(cardsContainer, {
            group: "card",
            sort: true,
            ghostClass: "card-ghost"
        });

        this.instance.querySelector("button.create-card").addEventListener("click", this.createCard.bind(this));
        this.instance.querySelector("button.delete-column").addEventListener("click", this.destroy.bind(this));
    },

    setUpCards: function() {
        this.cards.forEach(card => this.addCard(card));
    },

    createCard: function() {
        const name = prompt("New card name:");

        httpRequest("/card", "POST", {
            name,
            bootcamp_kanban_column_id: this.id
        }).then(resp => this.addCard({ name, id: resp.id }));
    },

    addCard: function({ name, id }) {
        new Card({ name, id, parentColumnId: this.id }).render();
    },

    destroy: function() {
        httpRequest(`/column/${this.id}`, "DELETE").then(() => this.instance.remove());
    }
};
