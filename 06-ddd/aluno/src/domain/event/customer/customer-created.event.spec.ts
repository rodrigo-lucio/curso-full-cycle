import EventDispatcher from "../@shared/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1Handler from "./handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log-2.handler";

describe("Customer created event tests", () => {
    
    it("should register, publish and notify event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandlerConsoleLog1 = new EnviaConsoleLog1Handler();
        const eventHandlerConsoleLog2 = new EnviaConsoleLog2Handler();
        const spyEventHandlerEmail = jest.spyOn(eventHandlerConsoleLog1, "handle"); //fica verficando o comportamento se o eventHander executa o método handle
        const spyEventHandlerBroker = jest.spyOn(eventHandlerConsoleLog2, "handle"); //fica verficando o comportamento se o eventHander executa o método handle

        eventDispatcher.register("CustomerCreatedEvent", eventHandlerConsoleLog1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandlerConsoleLog2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerConsoleLog1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerConsoleLog2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: '123',
            name: 'Rodrigo',
            active: true,
            address: {
                street: 'Rua 1',
                number: '123',
                zip: '89500000',
                city: 'Caçador'
            }
        });

        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandlerEmail).toHaveBeenCalled(); //verifica se o spy chamou o metodo
        expect(spyEventHandlerBroker).toHaveBeenCalled(); //verifica se o spy chamou o metodo

    });

});