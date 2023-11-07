import { Injectable } from "@decorators/di";

@Injectable()
export class AppService {
	index() {
		const user = {id:0,fullName:'Will Smith',edad:54}
		return user;
	}
}
