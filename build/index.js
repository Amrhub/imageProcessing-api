"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = require("fs");
exports.app = (0, express_1.default)();
var port = 3000;
exports.app.get('/', function (_req, res) {
    res.send('Welcome to Image processing api current version v1.0.0');
});
exports.app.get('/image_processing', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, width, height, name, validateQueryInputs, isQueryInputsValid, outputImage, _b, outputImage, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, width = _a.width, height = _a.height, name = _a.name;
                validateQueryInputs = {};
                isQueryInputsValid = true;
                if (!name) {
                    isQueryInputsValid = false;
                    validateQueryInputs.name = "is required with it's extension e.g 'image.jpg'";
                }
                if (!(parseInt(height) > 0)) {
                    isQueryInputsValid = false;
                    validateQueryInputs.height = 'must be bigger than zero e.g 500';
                }
                if (!(parseInt(width) > 0)) {
                    isQueryInputsValid = false;
                    validateQueryInputs.width = 'must be bigger than zero e.g 500';
                }
                if (!isQueryInputsValid) {
                    res.status(422).send(JSON.stringify({ image: validateQueryInputs }));
                    return [2 /*return*/];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 9]);
                return [4 /*yield*/, fs_1.promises.readFile("./src/thumbnails/".concat(name))];
            case 2:
                outputImage = _c.sent();
                res.contentType("image/jpg");
                res.send(outputImage);
                return [3 /*break*/, 9];
            case 3:
                _b = _c.sent();
                _c.label = 4;
            case 4:
                _c.trys.push([4, 7, , 8]);
                return [4 /*yield*/, (0, sharp_1.default)("./src/images/".concat(name))
                        .resize(parseInt(width), parseInt(height))
                        .toFile("./src/thumbnails/".concat(name))];
            case 5:
                _c.sent();
                return [4 /*yield*/, fs_1.promises.readFile("./src/thumbnails/".concat(name))];
            case 6:
                outputImage = _c.sent();
                res.contentType("image/jpg");
                res.send(outputImage);
                return [3 /*break*/, 8];
            case 7:
                err_1 = _c.sent();
                if (err_1 instanceof Error && err_1.message.includes('missing')) {
                    // assuming there are errors might occur from sharp not able to resize for example so I just want to give user accurate and user friendly message
                    res.status(404).send("Image ".concat(name, " not found"));
                    return [2 /*return*/];
                }
                console.error(err_1);
                return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
exports.app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
