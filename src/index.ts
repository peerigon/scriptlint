#!/usr/bin/env node
import scriptlint from "./main";
import {Config} from "./types";

export = (config: Partial<Config>) => scriptlint(config, "module");
