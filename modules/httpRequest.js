const baseUrl = "https://cors-anywhere.herokuapp.com/https://kodilla.com/pl/bootcamp-api";

const auth = {
    "X-Client-Id": "4354",
    "X-Auth-Token": "cd235f1fb4e167570a7457ebadbb76f6"
};

const httpRequest = (endpoint, method, bodyObj) => {
    let body;

    if (bodyObj) {
        body = new FormData();
        Object.keys(bodyObj).forEach(key => body.append(key, bodyObj[key]));
    }

    return fetch(baseUrl + endpoint, {
        method: method,
        headers: auth,
        ...(body && { body: body })
    }).then(resp => resp.json());
};

export default httpRequest;
