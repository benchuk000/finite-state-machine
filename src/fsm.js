class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new Error('FSM need config')
        }
        this.config = config;
        this.state = config.initial;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.config.states[state]) {
            throw Error(`${state} state doesn't exist`);
        } else {
            this.unduState = this.state;
            this.state = state;
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (!this.config.states[this.state].transitions[event]) {
            throw Error('You can\'t trigger this event from current state')
        } else {
            this.unduState = this.state;
            this.state = this.config.states[this.state].transitions[event];
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.unduState = false;
        this.reduState = false;
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event) {
            return Object.keys(this.config.states);
        }

        let states = [];

        for (let state in this.config.states) {
            if (this.config.states.hasOwnProperty(state)) {
                if (this.config.states[state].transitions.hasOwnProperty(event)) {
                    states.push(state);
                }
            }
        }

        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (!this.unduState) {
            return false;
        }

        this.reduState = this.state;
        this.state = this.unduState;
        this.unduState = false;
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        
        if (!this.reduState) {
            return false;
        }

        this.undoState = this.state;
        this.state = this.reduState;
        this.reduState = false;
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.unduState = false;
        this.reduState = false;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

