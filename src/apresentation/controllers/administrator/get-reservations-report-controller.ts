import { ok, serverError } from '../../helpers/http-helpers';
import { GetReservationsReport } from '../../../domain/usecases/administrator-usecases/get-reservations-report-usecase';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';

export class GetReservationsReportController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly getReservationsReport: GetReservationsReport,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return { statusCode: 400, body: error };
      }
      const report = await this.getReservationsReport.getReservationsReport();
      return ok(report);
    } catch (error) {
      return serverError({ error });
    }
  }
} 