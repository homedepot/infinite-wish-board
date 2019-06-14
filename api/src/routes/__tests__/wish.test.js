const request = require("supertest")
const app = require("./app")

describe("GET / ", () => {
  beforeAll(() => {
    mongoose.connect(testDBURL);
  })

  beforeEach(() => {
      comment = new CommentModel(testData.normalComment);
      return comment.save();
  })

  afterEach(() => {
      return CommentModel.removeComments();
  })

  afterAll((done) => {
      mongoose.disconnect(done);
  })
  
  test("It should respond with an array of wishes", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});