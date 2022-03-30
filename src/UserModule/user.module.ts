import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AppModule } from "src/app.module";
import { UserSchema } from "src/Models/user.model";
import { UserController } from "./user.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    JwtModule.register({
      secret: "mySecret",
      signOptions: { expiresIn: "3600000s" },
    }),
  ],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
