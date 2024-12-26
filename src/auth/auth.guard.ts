import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const authHeader = request.headers.authorization;

        if (!authHeader) throw new UnauthorizedException("Authorization header is missing")

        const [type, credentials] = authHeader.split(' ');

        if (type !== 'Basic' || !credentials) throw new UnauthorizedException("Invalid authorization header format. Expected 'Basic: email:password'.")


        const [email, password] = credentials.split(":");

        if (!email || !password) throw new UnauthorizedException("Authorization header must contain an email and a password")

        return true;
    }
}