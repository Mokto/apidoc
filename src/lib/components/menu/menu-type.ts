export type Menu = MenuGroup[];
export interface MenuGroup {
	title: string;
	items: {
		label: string;
		tag?: string;
		link: string;
	}[];
}
