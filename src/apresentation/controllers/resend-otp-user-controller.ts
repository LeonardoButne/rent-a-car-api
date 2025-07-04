import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { Validation } from '../protocols/validation';
import { badRequest, ok, serverError } from '../helpers/http-helpers';
import { ResendOtpUserUsecase } from '../../domain/usecases/resend-otp-user-usecase';

export class ResendOtpUserController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly resendOtpUser: ResendOtpUserUsecase,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email } = httpRequest.body;
      const error = this.validation.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }
      const result = await this.resendOtpUser.resend({ email });
      if (!result) {
        return badRequest(new Error('Email não localizado'));
      }
      return ok({ message: 'OTP reenviado com sucesso' });
    } catch (error) {
      if (error.errors) {
        return serverError({
          erro: error?.errors?.map((err: any) => err?.message),
        });
      } else {
        return serverError({ error });
      }
    }
  }
} 