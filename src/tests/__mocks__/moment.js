//"requireActual" requires the original modual, not the mocked module
const moment = require.requireActual('moment')

export default (timestamp = 0) => {
    return moment(timestamp)
}