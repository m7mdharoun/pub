/* LSSDK for Confluence */
/* Report any bugs to levi.st [at] gigya-inc.com */
/* **********-----__ CHANGELOG BELOW __-----********** */
/* Current Version .0015.07 06nov18 */
/* Supports Confluence ***Version 5.9.11*** ONLY!!!! */
/* The latest source file is available at [removed]] */
/* Added support for unlimited number of tables per page */
/* Added support for multiple children per parent - example: accounts.getAccountInfo+JS */
/* Currently supports up to three (3) children within a single parent. (theoretically). */
/* Added tableSorter */
/* test page: https://developers.gigya.com/display/GD/accounts.getAccountInfo+REST */
/* v0002 -> Added SVG download support */
/* v0003 -> added dynamic unlimited svg image converter */
/* v0004 -> images now download as png */
/* v0005 -> 6nov16 added configTooltipIds - adds ID's to tooltip macros that exist on the page */
/*       -> minor update 21nov16 added: var lssdk = lssdk || {}; */
/* v0006 -> 19dec16 added table cell labeler for debugging and making it easier to color-code tables */
/*          Adds titles to table cells specifying their row#/cell# */
/* v0006.5 20dec16 Added first stage of animation support for images, currently very limited functionality */
/* v0006.6 21dec16 Added some basic image processing */
/* v0007.1 22dec16 Added a 'help' function */
/* v0007.2 22dec16 Added SEO macro fixer for html entities */
/* v0007.5 26dec16 Added some CSS helpers, only the css.grab currently works. */
/* v0008 28dec16 Added configureDomElements for accessing id/class/tags and putting them in an array */
/* v0009 12jan17 added uri fixer to remove confluence added spaces that break external urls */
/* v0010  16jan17 Added lssdk.css.fadeRightMenu(triggerElementId) - adds 200ms fade to right-menu on mouseover of trigger element */
/* v0010.1 added reloaded check */
/* v0010.2 16jan17 fixed createSvgLinks from creating multiple download links if called multiple times on same svg */
/* v0011 Added background color to PNGs created using createSvgLinks(bgColor) default is white */
/* v0011.2 Added first stage of lssdk.doSvgResize in order to make it easier to resize SVGs that are too large */
/* v0011.3 Added first stage of lssdk.svg.setSvgFont to configure css */
/* v0011.4 16feb17 Hardcoded in the fix for random whitespace in anchors */
/* v0012 22feb17 Added a popup modal generator. */
/* v0012.1 23feb17 Added a check for platform.gigya.com links. */
/* v0012.2 27feb17 bugfix - Added check so fixAnchors skips svg urls used for downloading diagrams */
/* v0012.3 27feb17 Added lssdk.tables.colorRows for adding alternating colored table rows and header */
/* v0012.4 27feb17 Added src loader. lssdk.loadSource */
/* v0012.5 8mar17 bug fix - cursor for createModal to pointer, added onload option to createModal */
/* v0012.6 9may17 bug fix - Since IE still doesn't support es6, have fix use of inline variables */
/* v0012.7 6jun17 Added  addLinkedToolTip which allows adding a tooltip that has link attached to it */
/* v0012.8 7jun17 Added  fixTableBottoms which allows editing the margin-bottom of tables fixed with the tableFixer */
/* v0012.9 25jun17 Added  global check for gigya.services */
/* v0012.10 10jul17 fixed terminal loop bug in fix URI tool when no anchors exist on the page */
/* v0013 10jul17 Added google search feature for logged in tech writers */
/* v0013.1 27aug17 lssdk.expands tools for manipulating confluence expand/collapse macros. */
/* v0013.21 03sep17 lssdk.loadSource updated to also work with stylesheet <link> elements. + callback support for chaining */
/* v0013.22 05sep17 bug fix */
/* v0013.23 19sep17 added lssdk.h.elementTools.addElement for adding new DOM elements to a page. */
/* v0013.24 27sep17 bugfix seo.fix firing too soon, added setTimeOut */
/* v0013.25 19oct17 added ability to set target title in lssdk.popups.createModal. */
/* v0013.26 31oct17 refactored lssdk.tools.addSearch so it can be triggered manually for non tech-writers. */
/* v0014.00 2nov17 refactored all svg tools to be inside lssdk.svg namespace */
/* v0014.01 6nov17 refactored fixTableBottoms to be inside lssdk.tables namespace */
/* v0014.02 6nov17 added some error checking to lssdk.expands in case ran without any expands on the page */
/* v0014.03 14nov17 added lssdk.popups.showNotification(msg,tm); for showing a temporary popup modal window. */
/* v0014.04 20nov17 added lssdk.getAccountInfo(id,cb); for calling gigya.accounts.getAccountInfo with all possible
   options and extras; and adding the response to the bottom of the current page. */
/* v0014.05 22nov17 added lssdk.tools.renamePage(parentChild,url); handling deep links on pages that have been renamed */
/* v0014.06 8dec17 added link to heroku source file and updated renamePage help */
/* v0014.07 8dec17 added lssdk.tools.setCookie lssdk.tools.getCookie lssdk.tools.removeCookie lssdk.tools.addCegExtension */
/* v0014.08 3jan18 changed all http:// >> https:// - mostly effecting svg tools */
/* v0014.09 1feb18 Added lssdkOnReady for running functions after the lssdk is fully loaded */
/* v0014.10 6feb18 Added changeIconTitle to edit the mouseover title of a param table required/varies/not required icon */
/* v0014.11 19feb18 Added createIdTokenLink for checking gigya id_tokens */
/* v0014.12 1mar18 getAccountInfo to match gdsdk */
/* v0014.13 15mar18 added/fixed lssdkOnReady listener */
/* v0015.00 23mar18 added load JQuery before completing lssdk load (if necessary) */
/* v0015.01 03apr18 added lssdk.tools.returnJsonValue(name,obj) gets the value of a dot notated field from an obj*/
/* v0015.02 10apr18 added lssdk.tools.showHtmlEntities(str)*/
/* v0015.03 14jun18 added support for fixing anchors that confluence adds %2 before an # in link fragment */
/* v0015.04 10oct18 added createTableCode for dynamically creating tables for confluence from key:value JSON file */
/* v0015.05 24oct18 bugfix */
/* v0015.06 01nov18 added lssdk.css.clearRightMenu(true/false/null) - makes TOC background transparent and accepts a boolean to make the left border transparent also  */
/* v0015.07 06nov18 added lssdk.tools.changeClassElementText(classname/oldtext/newtext) - does str.replace on any elements that are of the classname and contain the oldtext string  */


/* ************************************************************************************************* */
/* WARNINGS!!!!! */
/* If using the tableSorter and tableFixer on the same page, the tableSorter MUST BE run first!!!  */
/* tableSorter does not affect nested tables. */
/* If tableSorter encounters nested tables, no further tables will be sortable */
/* tableSorter *may* break tableFixer by affecfting column widths for some reason */

