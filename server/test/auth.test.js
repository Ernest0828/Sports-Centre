const request = require("supertest");
const app = require("../index");

// test for Customer Authentication
describe("Customer register/login", () => {
  describe("POST /auth/register", () => {

    // test for successful register
    test("Should respond with a 200 status code and a success message", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Edmund",
        number: "0123456789",
        email: "ed@gmail.com",
        password: "ed123",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("New customer created");
    });

    // test if customer already exists
    test("Should respond with a 401 status code and an error message if customer already exists", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Edmund",
        number: "0123456789",
        email: "ed@gmail.com",
        password: "ed123",
      });
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe("User already exists");
    });

    // test if invalid phone number
    test("Should respond with a 401 status code and an error message if invalid phone number", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Edmund",
        number: "0123",
        email: "brayden@gmail.com",
        password: "brayden123",
      });
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe("Invalid Phone Number");
    });

    // test if invalid email 
    test("Should respond with a 401 status code and an error message if invalid email", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Edmund",
        number: "0123456789",
        email: "brayden@invalidemail",
        password: "brayden123",
      });
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe("Invalid Email");
    });
  });

  describe("POST /auth/login", () => {

    // test for successful login
    test("Should respond with a 200 status code and a success message", async () => {
      const res = await request(app).post("/api/auth/login").send({
        customerEmail: "ed@gmail.com",
        password: "ed123",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.details).toBe(res.body.details);
    });

    // test for incorrect password
    test("Should respond with a 401 status code and an error message if password is incorrect", async () => {
      const res = await request(app).post("/api/auth/login").send({
        customerEmail: "ed@gmail.com",
        password: "wrongpassword",
      });
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe("Email and Password is incorrect");
    });

    // test if login for unregistered customer
    test("Should respond with a 404 status code and an error message if user not exists", async () => {
      const res = await request(app).post("/api/auth/login").send({
        customerEmail: "unknown@gmail.com",
        password: "unknown",
      });
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("User not found");
    });
  });
});

// test for Staff Authentication
describe("Staff register/login", () => {
  describe("POST /auth/staff/register", () => {

    // test for successful staff register
    test("Should respond with a 200 status code and a success message", async () => {
      const res = await request(app).post("/auth/staff/register").send({
        name: "Veco",
        number: "0123251617",
        email: "veco@gmail.com",
        password: "veco123",
        isManager: true,
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("New staff created");
    });

    // test if staff already exists
    test("Should respond with a 401 status code and an error message if staff already exists", async () => {
      const res = await request(app).post("/auth/staff/register").send({
        name: "Najmi",
        number: "0123251617",
        email: "najmi@gmail.com",
        password: "najmi123",
        isManager: true
      });
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe("Staff already exits");
    });
  });

  describe("POST /auth/staff/login", () => {

    // test for successful login
    test("Should respond with a 200 status code and a success message", async () => {
      const res = await request(app).post("/auth/staff/login").send({
        staffEmail: "najmi@gmail.com",
        password: "najmi123",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.details).toBe(res.body.details);
    });

    // test for incorrect password
    test("Should respond with a 401 status code and an error message if password is incorrect", async () => {
      const res = await request(app).post("/auth/staff/login").send({
        staffEmail: "najmi@gmail.com",
        password: "wrongpassword",
      });
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe("Email and Password is incorrect");
    });

    // test if logged in user not staff
    test("Should respond with a 404 status code and an error message if not a staff", async () => {
      const res = await request(app).post("/auth/staff/login").send({
        staffEmail: "hazim@gmail.com",
        password: "hazim123",
      });
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Not a Staff Member");
    });
  });
});