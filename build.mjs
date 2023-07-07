import fs from "fs-jetpack"
import aml from "./lib/parser.mjs"

const fileContent = `// Generated Proteus output
${aml.module}
`

fs.write("lib/proteus.mjs", fileContent)
