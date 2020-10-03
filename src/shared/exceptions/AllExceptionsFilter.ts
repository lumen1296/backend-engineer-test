import { BaseExceptionFilter } from "@nestjs/core";
import { Inject, Catch, ArgumentsHost, NotFoundException, HttpStatus, InternalServerErrorException, BadGatewayException, BadRequestException, ForbiddenException, ConflictException, RequestTimeoutException, PayloadTooLargeException, HttpServer } from "@nestjs/common";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {

  constructor(
    @Inject() applicationRef: HttpServer,
  ) {
    super(applicationRef);
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();


    let message = 'Internal server error';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof NotFoundException) {
      message = exception.message;
      status = HttpStatus.NOT_FOUND;
    } else if (exception instanceof BadGatewayException) {
      message = exception.message;
      status = HttpStatus.BAD_GATEWAY;
    } else if (exception instanceof BadRequestException) {
      message = exception.message;
      status = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof ForbiddenException) {
      message = exception.message;
      status = HttpStatus.FORBIDDEN;
    } else if (exception instanceof ConflictException) {
      message = exception.message;
      status = HttpStatus.CONFLICT;
    } else if (exception instanceof RequestTimeoutException) {
      message = exception.message;
      status = HttpStatus.REQUEST_TIMEOUT;
    } else if (exception instanceof PayloadTooLargeException) {
      message = exception.message;
      status = HttpStatus.PAYLOAD_TOO_LARGE;
    } else if (exception instanceof InternalServerErrorException) {
      message = exception.message;
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    } else {
      message = 'Internal server error'
    }

    response
      .status(status)
      .json({
        status: status,
        message: message
      });
  }

}