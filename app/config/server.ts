import express from "express";
import path from "path";
import session from "express-session";
import passport from "passport";
import compression from 'compression'
import { ERROR_MIDDLEWARE, attachControllers } from "@decorators/express";
import { enviroments } from "~/config/enviroments.config";
import { connectDB } from "~/config/db.config";
import { ServerErrorMiddleware } from "@vigilio/express-core/handler";
import { Container } from "@decorators/di";
import { logger } from "@vigilio/express-core/helpers";
import { client } from "@vigilio/express-core/client";
import { apiRouters } from "~/routers/api.router";
import { webRouters } from "~/routers/web.router";
import { authRouters } from "~/routers/auth.router";
import { middlewareRoute } from "~/lib/middleware-route";

export class Server {
	public readonly app: express.Application = express();

	constructor() {
		this.middlewares();
		this.auth();
		this.routes();
	}

	auth() {
		// https://www.passportjs.org/concepts/authentication/sessions/
		this.app.use(
            session({
                secret: enviroments.SECRET_SESSION_KEY,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure: enviroments.NODE_ENV === "production", //true in production
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000, // 1 dia
                },
            })
        );
        this.app.use(passport.initialize());
        this.app.use(passport.session());
		passport.serializeUser((user, done) => {
            return done(null, user);
        });
        passport.deserializeUser(async (_user,_done) => {
            // if (!usuario) return done({ message: "error authenticated" });
            // return done(null, usuario);
        });
		
	}

	middlewares() {
		this.app.use(
            compression({
                threshold: 10000,
                filter: (req, res) => {
                    if (req.headers["x-no-compression"]) {
                        return false;
                    }
                    return compression.filter(req, res);
                },
            })
        );
		this.app.use(express.json());
		this.app.use(express.static(path.resolve(__dirname, "..", "..", "public")));
		this.app.set("view engine", "ejs");
		this.app.set(
			"views",
			path.resolve(__dirname, "..", "..", "resources", "views"),
		);
		this.app.use(client());

		connectDB();
	}

	routes() {
		const apiRouter = express.Router();
		const webRouter = express.Router();
		const authRouter = express.Router();
		attachControllers(apiRouter, apiRouters);
		attachControllers(webRouter, webRouters);
		attachControllers(authRouter, authRouters);
		Container.provide([
			{ provide: ERROR_MIDDLEWARE, useClass: ServerErrorMiddleware },
		]);
		this.app.use("/", webRouter);
		this.app.use("/auth", authRouter);
		this.app.use("/api", apiRouter);
		this.app.use(middlewareRoute);
	}

	listen() {
		const server = this.app.listen(enviroments.PORT, () => {
			logger.primary(`Run server in port ${enviroments.PORT}`);
		});

		return server;
	}
}
