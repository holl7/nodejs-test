'use strict'

class JsonResult {
    constructor(param) {
        this.bresult = param.bresult;
        this.error = param.error;
        this.object = param.object;
    }
}

module.exports = JsonResult;


if (require.main == module) {
    var param = { bresult: true, error: '' };
    let jsonResult = new JsonResult(param);
    //let jsonResult2 = new JsonResult(true, '错误信息');
    console.log(jsonResult);
}