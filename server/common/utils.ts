import type { CatchErrorType, ErrorReturnType } from '../common/types';
/**
 * Mapping errors to list of [key, kind, message], which is returned to front end
 * @param {Object} error - list of errors returned by db
 * @param {Array} keys - list of keys of given document which has requirement to be unique
 *
 * @returns {Array} statusList - array of [key, kind, message]
 */

enum ErrorMapper {
    unique = 'is not unique',
    minlength = 'is too short',
    maxlength = 'is too long',
    required = 'is required'
}

const handleError = (
    error: CatchErrorType,
    keys: string[] = []
): ErrorReturnType[] => {
    let statusList: ErrorReturnType[] = [];
    if (error.errors) {
        //mapping errors to list of [key, kind, message], which is returned to front end
        statusList = Object.keys(error.errors).reduce(
            (statusList: ErrorReturnType[], key: string) => {
                if (error.errors[key].kind === 'user defined') {
                    statusList = [
                        ...statusList,
                        [key, 'user defined', error.errors[key].message]
                    ];
                } else {
                    const keyDisp: string = `${key
                        .charAt(0)
                        .toUpperCase()}${key.slice(1)}`;
                    statusList = [
                        ...statusList,
                        [
                            key,
                            error.errors[key].kind,
                            `${keyDisp} ${
                                ErrorMapper[
                                    error.errors[key]
                                        .kind as keyof typeof ErrorMapper
                                ]
                            }`
                        ]
                    ];
                }

                return statusList;
            },
            []
        );
    } else {
        if (keys.length) {
            //case when document with given props already exists in database
            const prop: string = keys.filter(key =>
                error.errmsg.includes(key)
            )[0];
            const keyDisp: string = `${prop
                .charAt(0)
                .toUpperCase()}${prop.slice(1)}`;
            statusList[0] = [
                prop,
                'unique',
                `${keyDisp} ${ErrorMapper.unique}`
            ];
        }
    }

    return statusList;
};

export { ErrorMapper, handleError };
