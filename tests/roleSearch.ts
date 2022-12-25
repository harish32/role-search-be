import request from "supertest";
import { expect } from "chai";
import app from "../src/index";

describe("In-memory search", () => {
  it("should return 10 records even when search not provided", async () => {
    const response = await request(app).get("/roles").expect(200);
    expect(response.body.results).to.have.lengthOf(10);
  });

  it("should return items that match the search", async () => {
    const response = await request(app).get("/roles?q=liaison").expect(200);
    expect(response.body.results).to.have.lengthOf(4);
    expect(response.body.results[0].name).to.contain("Liaison");
  });

  it("should sort the items by name in ascending order id the sort order is ascending", async () => {
    const response = await request(app)
      .get("/roles?sortField=name&sortOrder=asc")
      .expect(200);
    expect(response.body.results[0].name).to.be.equals(
      "Central Creative Producer"
    );
  });

  it("should sort the items in descending order if the sort order is descending", async () => {
    const response = await request(app)
      .get("/roles?sortField=name&sortOrder=desc")
      .expect(200);
    expect(response.body.results[0].name).to.be.equal(
      "The Lord of the Rings: The Return of the King"
    );
  });
});
