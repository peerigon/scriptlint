#!/usr/bin/env node
import scriptlint from "./main";
import {Config} from "./types";

module.exports = (config: Partial<Config>) => scriptlint(config, "module");
