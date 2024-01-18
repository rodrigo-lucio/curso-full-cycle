import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";

export default class FindAllProductsUsecase implements UseCaseInterface {

    private productGateway: ProductGateway;

    constructor(productGateway: ProductGateway) {
        this.productGateway = productGateway;
    }

    async execute() {
        const products = await this.productGateway.findAll();
        return {
            products: products.map(product => ({
                id: product.id.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
            }))
        };
    }
}