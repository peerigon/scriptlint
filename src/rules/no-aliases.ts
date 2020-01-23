export default {
	name: "no-aliases",
	isObjectRule: false,
	message: "don't alias binaries, use npx/yarn instead",
	validate: (key: string, value: string) => key !== value,
};
