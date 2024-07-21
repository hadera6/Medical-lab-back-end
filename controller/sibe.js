const state = {
    cbc1: "45",
    cbc2: "34",
    cbc3: "34"
}

keys = Object.keys(lab_result);

lab_result = keys.map(item => {
    return {
        test: item,
        value: state[item],
        lab_form: "CBC"
    }
})