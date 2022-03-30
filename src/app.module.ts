import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserSchema } from "./Models/user.model";
import { UserModule } from "./UserModule/user.module";

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot("mongodb+srv://taskapp:pratik@cluster0.ixznc.mongodb.net/test?authSource=admin&replicaSet=atlas-6zxjnm-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    JwtModule.register({
      secret: "mySecret",
      signOptions: { expiresIn: "3600000s" },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
