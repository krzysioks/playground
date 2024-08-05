import type { ErrorReturnType, TaskType } from '../../server/common/types';
type HeaderType = Record<string, string>;
export interface CatchErrorType extends Error {
    response: Response;
}

interface GetXhrReturnType {
    tasks: TaskType[];
}

interface PostXhrReturnType {
    isUser: boolean;
    passwordMatched: boolean;
    taskAdded: boolean;
    token: string;
    userRegistered: boolean;
    statusList: ErrorReturnType[];
}

export async function postXhr(
    url: string,
    content: object = {},
    header: HeaderType = {}
): Promise<Partial<PostXhrReturnType>> {
    let headerObj: HeaderType = {
        'Content-Type': 'application/json'
    };

    if (Object.keys(header)) {
        headerObj = Object.assign(headerObj, header);
    }

    const fetchResponse: Response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: new Headers(headerObj),
        body: JSON.stringify(content)
    });
    const statusResponse = checkStatus(fetchResponse) as Response;
    return parseJSON(statusResponse);
}

export async function getXhr(
    url: string,
    header: HeaderType = {}
): Promise<Partial<GetXhrReturnType>> {
    let headerObj = {
        'Content-Type': 'application/json'
    };

    if (Object.keys(header)) {
        headerObj = Object.assign(headerObj, header);
    }

    const fetchResponse: Response = await fetch(url, {
        credentials: 'include',
        method: 'GET',
        headers: new Headers(headerObj)
    });
    const statusResponse = checkStatus(fetchResponse) as Response;
    return parseJSON(statusResponse);
}

function parseJSON(response: Response): object {
    return response.json();
}
function checkStatus(response: Response): Response | void {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(response.statusText) as CatchErrorType;
        error.response = response;
        throw error;
    }
}
