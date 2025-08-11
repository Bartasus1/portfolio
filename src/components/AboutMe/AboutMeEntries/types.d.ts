export interface Company {
	name: string;
	link: string;
}

export interface Technology {
	name: string;
	icon: string;
}

export interface Job {
	title: string;
	company: Company;
	location: string;
	start_date: string;
	end_date: string;
	technologies: Technology[];
	responsibilities: string[];
}

export interface Institution {
	name: string;
	link: string;
	logo: string;
}

export interface Education {
	degree: string;
	institution: Institution;
	start_date: string;
	end_date: string;
	skills?: string[];
}
