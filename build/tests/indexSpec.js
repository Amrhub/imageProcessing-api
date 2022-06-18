"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var index_1 = require("../index");
var fs_1 = require("fs");
var request = (0, supertest_1.default)(index_1.app);
var imageNotExistName = "doesn'tExist.jpg";
var imageForTestingName = 'forTesting.jpg';
describe('testing endpoints', function () {
    it('should return 200 for root route', function (done) {
        request
            .get('/')
            .expect(200)
            .end(function (err) { return (err ? done.fail(err) : done()); });
    });
    it('should return 422 when missing query inputs', function (done) {
        request
            .get('/image_processing')
            .expect(422)
            .end(function (err) { return (err ? done.fail(err) : done()); });
    });
    it("should return 404 when passing name that doesn't exist and return right response", function (done) {
        var expectedResMsg = "Image ".concat(imageNotExistName, " not found");
        request
            .get("/image_processing?name=".concat(imageNotExistName, "&width=500&height=500"))
            .expect(404)
            .end(function (err, res) {
            if (err) {
                done.fail(err);
            }
            else {
                if (res.text !== expectedResMsg) {
                    done.fail(new Error("expected \"".concat(expectedResMsg, "\", got \"").concat(res.text, "\"")));
                }
                else {
                    done();
                }
            }
        });
    });
    afterAll(function () {
        fs_1.promises.unlink("./src/thumbnails/".concat(imageForTestingName));
        console.log('Removed test image from thumbnails folder.');
    });
    it('should return 200 & the saved image when entering proper query inputs', function (done) {
        request
            .get("/image_processing?name=".concat(imageForTestingName, "&width=400&height=400"))
            .expect(200)
            .expect('Content-Type', 'image/jpg')
            .end(function (err) { return err ? done.fail(err) : done(); });
    });
});
