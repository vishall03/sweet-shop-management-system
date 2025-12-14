const request = require("supertest");
const app = require("../app");
const sequelize = require("../config/database");

let token;
let sweetId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Register user
  await request(app).post("/api/auth/register").send({
    name: "User",
    email: "user@mail.com",
    password: "123456"
  });

  // Login user
  const res = await request(app).post("/api/auth/login").send({
    email: "user@mail.com",
    password: "123456"
  });

  token = res.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe("Sweet API", () => {

  it("should add a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 10,
        quantity: 50
      });

    expect(res.statusCode).toBe(201);
    sweetId = res.body.id;
  });

  it("should purchase a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.remainingQuantity).toBe(45);
  });

});
