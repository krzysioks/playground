const { errorMapper } = require('../config/genericErrorMap');
/**
 * Mapping errors to list of [key, kind, message], which is returned to front end
 * @param {Object} error - list of errors returned by db
 * @param {Array} keys - list of keys of given document which has requirement to be unique
 * 
 * @returns {Array} statusList - array of [key, kind, message]
 */
const handleError = (error, keys = []) => {
    let statusList = [];
    if (error.errors) {
        //mapping errors to list of [key, kind, message], which is returned to front end
        statusList = Object.keys(error.errors).reduce((statusList, key) => {
            if (error.errors[key].kind === 'user defined') {
                statusList = [...statusList, [key, 'user defined', error.errors[key].message]];
            } else {
                const keyDisp = key.charAt(0).toUpperCase() + key.slice(1);
                statusList = [...statusList, [key, error.errors[key].kind, `${keyDisp} ${errorMapper[error.errors[key].kind]}`]];
            }

            return statusList;
        }, []);
    } else {
        if (keys.length) {
            //case when document with given props already exists in database
            const prop = keys.filter(key => error.errmsg.includes(key))[0];
            const keyDisp = prop.charAt(0).toUpperCase() + prop.slice(1);
            statusList[0] = [prop, 'unique', `${keyDisp} ${errorMapper.unique}`];
        }
    }

    return statusList;
};

module.exports = {
    handleError
};