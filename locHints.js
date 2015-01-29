function LocHints(func, func2, func3){
    this.getScreenHints = func;
    this.getElementIdHints = func2;
    this.checkWhichHintsToLoad = func3;
}

LocHints.prototype.hasHints = function (editor, implicitChar) {
    console.log('hashints');
    this.screenhints  =this.getScreenHints();
    this.elementHints = this.getElementIdHints();
    this.editor = editor;
    this.pos = editor.getCursorPos();
    
    var hintsToLoad = this.checkWhichHintsToLoad();
    
    this.hintsToLoad = hintsToLoad;
    
    if(hintsToLoad !== null && typeof hintsToLoad !== 'undefined'){
        return true;
    }
    return false;
};

LocHints.prototype.getHints = function (implicitChar) {
    console.log('getHints');
    var hints;
    
    this.match = this.editor.document.getRange(this.pos,this.editor.getCursorPos());
    
    switch(this.hintsToLoad){
        case 'screenHints':
            hints = this.screenhints;
            break;
        case 'elementHints':
            hints = this.elementHints;
            break;
    }
    
    
    return {
        hints: hints,
        match: this.match,
        selectInitial: true,
        handleWideResults: false
    };
};

LocHints.prototype.insertHint = function (hint) {
    console.log('insertHitns');
};