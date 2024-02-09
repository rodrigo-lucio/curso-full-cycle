import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

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

        const client = new Client({
            id: new Id("1"),
            name: "John Doe",
            email: "john@john.com.br",
            address: "Rua 1",
            createdAt: new Date(),
            updatedAt: new Date()
        }); 

        const repository = new ClientRepository();
        await repository.add(client);

        const clientDb = await ClientModel.findOne({where: {id: "1"}});
        expect(clientDb.id).toEqual(client.id.id);
        expect(clientDb.name).toEqual(client.name);
        expect(clientDb.email).toEqual(client.email);
        expect(clientDb.address).toEqual(client.address);
        expect(clientDb.createdAt).toEqual(client.createdAt);
        expect(clientDb.updatedAt).toEqual(client.updatedAt);

    });

    it("shouuld find a client", async () => {

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
        expect(clientFound.createdAt).toBeDefined();
        expect(clientFound.updatedAt).toBeDefined();
    });

});