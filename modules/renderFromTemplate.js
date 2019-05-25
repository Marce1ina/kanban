const renderFromTemplate = function(container, template) {
    Mustache.parse(template);

    container.insertAdjacentHTML(
        "beforeend",
        Mustache.render(template, {
            name: this.name,
            id: this.id
        })
    );
};

export default renderFromTemplate;
