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

    });

    it("should not create a customer", async () => {

        const response = await request(app)
            .post("/customer")
            .send({
                name : "Rodrigo"
            });

        expect(response.status).toBe(500);


    });

    it("should list all customers", async () => {
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

        const response2 = await request(app)
            .post("/customer")
            .send({
                name : "Danielly",
                address: {
                    street: "Street2",
                    city: "City2",
                    number: "1224",
                    zip: "89500005"
                } 
            });

        expect(response2.status).toBe(200);         
        
        const responseList = await request(app)
        .get("/customer")
        .send();
        
        expect(responseList.status).toBe(200);         
        expect(responseList.body.customers.length).toBe(2);     
        
        let customer1 = responseList.body.customers[0];
        expect(customer1.name).toBe("Rodrigo");
        expect(customer1.address.street).toBe("Street");
        expect(customer1.address.city).toBe("City");
        expect(customer1.address.number).toBe("1223");
        expect(customer1.address.zip).toBe("89500000");

        let customer2 = responseList.body.customers[1];
        expect(customer2.name).toBe("Danielly");
        expect(customer2.address.street).toBe("Street2");
        expect(customer2.address.city).toBe("City2");
        expect(customer2.address.number).toBe("1224");
        expect(customer2.address.zip).toBe("89500005");

        const responseListXML = await request(app)
        .get("/customer")
        .set("Accept", "application/xml")
        .send();

        expect(responseListXML.status).toBe(200);         
        expect(responseListXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(responseListXML.text).toContain(`<customers>`);
        expect(responseListXML.text).toContain(`<customer>`);
        expect(responseListXML.text).toContain(`<name>Rodrigo</name>`);
        expect(responseListXML.text).toContain(`<address>`);
        expect(responseListXML.text).toContain(`<street>Street</street>`);
        expect(responseListXML.text).toContain(`<number>1223</number>`);
        expect(responseListXML.text).toContain(`<zip>89500000</zip>`);
        expect(responseListXML.text).toContain(`<city>City</city>`);
        expect(responseListXML.text).toContain(`</address>`);
        expect(responseListXML.text).toContain(`<name>Danielly</name>`);
        expect(responseListXML.text).toContain(`<address>`);
        expect(responseListXML.text).toContain(`<street>Street2</street>`);
        expect(responseListXML.text).toContain(`<number>1224</number>`);
        expect(responseListXML.text).toContain(`<zip>89500005</zip>`);
        expect(responseListXML.text).toContain(`<city>City2</city>`);
        expect(responseListXML.text).toContain(`</address>`);
        expect(responseListXML.text).toContain(`</customer>`);
        expect(responseListXML.text).toContain(`</customers>`);

    });

});