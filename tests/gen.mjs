import fs from "fs-jetpack"

import aml from "../lib/parser.mjs"

fs.write("tests/multiline.mjs", aml.module)
