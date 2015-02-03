function LocHints(func, func2){
    'use strict';
    this.getScreenHints = func;
    this.getElementIdHints = func2;
}

LocHints.prototype.hasHints = function (editor, implicitChar) {
    this.editor = editor;
    this.pos = editor.getCursorPos();

    var currentLine = editor.document.getLine(this.pos.line);

    var LOAD_SCREEN_REG_EXP = /\bloadScreen\b(\(')|\bloadScreen\b(\(")|\bunloadScreen\b(\(')|\bunloadScreen\b(\(")/;

    var GET_SET_CHANGE_MESSAGE_REG_EXP = /\bgetMessage\b(\(')|\bgetMessage\b(\(")|\bgetAccMessage\b(\(')|\bgetAccMessage\b(\(")|\bsetMessage\b(\(')|\bsetMessage\b(\(")|\bsetAccMessage\b(\(')|\bsetAccMessage\b(\(")|\bchangeMessage\b(\(')|\bchangeMessage\b(\(")|\bchangeAccMessage\b(\(')|\bchangeAccMessage\b(\(")/;

    var OTHER_ACCESSIBILITY_FUNCTIONS_REG_EXP = /\bgetTabIndex\b(\(')|\bgetTabIndex\b(\(")|\bsetTabIndex\b(\(')|\bsetTabIndex\b(\(")|\bsetFocus\b(\(')|\bsetFocus\b(\(")|\bfocusIn\b(\(')|\bfocusIn\b(\(")|\bfocusOut\b(\(')|\bfocusOut\b(\(")|\bupdateFocusRect\b(\(')|\bupdateFocusRect\b(\(")|\benableTab\b(\(')|\benableTab\b(\(")/;

    if(implicitChar === "'" || implicitChar === '"'){
        if(currentLine.match(LOAD_SCREEN_REG_EXP)){
            this.hintsToLoad = 'screenHints';
            return true;
        }

        if(currentLine.match(GET_SET_CHANGE_MESSAGE_REG_EXP) || currentLine.match(OTHER_ACCESSIBILITY_FUNCTIONS_REG_EXP)){
            this.hintsToLoad = 'elementHints';
            return true;
        }
    }

    return false;
};

LocHints.prototype.getHints = function (implicitChar) {
    var hints;

    this.match = this.editor.document.getRange(this.pos,this.editor.getCursorPos());

    switch(this.hintsToLoad){
        case 'screenHints':
            hints = this.getScreenHints();
            break;
        case 'elementHints':
            hints = this.getElementIdHints();
            break;
    }

    hints = this.removeWrongHints(hints);

    return {
        hints: hints,
        match: this.match,
        selectInitial: true,
        handleWideResults: false
    };
};

LocHints.prototype.removeWrongHints = function(hints) {
	var result = [];
	for(var i = 0; i < hints.length; i++) {
		if (hints[i].indexOf(this.match) >= 0) {
			result.push(hints[i]);
		}
	}
	return result;
}

LocHints.prototype.insertHint = function (hint) {
    var curDoc = this.editor.document,
        curPos = this.editor.getCursorPos();

    var start = {line: curPos.line, ch: curPos.ch};
    hint = hint.substr(this.match.length , hint.length);
    curDoc.replaceRange(hint,start);
};
