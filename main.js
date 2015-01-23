/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

/** {ext_name} Extension
    description
*/
define(function (require, exports, module) {
    'use strict';


	var AppInit            	= brackets.getModule("utils/AppInit");
    var CodeHintManager     = brackets.getModule("editor/CodeHintManager");
    var CommandManager      = brackets.getModule('command/CommandManager');
	var Commands            = brackets.getModule("command/Commands");
    var KeyEvent            = brackets.getModule('utils/KeyEvent');
    var EditorManager       = brackets.getModule('editor/EditorManager');
    var DocumentManager     = brackets.getModule('document/DocumentManager');
	var JSUtils             = brackets.getModule("language/JSUtils");
    var KeyBindingManager   = brackets.getModule('command/KeyBindingManager');
    var Menus               = brackets.getModule('command/Menus');
	var Dialogs				= brackets.getModule('widgets/Dialogs');
	var PreferencesManager	= brackets.getModule('preferences/PreferencesManager');
	var Menus          		= brackets.getModule("command/Menus");
	var MainViewManager		= brackets.getModule("view/MainViewManager");


    var LOAD_SCREEN_REG_EXP = /\bloadScreen\b(\(')|\bloadScreen\b(\(")/;

    var GET_MESSAGE_REG_EXP = /\bgetMessage\b(\')|\bgetMessage\b(\")|\bgetAccMessage\b(\(')|\bgetAccMessage\b(\(")|\bsetMessage\b(\(')|\bsetMessage\b(\(")|\bsetAccMessage\b(\(')|\bsetAccMessage\b(\(")/;

    AppInit.appReady(function () {
//		require('hints');

		var editorHolder = $("#editor-holder")[0];
		if (editorHolder) {
        	editorHolder.addEventListener("keydown", handleKey, true);
        	editorHolder.addEventListener("keyup", handleKey, true);
		}

		var docrHints = new DocrHint({
			insideDocBlock:insideDocBlock,createFunctionList:createFunctionList,
			getFunctionCodeTypes:getFunctionCodeTypes,setSelection:setSelection
		});
		CodeHintManager.registerHintProvider(docrHints, ["javascript", "coffeescript", "livescript" ,"php"], 0);
	});

    function getScreenHints(){
        console.log('screen hints');
    }

    function getElementIdHints(){
        console.log('element hints');
    }

    function handleKey(event){
        var editor  = EditorManager.getCurrentFullEditor();

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
});
