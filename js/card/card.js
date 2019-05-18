import generateId from "../utils.js";

export default function Card ({ name, parentColumnId }) {
    this.name = name;
    this.id = generateId();
    this.parentColumnId = parentColumnId;
}

Card.prototype = {
    render: function () {
        const cardsContainer = document.querySelector(`#${this.parentColumnId} #cards-container`);
        const cardTemplate = document.getElementById("card-template").innerHTML;

        Mustache.parse(cardTemplate);

        cardsContainer.insertAdjacentHTML(
            'beforeend',
            Mustache.render(cardTemplate, {
                name: this.name,
                id: this.id
            })
        );

        this.instance = document.querySelector(`#${this.parentColumnId} #${this.id}`);

        this
            .instance
            .querySelector("button.delete-card")
            .addEventListener("click", this.destroy.bind(this));
    },

    destroy: function () {
        this.instance.remove();
    }
}
