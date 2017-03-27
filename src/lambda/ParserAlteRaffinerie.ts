import { AbstractParser } from "./AbstractParser";
import { Weekday, weekdays } from "./Weekday";
import { Menu } from "./Menu";

import * as cheerio from "cheerio";

export class ParserAlteRaffinerie extends AbstractParser {
	public constructor(html?: string) {
		super(html);
	}

	public parseStartDate(): string {
		return "yyyy-mm-dd";
	}

	public parseDailyMenus(weekday: Weekday): Array<Menu> {
		let dailyMenus: Array<Menu> = [];
		let $ = cheerio.load(this.getHtml());

		let isWeekday: boolean = false;
		$("p,strong").each((index, element) => {
			let text: string = $(element).text()
				.replace(/(\r?\n|\r)/g, " ")	// remove unnecessary newlines
				.trim();						// trim

			if ("" == text) {
				isWeekday = false;
			}

			if ("p" == element.name.toLowerCase()) {
				if (isWeekday) {
					dailyMenus.push(new Menu(text
						.split("\t")[0]			// menu names and prices are separated by one or more tabs
						.replace(/&/g, "und")	// use "und" instead of ampersands
						.replace(/ – /g, "-")	// do not use typographic hyphens
						.replace(/\s+/g, " ")	// dedupe whitespace
					));
				}
			}

			if ("strong" == element.name.toLowerCase()) {
				isWeekday = (text.toLowerCase() == weekdays.get(weekday).toLowerCase());
			}
		});

		return dailyMenus;
	}
}
