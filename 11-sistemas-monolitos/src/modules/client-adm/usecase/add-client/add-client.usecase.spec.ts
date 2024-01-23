import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    };
};

describe("Add client usecase unit test", () => {

    it("should add a client", async () => {
        const repository = MockRepository();
        const usecase = new AddClientUseCase(repository);
   
        const input = {
            name: "John Doe",
            email: "john@gmail.com",
            address: "Street 1",
        };

        const result = await usecase.execute(input);
        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);
        expect(result.address).toBe(input.address);
        
    });

});