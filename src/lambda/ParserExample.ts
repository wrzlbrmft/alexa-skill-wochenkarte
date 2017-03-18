import { AbstractParser } from "./AbstractParser";
import { MenuWeek } from "./MenuWeek";

export class ParserExample extends AbstractParser {
	public constructor(html?: string) {
		super(html);
	}

	public parseMenuWeek(): MenuWeek {
		return new MenuWeek();
	}
}
