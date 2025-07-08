import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { Validation } from '../protocols/validation';
import { ConfirmSignupUserUsecase } from '../../domain/usecases/confirm-signup-user-usecase';
import { badRequest, ok, serverError } from '../helpers/http-helpers';

export class ConfirmSignupUserController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly confirmSignupUserUsecase: ConfirmSignupUserUsecase
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }
      const { email, otp, deviceId } = httpRequest.body;
      const result = await this.confirmSignupUserUsecase.confirm({ email, otp, deviceId });
      if (result instanceof Error) {
        return badRequest(result);
      }
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
} 