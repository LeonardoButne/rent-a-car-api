// RequestFileValidation.ts

import { MissingParamError } from "../errors";
import { Validation } from "../protocols/validation";


export class RequestFileValidation implements Validation {
    constructor(private readonly fieldName: string) {}

    validate(input: any): Error | null {
        const files = input.files;

        if (!files || !files[this.fieldName] || files[this.fieldName].length === 0) {
            return new MissingParamError(this.fieldName);
        }

        return null;
    }
}
