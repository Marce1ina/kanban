import httpRequest from "../httpRequest.js";
import renderFromTemplate from "../renderFromTemplate.js";

export default function Card({ name, id, parentColumnId }) {
    this.name = name;
    this.id = id;
    this.parentColumnId = parentColumnId;
}

Card.prototype = {
    render: function() {
        const cardsContainer = document.querySelector(`[data-id="${this.parentColumnId}"] #cards-container`);
        const cardTemplate = document.getElementById("card-template").innerHTML;

        renderFromTemplate.call(this, cardsContainer, cardTemplate);

        this.instance = document.querySelector(`[data-id="${this.id}"]`);
        this.instance.querySelector("button.delete-card").addEventListener("click", this.destroy.bind(this));
    },

    destroy: function() {
        httpRequest(`/card/${this.id}`, "DELETE").then(() => this.instance.remove());
    }
};
