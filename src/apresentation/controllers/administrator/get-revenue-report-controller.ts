import { ok, serverError } from '../../helpers/http-helpers';
import { GetRevenueReport } from '../../../domain/usecases/administrator-usecases/get-revenue-report-usecase';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';

export class GetRevenueReportController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly getRevenueReport: GetRevenueReport,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return { statusCode: 400, body: error };
      }
      const report = await this.getRevenueReport.getRevenueReport();
      return ok(report);
    } catch (error) {
      return serverError({ error });
    }
  }
} 