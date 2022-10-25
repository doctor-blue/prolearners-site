import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { UNKNOWN_ERR } from 'src/domain/const/ErrorConst';
import { Status } from 'src/domain/model/Status';
import { IResponse } from './response/IResponse';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        console.log("Exception filter ", exception.message);

        try {
            response
                .status(status)
                .json(new IResponse(null, JSON.parse(exception.message)));
        } catch (err) {
            response
                .status(HttpStatus.BAD_REQUEST)
                .json(new IResponse(null, UNKNOWN_ERR));
        }
    }
}