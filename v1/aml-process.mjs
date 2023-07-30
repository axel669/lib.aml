const action = {
    tag: (state, tag) => {
        const { current, stack } = state
        state.current = tag
        if (tag.indent.length > current.indent.length) {
            current.children.push(tag)
            stack.push(tag)
            return
        }
        while (tag.indent.length <= stack.at(-1).indent.length) {
            stack.pop()
        }
        stack.at(-1).children.push(tag)
        stack.push(tag)
    },
    text: (state, line) => {
        const { stack } = state
        while (line.indent.length <= stack.at(-1).indent.length) {
            stack.pop()
        }
        state.current = stack.at(-1)
        state.current.children.push(line)
    },
    attr: (state, attr) => {
        const { current } = state
        if (attr.indent.length !== current.indent.length) {
            console.log("MISMATCH WHAT")
            return
        }
        current.props[attr.name] = attr.value
    }
}

export default (exprs) => {
    const root = { children: [], indent: { length: -1 } }
    const state = {
        stack: [root],
        current: root,
    }
    for (const expr of exprs) {
        action[expr.__type]?.(state, expr)
    }

    return root.children
}
