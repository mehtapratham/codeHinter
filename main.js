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
        FileUtils           = brackets.getModule("file/FileUtils"),
        locObject           = {},
        fileType            = '',
        screenHints         = [],
        screens             = [],
        elementHints        = [],
        locHints;

    var self = this;

    AppInit.appReady(function () {
        require('locHints');

        var editorHolder = $("#editor-holder")[0];
        
        EditorManager.on('activeEditorChange', function (){
            reloadLocScreensAndElements();
        });
        /*------future use do not uncomment or remove------*/
//        FileSystem.on('change', function(object,file){
//            if (file._name === 'loc-acc.json'){
//                console.info('change');
//                reloadLocScreensAndElements();
//            }
//        });
        
        locHints = new LocHints(getScreenHints, getElementIdHints, checkWhichHintsToLoad);
        CodeHintManager.registerHintProvider(locHints, ["javascript"], 0);
    });
    
    function getScreenHints(){
        screenHints = [];
        screens = [];
        $.each(locObject.locAccData, function(index, screen){
            screenHints.push(screen.id);
            screens.push(screen);
        });
        
        return screenHints;
    }
    
    function getElementIdHints(){
        elementHints = [];
        
        $.each(screens, function(index, screenObj){
            $.each(screenObj.elements, function (index, element){
                elementHints.push(element.id);
            });
        });
        return elementHints;
    }
    
    function reloadLocScreensAndElements(){
        var editor  = EditorManager.getCurrentFullEditor(),
            curDoc = DocumentManager.getCurrentDocument(),
            curFile = curDoc.file,
            fileFullPath = curFile.fullPath,
            locAccFilePath = fileFullPath.substr(0, fileFullPath.indexOf('js/')) + 'lang/en/data/loc-acc.json';
            
        
        if(fileFullPath.indexOf('/js/') === -1){
            return;
        }
        
        locAccFilePath = locAccFilePath.replace('\\','/');   
        readFile(locAccFilePath);
    }

    function readFile(filePath) {
        var file = FileSystem.getFileForPath(filePath);
        
        locObject = {};
        
        FileUtils.readAsText(file).done(function (text) {
            try {
                locObject = JSON.parse(text);
            } catch (e) {
                // continue with null configObj which will result in
                // default settings.
                console.log("Error parsing preference file: ");
                if (e instanceof SyntaxError) {
                    console.log(e.message);
                }
            }        
        }).fail(function (error) {
            console.log('file reading failed' + error);            
        }); 
    }
    
    function checkWhichHintsToLoad(){
        
        if(self.loadScreenHints === true){
            self.loadScreenHints = false;
            return 'screenHints';
        }
        
        if(self.loadElementHints === true){
            self.loadElementHints = false;
            return 'elementHints';
        }
    }
});
