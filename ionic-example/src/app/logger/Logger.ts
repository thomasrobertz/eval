import {Logger} from "typeorm";

export class MyCustomLogger implements Logger {

	constructor() {}

	logQuery(query: string, parameters?: any[], queryRunner?: import("typeorm").QueryRunner) {
		console.log("Method not implemented.");
	}
	logQueryError(error: string, query: string, parameters?: any[], queryRunner?: import("typeorm").QueryRunner) {
		console.log("Method not implemented.");
	}
	logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: import("typeorm").QueryRunner) {
		console.log("Method not implemented.");
	}
	logSchemaBuild(message: string, queryRunner?: import("typeorm").QueryRunner) {
		console.log("Method not implemented.");
	}
	logMigration(message: string, queryRunner?: import("typeorm").QueryRunner) {
		console.log("Method not implemented.");
	}
	log(level: "log" | "info" | "warn", message: any, queryRunner?: import("typeorm").QueryRunner) {
		console.log("Method not implemented.");
	}
}