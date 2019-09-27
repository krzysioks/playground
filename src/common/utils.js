export async function postXhr(url, content = {}) {
    const fetchResponse = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(content)
    });
    const statusResponse = checkStatus(fetchResponse);
    return parseJSON(statusResponse);
}

function parseJSON(response) {
    return response.json();
}
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}