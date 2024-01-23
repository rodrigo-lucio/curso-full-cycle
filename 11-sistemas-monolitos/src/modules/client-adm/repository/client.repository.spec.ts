import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";

describe("ClientRepository test", () => {
    let sequelize: Sequelize;	

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }

        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("shouuld create a client", async () => {

        const client = await ClientModel.create({
            id: "1",
            name: "John Doe",
            email: "john@john.com.br",
            address: "Rua 1",
            createdAt: new Date(),
            updatedAt: new Date()
        }); 

        const repository = new ClientRepository();

        const clientFound = await repository.find("1");
        expect(clientFound.id.id).toEqual(client.id);
        expect(clientFound.name).toEqual(client.name);
        expect(clientFound.email).toEqual(client.email);
        expect(clientFound.address).toEqual(client.address);
        expect(clientFound.createdAt).toEqual(client.createdAt);
        expect(clientFound.updatedAt).toEqual(client.updatedAt);

    });

});