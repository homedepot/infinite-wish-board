const request = require("supertest")
const wish = require("../wish")

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
    const response = await request(wish).get("/");
    expect(response.statusCode).toBe(200);
  });
});