export default function Card (cardName) {
    this.cardName = cardName;
}

Card.prototype = {
    render: function () {
        const cardsContainer = document.getElementById("cards-container");
        const cardTemplate = document.getElementById("card-template").innerHTML;

        Mustache.parse(cardTemplate);

        cardsContainer.insertAdjacentHTML(
            'beforeend',
            Mustache.render(cardTemplate, {cardName: this.cardName})
        );

        this.instance = document.querySelector(".card");

        document.querySelector("button.delete-card").addEventListener("click", this.destroy.bind(this));
    },

    destroy: function () {
        this.instance.remove();
    }
}