import supertest from 'supertest';
import { app } from '../index';
import { promises as fs } from 'fs';

const request = supertest(app);

const imageNotExistName = "doesn'tExist.jpg";
const imageForTestingName = 'forTesting.jpg';

describe('testing endpoints', () => {
  it('should return 200 for root route', (done) => {
    request
      .get('/')
      .expect(200)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it('should return 422 when missing query inputs', (done) => {
    request
      .get('/image_processing')
      .expect(422)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it('should return 200 & the saved image when entering proper query inputs', (done) => {
    request
      .get(`/image_processing?name=${imageForTestingName}&width=400&height=400`)
      .expect(200)
      .expect('Content-Type', 'image/jpg')
      .end((err) => err ? done.fail(err) : done());
  }, 5000);

  it("should return 404 when passing name that doesn't exist and return right response", (done) => {
    const expectedResMsg = `Image ${imageNotExistName} not found`;
    request
      .get(`/image_processing?name=${imageNotExistName}&width=500&height=500`)
      .expect(404)
      .end((err, res) => {
        if (err) {
          done.fail(err);
        } else {
          if (res.text !== expectedResMsg) {
            done.fail(new Error(`expected "${expectedResMsg}", got "${res.text}"`));
          } else {
            done();
          }
        }
      });
  });
});
