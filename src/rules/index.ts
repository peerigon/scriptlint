import makeMandatory from "./mandatoryScriptFactory";
import noDefaultTest from "./no-default-test";
import correctCasing from "./correct-casing";
import noAliases from "./no-aliases";
import prePostTriggerDefined from "./prepost-trigger-defined";
import usesAllowedNamespace from "./uses-allowed-namespace";
import alphabeticOrder from "./alphabetic-order";
import {Rule} from "../types";

const rules: Array<Rule> = [
	makeMandatory("test"),
	makeMandatory("start"),
	makeMandatory("dev"),
	noDefaultTest,
	correctCasing,
	noAliases,
	usesAllowedNamespace,
	prePostTriggerDefined,
	alphabeticOrder,
];

export default rules;
