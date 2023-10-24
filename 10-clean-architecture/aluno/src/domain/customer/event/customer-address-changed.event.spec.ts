import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";

describe("Customer addres changed event tests", () => {
    
    it("should register, publish and notify event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandlerConsoleLog = new EnviaConsoleLogHandler();
        const spyEventHandlerEmail = jest.spyOn(eventHandlerConsoleLog, "handle"); //fica verficando o comportamento se o eventHander executa o método handle

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandlerConsoleLog);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandlerConsoleLog);

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
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

        eventDispatcher.notify(customerAddressChangedEvent);
        expect(spyEventHandlerEmail).toHaveBeenCalled(); //verifica se o spy chamou o metodo

    });

});