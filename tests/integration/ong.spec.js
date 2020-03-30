const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");
describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      //.set('auth', 'ong_id valido') caso seja necessario pegar o auth
      .send({
        name: "APAD",
        email: "apad@apad.com.br",
        whatsapp: "34343434344",
        city: "Ipatinga",
        uf: "MG"
      });
    console.log(response.body);
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});


/**
 * Opções de deploy backEnd:
 * Heroku: pequenas
 * Digital Ocean: pequenas e medias
 */

/**
 * Opções de deploy frontEnd:
 * netlify: para pequenas e medias aplicações
 */