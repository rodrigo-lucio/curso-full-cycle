
import PublishBrokerWhenProductIsCreatedHandler from "../../product/event/handler/publish-broker-when-product-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-produt-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {

    it("should register an event hander", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandlerEmail = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register("ProductCreatedEvent", eventHandlerEmail);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandlerEmail);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandlerEmail);


    });

    it("should unregister an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandlerEmail = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register("ProductCreatedEvent", eventHandlerEmail);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandlerEmail);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandlerEmail);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);


    });

    it("should unregister all events handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandlerEmail = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register("ProductCreatedEvent", eventHandlerEmail);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandlerEmail);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();


    });
     
   it("should unregister all events handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandlerEmail = new SendEmailWhenProductIsCreatedHandler();
        const eventHandlerBroker = new PublishBrokerWhenProductIsCreatedHandler();
        const spyEventHandlerEmail = jest.spyOn(eventHandlerEmail, "handle"); //fica verficando o comportamento se o eventHander executa o método handle
        const spyEventHandlerBroker = jest.spyOn(eventHandlerBroker, "handle"); //fica verficando o comportamento se o eventHander executa o método handle

        eventDispatcher.register("ProductCreatedEvent", eventHandlerEmail);
        eventDispatcher.register("ProductCreatedEvent", eventHandlerBroker);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandlerEmail);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][1]).toMatchObject(eventHandlerBroker);

        const productCreatedEvent = new ProductCreatedEvent({
            id: 1,
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0
        });

        //Quando o notify for executado o SendmainWhanProcutIsCretedHandler.handle() deve ser chamado
        eventDispatcher.notify(productCreatedEvent);
        expect(spyEventHandlerEmail).toHaveBeenCalled(); //verifica se o spy chamou o metodo
        expect(spyEventHandlerBroker).toHaveBeenCalled(); //verifica se o spy chamou o metodo

    });

});