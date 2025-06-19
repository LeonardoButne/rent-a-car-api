import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { Validation } from '../../../protocols/validation';
import { badRequest, send, serverError } from '../../../helpers/http-helpers';
import { ResendOtpClient } from '../../../../domain/usecases/user-usecases/resend-otp-client-usecase';

export class ResendOTPUserController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly resendOtpUser: ResendOtpClient,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      const { email } = httpRequest.body;

      if (!email) {
        return badRequest(new Error('Email obrigatorio'));
      }
      this.resendOtpUser.send(email);

      const otp = await this.resendOtpUser.send(email);

      if (otp === null) {
        return badRequest(new Error('Email nao localizado'));
      }

      if (!otp) {
        return badRequest(new Error('OTP nao gerado'));
      }

      return send(otp);
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
