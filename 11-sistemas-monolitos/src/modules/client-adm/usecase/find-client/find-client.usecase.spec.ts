import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
    id: new Id("1"),
    name: "John Doe",
    email:"john@john.com",
    address: "Street 1",
    createdAt: new Date(),
    updatedAt: new Date()
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
    };
};



describe("Add client usecase unit test", () => {

    it("should add a client", async () => {
        const repository = MockRepository();
        const usecase = new FindClientUseCase(repository);
   
        const input = {
            id : "1"
        };

        const result = await usecase.execute(input);
        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.address).toBe(client.address);
        
    });

});
