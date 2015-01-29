function LocHints(){
    
}

LocHints.prototype.hasHints = function (editor, implicitChar) {
    console.log('hashints');
    return true;
};

LocHints.prototype.getHints = function (implicitChar) {
    var hints = [ 'vihang' , 'manali' , 'patel' ];
    return {
        hints: hints,
        match: [],
        selectInitial: true,
        handleWideResults: false
    };
};

LocHints.prototype.insertHint = function (hint) {
    console.log('insertHitns');
};