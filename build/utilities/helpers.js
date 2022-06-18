"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQueryInputs = void 0;
var validateQueryInputs = function (_a) {
    var name = _a.name, height = _a.height, width = _a.width;
    var queryInputsValidationMsg = {};
    var isQueryInputsValid = true;
    if (!name) {
        isQueryInputsValid = false;
        queryInputsValidationMsg.name = "is required with it's extension e.g 'image.jpg'";
    }
    if (!(parseInt(height) > 0)) {
        isQueryInputsValid = false;
        queryInputsValidationMsg.height = 'must be bigger than zero e.g 500';
    }
    if (!(parseInt(width) > 0)) {
        isQueryInputsValid = false;
        queryInputsValidationMsg.width = 'must be bigger than zero e.g 500';
    }
    return { isQueryInputsValid: isQueryInputsValid, queryInputsValidationMsg: queryInputsValidationMsg };
};
exports.validateQueryInputs = validateQueryInputs;
