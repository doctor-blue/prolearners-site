import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseFilters, UseGuards } from "@nestjs/common";
import { HttpExceptionFilter } from "src/presentation/exception.filter";
import { LoginDto } from "src/presentation/dto/LoginDto";
import { RefreshTokenDto } from "src/presentation/dto/RefreshTokenDto";
import { RegisterDto } from "src/presentation/dto/RegisterDto";
import { IResponse } from "src/presentation/response/IResponse";
import { v1Path } from "../path";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./local.authguard";
import { Response } from "express";
import { SUCCESS_STATUS } from "src/domain/const/StatusConst";


@Controller(v1Path + "auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @UseGuards(LocalAuthGuard)
  @Post("login")
  @UseFilters(HttpExceptionFilter)
  async login(
    @Body() loginDto: LoginDto,
  ) {
    return await this.authService.login(loginDto.userName, loginDto.password)
  }

  @Post("register")
  @UseFilters(HttpExceptionFilter)
  async register(
    @Body()
    registerDto: RegisterDto
  ) {
    return await this.authService.register(registerDto);
  }
  @Post("refresh-token")
  @UseFilters(HttpExceptionFilter)
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res() res: Response
  ) {
    this.authService.refreshToken(refreshTokenDto.refresh_token, {
      onSuccess(data) {
        res.status(200).json(new IResponse(data, SUCCESS_STATUS));
      },
      onFailure(code, message) {
        res.status(code).json(new IResponse(null, message))
      },
    });
  }

}