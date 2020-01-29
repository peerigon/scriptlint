/* eslint-disable import/prefer-default-export */
export const slugify = (str: string): string =>
	str
		.trim()
		.toLowerCase()
		.replace(/[^-A-Za-z]/g, "-")
		.replace(/^-/g, "")
		.replace(/-+/g, "-")
		.replace(/-$/g, "");

