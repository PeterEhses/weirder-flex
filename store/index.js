export const state = () => ({
    fontWeight: .5,
    fontWidth: .5,
    fontSlant: 0,
    text: "",
})

export const getters = {
    getFontWeight(state) {
        return state.fontWeight
    },
    getFontWidth(state) {
        return state.fontWidth
    },
    getFontSlant(state) {
        return state.fontSlant
    },
    getText(state) {
        return state.text.toUpperCase()

    }
}

export const mutations = {
    SET_FONT_WEIGHT(state, val) {
        state.fontWeight = parseFloat(val)
    },
    SET_FONT_WIDTH(state, val) {
        state.fontWidth = parseFloat(val)
    },
    SET_FONT_SLANT(state, val) {
        state.fontSlant = parseFloat(val)
    },
    RESET_TEXT(state) {
        state.text = ""
    },
    ADD_CHAR_TEXT(state, val) {
        state.text = state.text + String(val)
    },
    SET_TEXT(state, val) {
        state.text = String(val)
    }
}

export const actions = {
    setFontWeight({ commit }, val) {
        commit("SET_FONT_WEIGHT", val)
    },
    setFontWidth({ commit }, val) {
        commit("SET_FONT_WIDTH", val)
    },
    setFontSlant({ commit }, val) {
        commit("SET_FONT_SLANT", val)
    },
    addCharText({ commit }, val) {
        commit("ADD_CHAR_TEXT", val)
    },
    resetText({ commit }) {
        commit("RESET_TEXT")
    }
}
