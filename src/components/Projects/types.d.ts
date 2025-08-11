export interface Project {
	title:        string;
	image:        string;
	short_description: string;
	focus_points:  string[];
	description:  string[];
	technologies: Technology[];
	links:        Link[];
}

export interface Link {
	name: string;
	url:  string;
	icon: string;
}

export interface Technology {
	name: string;
	icon: string;
}