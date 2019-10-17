export async function postXhr(url, content = {}, header) {
    console.log('header: ', header);
    let headerObj = {
        'Content-Type': 'application/json'
    };

    if (Object.keys(header)) {
        headerObj = Object.assign(headerObj, header);
    }
    console.log('headerObj: ', headerObj)
    const fetchResponse = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: new Headers(headerObj),
        body: JSON.stringify(content)
    });
    const statusResponse = checkStatus(fetchResponse);
    return parseJSON(statusResponse);
}

export async function getXhr(url, header) {
    let headerObj = {
        'Content-Type': 'application/json'
    };

    if (Object.keys(header)) {
        headerObj = Object.assign(headerObj, header);
    }

    const fetchResponse = await fetch(url, {
        credentials: 'include',
        method: 'GET',
        headers: new Headers(headerObj)
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