if ((typeof(lssdk) !== 'undefined') && (lssdk.isInitialized===true)) {
    console.warn("LSSDK is already initialized.");
} 
else
{
var lssdk = lssdk || {};
lssdk.isInitialized=true;
lssdk.temp = lssdk.temp || {};
lssdk.onReady = null;
lssdk.isLoaded = null;
lssdk.v=".0015.07 06nov18 DEV"; // Don't forget to edit above also
lssdk.ver ='LSSDK ver ' + lssdk.v + ' is Loaded.\n';
lssdk.rr={};
lssdk.numTabs;
lssdk.h=[];
lssdk.error=function(err) {
    return console.warn("ERROR: " + err);
};
lssdk.loadSource = function(url,ltype,stype,cb) {
    var a,b,c,d,e,f,callback;
    if (typeof(cb) === "function") {
        callback = cb;
    }
    if ((typeof(url) !=='undefined') && (url !=='')) {
        a = url;
        b = document.getElementsByTagName('head')[0];
        if ((typeof(stype) !=='undefined') && (stype !== null) && (stype !=='')) {
            d = stype;
        } else {
            d = "text/javascript";
        }
        if ((typeof(ltype) !== 'undefined') && (ltype !== null) && (ltype !== "")) { // can be 'script' || 'link'
            if ((ltype.toLowerCase() === "css") || (ltype.toLowerCase() === "link") || (ltype.toLowerCase() === "stylesheet")) {
                e = "link"; 
                f = "stylesheet";
            } else if ((ltype.toLowerCase() === "js") || (ltype.toLowerCase() === "script") || (ltype.toLowerCase() === "javascript")) {
                e = "script";
            } else {
                console.warn("WARNING! lssdk.loadSource could not understand the element type. Must be 'css' or 'js' or null.");
            }
        } else {
            e = "script";
        }
        c = document.createElement(e);
        if (e === "link") {
            c.rel = "stylesheet";
            c.href = a;
        } else {
            c.type = d;
            c.src = a;
        }
        if (callback) {
            if (c.readyState) { // IE
                c.onreadystatechange = function() {
                    if (c.readyState == "loaded" || c.readyState == "complete"){
                        c.onreadystatechange = null;
                        callback();
                    }
                };
            } else {  //Others
                c.onload = function(){
                    console.log("switching");
                    callback();
                };
            }
        }
        b.appendChild(c);
        
    } else {
        console.warn("Error in lssdk.loadSource: No URL defined!");
    }
};
lssdk.h.loadSource="lssdk.loadSource - Adds a <script> or <link> tag to the head of the page and callback support for chaining. Requires a URL and optional Type value (if not a stylesheet).\nEx: lssdk.loadSource('//myUrlHere.com'); // for script\n>>or lssdk.loadSource('//myUrlHere.com','css',null, FUNC); // for stylesheet (js for js). default type is text/javascript.";
lssdk.jQueryLoaded = false;
lssdk.checkJQuery = function() {
    if (typeof($) !== 'function') {
        console.log("$: ", typeof($))
        var done = function() {
            lssdk.jQueryLoaded = true;
            console.warn("jquery was loaded");
            lssdk.loadLssdk();
        };
        lssdk.loadSource("//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js",null,null,done);
    } else {
        lssdk.jQueryLoaded = true;
        console.warn("JQuery is already loaded");
    }
};
lssdk.h.bugs="Report any bugs to levi.st [ @ ] gigya-inc [ dot ] com.\n\nNote: As with most things, this help file is not compatible with Internet Explorer.";
lssdk.checkJQuery();
lssdk.svg=lssdk.svg || {};
lssdk.svg.textNodesArray=Array();
lssdk.prepTables = function() {
    lssdk.rr=document.getElementsByTagName('table');
    lssdk.numTabs=lssdk.rr.length;
}
lssdk.loadLssdk = function() {
    if (lssdk.jQueryLoaded === true) {
        // &&&&&&&&&&&&&&&&&&&

        lssdk.h.prepTables="Creates an array of all tables on the page and stores them in lssdk.rr. Takes no parameters, ex: lssdk.prepTables();.\nThis is an internal method of lssdk.tableFixer, both should never be used on the same page and using one after the other will probably break the page.";
        lssdk.math={};
        lssdk.math.isEven = function(n) {
            return n % 2 == 0;
        };
        lssdk.math.isOdd = function(n) {
            return Math.abs(n % 2) == 1;
        };
        lssdk.math.alternate = function(n) {
            var a = n;
            if (lssdk.math.isEven(a)) {
                return true;
            } else {
                return false;
            }
        };
        lssdk.elementTools = lssdk.elementTools || {};
        lssdk.elementTools.addElement = function(type,id,parent,content,style) {
            var elmType,elmId,elmParent,elmContent,elmStyle;
            if ((typeof(type) !== 'undefined') && ( type !== 'undefined' || '')) {
                elmType = type;
            } else {
                console.warn("WARNING! lssdk.elementTools.addElement requires a type.");
                return;
            }
            if ((typeof(id) !== 'undefined') && (id !== null) && (id !== '')) {
                elmId = id;
            } else {
                console.warn("");
                return;
            }
            if (typeof(parent) !== 'undefined') {
                if (parent === null) {
                    elmParent = document.getElementsByTagName('body')[0];
                    console.warn("lssdk.elementTools.addElement parent was null, using body[0]");
                } else if (parent == '') {
                    console.warn("WARNING! lssdk.elementTools.addElement requires a parent or must be set to null.");
                    return;
                } else {
                    elmParent = parent;
                }
            } else {
                console.warn("WARNING! lssdk.elementTools.addElement requires a parent or must be set to null.");
                return;
            }
            var a = document.createElement(elmType);
            a.id = elmId;
            if (content) {
                elmContent = content;
                a.innerHTML = elmContent
            }
            if (style) {
                elmStyle = style;
                a.setAttribute("style",elmStyle);
            }
            elmParent.appendChild(a);
        };
        lssdk.h.elementTools = "Tools for adding new elements and manipulating existing elements on a page.";
        lssdk.h.elementTools.addElement = "Adds a new element to the page using a provided ID and a provided parent element; if no parent is provided it defaults to body[0].\n>>Format: 'lssdk.elementTools.addElement(type,id,parent,content,style);' where 'content' and 'style' are optional.";
        lssdk.addLinkedToolTip = function(target,url,text) {
            var a,b,c,d,e,f;
            if ((typeof(target) !=='undefined') && (target !=='') && (typeof(url) !=='undefined') && (url !=='') && (typeof(text) !=='undefined') && (text !== '')) {
                a = target;
                b = url;
                c = document.getElementById(a);
                d = document.createElement('a');
                //e = document.createElement('span');
                d.href = url;
                d.target = "_blank";
                d.title = text;
                d.setAttribute("style", "font-family: wiki; margin-left: 8px; color: #BFCFDA; font-size: 15px !important; text-decoration: none;");
                d.innerHTML = '&#xe810';
                c.appendChild(d);
            } else {
                console.warn("lssdk.addLinkedToolTip is missing required parameters - ex: lssdk.addLinkedToolTip(target,url,text);");
            }
        };
        lssdk.h.addLinkedToolTip="Adds a tooltip that will open a new browser tab to a defined URL when clicked. ex:\nlssdk.addLinkedToolTip(target,url,text); where 'target' is the ID of an element to append the tooltip; 'url' is the url to open; and 'text' is the text to display when mousing over the tooltip.";
        lssdk.tables = lssdk.tables || {};
        lssdk.tables.fixTableBottoms = function(table,amount) {
            if ((typeof(table) === 'undefined') || (table === null) || (table === '')) {
                /*
                for (i = 0; i < lssdk.rr.length; i++) {
                    if (lssdk.rr[i].isConfTable == false) {
                        var thisTableId = document.getElementById(lssdk.rr[i].id);
                        thisTableId.style.marginBottom="-68px";
                    }
                }
                */
                console.warn("Currently you can only use this with a designated table ID. ex: lssdk.tables.fixTableBottoms('tableID');");
            } else if (typeof(table)!=='undefined') {
                var pixels;
                if ((typeof(amount) !=='undefined') && (amount !=='')) {
                    pixels = amount.toString();
                    if (pixels.indexOf('px') === -1) {
                         pixels = pixels + 'px';
                    }
                } else {
                    pixels = '-68px';
                }
                if (document.getElementById(table) !== 'undefined') {
                    var thisTableId = document.getElementById(table);
                    thisTableId.style.marginBottom=pixels;
                    console.log("lssdk: margin-bottom set to '" + pixels + "' on table: '" + table + "'");
                }
            } else {
                console.warn("lssdk.tables.fixTableBottoms is currently unable to process your request... It may be broken.");
            }
        };
        lssdk.fixTableBottoms = lssdk.tables.fixTableBottoms; // required for backward compatibility - DO NOT REMOVE
        lssdk.h.fixTableBottoms="fixTableBottoms easily adds margin-bottom: -68px to the specified table (or a custom size if defined in the call). Used when tableFixer is just not enough. Currently you can only use this with a designated table ID.\nex: lssdk.tables.fixTableBottoms('tableID',integer);";
        lssdk.setStartingSizes = function() {
            for (i = 0; i <= lssdk.numTabs-1; i++) {
                if (typeof(lssdk.rr[i].rows[0]) !=='undefined') {
                    thisTopRow = lssdk.rr[i].rows[0];
                } else {
                    thisTopRow = false;
                }
                if (typeof(lssdk.rr[i].rows[0].cells[0]) !=='undefined') {
                    thisCellOne = lssdk.rr[i].rows[0].cells[0];
                    window['tVar'+ i].cell1OriginalWidth = thisCellOne.offsetWidth;
                } else {
                    thisCellOne = false;
                    window['tVar'+ i].cell1OriginalWidth = 0;
                }
                if (typeof(lssdk.rr[i].rows[0].cells[1]) !=='undefined') {
                    thisCellTwo = lssdk.rr[i].rows[0].cells[1];
                    window['tVar'+ i].cell2OriginalWidth = thisCellTwo.offsetWidth;
                } else {
                    thisCellTwo = false;
                    window['tVar'+ i].cell2OriginalWidth = 0;
                }
                if (typeof(lssdk.rr[i].rows[0].cells[2]) !=='undefined') {
                    thisCellThree = lssdk.rr[i].rows[0].cells[2];
                    window['tVar'+ i].cell3OriginalWidth = thisCellThree.offsetWidth;
                } else {
                    thisCellThree = false;
                    window['tVar'+ i].cell3OriginalWidth = 0;
                }
            }
        };// end setStartingSizes
        // internal - lssdk.h.setStartingSizes="Takes all the tables in lssdk.rr and determines their initial TD widths and stores them in tVar[X].cell1OriginalWidth, tVar[X].cell2OriginalWidth, and tVar[X].cell3OriginalWidth, respectively.";
        lssdk.processTables = function() {
            for (i = 0; i <= lssdk.numTabs-1; i++) {
                thisTvar= window['tVar'+ i];
                console.log(thisTvar);
                var o1=i-1;
                var o2=i-2;
                var o3=i-3;
                if ((thisTvar.table.className.length > 0)) {
                    if ((thisTvar.fixitA===true) && (thisTvar.fixitB !==true)  && (thisTvar.fixitC !==true)) {
                        if ((typeof(window['tVar'+ i].cell1OriginalWidth) !==false) && (typeof(window['tVar'+ o1].cell1OriginalWidth) !==false)) {
                            widestColumn1 = Math.max(window['tVar'+ i].cell1OriginalWidth, window['tVar'+ o1].cell1OriginalWidth);
                            window['tVar'+ i].td1.width = widestColumn1-21;
                            window['tVar'+ o1].td1.width = widestColumn1-21;
                        }
                        if ((typeof(window['tVar'+ i].cell2OriginalWidth) !==false) && (typeof(window['tVar'+ o1].cell2OriginalWidth) !==false)) {
                            widestColumn2 = Math.max(window['tVar'+ i].cell2OriginalWidth, window['tVar'+ o1].cell2OriginalWidth);
                            window['tVar'+ i].td2.width = widestColumn2-21;
                            window['tVar'+ o1].td2.width = widestColumn2-21;
                        }
                            
                        if ((typeof(window['tVar'+ i].cell3OriginalWidth) !==false) && (typeof(window['tVar'+ o1].cell3OriginalWidth) !==false)) {
                            widestColumn3 = Math.max(window['tVar'+ i].cell3OriginalWidth, window['tVar'+ o1].cell3OriginalWidth);
                            window['tVar'+ i].td3.width = widestColumn3-21;
                            if (typeof(window['tVar'+ o1].td3) !=='undefined') {
                                window['tVar'+ o1].td3.width = widestColumn3-21;
                            }
                        }
                        window['tVar'+ i].table.style.tableLayout='fixed';
                        window['tVar'+ o1].table.style.tableLayout='fixed';
                    }
                    else if ((thisTvar.fixitB===true)  && (thisTvar.fixitC !==true) && (thisTvar.table.className.length > 0)) {
                        if ((typeof(window['tVar'+ i].cell1OriginalWidth) !==false) && (typeof(window['tVar'+ o1].cell1OriginalWidth) !==false) && (typeof(window['tVar'+ o2].cell1OriginalWidth) !==false)) {
                            widestColumn1 = Math.max(window['tVar'+ i].cell1OriginalWidth, window['tVar'+ o1].cell1OriginalWidth, window['tVar'+ o2].cell1OriginalWidth);
                            window['tVar'+ i].td1.width = widestColumn1-21;
                            window['tVar'+ o1].td1.width = widestColumn1-21;
                            window['tVar'+ o2].td1.width = widestColumn1-21;
                        }
                        if ((typeof(window['tVar'+ i].cell2OriginalWidth) !==false) && (typeof(window['tVar'+ o1].cell2OriginalWidth) !==false) && (typeof(window['tVar'+ o2].cell2OriginalWidth) !==false)) {
                            widestColumn2 = Math.max(window['tVar'+ i].cell2OriginalWidth, window['tVar'+ o1].cell2OriginalWidth, window['tVar'+ o2].cell2OriginalWidth);
                            window['tVar'+ i].td2.width = widestColumn2-21;
                            window['tVar'+ o1].td2.width = widestColumn2-21;
                            window['tVar'+ o2].td2.width = widestColumn2-21;
                        }
                        if ((typeof(window['tVar'+ i].cell3OriginalWidth) !==false) && (typeof(window['tVar'+ o1].cell3OriginalWidth) !==false) && (typeof(window['tVar'+ o2].cell3OriginalWidth) !==false)) {
                            widestColumn3 = Math.max(window['tVar'+ i].cell3OriginalWidth, window['tVar'+ o1].cell3OriginalWidth, window['tVar'+ o2].cell3OriginalWidth);
                            window['tVar'+ i].td3.width = widestColumn3-21;
                            window['tVar'+ o1].td3.width = widestColumn3-21;
                            window['tVar'+ o2].td3.width = widestColumn3-21;
                        }
                        window['tVar'+ i].table.style.tableLayout='fixed';
                        window['tVar'+ o1].table.style.tableLayout='fixed';
                        window['tVar'+ o2].table.style.tableLayout='fixed';
                    }
                    else if ((thisTvar.fixitC===true) && (thisTvar.table.className.length > 0)) {
                        if ((typeof(window['tVar'+ i].cell1OriginalWidth) !==false) && (typeof(window['tVar'+ o1].cell1OriginalWidth) !==false) && (typeof(window['tVar'+ o2].cell1OriginalWidth) !==false) && (typeof(window['tVar'+ o3].cell1OriginalWidth) !==false)) {
                            widestColumn1 = Math.max(window['tVar'+ i].cell1OriginalWidth, window['tVar'+ o1].cell1OriginalWidth, window['tVar'+ o2].cell1OriginalWidth, window['tVar'+ o3].cell1OriginalWidth);
                            window['tVar'+ i].td1.width = widestColumn1-21;
                            window['tVar'+ o1].td1.width = widestColumn1-21;
                            window['tVar'+ o2].td1.width = widestColumn1-21;
                            window['tVar'+ o3].td1.width = widestColumn1-21;
                        }
                        if ((typeof(window['tVar'+ i].cell2OriginalWidth) !==false) && (typeof(window['tVar'+ o1].cell2OriginalWidth) !==false) && (typeof(window['tVar'+ o2].cell2OriginalWidth) !==false) && (typeof(window['tVar'+ o3].cell2OriginalWidth) !==false)) {
                            widestColumn2 = Math.max(window['tVar'+ i].cell2OriginalWidth, window['tVar'+ o1].cell2OriginalWidth, window['tVar'+ o2].cell2OriginalWidth, window['tVar'+ o3].cell2OriginalWidth);
                            window['tVar'+ i].td2.width = widestColumn2-21;
                            window['tVar'+ o1].td2.width = widestColumn2-21;
                            window['tVar'+ o2].td2.width = widestColumn2-21;
                            window['tVar'+ o3].td2.width = widestColumn2-21;
                        }
                        if ((typeof(window['tVar'+ i].cell3OriginalWidth) !==false) && (typeof(window['tVar'+ o1].cell3OriginalWidth) !==false) && (typeof(window['tVar'+ o2].cell3OriginalWidth) !==false) && (typeof(window['tVar'+ o3].cell3OriginalWidth) !==false)) {
                            widestColumn3 = Math.max(window['tVar'+ i].cell3OriginalWidth, window['tVar'+ o1].cell3OriginalWidth, window['tVar'+ o2].cell3OriginalWidth, window['tVar'+ o3].cell3OriginalWidth);
                            window['tVar'+ i].td3.width = widestColumn3-21;
                            window['tVar'+ o1].td3.width = widestColumn3-21;
                            window['tVar'+ o2].td3.width = widestColumn3-21;
                            window['tVar'+ o3].td3.width = widestColumn3-21;
                        }
                        window['tVar'+ i].table.style.tableLayout='fixed';
                        window['tVar'+ o1].table.style.tableLayout='fixed';
                        window['tVar'+ o2].table.style.tableLayout='fixed';
                        window['tVar'+ o3].table.style.tableLayout='fixed';
                    }
                }
            }// END for
        };// END function
        // internal - lssdk.h.processTables="In short, takes all original widths from setStartingSizes, compares them and determines the widest, and then sets all corresponding tds to that width.";
        lssdk.createVars = function() {
            activeCountA=0;
            activeCountB=0;
            for (i = 0; i <= lssdk.numTabs-1; i++) {
                if (lssdk.rr[i].className.indexOf('confluenceTable') > -1) {
                    confTableStatus = true;
                } else {
                    confTableStatus = false;
                }
                thisTr= lssdk.rr[i].rows[0];
                window['tVar'+ i] = {
                    'table': lssdk.rr[i],
                    'isConfTable': confTableStatus,
                    'tr' : thisTr,
                    'td1': lssdk.rr[i].rows[0].cells[0],
                    'td2': lssdk.rr[i].rows[0].cells[1],
                    'td3': lssdk.rr[i].rows[0].cells[2],
                    'td1width': lssdk.rr[i].rows[0].cells[0].offsetWidth,
                    'totNumRows': lssdk.rr[i].rows.length
                };
                var o1=i-1;
                var o2=i-2;
                var o3=i-3;
                if (o1 > -1) {
                    if ((window['tVar'+ i].isConfTable===false) && (window['tVar'+ o1].isConfTable===true)) {
                        window['tVar'+ i].fixitA=true;
                    } else {
                        window['tVar'+ i].fixitA=false;
                    }
                }
                if (o1 > 0) {
                    if ((window['tVar'+ i].isConfTable===false) && (window['tVar'+ o1].isConfTable===false) && (window['tVar'+ o2].isConfTable===true)) {
                        window['tVar'+ i].fixitB=true;
                    } else {
                        window['tVar'+ i].fixitB=false;
                    }
                }
                if (o1 > 1) {
                    if ((window['tVar'+ i].isConfTable===false) && (window['tVar'+ o1].isConfTable===false) && (window['tVar'+ o2].isConfTable===false) && (window['tVar'+ o3].isConfTable===true)) {
                        window['tVar'+ i].fixitC=true;
                    } else {
                        window['tVar'+ i].fixitC=false;
                    }
                }
                if (window['tVar'+ i].isConfTable===true) {
                    var jlk=window['tVar'+ i].table.rows[0].children.length;
                    if (jlk === 4) {
                        window['tVar'+ i].table.rows[0].children[3].style.minWidth='500px';
                    }
                    if (jlk === 3) {
                        window['tVar'+ i].table.rows[0].children[2].style.minWidth='500px';
                    }
                }
                $(lssdk.rr[i]).attr('id', 'tVar' +i);
                window['tVar'+ i].td1 = window['tVar'+ i].tr.cells[0];
                window['tVar'+ i].td2 = window['tVar'+ i].tr.cells[1];
                window['tVar'+ i].td3 = window['tVar'+ i].tr.cells[2];
                activeCountA=activeCountA+1;
                activeCountB=activeCountB+1;
                if (typeof(window['tVar'+ i].td2) !=='undefined') {
                    window['tVar'+ i].td2width = window['tVar'+ i].table.rows[0].cells[1].offsetWidth;
                }
                if (typeof(window['tVar'+ i].td3) !=='undefined') {
                    window['tVar'+ i].td3width = window['tVar'+ i].table.rows[0].cells[2].offsetWidth;
                }
            } // END for
            lssdk.setStartingSizes();
            lssdk.processTables();
        };
        // internal - lssdk.h.createVars="Creates all the necessary vars needed for processing tables using the tableFixer. Takes no parameters, ex: lssdk.createVars();.";
        //tableFixer
        lssdk.tableFixer = function() {
            if (typeof(lssdk.rr) !== 'undefined') {
                if ((typeof(lssdk.rr.length) === 'undefined') || (lssdk.rr.length === 0)) {
                    lssdk.prepTables();
                    lssdk.createVars();
                } else {
                    console.warn("lssdk.rr already contains children, additional calls to lssdk.tableFixer are being ignored.");
                }
            }
        };
        lssdk.h.tableFixer="Fixes problems with embedded table columns not aligning to columns of the parent. Takes no parameters, ex: lssdk.tableFixer();.";
        //tableSorter
        lssdk.tableSorter = function() {
            //Add necessary CSS
            var newSorterCss = document.createElement('style');
            newSorterCss.type = 'text/css';
            var newSorterCssStyles = 'table.tablesorter thead tr .header { background-image: url(/download/attachments/14650850/tableSorter.bg.gif); background-repeat: no-repeat; background-position: center right; cursor: pointer; }';
            newSorterCssStyles += 'table.tablesorter thead tr .headerSortUp { background-image: url(/download/attachments/14650850/tableSorter.asc.gif); }';
            newSorterCssStyles += 'table.tablesorter thead tr .headerSortDown { background-image: url(/download/attachments/14650850/tableSorter.desc.gif); }';
            if (newSorterCss.styleSheet) newSorterCss.styleSheet.cssText = newSorterCssStyles;
            else newSorterCss.appendChild(document.createTextNode(newSorterCssStyles));
        
            //The tableSorter code
            lssdk.tsa=document.getElementsByTagName('table');
            sortTabs=lssdk.tsa.length;
            lssdk.setTablesForSorting = function() {
                for (i = 0; i <= sortTabs-1; i++) {
                    window['lssdk.tsaVar'+ i] = {
                        'table': lssdk.tsa[i]
                    };
                    newIncr= i;
                    newId='newId'+ newIncr;
                    console.log('newId: '+ newId);
                    $(lssdk.tsa[i]).attr('id', newId);
                    var tempVar = window['lssdk.tsaVar'+i];
                    console.log(tempVar);
                    if ( i <= sortTabs-1 ) {
                        var tempVar2 = window['lssdk.tsaVar'+i];
                        console.log('tempVar2: ');
                        console.log(tempVar2);
                        if ((tempVar2.table.tHead !==null) && (tempVar2.table.tHead !=='undefined')) {
                            $(tempVar2.table.tHead.rows[0]).find('td').each(function() {
                                var $this = $(this);
                                $this.replaceWith('<th class="confluenceTh" style="background-color: #FFFFFF !important; cursor: pointer !important;">' + $this.text() + '</th>');
                            });
                        }
                    }
                    $(lssdk.tsa[i]).tablesorter();
                };
            }
            lssdk.setTablesForSorting();
            $("table thead th:eq(3)").data("sorter", false);
        };
        lssdk.h.tableSorter="Adds aplphabetical sortability to tables via clicking the top column of a given row. Takes no parameters, ex: lssdk.tableSorter();.";
        
        lssdk.popups = lssdk.popups || {};
        
        //target = ID
        lssdk.popups.createModal=function(modalId,modalTitle,modalContent,target,targetTitle) {
            var a,b,c,d,e,f,g,h,j,k,m;
            var time = Date.now().toString();
            if (modalId) {
                a = modalId;
            } else {
                console.log("ERROR: gdsdk.popups.createModal requires a modalId.");
                throw new Error("Missing Parameter(s).");
            }
            if (modalTitle) {
                b = modalTitle;
            } else {
                console.log("ERROR: gdsdk.popups.createModal requires a modalTitle.");
                throw new Error("Missing Parameter(s).");
            }
            /*
            if (linkName) {
                c = linkName;
            } else {
                console.log("ERROR: gdsdk.popups.createModal requires a linkName.");
            }
            */
            if (modalContent) {
                d = document.createElement('div');
                d.innerHTML = (modalContent);
            } else {
                console.log("ERROR: gdsdk.popups.createModal requires modalContent.");
                throw new Error("Missing Parameter(s).");
            }
            if (target) {
                if (target == 'onLoad') {
                    e = 'onLoad';
                } else {
                    e = document.getElementById(target);
                    e.style.cursor='pointer';
                    if (targetTitle) {
                        m = String(targetTitle);
                        e.title = m;
                    }
                }
            } else {
                console.log("ERROR: gdsdk.popups.createModal requires a target.");
                throw new Error("Missing Parameter(s).");
            }
        
            var styleSource=".gigyaModal_" + time + " {\n display: none;\n position: fixed;\n z-index: 1000;\n padding-top: 100px;\n left: 0;\n top: 0;\n width: 100%;\n height: 90%;\n overflow: auto;\n background-color: rgb(0,0,0);\n background-color: rgba(0,0,0,0.4);\n}\nh1.h1_" + time + " {\n margin-top: 7px !important;\n margin-bottom: 20px !important;\n }\n.gigyaModal-content {\n background-color: #fefefe;\n margin: auto;\n padding: 20px;\n border: 1px solid #888;\n width: 80%;\n border-radius: 15px;\n}\n.gigyaModalClose {\n color: #aaaaaa;\n float: right;\n font-size: 28px;\n font-weight: bold;\n}\n.gigyaModalClose:hover, .gigyaModalClose:focus {\n color: #000;\n text-decoration: none;\n cursor: pointer;\n}";
            f = document.createElement('style');
            f.innerHTML = styleSource;
            document.head.appendChild(f);
            g = document.createElement('div'); // outer
            g.id=a;
            g.className="gigyaModal_" + time;
            h = document.createElement('div'); // inner
            h.id = a + "_inner";
            h.className = "gigyaModal-content";
            j = document.createElement('span');
            j.id = a + "_closeBtn";
            j.className = "gigyaModalClose";
            j.innerHTML = "&times;";
            j.addEventListener("click", function() {
                document.getElementById(a).style.display="none";
            });
            h.appendChild(j);
            k = document.createElement('h1');
            k.className = "h1_" + time;
            k.innerHTML = b;
            h.appendChild(k);
            h.appendChild(d);
            g.appendChild(h);
            document.body.appendChild(g);
            if ((e == 'onLoad') && (lssdk.isLoaded == true)) {
                document.getElementById(a).style.display = "block";
            } else {
                e.addEventListener("click", function() {
                    document.getElementById(a).style.display = "block";
                });
            }
        };
        lssdk.h.popups = "lssdk.popups.createModal - Creates a popup modal window.\nuse: lssdk.popups.createModal(modalId,modalTitle,modalContent,target)\nWhere modalId and target must be ID's of entities on the page and modalTitle and content are text. Content can also be an iframe\ne.g., lssdk.popups.createModal('apiNamePopup','iOS SDK',`<iframe src='https://s3.amazonaws.com/wikifiles.gigya.com/SDKs/iPhone/doc/html/Classes/Gigya.html#//api/name/APIDomain' style='width: 100%; height: 660px;'></iframe>`,'iosSdk_0001');\n lssdk v0012.5 includes an 'onLoad' target to fire the popup immediately on page load.";
        lssdk.popups.showNotification = function(msg,tm) {
            var message,
                popupContainer,
                parentContainer,
                time;
            if (msg) {
                message = msg;
            } else {
                message = "Something just happened.";
            }
            if ((tm) && (typeof(tm) == 'number')) {
                time = tm;
            } else {
                time = 3000;
            }
            parentContainer = document.getElementsByTagName('body')[0];
            popupContainer = document.createElement('div');
            popupContainer.setAttribute("style", "width: 40vw; height: 30vh; z-index: 100; display: block; color: navy; background-color: beige; border: 2px solid skyblue; border-radius: 15px; text-align: center; margin: 0px auto; font-size: 2vh; font-weight: bold; padding: 10vh 5vw; position: absolute; top: 10vh;");
            popupContainer.innerHTML = message;
            parentContainer.appendChild(popupContainer);
            setTimeout(function(){ popupContainer.style.display = "none"; }, time);
            popupContainer.addEventListener("click", function() {
                popupContainer.style.display = "none";
            });
        }
        lssdk.expands = lssdk.expands || {};
        lssdk.expands.getArray = function() {
            var a;
            a = document.getElementsByClassName('expand-control-text');
            if (a) {
                return a;
            } else {
                console.warn("LSSDK Warning! No expand macros on this page.");
            }
        };
        lssdk.expands.open = function(name) {
            var linkName,searchArray,actualLink;
            if ((typeof(name) !== 'undefined') && (name !== '')) {
                linkName = name;
                searchArray = lssdk.expands.getArray();
                if ((typeof(searchArray) !== 'undefined') && (typeof(searchArray.length) !== 'undefined') && (searchArray.length > 0) ) {
                    for (i = 0; i < searchArray.length; i++) {
                        if (searchArray[i].innerHTML == linkName) {
                            var k = searchArray[i];
                            actualLink = k;
                            actualLink.parentNode.click();
                        }
                    }
                } else {
                    console.warn("LSSDK Warning! No expand macros on this page.");
                }
            }
        };
        lssdk.expands.expandByHash = function() {
            var a,b;
            a = document.location.hash.split("#")[1];
            if (a) {
                b = document.location.hash.split("-")[1];
                lssdk.expands.open(b);
            }
        };
        lssdk.h.expands = "Tools to manipulate confluence expand/collapse macro.\n > ex: lssdk.expands.expandByHash(); adds an automatic tool to expand any macros on the page that match the anchor passed in a query string to a page.\n > Sample link: https://developers.gigya.com/display/GD/Component+Repository#ComponentRepository-datasource.read.gigya.account";
        lssdk.svg.setSvgDownload = function(id,link) {
            // -> id = the id of the svg container holding the specific svg
            //      -> if you used the shrinker, it is mySmallSvg
            // -> link = the id of the <a> to attach the download
        
            //get svg element.
            //example: https://developers.gigya.com/display/GD/Certificate+Provisioning
            var svg = document.getElementById(id);
        
            //get svg source.
            var serializer = new XMLSerializer();
            var source = serializer.serializeToString(svg);
        
            //add name spaces.
            if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
                source = source.replace(/^<svg/, '<svg xmlns="https://www.w3.org/2000/svg"');
            }
            if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
                source = source.replace(/^<svg/, '<svg xmlns:xlink="https://www.w3.org/1999/xlink"');
            }
        
            //add xml declaration
            source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
        
            //convert svg source to URI data scheme.
            var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
        
            //set url value to a element's href attribute.
            document.getElementById(link).href = url;
        };
        // example: lssdk.svg.setSvgDownload('mySmallSvg','link1');
        // internal - lssdk.h.setSvgDownload="Adds links to SVG flow diagrams created using the 'flow diagrams' macro. Requires the id of the SVG and the link for the download which is created automatically using the createSvgLinksAction method.";
        
        // TESTING FOR CANVAS issues
        lssdk.svg.setSvgDownload2 = function(id) {
            // -> id = the id of the svg container holding the specific svg
            //      -> if you used the shrinker, it is mySmallSvg
            // -> link = the id of the <a> to attach the download
        
            // ONLY DOWNLOADS A SVG - does not convert to png
            var tLink = document.createElement('a');
            var tempdn = Date.now().toString()  + '_link';
            tLink.id= tempdn;
            console.log("tempdn: ",tempdn);
            tLink.download =  'sequenceDiagram_' + tLink.id + '.png';
            tLink.innerHTML = 'Save image';
        
            //get svg element.
            //example: https://developers.gigya.com/display/GD/Certificate+Provisioning
            var svg = document.getElementById(id);
            console.log("svg id: ", svg);
            //get svg source.
            var serializer = new XMLSerializer();
            var source = serializer.serializeToString(svg);
        
            //add name spaces.
            if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
                source = source.replace(/^<svg/, '<svg xmlns="https://www.w3.org/2000/svg"');
            }
            if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
                source = source.replace(/^<svg/, '<svg xmlns:xlink="https://www.w3.org/1999/xlink"');
            }
        
            //add xml declaration
            source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
        
            //convert svg source to URI data scheme.
            var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
        
            //set url value to a element's href attribute.
            tLink.href = url;
            svg.appendChild(tLink);
        };
        lssdk.tools =lssdk.tools || {};
        /*
        lssdk.tools.addAccountInfoDiv = function(id,callback) {
            var a = document.getElementsByTagName('body')[0];
            var b = document.createElement('div');
            var divId,newCb;
            if (id) {
                divId = id + "_" + Date.now().toString();
            } else {
                divId = "gai_response_" + Date.now().toString();
            }
            b.id = divId;
            b.setAttribute("style","margin: 20px !important;");
            a.appendChild(b);
            if ((callback) && (typeof(callback) === 'function')) {
                newCb = callback;
            } else {
                newCb = function() {
                    gigya.accounts.getAccountInfo({
                        include: 'identities-all,loginIDs,profile,data,password,lastLoginLocation,regSource,irank,emails,rba,subscriptions,preferences',
                        extraProfileFields: 'languages, address, phones, education, honors, publications,  patents, certifications, professionalHeadline, bio, industry, specialties, work, skills, religion, politicalView, interestedIn, relationshipStatus, hometown, favorites,  followersCount, followingCount, username , locale, verified,  timezone, likes, samlData,subscriptions',
                        callback: function(e) {
                            console.log(e); document.getElementById(divId).innerHTML +="<hr />" + JSON.stringify(e) + "<br />";
                        }
                    });
                }
            }
            newCb();
        };
        */
        lssdk.tools.addAccountInfoDiv = function(id,callback) {
            var a = document.getElementsByTagName('body')[0];
            var b = document.createElement('div');
            var divId,newCb;
            if (id) {
                divId = id + "_" + Date.now().toString();
            } else {
                divId = "gai_response_" + Date.now().toString();
            }
            b.id = divId;
            b.setAttribute("style","margin: 20px !important;");
            a.appendChild(b);
            if ((callback) && (typeof(callback) === 'function')) {
                newCb = callback;
            } else {
                newCb = function() {
                    gigya.accounts.getAccountInfo({
                        include: 'identities-all,loginIDs,profile,data,password,lastLoginLocation,regSource,isLockedOut,irank,emails,rba,subscriptions,preferences, userInfo',
                        extraProfileFields: 'languages,address,phones,education,honors,publications, patents,certifications,professionalHeadline, bio, industry, specialties,work,skills,religion,politicalView,interestedIn,relationshipStatus,hometown,favorites,followersCount,followingCount,username,locale,verified,timezone,likes,samlData',
                        callback: function(e) {
                            console.log(e);
                            //document.getElementById(divId).innerHTML +="<hr />" + JSON.stringify(e) + "<br />";
                            lssdk.tools.createTextarea(divId,e);
                        }
                    });
                }
            }
            newCb();
        };
        // COOKIE CONTROL
        lssdk.tools.setCookie = function(name,value,days) {
            var expires = '';
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days*24*60*60*1000));
                expires = '; expires=' + date.toUTCString();
            }
            document.cookie = name + '=' + value + expires + '; path=/';
        };
        lssdk.tools.getCookie = function(name) {
            var re = new RegExp(name + '=([^;]+)');
            var value = re.exec(document.cookie);
            return (value != null) ? unescape(value[1]) : null;
        };
        lssdk.tools.removeCookie = function(name) {
            lssdk.tools.setCookie(name,'',-1);
        };
        
        // only param must be a function and it will run after the extension loads 
        // i.e., function myFunc() { lssdk.ceg.run(cegParamsObject); } // fun = myFunc
        lssdk.tools.addCegExtension = function(fun) {
            if ((typeof(fun) !== 'undefined') && (typeof(fun) === 'function')) {
                lssdk.loadSource("https://lssdk.herokuapp.com/js/codeExampleGenerator/ceg_ext.js",null,null,fun);
            } else {
                lssdk.loadSource("https://lssdk.herokuapp.com/js/codeExampleGenerator/ceg_ext.js");
            }
        };
        lssdk.tools.returnJsonValue = function(name,obj) {
            var array = name.split(".");
            var value = obj || this;
            for (i = 0; i < array.length; i++) {
                if ((typeof(value[array[i]]) !== 'undefined')) {
                    value = value[array[i]];
                } else {
                    return null;
                }
            }
            return value;
        };
        lssdk.tools.showHtmlEntities = function(str) {
            return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        };
        lssdk.tools.getAllClassElements = function(classname) {
            var currentclass;
            if ((typeof(classname) != 'undefined') && (classname !== null) && (classname !== "")) {
                currentclass = classname;
            }
            var a = document.getElementsByClassName(currentclass);
            return a;
        };
        lssdk.tools.changeClassElementText = function(classname,extistingtext,changedtext) {
            var currentclass,oldtext,newtext;
            if ((typeof(classname) != 'undefined') && (classname !== null) && (classname !== "")) {
                currentclass = classname;
            }
            if ((typeof(extistingtext) != 'undefined') && (extistingtext !== null) && (extistingtext !== "")) {
                oldtext = extistingtext;
            } else {
                throw new Error("Missing required param: oldText");
            }
            if ((typeof(changedtext) != 'undefined') && (changedtext !== null) && (changedtext !== "")) {
                newtext = changedtext;
            } else {
                newtext = "";
            }
            var allElems = lssdk.tools.getAllClassElements(currentclass);	
            var checkmark = false;
            for (var i=0; i < allElems.length; i++) {
                if (allElems[i].innerText.indexOf(oldtext) > -1) {
                    allElems[i].innerText = allElems[i].innerText.replace(oldtext, newtext);
                    checkmark = true;
                }
            }
            var responseText;
            if (!!checkmark) {
                responseText = "with changes";
            } else {
                responseText = "with no changes";
            }
            console.log("changeClassElementText complete " + responseText);
        };
        lssdk.getAccountInfo = function(id,callback) {
            var thisId,thisCallback;
            if ((callback) && (typeof(callback) === 'function')) {
                thisCallback = callback;
                console.log("callback", thisCallback);
            } else {
                thisCallback = null;
            }
            if ((id) && (id !=='')) {
                thisId = id;
            } else {
                thisId = null;
            }
            lssdk.tools.addAccountInfoDiv(thisId,thisCallback);
        };
        lssdk.h.getAccountInfo = "> lssdk.getAccountInfo(id,cb); calls gigya.accounts.getAccountInfo with all possible options and extras; and adds the response to the bottom of the current page in a unique div.";
        lssdk.totDivs={};
        lssdk.numDivs;
        lssdk.svg.prepDivs = function() {
            lssdk.totDivs=document.getElementsByTagName('div');
            lssdk.numDivs=lssdk.totDivs.length;
            for (i = 0; i <= lssdk.numDivs-1; i++) {
                window['tDiv' + i] = {};
                window['tDiv' + i] = {
                    'div': lssdk.totDivs[i],
                    'isSvg':null
                };
                if (typeof(lssdk.totDivs[i].children[0]) !== 'undefined') {
                    if (lssdk.totDivs[i].children[0].nodeName==='svg') {
                        window['tDiv' + i].isSvg=true;
                        window['tDiv' + i].svg=window['tDiv' + i].div.innerHTML;
                    }
                    else {
                        window['tDiv' + i].isSvg=false;
                    }
                }
            } // End for
            console.log("lssdk.svg.prepDivs complete");
        }; // End func prepDivs
        lssdk.svg.createSvgLinksAction = function(svgBgColor) {
            for (i = 0; i <= lssdk.numDivs-1; i++) {
                var newIncr = i.toString();
                var newSvgId='tSvg'+ newIncr;
                var newLinkId='tLink'+ newIncr;
                if (window['tDiv' + newIncr].isSvg===true) {
                    var svgContainerDiv = document.getElementById(window['tDiv' + newIncr].div.id);
                    svgContainerDiv.firstChild.id=newSvgId;
                    //$(svgContainerDiv.firstChild).attr('id', newSvgId);
                    var svg = document.getElementById(newSvgId);
        //debugger;
                    if (svgBgColor) {
                        svg.style.backgroundColor=svgBgColor;
                    } else {
                        svg.style.backgroundColor="#ffffff";
                    }
        console.log("var svg: ",svg); // REMOVE IN PRODUCTION!!!!!!!!!!!!!!!!!!!!!!!!!
                    var serializer = new XMLSerializer();
                    var source = serializer.serializeToString(svg); // <-- (only works on dom elements)
                    var svgDimHolder = "svgDimHolder_" + Date.now().toString();
                    window[svgDimHolder] = svg;
        console.log("test name: ", svgDimHolder); // REMOVE IN PRODUCTION!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log("var source: ",source); // REMOVE IN PRODUCTION!!!!!!!!!!!!!!!!!!!!!!!!!
                    if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
                        source = source.replace(/^<svg/, '<svg xmlns="https://www.w3.org/2000/svg"');
                    }
                    if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
                        source = source.replace(/^<svg/, '<svg xmlns:xlink="https://www.w3.org/1999/xlink"');
                    }
                    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
                    var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
        console.log("var url: ",url); // REMOVE IN PRODUCTION!!!!!!!!!!!!!!!!!!!!!!!!! - THIS IS GOOD, WORKING SVG
                    window['tDiv' + newIncr].svgUri=url;
                    window['svgImage_' + newLinkId] = new Image();
                    window['svgImage_' + newLinkId].src = url;
                    var tLink,
                        tLinkText,
                        canvas,
                        context;
                    // added a check to keep from adding multiple download links to the same SVG (to support confluence included pages).
                    var linkCheck = newLinkId + '_link';
                    var checkThisLink = document.getElementById(linkCheck);
                    if ( (typeof(checkThisLink) == 'undefined') || (checkThisLink == null) ) {
                        tLink = document.createElement('a');
                        tLink.id=newLinkId + '_link';
                        tLink.download =  'sequenceDiagram_' + newLinkId + '.png';
                        tLink.innerHTML = 'Save image';
                        canvas = document.createElement('canvas');
                        canvas.width = window['svgImage_' + newLinkId].width;
        console.log('svgImage_' + newLinkId);
                        console.log(window[svgDimHolder]);
        //debugger;
                        if ((typeof(window[svgDimHolder].width.baseVal.value) !== 'undefined') && (window[svgDimHolder].width.baseVal.value !== 0)) {
                            canvas.width = window[svgDimHolder].width.baseVal.value;
                        } else {
                            canvas.width = 1600;
                        }
                        console.log('canvas.width: ', canvas.width);
                        canvas.height = window['svgImage_' + newLinkId].height;
                        if ((typeof(window[svgDimHolder].height.baseVal.value) !== 'undefined') && (window[svgDimHolder].height.baseVal.value !== 0)) {
                            canvas.height = window[svgDimHolder].height.baseVal.value;
                        } else {
                            canvas.height = 1600;
                        }
                        console.log('canvas.height: ', canvas.height);
                        context = canvas.getContext('2d');
                        context.drawImage(window['svgImage_' + newLinkId], 0, 0);
                        //tLink.href = canvas.toDataURL('image/png');
                        tLink.href = canvas.toDataURL();
                        console.log("dataURL: ",tLink.href);
                        svgContainerDiv.appendChild(tLink);
                        console.log("lssdk.svg.createSvgLinksAction created download link for id: " + linkCheck);
                        //console.log(convertImg.src);
        //debugger;
                    } else {
                        console.log("lssdk.svg.createSvgLinksAction says that download link already exists!" + linkCheck);
                    }
                }
            }
        }; // End func createSvgLinksAction
        lssdk.svg.createSvgLinks = function(bgColor) {
            var svgBgColor;
            if ((typeof(bgColor) !== 'undefined') && (bgColor !=='')) {
                svgBgColor = bgColor;
            } else {
                svgBgColor = "#ffffff";
            }
            lssdk.svg.prepDivs();
            lssdk.svg.createSvgLinksAction(svgBgColor);
        };
        lssdk.createSvgLinks = lssdk.svg.createSvgLinks; // required for backward compatibility - DO NOT REMOVE
        lssdk.h.createSvgLinks="Adds links to all SVGs created using the 'flow diagram' macro so they can be downloaded in PNG format. Has an optional bgColor parameter, ex: lssdk.svg.createSvgLinks('red'); will make the background of all SVG/PNGs red; white is the default.";
        // example: lssdk.svg.createSvgLinks();
        
        /* Area for new SVG code start */
        /*
        lssdk.svg.convertToBlob = function(svg) {
            var svgSource,domUrl,url;
            if ((typeof(svg) !== 'undefined') && (svg !== '')) {
                svgSource = new Blob([svg], { type:"image/svg+xml;charset=utf-8" }),
                domUrl = self.URL || self.webkitURL || self,
                url = domUrl.createObjectURL(svgSource);
                return url;
            }
        };
        lssdk.svg.drawImage = function (ctx,cb) {
            var context,callback;
            if ((typeof(ctx) !== 'undefined') && (ctx !== null)) {
                context = ctx;
                context.drawImage(this, 0, 0);
                if ((cb) && (typeof(cb) === 'function')) {
                    callback();
                }
            }
        };
        lssdk.svg.createImage = function(url) {
            var img,context;
            if ((typeof(url) !== 'undefined') && (url !== null)) {
                img = new Image;
                img.onload = lssdk.svg.drawImage();
            }
        };
        */
        
        
        //DAMN TAKE 2
        // require
        // >> svg source - data:image/svg+xml
        //
        
        lssdk.svg.prepSvgs = function() {
            lssdk.svg.totDivs=document.getElementsByTagName('div');
            lssdk.svg.numDivs=lssdk.totDivs.length;
            for (i = 0; i <= lssdk.svg.numDivs-1; i++) {
                window['tDiv' + i] = {};
                window['tDiv' + i] = {
                    'div': lssdk.svg.totDivs[i],
                    'isSvg':null
                };
                if (typeof(lssdk.svg.totDivs[i].children[0]) !== 'undefined') {
                    if (lssdk.svg.totDivs[i].children[0].nodeName==='svg') {
                        window['tDiv' + i].isSvg=true;
                        window['tDiv' + i].svg=window['tDiv' + i].div.innerHTML;
                    }
                    else {
                        window['tDiv' + i].isSvg=false;
                    }
                }
            } // End for
            console.log("lssdk.svg.prepSvgs complete");
        }; // End func prepDivs
        
        lssdk.svg.addLinksAction = function(color) {
            console.log("START lssdk.svg.addLinksAction");
            var bgcolor = "#ffffff";
            if ((typeof(color) !== 'undefined') && (color !== null)) {
                bgcolor = color;
            }
            for (i = 0; i <= lssdk.svg.numDivs -1; i++) {
                var increment = i.toString();
                var currentSvgId = 'tSvg' + increment;
                var currentLinkId = 'tLink' + increment;
                if (window['tDiv' + increment].isSvg === true) {
                    var svgContainerDiv = document.getElementById(window['tDiv' + increment].div.id);
                    svgContainerDiv.firstChild.id = currentSvgId;
                    var svg = document.getElementById(currentSvgId);
                    // set background color of the svg
                    if (bgcolor) {
                        svg.style.backgroundColor = bgcolor;
                    }
                    //var serializer = new XMLSerializer();
                    var currentBlob = new Blob([currentSvgId], {type:"image/svg+xml;charset=utf-8"});
                    var domURL = self.URL || self.webkitURL || self;
                    var url = domURL.createObjectURL(currentBlob);
                    var img = new Image;
        
                    var currentCanvas = document.createElement("canvas");
                    currentCanvas.id = "canvas_" + increment;
                    currentCanvas.width = 1600;
                    currentCanvas.height = 1600;
                    var canvasActual = currentCanvas.getContext("2d");
                    img.onload = function () {
                        canvasActual.drawImage(this, 0, 0);     
                        console.log("finishedURL: ",canvasActual.toDataURL());
                    };
                    img.src = url;
        //debugger;
                } // end if isSvg === true
            }
            console.log("END lssdk.svg.addLinksAction");
        };
        lssdk.svg.addLinks = function(color) {
            var bgcolor;
            if ((typeof(color) !== 'undefined') && (color !== null) && (color !== '')) {
                bgcolor = color;
            } else {
                bgcolor = "#ffffff";
                lssdk.svg.prepSvgs();
                lssdk.svg.addLinksAction(bgcolor);
            }
        };
        
        /* Area for new SVG code END   */
        
        lssdk.svg.doSvgResize=function(which,gtWidth,scale,mLeft,mTop,mBot,name) {
            var a,b,c,d,e,f,g,h,j,k,m,n,o,p,q;
            lssdk.svg.doSvgResize.array={};
            var error=function(err) {
                return console.log(err);
            };
            // which            exposed (which child of the array of svgs to resize)
            // gtWidth          exposed
            // scale            exposed
            // overflow         notExposed
            // position         notExposed
            // margin-left      exposed currently but try to automate
            // margin-top       exposed currently but try to automate
            // margin-bottom    exposed currently but try to automate
            if ((typeof(which) === "number")) {
                a = which;
            } else if ((which) && (which !== '')) {
                a = Number(which);
            } else {
                error("Missing array element designation (int): lssdk.svg.doSvgResize(which,gtWidth,scale,mLeft,mTop,mBot,name)");
            }
            if ((gtWidth) && (gtWidth > 100)) {
                b = gtWidth;
            } else {
                error("Missing gtWidth (int - 1000,2000,350) in px: lssdk.svg.doSvgResize(which,gtWidth,scale,mLeft,mTop,mBot,name)");
            }
            if ((scale) && (typeof(scale) == "number")) {
                c = scale;
            } else {
                error("Missing resize scale (int - 1,2,3 or 0.7, 0.5): lssdk.svg.doSvgResize(which,gtWidth,scale,mLeft,mTop,mBot,name)");
            }
            d = "hidden";
            e = "relative";
            if ((mLeft) && (typeof(mLeft) == "number")) {
                f = mLeft;
            } else {
                error("Missing left margin (int): lssdk.svg.doSvgResize(which,gtWidth,scale,mLeft,mTop,mBot,name)");
            }
            if ((mTop) && (typeof(mTop) == "number")) {
                g = mTop;
            } else {
                error("Missing top margin (int): lssdk.svg.doSvgResize(which,gtWidth,scale,mLeft,mTop,mBot,name)");
            }
            if ((mBot) && (typeof(mBot) == "number")) {
                h = mBot;
            } else {
                error("Missing bottom margin (int): lssdk.svg.doSvgResize(which,gtWidth,scale,mLeft,mTop,mBot,name)");
            }
            if ((name) && (name !== "")) {
                j = name;
            } else {
                error("Missing name (int): lssdk.svg.doSvgResize(which,gtWidth,scale,mLeft,mTop,mBot,name)");
            }
            //console.log(a + " : " + b +  " : " +  c + " : " + d + " : " + e + " : " + f + " : " + g + " : " + h);
            if (lssdk.svg.doSvgResize.array.length > 0) {
                p = lssdk.svg.doSvgResize.array.length +1;
            } else {
                p = 0;
            }
            k = lssdk.svg.doSvgResize.array.p;
            k = document.getElementsByTagName('svg');
            m = document.createAttribute("id");
            m.value = h;
            k[a].setAttributeNode(m);
            n = document.createAttribute("width");
            n.value = b;
            k[a].setAttributeNode(n);
            o = document.createAttribute("style");
            o.value = "transform:scale(" + c + "); overflow:" + d + "; position:" + e + "; margin-left: " + f + "px !important; margin-top: " + g + "px !important; margin-bottom: " + h + "px !important; left: 0;";
            k[a].setAttributeNode(o);
        };
        lssdk.h.doSvgResize="lssdk.svg.doSvgResize - Resizes an SVG. Ex: 'lssdk.svg.doSvgResize(0,1000,0.65,-200,-150,-175,'newDeal');' where (whichArrayItem - array[0], overall width of the svg container, scale, margin-left, margin-top, mmargin-bottom, newId of the SVG container). This can be difficult to use so it is necessary to follow these instructions.\n\nFirst, determine which SVG you are going to manipulate, if there is only one on the page, the first variable will be 0. Otherwise, this will be the number of the svg from a 0-based count of all SVGs on the page.\n\nYou can determine all these settings from the console before committing to the page.\n\nStart by doing this from the console until you get the gtWidth and scale correct, then you can add it to the page in order to set the correct margins.\nFor some reason, the svg ignores any of the margin changes when this is used from the console, so if you want to set the margins before adding it to the page code, you must inspect it and toggle any of the css fields on/off after it is run in order to reset to the new margins.\n\nIt is recommended to first get the 'scale' set to the size you want it, then adjust the gtWidth until it is no longer cropped. Then, adjust the margins last.";
        lssdk.svg.setSvgFont=function(family,fill,stroke,size) {
            var fontfamily,fillcolor,strokecolor,fontsize,e,f,g,h;
            e = lssdk.error;
            if (family == null) {
                fontfamily = "roboto-light";
                e("lssdk.svg.setSvgFont: Default font-family roboto-light used. Can be any valid css font-family.\n>>Ex: lssdk.svg.setSvgFont(family,fill,stroke,size)");
            } else if ((family) && (family !=='')) {
                fontfamily = family;
            } else {
                e("Unknown error at family.");
            }
            if (fill == null) {
                fillcolor = "#000000";
                e("lssdk.svg.setSvgFont: Default Fill color #000000 used; Can be any valid css color (#000fff / rgba(230,120,222,.5) / none / transparent).\n>>Ex: lssdk.svg.setSvgFont(family,fill,stroke,size)");
            } else if ((fill) && (fill !=='')) {
                fillcolor = fill;
            } else {
                e("Unknown error at fill.");
            }
            if (stroke == null) {
                strokecolor = "none";
                e("lssdk.svg.setSvgFont: Default stroke color 'none' used; Can be any valid css color (#000fff / rgba(230,120,222,.5) / red / none / transparent).\n>>Ex: lssdk.svg.setSvgFont(family,fill,stroke,size)");
            } else if ((stroke) && (stroke !=='')) {
                strokecolor = stroke;
            } else {
                e("Unknown error at stroke.");
            }
            if (size == null) {
                fontsize = "100%";
                e("Default font size 100% used; Can be any valid css font-size (12px / 12em / 100%).\nEx: lssdk.svg.setSvgFont(family,fill,stroke,size)");
            } else if ((size) && (size !=='')) {
                fontsize = size;
            } else {
                e("Unknown error at size.");
            }
            if (lssdk.svg.textNodesArray.length > 0) {
                f = lssdk.svg.textNodesArray.length;
            } else {
                f = 0;
            }
            lssdk.svg.textNodesArray.push(document.getElementsByTagName('text'));
            g = lssdk.svg.textNodesArray[f];
            for (i = 0; i <= g.length-1; i++) {
                g[i].attributes['font-family'].value = fontfamily;
                g[i].attributes['fill'].value = fillcolor;
                g[i].attributes['stroke'].value = strokecolor;
                g[i].attributes['font-size'].value = fontsize;
                g[i].style = fontfamily;
                g[i].style = fillcolor;
                g[i].style = strokecolor;
                g[i].style = fontsize;
            }
        };
        lssdk.h.setSvgFont = "lssdk.svg.setSvgFont() - Ex: lssdk.svg.setSvgFont('roboto','red','blue','20em'); where (font-family,fill,stroke,font-size).\nAdditional valid colors for this function are 'none' and 'transparent'.\n>>Note that this may have bugs if the page you are running it on has elements outside of the SVGs with a tagName of 'text'.\n >example: lssdk.svg.setSvgFont('roboto-bold','red','blue','1000px');";
        lssdk.configTooltipIds=function() {
            var allToolTips = document.getElementsByClassName('gigTooltip conf-macro output-inline');
            if ((allToolTips=='undefined') || (allToolTips.length == 0)) {
                console.warn("lssdk found no tooltips on this page.");
            } else {
                for (i=0; i < allToolTips.length; i++) {
                    var idName="toolTipNum" + i;
                    console.log(idName);
                    thisTip = allToolTips[i];
                    thisTip.setAttribute("id", idName);
                }
            }   
        }; // end configTooltipIds
              // example lssdk.configTooltipIds();
        lssdk.h.configTooltipIds="Adds id attributes to all tooltips added using the 'tooltips' macro. Takes no parameters, ex: lssdk.configTooltipIds();.";
        // This function adds titles to the specified table's cells with their position
        lssdk.tables.label=function(whichTable){
            if (typeof(whichTable)!=='undefined') { 
                var c = whichTable.table.rows;
                for (i = 0; i <= c.length-1; i++) {
                    var d = whichTable.table.rows[i].cells;
                    for (y = 0; y <= d.length-1; y++) {
                        var newTitle="row: " + i + " cell: " + y;
                        whichTable.table.rows[i].cells[y].title=JSON.stringify(newTitle);
                    }
                }
            } else {
                console.warn('missing required parameter: table obj - ex: lssdk.tables.label(tVar0)');
                if ((typeof(lssdk.rr) !== 'undefined') && (lssdk.rr.length > 0)) {
                    console.log(lssdk.rr);
                } else {
                    console.warn('Additionally, lssdk.tableFixer() must have already been run on this page and does not appear to have been.');
                }
            }
        };
        // Example: lssdk.tables.label(whichTable);

        // using a JSON object of key:values, create a table that can be pasted into the confluence editor.
        lssdk.tables.createTableCode = function(inc) {
            var tableCode = "";
            var jsonInc = {};
            if (typeof(inc) === "object") {
                jsonInc = inc;
            } else {
                throw new Error("createTableCode requires valid JSON.");
            }
            
            var tableCodeHead = "<table><tbody>";
            var tableCodeFoot = "</tbody></table>";
            var reg_tr_a = "<tr>";
            var reg_tr_b = "</tr>";
            var tit_td_a = "<td><strong>";
            var tit_td_b = "</strong></td>";
            var reg_td_a = "<td>";
            var reg_td_b = "</td>";
            
            tableCode += 
                tableCodeHead
                + reg_tr_a
                + tit_td_a
                + "PLACEHOLDER 1"
                + tit_td_b
                + tit_td_a
                + "PLACEHOLDER 2"
                + tit_td_b
                + reg_tr_b;
            
            var jsIndex = 0;
            //console.log(jsonInc);
            // this works for 2 columns using JSON obj of key/values
            for (var key in jsonInc) {
                if (jsonInc.hasOwnProperty(key)) {
                    jsIndex = jsIndex + 1;
                    console.log("jsonInc:key ", key);
                    console.log("jsonInc:jsonInc[key] ", jsonInc[key]);
                    tableCode += reg_tr_a + reg_td_a + key + reg_td_b + reg_td_a + jsonInc[key] + reg_td_b + reg_tr_b;                           
                }
            }
            tableCode += tableCodeFoot;
            return tableCode;
        }
        
        lssdk.h.tables="When using lssdk.tables.label(obj) - Adds labels via the 'title' attribute to all cells of the specified table obj, detailing their row/cell number. Useful for color-coding tables and for debugging. Requires an object - e.g., lssdk.tables.label(tVar0);.";
        lssdk.h.tables.label=lssdk.h.tables;
        // Add alternating colored rows to a table
        lssdk.tables.colorRows = function(whichTable, colorA, colorB, colorC, colorD) {
            var a,b,c,d,e,f,r,t;
            if((typeof(whichTable) !== 'undefined') && (typeof(whichTable) == 'object')) {
                t = whichTable;
                r = t.table.rows;
                // row A
                if (colorA) {
                    a = colorA;
                } else {
                    a = '#ffffff';
                }
                // row B
                if (colorB) {
                    b = colorB;
                } else {
                    b = '#e2ebf1';
                }
                // header
                if (colorC) {
                    c = colorC;
                } else {
                    c = '#034f7c';
                }
                // headerText
                if (colorD) {
                    d = colorD;
                } else {
                    d = '#ffffff';
                }
                for (var i = 0; i <= r.length -1; i++) {
                    e = r[i];
                    // if i == odd !0
                    // if i == even
                    if (i == 0) {
                        e.bgColor = c;
                        f = r[i].cells;
                        for (var z = 0; z <= f.length -1; z++) {
                            f[z].style.color=d;
                        }
                    } else {
                        if (lssdk.math.alternate(i)) {
                            e.bgColor = b;
                        } else {
                            e.bgColor = a;
                        }
                    }
                    
                }
            } else {
                console.warn("WARNING: lssdk.tables.colorRows() requires a table obj. Nothing done.");
                if ((typeof(lssdk.rr) !== 'undefined') && (lssdk.rr.length > 0)) {
                    console.log(lssdk.rr);
                }
            }
        };
        lssdk.h.tables += "\n\nlssdk.tables.colorRows - Adds alternate color coding to tables. Must have previously run lssdk.tableFixer() to create the appropriate table obj. that is a required parameter.\nEx: lssdk.tables.colorRows(tVar0);\nAlso accepts color values in the format '#xxxxxx', using the following e.g., lssdk.tables.colorRows(whichTable, 'colorA', 'colorB', 'headerColor', 'headerTextColor')";
        lssdk.h.tables.colorRows = lssdk.h.tables;
        //The following is a WIP of code to enable animations of images within a page
        //Currently it only creates a hover effect that enlarges/shrinks the image on mouseover
        //I would like to eventually add smoother animations and support for an assortment of
        //various other types of animations.
        lssdk.newAnimation={};
        lssdk.newAnimation.data={};
        lssdk.newAnimation.data.pfx=[];
        lssdk.newAnimation.init=function(imgId,minSize,maxSize,other) {
            if ((typeof(imgId)!=='undefined') && (typeof(minSize)!=='undefined') && (typeof(maxSize)!=='undefined') && (typeof(other)!=='undefined')) {
                lssdk.newAnimation.data.img=document.getElementById(imgId);
                lssdk.newAnimation.data.pfx = ["webkit", "moz", "MS", "o", ""];
                lssdk.newAnimation.data.hovered = false;
                lssdk.newAnimation.prefixedEvent=function(element, type, callback) {
                    if ((typeof(element) !== 'undefined') && (typeof(type) !== 'undefined') && (typeof(callback) !== 'undefined')) {
                        for (var p = 0; p < lssdk.newAnimation.data.pfx.length; p++) {
                            if (!lssdk.newAnimation.data.pfx[p]) type = type.toLowerCase();
                            element.addEventListener(lssdk.newAnimation.data.pfx[p]+type, callback, false);
                        }
                    }
                }
                lssdk.newAnimation.prefixedEvent(lssdk.newAnimation.data.img, "AnimationIteration", lssdk.newAnimation.addAnimListener);
                lssdk.newAnimation.data.img.onmouseover = function() {
                    hovered = true;
                    lssdk.newAnimation.data.img.classList.remove('animated'); 
                    lssdk.newAnimation.data.img.style.webkitTransform = 'scale(' + maxSize + ')';
                    lssdk.newAnimation.data.img.style.MozTransform = 'scale(' + maxSize + ')';
                    lssdk.newAnimation.data.img.style.msTransform = 'scale(' + maxSize + ')';
                    lssdk.newAnimation.data.img.style.OTransform = 'scale(' + maxSize + ')';
                    lssdk.newAnimation.data.img.style.transform = 'scale(' + maxSize + ')';
                }
                lssdk.newAnimation.data.img.onmouseout = function() {
                  setTimeout(function() { hovered = false; }, 500);
                  lssdk.newAnimation.prefixedEvent(lssdk.newAnimation.data.img, "TransitionEnd", lssdk.newAnimation.addTransListener);
                  lssdk.newAnimation.data.img.style.webkitTransform = 'scale(' + minSize + ')';
                  lssdk.newAnimation.data.img.style.MozTransform = 'scale(' + minSize + ')';
                  lssdk.newAnimation.data.img.style.msTransform = 'scale(' + minSize + ')';
                  lssdk.newAnimation.data.img.style.OTransform = 'scale(' + minSize + ')';
                  lssdk.newAnimation.data.img.style.transform = 'scale(' + minSize + ')';  
                }
            }
        };
        //example: lssdk.newAnimation.init('menuImg',1,5,null);
        // -> where menuImg is the ID, 1 is minimumSize, 5 is max Size and
        //null is a not yet implemented param
        lssdk.h.newAnimation="WIP. Adds animation to the specified object of the page via it's id attibute. Required params are lssdk.newAnimation.init(imgId,minSize,maxSize,other) - minSize is just the original or non-hover size, maxSize is the size to animate to, other is not yet implemented and should be set to null. ex: lssdk.newAnimation.init('menuImg',1,5,null);.\nThis will work on anything with an ID, not just images.";
        lssdk.images={};
        lssdk.images.list=[];
        lssdk.images.listAll=[];
        // Creates a list of all images that are of class 'confluence-embedded-image'
        lssdk.images.init=function() {
            lssdk.images.list=document.getElementsByClassName('confluence-embedded-image');
        };
        // Creates a list of all images
        lssdk.images.initAll=function() {
            lssdk.images.listAll=document.getElementsByTagName('img');
        };
        // Auto names all images on a page that are of class 'confluence-embedded-image'
        lssdk.images.nameAll=function() {
            lssdk.images.init();
            var q=lssdk.images.list.length;
            if ((typeof(q) !== 'undefined') && (q > 0)) {
                for (i = 0; i <= q-1; i++) {
                    lssdk.images.list[i].id="autoImage" + i.toString();
                }
                console.log(lssdk.images.list);
            } else {
                console.warn('Either there are no Confluence images on this page, or there was an unknown error.');
            }
        };
        // Auto renames every image on the page
        // Accepts an optional customizable prefix string
        lssdk.images.renameAll=function(prefix) {
            var imgName='';
            if((typeof(prefix) !=='undefined') && (prefix !=='')) {
                imgName=prefix;
            } else {
                imgName='autoImage';
            }
            lssdk.images.initAll();
            var p=lssdk.images.listAll.length;
            if ((typeof(p) !== 'undefined') && (p > 0)) {
                for (i = 0; i <= p-1; i++) {
                    lssdk.images.listAll[i].id=imgName + i;
                }
                console.log(lssdk.images.listAll);
            } else {
                console.warn('Either there are no \'img\' tags on this page, or there was an unknown error');
            }
        };
        lssdk.h.images="Various tools for prepping images for manipulation.\n\nlssdk.images.nameAll() gives an id attribute to all images added via the page editor with a class of 'confluence-embedded-image'.\n\nlssdk.images.renameAll(prefix); renames every image on the page using the specified prefix string, if supplied.";
        lssdk.h.images.nameAll=lssdk.h.images;
        lssdk.h.images.renameAll=lssdk.h.images;
        
        lssdk.changeIconTitle = function(current,next,which) {
            var currentTitle,newTitle,allIcons,whichIndex;
            if ((typeof(current) !== 'undefined') && (current !== "")) {
                currentTitle = current;
            } else {
                console.warn("Error! Missing reguired parameter in changeIconTitle: CurrentTitle");
                return false;
            }
            if ((typeof(next) !== 'undefined') && (next !== "")) {
                newTitle = next;
            } else {
                console.warn("Error! Missing reguired parameter in changeIconTitle: newTitle");
                return false;
            }
             if ((typeof(which) !== 'undefined') && (which !== "")) {
                whichIndex = which;
            }
            allIcons = document.getElementsByClassName("fonticon");
            if (typeof(allIcons.length !== 'undefined')) {
                if (whichIndex) {
                    allIcons[whichIndex].title = newTitle;
                } else {
                    for (i = 0; i < allIcons.length; i++) {
                        if (allIcons[i].title.toLowerCase() == currentTitle) {
                            allIcons[i].title = newTitle;
                        }
                    }
                }
            }
        };
        lssdk.h.changeIconTitle = "Changes the hover 'title' of a fonticon element, e.g., 'Required' checkmarks in param tables. This can be run on all matching icons or a single icon specified by it's index.\nExample: lssdk.changeIconTitle('required','Supported',1);";
        
        // Fix for SEO macro related content displaying HTML Entities.
        lssdk.seo={};
        lssdk.seo.original=[];
        lssdk.seo.fix=function() {
            setTimeout(function() {
                lssdk.seo.original=document.getElementsByClassName('st-ui-type-detail');    
                if ((typeof(lssdk.seo.original.length) !=='undefined') && (lssdk.seo.original.length > 0)) {
                    for (i = 0; i <= lssdk.seo.original.length-1; i++) {
                        var u=lssdk.seo.original[i].innerHTML;
                        if (u.indexOf("&amp;amp;apos;") > -1) {
                            var n=lssdk.seo.original[i].innerHTML.replace(/&amp;amp;apos;/gi, "\'");
                            lssdk.seo.original[i].innerHTML=n;
                            lssdk.seo.original[i].innerText=n; 
                        }
                        if (u.indexOf("&amp;apos;") > -1) {
                            var m=lssdk.seo.original[i].innerHTML.replace(/&amp;apos;/gi, "\'");
                            lssdk.seo.original[i].innerHTML=m;
                            lssdk.seo.original[i].innerText=m;
                        }
                        console.log("seo.fix done: ", i);
                    }
                }
            }, 1000);
        };
        lssdk.h.seo="Fixes issues with confluence printing HTML entities for apostrophes in SEO macros from other pages. Takes no parameters, ex: lssdk.seo.fix();."
        lssdk.h.seo.fix = lssdk.h.seo;
        
        // CSS HELPERS
        lssdk.css={};
        lssdk.css.grab={};
        //GRAB
        lssdk.css.grab.array=[];
        lssdk.css.grab.obj={};
        //lssdk.css.objs={};
        lssdk.css.grab=function(className,position) {
            var a=[];
            var b={};
            if(typeof(className)!=='undefined') {
                a=document.getElementsByClassName(className);
            } else {
                console.warn("lssdk.css.grab requires a className and a position value (where position is the location of the item to grab within the array); e.g., lssdk.css.grab(class,num);.");
            }
            if (typeof(position) !=='undefined') {
                b=a[position];
            } else {
                b=a[0];
            }
            lssdk.css.grab.array=a;
            lssdk.css.grab.obj=b;
        };
        //hide
        lssdk.css.hide={};
        lssdk.css.hide=function(trigger,triggered) {
            if ((typeof(trigger) !=='undefined') && (typeof(triggered) !=='undefined')) {
                var c;
                var d=triggered;
                if (trigger!=="") {
                    a=trigger.toString();
                    c=document.getElementById(a);
                } else {
                    console.warn("trigger can not be an empty string");
                }
                d=triggered;
                c.addEventListener("hover", function() {
                    d.style.display="none";
                });
                c.addEventListener("mouseout", function() {
                    d.style.vdisplay="block";
                });
        
            } else {
                console.warn("lssdk.css.hide requires both a trigger object and a triggered object; e.g., lssdk.css.hide(trigger,triggered);.");
            }
        };
        lssdk.css.random={};
        lssdk.css.fadeOut=function(obj) {
            if (obj.style.opacity > 0) {
                obj.style.opacity = (obj.style.opacity - 0.01);
                setTimeout( function() {
                    lssdk.css.fadeOut(obj);
                }, 2 );
            } else { 
            }
        };
        lssdk.css.fadeIn=function(obj) {
            if (obj.style.opacity < 1) {
                obj.style.opacity = (parseFloat(obj.style.opacity) + 0.01);
                setTimeout( function() {
                    lssdk.css.fadeIn(obj);
                }, 2 );
            } else { 
            }
        };
        lssdk.css.fadeRightMenu=function(trigger) {
            var a,b,c,d,e,f,g,h;
            lssdk.css.grab('right-sidebar',0);
            if ((typeof(trigger) !== 'undefined') && (trigger !== '')) {
                a=trigger;
                console.log('>>> lssdk.css.fadeRightMenu set trigger on elementId: ' + a);
                b=document.getElementById(a);
                c={};
                c=lssdk.css.grab.obj;
                lssdk.css.random=c;
                c.style.opacity = 1;
                d=function() {
                    b.addEventListener("mouseover", function() {
                        lssdk.css.fadeOut(lssdk.css.random);
                    });
                    b.addEventListener("mouseout", function() {
                        lssdk.css.fadeIn(lssdk.css.random);
                    });
                };
                lssdk.css.ifThisThanThatDo(null,'lessthan',1280,d);
            } else {
                console.warn("lssdk.css.fadeRightMenu(triggerElementId) requires a trigger element!\nNo changes were made.");
            }
        };
        lssdk.css.ifThisThanThatDo=function(sizea,dir,sizeb,callback) {
            var setSizea;
            var setSizeb;
            var s;
            var n;
            var m;
            var o;
            var l=window.innerWidth;
            if ((typeof(sizea) !=='undefined') && ((sizea !==''))) {
                setSizea=sizea;
            } else {
                setSizea=null;
            }
            if (setSizea !==null) {
                n=setSizea;
                o=n;
            } else { // assume that we are checking against confluence window size
                n=l-300; // average width of left menu, when open
                m=n/10;  // 100% of remaining width
                o=m*8;   // 80% (content width -right-hand menu (20%))
            }
            if ((typeof(dir) !=='undefined') && (typeof(sizeb) !=='undefined') && (typeof(callback) !=='undefined')) {
                setSizeb=sizeb;
                if (dir=='lessthan') {
                    s=0;
                } else if (dir=='greaterthan') {
                    s=1;
                } else {
                    console.log("Invalid value passed for dir parameter. Must be either 'lessthan' or 'greaterthan'");
                    return false;
                }
                if (s===0) {
                   if (o<setSizeb) {
                        callback();
                   }
                } else if (s===1) {
                    if (o>setSizeb) {
                        callback();
                    }
                }  
            } else {
                console.warn("lssdk.css.ifThisThanThatDo requires a dir param (direction options are 'greaterthan' or 'lessthan') a size param (pixels) and a callback param, ex: lssdk.css.doOnSize(dir,int,callback);.");
            }  
        };
        //configureDomElements
        lssdk.css.configureDomElements={};
        lssdk.css.domArrays={};
        lssdk.css.domArrays.lastRun=[];
        //type = tagName / className / id
        //name = name of element 
        //newId = new prefix for all element id's - must be a string or null 
        //rename = boolean, if set to false or undefined, no changes will be made to id's.
        lssdk.css.configureDomElements=function(type,name,newId,rename) {
            var a, b, c, d, e, f, g, w, x, y, z;
            if ((typeof(name) !=='undefined') && (name !=='')) {
                a=name;
            } else {
                console.warn("Missing required parameter for lssdk.css.configureDomElements(type,name,newId,rename).");
                throw new Error("Missing Parameter(s).");
            }
            if ((typeof(newId) !=='undefined') && (newId !=='') && (newId !==null)) {
                b=newId.toString();
            } else {
                b=a+'_pulled';
            }
            if ((typeof(rename) !=='undefined') && (rename !=='')) {
                if (rename===false) {
                    g=false;
                } else if (rename===true) {
                    g=true;
                } else {
                    console.log("Unknown variable for rename, boolean required.");
                }
            }
            if ((typeof(type) !=='undefined') && (type !=='')) {
                d=type;
                if (d == 'id') {
                    e=document.getElementById(a);
                } else if (d == 'className') {
                    e=document.getElementsByClassName(a);
                } else if (d == 'tagName') {
                    e=document.getElementsByTagName(a);
                } else {
                    console.log("Missing required parameter for lssdk.css.configureDomElements - 'type' (id/className/tagName).");
                }
                lssdk.css.domArrays.lastRun=e;
            }
            x=lssdk.css.domArrays;
            if (d==='id') {
                x[b]=e;
                if (g===true) {
                    f=x[b];
                    f.id=b;
                }
            } else {
                if((e.length > 0)) {
                    x[b]=e;
                    if (g===true) {
                        f=x[b];
                        for (i = 0; i <= e.length-1; i++) {
                            f[i].id=b + '_' + i.toString();
                        }
                    }
                } else {
                    console.warn("lssdk.css.configureDomElements found nothing with that name.");
                }
            }
        };
        lssdk.css.clearRightMenu = function(bord) {
            var border,
            changeToc = document.getElementsByClassName('toc-right')[0];
            if ((typeof(bord) !== 'undefined') && (typeof(bord) == 'boolean')) {
                border = bord;
            } else {
                border = false;
            }
            if (changeToc) {
                changeToc.style.backgroundColor="transparent";
            }
            if (border == true) {
                changeToc.style.borderLeftColor="transparent";
            }
        };
        lssdk.createSearchButton = function(type,label,id) {
            var a,b,c,d,e;
            if ((typeof(type) !== null) && (type !== '')) {
                a = type;
            } else {
                console.log("WARNING! lssdk.createElement requires an element 'type'. Method failed.");
            }
            if ((typeof(label) !== null) && (label !== '')) {
                b = label;
            }
            c = document.getElementsByTagName('body')[0];
            d = document.createElement(a);
            if ((typeof(id) !==null) && (id !== '') && (id !== 'undefined')) {
                d.id=id;
            }
            d.setAttribute("style", "font-family: wiki; text-align: center; margin: 0px auto; margin-left: 10vw; width: 13vw; height:10px; font-size: 10px !important; text-decoration: none; position: fixed; z-index:9999999999; color: #ffffff; top: 28px; background-color: #2c4b85; cursor: pointer; border: 0px;");
            if (b) {
                d.innerHTML = b;
            }
            c.appendChild(d);
        };
        lssdk.h.createSearchButton = "Creates a button in the top wiki header for doing a direct google search. Use: lssdk.createSearchButton(type,label,id); where 'type' must be 'button', i.e.,\n>lssdk.createSearchButton('button','Search developers.gigya.com on Google','clickToSearchGoogle');.";
        lssdk.getNewSearch = function() {
            lssdk.startSearch = new Promise(function(resolve,reject){
            var validTerm = prompt("Please enter a search term:");
            if(validTerm) {
                resolve(validTerm);
                } else {
                    reject('failed');
                }
            });  
            lssdk.startSearch.then(function(fromResolve) {
                var term = fromResolve;
                console.log("Search term: " + term); //do something passed
                var baseURI = "https://google.com/search?q=site%3Adevelopers.gigya.com+";
                var fullSearch = baseURI + term + "&oq=site%3Adevelopers.gigya.com+" + term;
                window.open(fullSearch, null, "width=1000, height=600");
            }).catch(function(fromReject){
                console.log("getNewSearch " + fromReject); // do something failed
            });
        };
        lssdk.h.getNewSearch = "Attaches the search function to a button created above using createSearchButton.";
        lssdk.forceFixAnchors = function() { //(linkId) {
            var bbb = [];
            var aaa = [];
            if (document.getElementsByTagName('a').length > 0) {
                lssdk.css.configureDomElements('tagName','a','anchor',true);
                aaa = lssdk.css.domArrays.lastRun;
                for (var i = 0; i < aaa.length; i++) {
                    var fullHref = document.getElementById(aaa[i].id);
                    if ((/%20#/).test(fullHref.href) === true) {
                        var newHref = fullHref.href.replace(/%20#/, "#");
                        console.log('  LSSDK repaired uri: ' + fullHref.href);
                        bbb.push(newHref);
                        fullHref.href = newHref;
                    }
                    if ((/%2#/).test(fullHref) === true) {
                        var newHref = fullHref.href.replace(/%2#/, "#");
                        console.log('  LSSDK repaired uri: ' + fullHref);
                        bbb.push(newHref);
                        fullHref.href = newHref;
                    }
                    if ((/\s#/).test(fullHref.href) === true) {
                        var newHref = fullHref.href.replace(/\s#/, "#");
                        console.log('  LSSDK repaired uri: ' + fullHref.href);
                        bbb.push(newHref);
                        fullHref.href = newHref;
                    }
                }
                console.log(bbb)
            }
        };
        lssdk.fixAnchors=function(searchTerm) {
            console.log('lssdk.fixAnchors started...');
            var a,b,c,d,e,f,g,h,z;
            if (document.getElementsByTagName('a').length > 0) { // ***
                a=[];
                setTimeout(function(){ lssdk.forceFixAnchors(); }, 2000);
                if ((typeof(searchTerm) !== 'undefined') && (searchTerm !== '')) {
                    b=searchTerm;
                    lssdk.css.configureDomElements('tagName','a','anchor',true);
                    c=lssdk.css.domArrays.lastRun;
                    for (i = 0; i <= c.length-1; i++) {
                        d=c[i];
                        e=d.href;
                        if (e.indexOf(b) > -1) {
                            a.push(d);
                        }
                        for (y = 0; y <= a.length-1; y++) {
                            f=a[y].href;
                            if (f.indexOf('%20#') > -1) {
                                g=f.replace("%20","");
                                a[y].href=g;
                            }
                            return g;
                        }
                    }
                } else {
                    lssdk.css.configureDomElements('tagName','a','anchorB',true);
                    b=[];
                    c=lssdk.css.domArrays.lastRun;
                    for (i = 0; i <= c.length-1; i++) {
                        d=c[i];
                        e=d.pathname;
                        h=d.origin;
                        if (e.indexOf('image/svg+xml') === -1) {
                            if (e.indexOf('%20') > -1) {
                                a.push(d);
                                g=e.replace(/[%20]$/, '');
                                c[i].href=d.href.replace(e,g);
                                console.log('  LSSDK repaired uri: ' + c[i].href)
                                b.push(g);
                            }
                            if (c[i].href.indexOf('%20') > -1) {
                                z = c[i].href;
                                a.push(z);
                                z=z.replace(/[%20]$/, '');
                                c[i].href=d.href.replace(e,g);
                                console.log('  LSSDK repaired uri: ' + c[i].href)
                                b.push(g);
                            }
                            if (e.indexOf(' ') > -1) {
                                a.push(d);
                                g=e.replace(/[\s]$/, '');
                                c[i].href=d.href.replace(e,g);
                                console.log('  LSSDK repaired uri: ' + c[i].href)
                                b.push(g);
                            }
                            if ((h) && (h.indexOf('%20') > -1)) {
                                a.push(d);
                                g=h.replace(/%20+$/, '');
                                c[i].href=d.href.replace(h,g);
                                console.log('  LSSDK repaired uri: ' + c[i].href)
                                b.push(g);
                            }
                            var fullHref = c[i].href;
                            if ((/%20#/).test(fullHref) === true) {
                                var newHref = fullHref.replace(/%20#/, "#");
                                console.log('  LSSDK repaired uri: ' + fullHref);
                                b.push(newHref);
                                c[i].href = newHref;
                            }
                            if ((/\s#/).test(fullHref) === true) {
                                var newHref = fullHref.replace(/\s#/, "#");
                                console.log('  LSSDK repaired uri: ' + fullHref);
                                b.push(newHref);
                                c[i].href = newHref;
                            }
                            //check for platform.gigya.com links
                            if ((h) && (h.indexOf('platform.gigya') > -1)) {
                                console.warn("LINK REQUIRES ATTENTION:\n" + d);
                                d.style.color='red';
                            }
                        } // end of non-svg
                    }
                    return b;
                }
            } else {
                console.log("lssdk.fixAnchors found no links on this page.");
                lssdk.killFixExternalAnchors();
            }
        };

        // FORCE FIX ANCHORS

        

        lssdk.fixAnchors2=function(searchTerm) {
            console.log('lssdk.fixAnchors2 started...');
            var a,b,c,d,e,f,g,h,z;
            if (document.getElementsByTagName('a').length > 0) { // ***
                a=[];
                if ((typeof(searchTerm) !== 'undefined') && (searchTerm !== '')) {
                    b=searchTerm;
                    lssdk.css.configureDomElements('tagName','a','anchor',true);
                    c=lssdk.css.domArrays.lastRun;
                    for (i = 0; i <= c.length-1; i++) {
                        d=c[i];
                        e=d.href;
                        if (e.indexOf(b) > -1) {
                            a.push(d);
                        }
                        for (y = 0; y <= a.length-1; y++) {
                            f=a[y].href;
                            if (f.indexOf('%20#') > -1) {
                                g=f.replace("%20","");
                                a[y].href=g;
                            }
                            return g;
                        }
                    }
                } else {
                    lssdk.css.configureDomElements('tagName','a','anchorB',true);
                    b=[];
                    c=lssdk.css.domArrays.lastRun;
                    for (i = 0; i <= c.length-1; i++) {
                        d=c[i];
                        e=d.pathname;
                        h=d.origin;
                        if (e.indexOf('image/svg+xml') === -1) {
                            if (e.indexOf('%20') > -1) {
                                a.push(d);
                                g=e.replace(/[%20]$/, '');
                                c[i].href=d.href.replace(e,g);
                                console.log('  LSSDK repaired uri: ' + c[i].href)
                                b.push(g);
                            }
                            if (c[i].href.indexOf('%20') > -1) {
                                z = c[i].href;
                                a.push(z);
                                z=z.replace(/[%20]$/, '');
                                c[i].href=d.href.replace(e,g);
                                console.log('  LSSDK repaired uri: ' + c[i].href)
                                b.push(g);
                            }
                            if (e.indexOf(' ') > -1) {
                                a.push(d);
                                g=e.replace(/[\s]$/, '');
                                c[i].href=d.href.replace(e,g);
                                console.log('  LSSDK repaired uri: ' + c[i].href)
                                b.push(g);
                            }
                            if ((h) && (h.indexOf('%20') > -1)) {
                                a.push(d);
                                g=h.replace(/%20+$/, '');
                                c[i].href=d.href.replace(h,g);
                                console.log('  LSSDK repaired uri: ' + c[i].href);
                                b.push(g);
                            }
                            var fullHref = c[i].href;
                            if ((/%20#/).test(fullHref) === true) {
                                var newHref = fullHref.replace(/%20#/, "#");
                                console.log('  LSSDK repaired uri: ' + fullHref);
                                b.push(newHref);
                            }
                            //check for platform.gigya.com links
                            if ((h) && (h.indexOf('platform.gigya') > -1)) {
                                console.warn("LINK REQUIRES ATTENTION:\n" + d);
                                d.style.color='red';
                            }
                        } // end of non-svg
                    }
                    return b;
                }
            } else {
                console.log("lssdk.fixAnchors found no links on this page.");
                lssdk.killFixExternalAnchors();
                lssdk.forceFixAnchors();
            }
        };

        // END FORCE FIX ANCHORS

        // add support for OIDC/getJWT id_tokens
        lssdk.createIdTokenLink = function(token,key) {
            var idToken,pubKey,fullUrl;
            var baseUrl = "https://op-demo-gigya.herokuapp.com/bin/oidc_rp/success.php#id_token=";
            if ((typeof(token) !== 'undefined') && (token !== null) && (token !== "")) {
                idToken = token;
            } else {
                console.warn("Error! createIdTokenLink failed with 'missing required property' errorCode: 10001.");
            }
            if ((typeof(key) === 'object') && (key !== null)) {
                pubKey = key;
            } else {
                console.warn("Error! createIdTokenLink failed with 'missing required property' errorCode: 10002.");
            }
            if ((idToken) && (pubKey)) {
                fullUrl = baseUrl + idToken + '.' + encodeURIComponent(JSON.stringify(pubKey));
                console.log("Changing URL Now!", fullUrl)
                window.location.href=fullUrl;
            }
        };
        lssdk.addTerminalMarkers = function() {
            lssdk.allLinesArray = document.getElementsByClassName('line');
            for (i = 0; i < lssdk.allLinesArray.length; i++) {
                var check = lssdk.allLinesArray[i].innerText;
                if (/^\s+/g.test(check) !== true) {
                    if (/^[a-zA-Z]+/gi.test(check) === true) {
                        console.log("lssdk.addTerminalMarkers edited code line #: ",i);
                        var a = document.createElement('span');
                        a.setAttribute('style', 'font-family: wiki; font-size: 80%; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;');
                        a.innerHTML = '&#xe803&nbsp;';
                        lssdk.allLinesArray[i].prepend(a);
                    }
                }
            }
        };
        lssdk.h.addTerminalMarkers = "Adds terminal style line beginings to code blocks, to simulate a terminal.";
        lssdk.h.fixAnchors="Requires a search term for single repairs - i.e., lssdk.fixAnchors('searchTerm').\nSearches all <a> tags of the page and removes '%20' from the end of a any pathnames, e.g., '.html%20#someString' becomes '.html#somestring' if the search term is found within the anchor's URL href.\nAlso returns the new value if used within a var, e.g., var newVar=lssdk.fixAnchors('searchTerm');.\nMust be used inside an interval or it runs prior to confluence ruining the links.\nIf no searchTerm is supplied, it will check all links and remove all instances of '%20' or '%20/' that occur at the end of all pathnames and returns an array.\nAs of v.0011.4 this is hardcoded to run automatically on any page that includes the lssdk.js file.";
        
        // HELP
        lssdk.h.css="These tools make css manipulation a little easier.\n\ncss.grab - Grabs the specified object of the specified class in order to add additional modifications to the object. lssdk.css.grab requires a className and a position value (where position is the position of the item in the class array to grab) and places it in lssdk.css.grab.obj; e.g., lssdk.css.grab(className,position);.\n\ncss.hide (not working!) - adds a trigger to an object to enable a css change on a triggered object. ex: lssdk.css.hide(trigger,lssdk.css.grab.obj);.\n\ncss.ifThisThanThatDo - compares A to B and then does C - requires a siza param (a integer or function) a dir param (dir options are 'greaterthan' or 'lessthan') a sizeb param (int or function) and a callback param, ex: lssdk.css.ifThisThanThatDo(null,lessthan,int,callback);. If no sizea is supplied, it will assume the width of the browser window (after calculating for left/right hand menus).\n\ncss.configureDomElements - searches the page for the specified element(s) and adds them to an array. Required params are type (id/className/tagName) and name of the dom element. \nAlso accepts two optional parameters: a string to use as a prefix for the returned elements (as well as the name of the container within lssdk.css.domArrays) and a boolean if you wish to rename the id's of all found elements with the previous custom prefix.\nEx: lssdk.css.configureDomElements('className','container','newPrefix',true). These elements, when returned, are stored in lssdk.css.domArrays. Note: If you use null as the prefix and true as the boolean, the objects will be renamed using an auto-generated id.\nThe array last run can be found in lssdk.css.domArrays.lastRun.\n\nlssdk.css.fadeRightMenu - requires a triggerElementId and causes the right-hand menu to fade in/out over 200ms whenever the there is a mouseover of the trigger element. Ex: lssdk.css.fadeRightMenu('myTriggerElement').";
        lssdk.h.css.configureDomElements = "css.configureDomElements - searches the page for the specified element(s) and adds them to an array. Required params are type (id/className/tagName) and name of the dom element. \nAlso accepts two optional parameters: a string to use as a prefix for the returned elements (as well as the name of the container within lssdk.css.domArrays) and a boolean if you wish to rename the id's of all found elements with the previous custom prefix.\nEx: lssdk.css.configureDomElements('className','container','newPrefix',true). These elements, when returned, are stored in lssdk.css.domArrays. Note: If you use null as the prefix and true as the boolean, the objects will be renamed using an auto-generated id.\nThe array last run can be found in lssdk.css.domArrays.lastRun.";
        lssdk.h.css.grab=lssdk.h.css;
        lssdk.h.css.hide=lssdk.h.css;
        lssdk.h.css.ifThisThanThatDo=lssdk.h.css;
        lssdk.h.css.fadeRightMenu = "lssdk.css.fadeRightMenu requires a triggerElementId and causes the right-hand menu to fade in/out over 200ms whenever the there is a mouseover of the trigger element. Ex: lssdk.css.fadeRightMenu('myTriggerElement').";
        
        // Here we are adding a google search button for users logged in as tech-writers
        lssdk.tools = lssdk.tools || {};
        lssdk.tools.addSearchCallback = function() {
            if (document.getElementById('clickToSearchGoogle')) {
                document.getElementById('clickToSearchGoogle').addEventListener("click", function() {
                    lssdk.getNewSearch();
                });
            } else {
                console.log("clickToSearchGoogle not found. Search button not added.");
            }
        };
        lssdk.tools.addSearch = function() {
            lssdk.createSearchButton('button','Search developers.gigya.com on Google','clickToSearchGoogle');
            lssdk.tools.addSearchCallback();
        };
        if ((typeof(userGroups) !== 'undefined') && (userGroups.indexOf('tech-writers(editors)') > -1)) {
            lssdk.tools.addSearch();
        }
        var lssdkToolsUserNamesList = [
            "shirly.leibovich"
        ];
        lssdk.tools.addSearchForUsers = function(listOfNames) {
            setTimeout(function(){
                if ((typeof(AJS) !== 'undefined') && (typeof(AJS.params) !== 'undefined')) {
                    for (var i = 0; i < listOfNames.length; i++) {
                        if (AJS.params.remoteUser == listOfNames[i]) {
                            lssdk.tools.addSearch();
                        }
                    }
                }
             }, 3000);
        }
        lssdk.tools.addSearchForUsers(lssdkToolsUserNamesList);
        lssdk.h.addSearch = "lssdk.tools.addSearch() adds a link to the top navigation bar that allows searching the Developer's site via Google.\n";
        lssdk.tools.createTextarea = function(id,data) {
            var myParent, myChild;
            if ((typeof(id) !=='undefined') && (id !== '') && (id !== null)) {
                myParent = document.getElementById(id);
            } else {
                myParent = document.getElementsByTagName('body')[0];
            }
            myChild = document.createElement('textarea');
            myChild.id = "gai_response_" + Date.now().toString();
            myChild.setAttribute("style", "width: 100%; max-width: 100%; padding: 5px 20px; height: 300px; background-color:#152a40; color:#28c9ff; border-radius:7px; margin-bottom: 15px; font-size: 1.7vh;");
            //myChild.setAttribute("autocomplete", "off");
            //myChild.setAttribute("autocorrect", "off");
            //myChild.setAttribute("autocapitalize", "off");
            myChild.setAttribute("spellcheck", "false");
            myChild.setAttribute("readonly", "readonly");
            if ((typeof(data) !== 'undefined') && (typeof(data) === 'object')) {
                myChild.innerHTML = js_beautify(JSON.stringify(data));
            } else if ((typeof(data) !== 'undefined') && (typeof(data) !== 'object') && (data !== '')) {
                myChild.innerHTML = data;
            } else {
                console.warn("lssdk.tools.createTextarea failed! Missing required param 'data'.");
                return false;
            }
            myParent.appendChild(myChild);
        };
        lssdk.tools.renamePage = function(parentChild,url) {
            // str(parentChild) - is this the original page (parent) or the new page(child)
            // str(url) - the full URL of the page in confluence, i.e., "https://developers.gigya.com/display/GD/Security+Guidelines"
            var firstHash,
                secondHash,
                fixedHash,
                oldPageUrl, //="https://developers.gigya.com/display/GD/Security+Guidelines",
                newPageUrl, //="https://developers.gigya.com/display/GD/Security+Best+Practices";
                oldPageName,
                newPageName,
                newFullPageUrl,
                thirdHash;
                var getPageName = function(str) {
                    if (str.indexOf("/GD/") > -1) {
                        var pathname = str.split("/GD/")[1];
                        if (pathname.indexOf('#') > -1) {
                            return pathname.split('#')[0]
                        } else {
                            return pathname;
                        }
                    } else {
                        console.warn("lssdk.tools.renamePage failed - Only works on GD namespace!");
                    }
                };
                if ((typeof(parentChild) !== 'undefined') && (parentChild !== null)) {
                    if (parentChild.toLowerCase() === 'parent') {
                        if ((typeof(url) !== 'undefined') && (url !== null)) {
                            // parse url for transport
                            oldPageUrl = url;
                            oldPageName = getPageName(oldPageUrl);
                            firstHash = window.location.hash;
                            sessionStorage.setItem("gigyaConfluenceOriginalName", oldPageName);
                            sessionStorage.setItem("gigyaConfluenceRedirectHash", firstHash);
                        } else {
                            console.warn("lssdk.tools.renamePage failed - missing required parameter - url!");
                        }
                    } else if (parentChild.toLowerCase() === 'child') {
                        if ((typeof (sessionStorage.gigyaConfluenceRedirectHash) === 'undefined') || (typeof (sessionStorage.gigyaConfluenceOriginalName) === 'undefined')) {
                            // Nothing needs to happen here; also forces the script to run only once and not keep continuously reloading
                            console.log("No hash received: ", sessionStorage.gigyaConfluenceRedirectHash);
                        } else {
                            //Everything needs to happen here
                            if ((typeof(url) !== 'undefined') && (url !== null)) {
                                newPageUrl = url;
                                newPageName = getPageName(newPageUrl);
                                sessionStorage.setItem("gigyaConfluenceNewName", newPageName);
                                //console.log("LOG>>>>>>>>>>>>> ", newPageName);
                            } else {
                                console.warn("lssdk.tools.renamePage failed - missing required parameter - url!");
                            }
                            console.log("Hash received: ", sessionStorage.gigyaConfluenceRedirectHash);
                            secondHash = sessionStorage.getItem('gigyaConfluenceRedirectHash');
                            sessionStorage.removeItem('gigyaConfluenceRedirectHash');
                            fixHash = function() {
                                var oldname, newname;
                                oldname = sessionStorage.getItem('gigyaConfluenceOriginalName').replace(/[+]/g,'');
                                //console.log("LOG>>>>>>>>>>>>>oldname ", oldname);
                                newname = sessionStorage.getItem('gigyaConfluenceNewName').replace(/[+]/g,'');
                                //console.log("LOG>>>>>>>>>>>>>newname ", newname);
                                //console.log("LOG>>>>>>>>>>>>>secondHash ", secondHash);
                                if (!!secondHash) {
                                    //console.log("LOG>>>>>>>>>>>>>thirdhash ", thirdHash);
                                    thirdHash = secondHash.replace(oldname, newname);
                                    newFullPageUrl= newPageUrl + thirdHash;
                                    //console.log('redirectUrl = ' + newFullPageUrl);
                                    window.location=newFullPageUrl;
                                    //location.reload(false);
                                }
                                sessionStorage.removeItem('gigyaConfluenceNewName');
                                sessionStorage.removeItem('gigyaConfluenceOriginalName');
                            };
                            fixHash();
                        }
                        
                    } else {
                        console.warn("WARNING! lssdk.tools.renamePage failed; missing required parameter 'parentChild.'");
                    }
                }
        };
        //lssdk.renamePage = lssdk.tools.renamePage;
        lssdk.h.renamePage = "Use to maintain deep-links on pages that have had their name changes - lssdk.tools.renamePage(str(parentChild),str(url);) where parentChild is either 'parent' or 'child' depending on whether it is the original page (parent) or the new page with a new name (child); url is the url of the PAGE YOU ARE PLACING THE CODE, so on the parent page it will be the parent page url and the child will be the child page url. It *is* possible to have multiple different parents all pointing to a single child.";
        
        // LSSDK Helper 
        lssdk.help=function(option) {
            if ((typeof(option) !=='undefined') && (option !=="")) {
                var t=lssdk.h[option];
                if (t) {
                    console.log(t);
                } else {
                    console.log('There is no help file associated with that method.\nDetailed documentation for some of the tools available in the LSSDK (a confluence helper) can be found at\nhttps://developers.gigya.com/display/GD/Confluence+Tips+and+Standardization+Internal#ConfluenceTipsandStandardizationInternal-LSSDK.\nView simple help for all current methods by entering lssdk.help.showAll();.\n');
                }
            } else {
                console.warn(lssdk.ver + 'Detailed documentation for some of the tools available in the LSSDK (a confluence helper) can be found at\nhttps://developers.gigya.com/display/GD/Confluence+Tips+and+Standardization+Internal#ConfluenceTipsandStandardizationInternal-LSSDK.\nView simple help for all current methods by entering lssdk.help.showAll();.\nBe sure to read the changelog at the head of the SDK for undocumented updates/parameters to existing functions.\nThe latest version is available at [removed]\n');
            }
        };
        lssdk.help.showAll=function() {
            var obj=lssdk.h;
            var result = "\nPrinting the LSSDK help file (version v" + lssdk.v + "):\n\n";
            for (var p in obj) {
                if(obj.hasOwnProperty(p)) {
                result += p + " : " + obj[p] + "\n\n";
                } 
            }              
            return result;
        };
        
        $(document).ready(function() {
            //Check for deprecated terminology
            /*
            AJS.toInit(function(){
                if (!AJS.params.remoteUser == "") {
                    if (userGroups.indexOf("tech-writers") > -1) {
                        console.log("Current user is a tech-writer.");
                        var a = document.getElementById('content').innerHTML;
                        if ((a.indexOf("gigya.services") > -1) || (a.indexOf("services.") > -1)) {
                            console.log("found flagged content: gigya.services");
                            alert("Remove reference to gigya.services from this page!")
                        }
                    }  
                }
            });
            */
        });
        lssdk.fixExternalAnchors=null;
        lssdk.killFixExternalAnchors=function() {
            clearInterval(lssdk.fixExternalAnchors);
        }
        lssdk.fixExternalAnchors = setInterval(function(){ 
            lssdk.fixAnchors(); // This is the fix
            if (lssdk.css.domArrays.lastRun.length > 0) {
                lssdk.killFixExternalAnchors(); // This turns off the interval so it doesn't continue to run in the background.
                console.log("lssdk.fixAnchors complete.");
            }
        },
        500
        );
        lssdk.help();
        lssdk.isLoaded = true;
        setTimeout(function(){
            //console.log("$#$#$#$#$#$#$#$#$#", lssdkOnReady);
            if (typeof(lssdkOnReady) !== 'undefined') {
                lssdk.onReady = lssdkOnReady;
            }
            if (lssdk.onReady) {
                lssdk.onReady();
                console.log("lssdk.onReady fired.");
            }
        }, 2000);
        
        } else {
            lssdk.error("LSSDK requires JQuery!");
        }
        // &&&&&&&&&&&&&&&&&&&
    }
    lssdk.loadLssdk();
} // end loadLssdk
/* *** END OF LSSDK *** */
