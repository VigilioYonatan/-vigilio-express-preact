import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const productionEnviroments = {
	NODE_ENV: process.env.NODE_ENV,
	VITE_URL: process.env.VITE_URL,
	PORT: process.env.NODE_URL,
	// db
	DB_HOST: process.env.DB_HOST,
	DB_NAME: process.env.DB_NAME,
	DB_USER: process.env.DB_USER,
	DB_PASS: process.env.DB_PASS,
	// session
	SECRET_SESSION_KEY: process.env.SECRET_SESSION_KEY as string,
};

const developmentEnviroments = {
	...productionEnviroments,
	PORT: 4000,
	DB_HOST: "localhost",
	DB_NAME: "test",
	DB_USER: "root",
	DB_PASS: "",
};
const testEnviroments = {
	...productionEnviroments,
	PORT: 5000,
	DB_HOST: "localhost",
	DB_NAME: "test",
	DB_USER: "root",
	DB_PASS: "",
};

export const enviroments =
	process.env.NODE_ENV === "production"
		? productionEnviroments
		: process.env.NODE_ENV === "test"
		? testEnviroments
		: developmentEnviroments;
