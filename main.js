/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

/** {ext_name} Extension
    description
*/
define(function (require, exports, module) {
    'use strict';


	var AppInit            	= brackets.getModule("utils/AppInit"),
        CodeHintManager     = brackets.getModule("editor/CodeHintManager"),
        CommandManager      = brackets.getModule('command/CommandManager'),
	    Commands            = brackets.getModule("command/Commands"),
        KeyEvent            = brackets.getModule('utils/KeyEvent'),
        EditorManager       = brackets.getModule('editor/EditorManager'),
        DocumentManager     = brackets.getModule('document/DocumentManager'),
	    JSUtils             = brackets.getModule("language/JSUtils"),
        KeyBindingManager   = brackets.getModule('command/KeyBindingManager'),
        Menus               = brackets.getModule('command/Menus'),
	    Dialogs				= brackets.getModule('widgets/Dialogs'),
	    PreferencesManager	= brackets.getModule('preferences/PreferencesManager'),
	    Menus          		= brackets.getModule("command/Menus"),
	    MainViewManager		= brackets.getModule("view/MainViewManager"),
        FileSystem          = brackets.getModule("filesystem/FileSystem"),
        FileUtils           = brackets.getModule("file/FileUtils");


    var LOAD_SCREEN_REG_EXP = /\bloadScreen\b(\(')|\bloadScreen\b(\(")/;

    var GET_MESSAGE_REG_EXP = /\bgetMessage\b(\(')|\bgetMessage\b(\(")|\bgetAccMessage\b(\(')|\bgetAccMessage\b(\(")|\bsetMessage\b(\(')|\bsetMessage\b(\(")|\bsetAccMessage\b(\(')|\bsetAccMessage\b(\(")/;

    AppInit.appReady(function () {
		require('locHints');

		var editorHolder = $("#editor-holder")[0];
		if (editorHolder) {
        	editorHolder.addEventListener("keyup", handleKey, true);
		}

		var locHints = new LocHints();
		CodeHintManager.registerHintProvider(locHints, ["javascript"], 0);
	});

    function getScreenHints(){
        console.log('screen hints');
    }

    function getElementIdHints(){
        console.log('element hints');
    }

    function handleKey(event){
        var editor  = EditorManager.getCurrentFullEditor(),
            curDoc = DocumentManager.getCurrentDocument(),
            curFile = curDoc.file,
            fileFullPath = curFile.fullPath,
            fileType = FileUtils.getFileExtension(fileFullPath),
            locAccFilePath = fileFullPath.substr(0, fileFullPath.indexOf('js/')) + 'data/en/loc-acc.json';
        
        if(fileType === 'js'){
            if ((event.type === 'keydown' /*&& event.keyCode === KeyEvent.DOM_VK_TAB*/) ||
                (event.type === 'keyup' /*&& event.keyCode === KeyEvent.DOM_VK_RETURN*/)) {
                var currentLineNum = editor.getCursorPos().line;

                var currentLine = editor.document.getLine(currentLineNum);
                if(currentLine.match(LOAD_SCREEN_REG_EXP)){
                    getScreenHints();
                }

                if(currentLine.match(GET_MESSAGE_REG_EXP)){
                    getElementIdHints();
                }
            }
        }
    }
});
