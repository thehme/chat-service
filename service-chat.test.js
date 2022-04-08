import request from 'supertest'

import app from '.'

describe("GET /", () => {
  it("returns a greeting", async () => {
    const response = await request(app).get("/");
    expect(response.text).toEqual("Hello, World!");
  });
});

describe("POST /join", () => {
  it("returns 200", async () => {
    const response = await request(app).post("/join").send({
      username: "brendadev",
      chatroomId: "2222"
    });
    expect(response.status).toBe(200);
  });
});

fdescribe("POST /message", () => {
  it("returns 500 if user does not exist", async () => {
    const response = await request(app).post("/join").send({
      message: "Hello World",
      username: "brendadevv",
      chatroomId: "2221"
    });
    expect(response.status).toBe(500);
  });

  it("returns 500 if chatroom does not exist", async () => {
    const response = await request(app).post("/join").send({
      message: "Hello World",
      username: "brendadev",
      chatroomId: "22211"
    });
    expect(response.status).toBe(500);
  });

  it("returns 200 if message is stored successfully", async () => {
    const response = await request(app).post("/join").send({
      message: "Hello World",
      username: "brendadev",
      chatroomId: "2222"
    });
    expect(response.status).toBe(200);
  });
});