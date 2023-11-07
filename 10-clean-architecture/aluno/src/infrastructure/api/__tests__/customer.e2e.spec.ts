import {app, sequelize} from "../express";
import request from "supertest";

describe("E2E test for customer", ()=> {

    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async  () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name : "Rodrigo",
                address: {
                    street: "Street",
                    city: "City",
                    number: "1223",
                    zip: "89500000"
                } 
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Rodrigo");
        expect(response.body.address.street).toBe("Street");
        expect(response.body.address.city).toBe("City");
        expect(response.body.address.number).toBe("1223");
        expect(response.body.address.zip).toBe("89500000");

    })

});