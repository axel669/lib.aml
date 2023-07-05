import aml from "../dist/module.mjs"

export default (parts, ...values) => {
    const input =
        parts
            .map(
                (part, index) =>
                    (index !== parts.length - 1)
                        ? `${part}\0${index}\0`
                        : part
            )
            .join("")
        + "\n"
    const items = aml(input, { values })
    return items
}
