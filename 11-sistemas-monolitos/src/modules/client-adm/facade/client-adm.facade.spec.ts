import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeFactory from "../factory/facade.factory";

describe("ClientAdmFacade test", () => {
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


    it("should create a client", async () => {
       
        // Sem a factory, seria assim:   
        // const repository = new ClientRepository();
        // const useCase = new AddClientUseCase(repository);
        // const facade = new ClientAdmFacade({
        //     addClientUseCase: useCase,
        //     findClientUseCase: undefined
        // });

        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Client 1",
            email: "client@client",
            address: "Address do client",
        };

        await facade.addClient(input);
        const client = await ClientModel.findOne({where: {id: "1"}});
        expect(client.id).toEqual(input.id);
        expect(client.name).toEqual(input.name);
        expect(client.email).toEqual(input.email);
        expect(client.address).toEqual(input.address);
        

    });

    it("should find a client", async () => {
       
        // Sem a factory, seria assim:        
        // const repository = new ClientRepository();
        // const useCase = new FindClientUseCase(repository);
        // const useCaseAdd = new AddClientUseCase(repository);
        // const facade = new ClientAdmFacade({
        //     addClientUseCase: useCaseAdd,
        //     findClientUseCase: useCase
        // });

        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Client 1",
            email: "client@client",
            address: "Address do client",
        };

        await facade.addClient(input);

        const inputFind = {
            id: "1"
        };

        const client = await facade.findClient(inputFind);
        expect(client.id).toEqual(input.id);
        expect(client.name).toEqual(input.name);
        expect(client.email).toEqual(input.email);
        expect(client.address).toEqual(input.address);

    });

});
