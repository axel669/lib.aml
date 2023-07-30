const input = `
    [test]
    :ws-x \0
        text!
`
const input2 = `
    [html]
        [head]
        [body]
        :ws-x @app theme[tron]
            [script]
            :src https://cdn.jsdelivr.net/npm/@axel669/windstorm@0.1.17/dist/browser.js

            [script]
                console.log(1, 2, 3)

                [1, 2, 3]

            [test]
            :test \0
            :ws-x r[0px] \\u03c0
            :ws-x2 "    r[0px]\\\""
                more stuff

                    tab again?
            [wat]
            free text

            [br]

            [pre🍤]
            :test?
                this is a test
                of some stuff

            [C̷̙̲̝͖ͭ̏ͥͮ͟Oͮ͏̮̪̝͍M̲̖͊̒ͪͩͬ̚̚͜Ȇ̴̟̟͙̞ͩ͌͝S̨̥̫͎̭ͯ̿̔̀ͅ]
                content?
`
