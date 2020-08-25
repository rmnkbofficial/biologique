import { Variant } from './variant.model';

export class LineItem {
    variant: Variant;
    quantity: number;
    variantId: string;
    id: string;

    constructor(variant: Variant, quantity: number) {
        this.variant = variant;
        this.quantity = quantity;
        this.variantId = variant.id;
    }
}