ace.define("ace/snippets",["require","exports","module","ace/lib/oop","ace/lib/event_emitter","ace/lib/lang","ace/range","ace/anchor","ace/keyboard/hash_handler","ace/tokenizer","ace/lib/dom","ace/editor"],function(A,G,k){var b=A("./lib/oop"),x=A("./lib/event_emitter").EventEmitter,H=A("./lib/lang"),j=A("./range").Range,F=A("./anchor").Anchor,D=A("./keyboard/hash_handler").HashHandler,z=A("./tokenizer").Tokenizer,w=j.comparePoints,C=function(){this.snippetMap={},this.snippetNameMap={}};(function(){b.implement(this,x),this.getTokenizer=function(){function c(f,d,h){return f=f.substr(1),/^\d+$/.test(f)&&!h.inFormatString?[{tabstopId:parseInt(f,10)}]:[{text:f}]}function a(d){return"(?:[^\\\\"+d+"]|\\\\.)"}return C.$tokenizer=new z({start:[{regex:/:/,onMatch:function(f,d,h){return h.length&&h[0].expectIf?(h[0].expectIf=!1,h[0].elseBranch=h[0],[h[0]]):":"}},{regex:/\\./,onMatch:function(h,d,i){var f=h[1];return f=="}"&&i.length?h=f:"`$\\".indexOf(f)!=-1?h=f:i.inFormatString&&(f=="n"?h="\n":f=="t"?h="\n":"ulULE".indexOf(f)!=-1&&(h={changeCase:f,local:f>"a"})),[h]}},{regex:/}/,onMatch:function(f,d,h){return[h.length?h.shift():f]}},{regex:/\$(?:\d+|\w+)/,onMatch:c},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(e,h,f){var d=c(e.substr(1),h,f);return f.unshift(d[0]),d},next:"snippetVar"},{regex:/\n/,token:"newline",merge:!1}],snippetVar:[{regex:"\\|"+a("\\|")+"*\\|",onMatch:function(f,d,h){h[0].choices=f.slice(1,-1).split(",")},next:"start"},{regex:"/("+a("/")+"+)/(?:("+a("/")+"*)/)(\\w*):?",onMatch:function(h,d,i){var f=i[0];return f.fmtString=h,h=this.splitRegex.exec(h),f.guard=h[1],f.fmt=h[2],f.flag=h[3],""},next:"start"},{regex:"`"+a("`")+"*`",onMatch:function(f,d,h){return h[0].code=f.splice(1,-1),""},next:"start"},{regex:"\\?",onMatch:function(f,d,h){h[0]&&(h[0].expectIf=!0)},next:"start"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:"/("+a("/")+"+)/",token:"regex"},{regex:"",onMatch:function(f,d,h){h.inFormatString=!0},next:"start"}]}),C.prototype.getTokenizer=function(){return C.$tokenizer},C.$tokenizer},this.tokenizeTmSnippet=function(c,a){return this.getTokenizer().getLineTokens(c,a).tokens.map(function(d){return d.value||d})},this.$getDefaultValue=function(f,c){if(/^[A-Z]\d+$/.test(c)){var h=c.substr(1);return(this.variables[c[0]+"__"]||{})[h]}if(/^\d+$/.test(c)){return(this.variables.__||{})[c]}c=c.replace(/^TM_/,"");if(!f){return}var d=f.session;switch(c){case"CURRENT_WORD":var a=d.getWordRange();case"SELECTION":case"SELECTED_TEXT":return d.getTextRange(a);case"CURRENT_LINE":return d.getLine(f.getCursorPosition().row);case"PREV_LINE":return d.getLine(f.getCursorPosition().row-1);case"LINE_INDEX":return f.getCursorPosition().column;case"LINE_NUMBER":return f.getCursorPosition().row+1;case"SOFT_TABS":return d.getUseSoftTabs()?"YES":"NO";case"TAB_SIZE":return d.getTabSize();case"FILENAME":case"FILEPATH":return"";case"FULLNAME":return"Ace"}},this.variables={},this.getVariableValue=function(c,a){return this.variables.hasOwnProperty(a)?this.variables[a](c,a)||"":this.$getDefaultValue(c,a)||""},this.tmStrFormat=function(l,d,p){var h=d.flag||"",c=d.guard;c=new RegExp(c,h.replace(/[^gi]/,""));var f=this.tokenizeTmSnippet(d.fmt,"formatString"),m=this,a=l.replace(c,function(){m.variables.__=arguments;var I=m.resolveVariables(f,p),s="E";for(var v=0;v<I.length;v++){var o=I[v];if(typeof o=="object"){I[v]="";if(o.changeCase&&o.local){var n=I[v+1];n&&typeof n=="string"&&(o.changeCase=="u"?I[v]=n[0].toUpperCase():I[v]=n[0].toLowerCase(),I[v+1]=n.substr(1))}else{o.changeCase&&(s=o.changeCase)}}else{s=="U"?I[v]=o.toUpperCase():s=="L"&&(I[v]=o.toLowerCase())}}return I.join("")});return this.variables.__=null,a},this.resolveVariables=function(h,c){function l(e){var i=h.indexOf(e,f+1);i!=-1&&(f=i)}var m=[];for(var f=0;f<h.length;f++){var a=h[f];if(typeof a=="string"){m.push(a)}else{if(typeof a!="object"){continue}if(a.skip){l(a)}else{if(a.processed<f){continue}if(a.text){var d=this.getVariableValue(c,a.text);d&&a.fmtString&&(d=this.tmStrFormat(d,a)),a.processed=f,a.expectIf==null?d&&(m.push(d),l(a)):d?a.skip=a.elseBranch:l(a)}else{a.tabstopId!=null?m.push(a):a.changeCase!=null&&m.push(a)}}}}return m},this.insertSnippetForSelection=function(aa,O){function Z(f){var c=[];for(var l=0;l<f.length;l++){var d=f[l];if(typeof d=="object"){if(ae[d.tabstopId]){continue}var a=f.lastIndexOf(d,l-1);d=c[a]||{tabstopId:d.tabstopId}}c[l]=d}return c}var U=aa.getCursorPosition(),Q=aa.session.getLine(U.row),X=aa.session.getTabString(),P=Q.match(/^\s*/)[0];U.column<P.length&&(P=P.slice(0,U.column));var T=this.tokenizeTmSnippet(O);T=this.resolveVariables(T,aa),T=T.map(function(a){return a=="\n"?a+P:typeof a=="string"?a.replace(/\t/g,X):a});var M=[];T.forEach(function(o,f){if(typeof o!="object"){return}var p=o.tabstopId,m=M[p];m||(m=M[p]=[],m.index=p,m.value="");if(m.indexOf(o)!==-1){return}m.push(o);var d=T.indexOf(o,f+1);if(d===-1){return}var l=T.slice(f+1,d),c=l.some(function(a){return typeof a=="object"});c&&!m.value?m.value=l:l.length&&(!m.value||typeof m.value!="string")&&(m.value=l.join(""))}),M.forEach(function(a){a.length=0});var ae={};for(var W=0;W<T.length;W++){var ac=T[W];if(typeof ac!="object"){continue}var R=ac.tabstopId,ab=T.indexOf(ac,W+1);if(ae[R]){ae[R]===ac&&(ae[R]=null);continue}var L=M[R],V=typeof L.value=="string"?[L.value]:Z(L.value);V.unshift(W+1,Math.max(0,ab-W)),V.push(ac),ae[R]=ac,T.splice.apply(T,V),L.indexOf(ac)===-1&&L.push(ac)}var Y=0,I=0,ad="";T.forEach(function(a){typeof a=="string"?(a[0]==="\n"?(I=a.length-1,Y++):I+=a.length,ad+=a):a.start?a.end={row:Y,column:I}:a.start={row:Y,column:I}});var K=aa.getSelectionRange(),N=aa.session.replace(K,ad),h=new y(aa),J=aa.inVirtualSelectionMode&&aa.selection.index;h.addTabstops(M,K.start,N,J)},this.insertSnippet=function(c,a){var d=this;if(c.inVirtualSelectionMode){return d.insertSnippetForSelection(c,a)}c.forEachSelection(function(){d.insertSnippetForSelection(c,a)},null,{keepOrder:!0}),c.tabstopManager&&c.tabstopManager.tabNext()},this.$getScope=function(d){var a=d.session.$mode.$id||"";a=a.split("/").pop();if(a==="html"||a==="php"){a==="php"&&!d.session.$mode.inlinePhp&&(a="html");var f=d.getCursorPosition(),c=d.session.getState(f.row);typeof c=="object"&&(c=c[0]),c.substring&&(c.substring(0,3)=="js-"?a="javascript":c.substring(0,4)=="css-"?a="css":c.substring(0,4)=="php-"&&(a="php"))}return a},this.getActiveScopes=function(d){var a=this.$getScope(d),f=[a],c=this.snippetMap;return c[a]&&c[a].includeScopes&&f.push.apply(f,c[a].includeScopes),f.push("_"),f},this.expandWithTab=function(d,a){var f=this,c=d.forEachSelection(function(){return f.expandSnippetForSelection(d,a)},null,{keepOrder:!0});return c&&d.tabstopManager&&d.tabstopManager.tabNext(),c},this.expandSnippetForSelection=function(l,d){var p=l.getCursorPosition(),h=l.session.getLine(p.row),c=h.substring(0,p.column),f=h.substr(p.column),m=this.snippetMap,a;return this.getActiveScopes(l).some(function(n){var i=m[n];return i&&(a=this.findMatchingSnippet(i,c,f)),!!a},this),a?d&&d.dryRun?!0:(l.session.doc.removeInLine(p.row,p.column-a.replaceBefore.length,p.column+a.replaceAfter.length),this.variables.M__=a.matchBefore,this.variables.T__=a.matchAfter,this.insertSnippetForSelection(l,a.content),this.variables.M__=this.variables.T__=null,!0):!1},this.findMatchingSnippet=function(f,c,h){for(var d=f.length;d--;){var a=f[d];if(a.startRe&&!a.startRe.test(c)){continue}if(a.endRe&&!a.endRe.test(h)){continue}if(!a.startRe&&!a.endRe){continue}return a.matchBefore=a.startRe?a.startRe.exec(c):[""],a.matchAfter=a.endRe?a.endRe.exec(h):[""],a.replaceBefore=a.triggerRe?a.triggerRe.exec(c)[0]:"",a.replaceAfter=a.endTriggerRe?a.endTriggerRe.exec(h)[0]:"",a}},this.snippetMap={},this.snippetNameMap={},this.register=function(m,h){function p(a){return a&&!/^\^?\(.*\)\$?$|^\\b$/.test(a)&&(a="(?:"+a+")"),a||""}function d(i,a,o){return i=p(i),a=p(a),o?(i=a+i,i&&i[i.length-1]!="$"&&(i+="$")):(i+=a,i&&i[0]!="^"&&(i="^"+i)),new RegExp(i)}function c(n){n.scope||(n.scope=h||"_"),h=n.scope,s[h]||(s[h]=[],l[h]={});var r=l[h];if(n.name){var i=r[n.name];i&&f.unregister(i),r[n.name]=n}s[h].push(n),n.tabTrigger&&!n.trigger&&(!n.guard&&/^\w/.test(n.tabTrigger)&&(n.guard="\\b"),n.trigger=H.escapeRegExp(n.tabTrigger)),n.startRe=d(n.trigger,n.guard,!0),n.triggerRe=new RegExp(n.trigger,"",!0),n.endRe=d(n.endTrigger,n.endGuard,!0),n.endTriggerRe=new RegExp(n.endTrigger,"",!0)}var s=this.snippetMap,l=this.snippetNameMap,f=this;m||(m=[]),m&&m.content?c(m):Array.isArray(m)&&m.forEach(c),this._signal("registerSnippets",{scope:h})},this.unregister=function(f,c){function a(n){var l=d[n.scope||c];if(l&&l[n.name]){delete l[n.name];var m=h[n.scope||c],p=m&&m.indexOf(n);p>=0&&m.splice(p,1)}}var h=this.snippetMap,d=this.snippetNameMap;f.content?a(f):Array.isArray(f)&&f.forEach(a)},this.parseSnippetFile=function(l){l=l.replace(/\r/g,"");var v=[],f={},c=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm,h;while(h=c.exec(l)){if(h[1]){try{f=JSON.parse(h[1]),v.push(f)}catch(I){}}if(h[4]){f.content=h[4].replace(/^\t/gm,""),v.push(f),f={}}else{var d=h[2],p=h[3];if(d=="regex"){var m=/\/((?:[^\/\\]|\\.)*)|$/g;f.guard=m.exec(p)[1],f.trigger=m.exec(p)[1],f.endTrigger=m.exec(p)[1],f.endGuard=m.exec(p)[1]}else{d=="snippet"?(f.tabTrigger=p.match(/^\S*/)[0],f.name||(f.name=p)):f[d]=p}}}return v},this.getSnippetByName=function(d,a){var f=this.snippetNameMap,c;return this.getActiveScopes(a).some(function(h){var e=f[h];return e&&(c=e[d]),!!c},this),c}}).call(C.prototype);var y=function(a){if(a.tabstopManager){return a.tabstopManager}a.tabstopManager=this,this.$onChange=this.onChange.bind(this),this.$onChangeSelection=H.delayedCall(this.onChangeSelection.bind(this)).schedule,this.$onChangeSession=this.onChangeSession.bind(this),this.$onAfterExec=this.onAfterExec.bind(this),this.attach(a)};(function(){this.attach=function(a){this.index=0,this.ranges=[],this.tabstops=[],this.$openTabstops=null,this.selectedTabstop=null,this.editor=a,this.editor.on("change",this.$onChange),this.editor.on("changeSelection",this.$onChangeSelection),this.editor.on("changeSession",this.$onChangeSession),this.editor.commands.on("afterExec",this.$onAfterExec),this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)},this.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this),this.ranges=null,this.tabstops=null,this.selectedTabstop=null,this.editor.removeListener("change",this.$onChange),this.editor.removeListener("changeSelection",this.$onChangeSelection),this.editor.removeListener("changeSession",this.$onChangeSession),this.editor.commands.removeListener("afterExec",this.$onAfterExec),this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.tabstopManager=null,this.editor=null},this.onChange=function(M){var R=M.data.range,I=M.data.action[0]=="r",l=R.start,J=R.end,S=l.row,v=J.row,Q=v-S,P=J.column-l.column;I&&(Q=-Q,P=-P);if(!this.$inChange&&I){var L=this.selectedTabstop,O=L&&!L.some(function(a){return w(a.start,l)<=0&&w(a.end,J)>=0});if(O){return this.detach()}}var K=this.ranges;for(var m=0;m<K.length;m++){var N=K[m];if(N.end.row<l.row){continue}if(I&&w(l,N.start)<0&&w(J,N.end)>0){this.removeRange(N),m--;continue}N.start.row==S&&N.start.column>l.column&&(N.start.column+=P),N.end.row==S&&N.end.column>=l.column&&(N.end.column+=P),N.start.row>=S&&(N.start.row+=Q),N.end.row>=S&&(N.end.row+=Q),w(N.start,N.end)>0&&this.removeRange(N)}K.length||this.detach()},this.updateLinkedFields=function(){var f=this.selectedTabstop;if(!f||!f.hasLinkedRanges){return}this.$inChange=!0;var l=this.editor.session,d=l.getTextRange(f.firstNonLinked);for(var a=f.length;a--;){var c=f[a];if(!c.linked){continue}var h=G.snippetManager.tmStrFormat(d,c.original);l.replace(c,h)}this.$inChange=!1},this.onAfterExec=function(a){a.command&&!a.command.readOnly&&this.updateLinkedFields()},this.onChangeSelection=function(){if(!this.editor){return}var h=this.editor.selection.lead,c=this.editor.selection.anchor,l=this.editor.selection.isEmpty();for(var f=this.ranges.length;f--;){if(this.ranges[f].linked){continue}var a=this.ranges[f].contains(h.row,h.column),d=l||this.ranges[f].contains(c.row,c.column);if(a&&d){return}}this.detach()},this.onChangeSession=function(){this.detach()},this.tabNext=function(c){var a=this.tabstops.length,d=this.index+(c||1);d=Math.min(Math.max(d,1),a),d==a&&(d=0),this.selectTabstop(d),d===0&&this.detach()},this.selectTabstop=function(d){this.$openTabstops=null;var a=this.tabstops[this.index];a&&this.addTabstopMarkers(a),this.index=d,a=this.tabstops[this.index];if(!a||!a.length){return}this.selectedTabstop=a;if(!this.editor.inVirtualSelectionMode){var f=this.editor.multiSelect;f.toSingleRange(a.firstNonLinked.clone());for(var c=a.length;c--;){if(a.hasLinkedRanges&&a[c].linked){continue}f.addRange(a[c].clone(),!0)}f.ranges[0]&&f.addRange(f.ranges[0].clone())}else{this.editor.selection.setRange(a.firstNonLinked)}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)},this.addTabstops=function(l,d,m){this.$openTabstops||(this.$openTabstops=[]);if(!l[0]){var h=j.fromPoints(m,m);E(h.start,d),E(h.end,d),l[0]=[h],l[0].index=0}var c=this.index,f=[c+1,0],a=this.ranges;l.forEach(function(u,v){var s=this.$openTabstops[v]||u;for(var p=u.length;p--;){var o=u[p],t=j.fromPoints(o.start,o.end||o.start);B(t.start,d),B(t.end,d),t.original=o,t.tabstop=s,a.push(t),s!=u?s.unshift(t):s[p]=t,o.fmtString?(t.linked=!0,s.hasLinkedRanges=!0):s.firstNonLinked||(s.firstNonLinked=t)}s.firstNonLinked||(s.hasLinkedRanges=!1),s===u&&(f.push(s),this.$openTabstops[v]=s),this.addTabstopMarkers(s)},this),f.length>2&&(this.tabstops.length&&f.push(f.splice(2,1)[0]),this.tabstops.splice.apply(this.tabstops,f))},this.addTabstopMarkers=function(c){var a=this.editor.session;c.forEach(function(d){d.markerId||(d.markerId=a.addMarker(d,"ace_snippet-marker","text"))})},this.removeTabstopMarkers=function(c){var a=this.editor.session;c.forEach(function(d){a.removeMarker(d.markerId),d.markerId=null})},this.removeRange=function(c){var a=c.tabstop.indexOf(c);c.tabstop.splice(a,1),a=this.ranges.indexOf(c),this.ranges.splice(a,1),this.editor.session.removeMarker(c.markerId),c.tabstop.length||(a=this.tabstops.indexOf(c.tabstop),a!=-1&&this.tabstops.splice(a,1),this.tabstops.length||this.detach())},this.keyboardHandler=new D,this.keyboardHandler.bindKeys({Tab:function(a){if(G.snippetManager&&G.snippetManager.expandWithTab(a)){return}a.tabstopManager.tabNext(1)},"Shift-Tab":function(a){a.tabstopManager.tabNext(-1)},Esc:function(a){a.tabstopManager.detach()},Return:function(a){return !1}})}).call(y.prototype);var g={};g.onChange=F.prototype.onChange,g.setPosition=function(c,a){this.pos.row=c,this.pos.column=a},g.update=function(c,a,d){this.$insertRight=d,this.pos=c,this.onChange(a)};var B=function(c,a){c.row==0&&(c.column+=a.column),c.row+=a.row},E=function(c,a){c.row==a.row&&(c.column-=a.column),c.row-=a.row};A("./lib/dom").importCssString(".ace_snippet-marker {    -moz-box-sizing: border-box;    box-sizing: border-box;    background: rgba(194, 193, 208, 0.09);    border: 1px dotted rgba(211, 208, 235, 0.62);    position: absolute;}"),G.snippetManager=new C;var q=A("./editor").Editor;(function(){this.insertSnippet=function(a,c){return G.snippetManager.insertSnippet(this,a,c)},this.expandSnippet=function(a){return G.snippetManager.expandWithTab(this,a)}}).call(q.prototype)}),ace.define("ace/autocomplete/popup",["require","exports","module","ace/edit_session","ace/virtual_renderer","ace/editor","ace/range","ace/lib/event","ace/lib/lang","ace/lib/dom"],function(m,w,g){var b=m("../edit_session").EditSession,j=m("../virtual_renderer").VirtualRenderer,x=m("../editor").Editor,d=m("../range").Range,v=m("../lib/event"),q=m("../lib/lang"),k=m("../lib/dom"),h=function(c){var a=new j(c);a.$maxLines=4;var f=new x(a);return f.setHighlightActiveLine(!1),f.setShowPrintMargin(!1),f.renderer.setShowGutter(!1),f.renderer.setHighlightGutterLine(!1),f.$mouseHandler.$focusWaitTimout=0,f.$highlightTagPending=!0,f},p=function(y){var B=k.createElement("div"),l=new h(B);y&&y.appendChild(B),B.style.display="none",l.renderer.content.style.cursor="default",l.renderer.setStyle("ace_autocomplete"),l.setOption("displayIndentGuides",!1),l.setOption("dragDelay",150);var a=function(){};l.focus=a,l.$isFocused=!0,l.renderer.$cursorLayer.restartTimer=a,l.renderer.$cursorLayer.element.style.opacity=0,l.renderer.$maxLines=8,l.renderer.$keepTextAreaAtCursor=!1,l.setHighlightActiveLine(!1),l.session.highlight(""),l.session.$searchHighlight.clazz="ace_highlight-marker",l.on("mousedown",function(i){var c=i.getDocumentPosition();l.selection.moveToPosition(c),A.start.row=A.end.row=c.row,i.stop()});var o,C=new d(-1,0,-1,Infinity),A=new d(-1,0,-1,Infinity);A.id=l.session.addMarker(A,"ace_active-line","fullLine"),l.setSelectOnHover=function(c){c?C.id&&(l.session.removeMarker(C.id),C.id=null):C.id=l.session.addMarker(C,"ace_line-hover","fullLine")},l.setSelectOnHover(!1),l.on("mousemove",function(i){if(!o){o=i;return}if(o.x==i.x&&o.y==i.y){return}o=i,o.scrollTop=l.renderer.scrollTop;var c=o.getDocumentPosition().row;C.start.row!=c&&(C.id||l.setRow(c),f(c))}),l.renderer.on("beforeRender",function(){if(o&&C.start.row!=-1){o.$pos=null;var c=o.getDocumentPosition().row;C.id||l.setRow(c),f(c,!0)}}),l.renderer.on("afterRender",function(){var n=l.getRow(),c=l.renderer.$textLayer,i=c.element.childNodes[n-c.config.firstRow];if(i==c.selectedNode){return}c.selectedNode&&k.removeCssClass(c.selectedNode,"ace_selected"),c.selectedNode=i,i&&k.addCssClass(i,"ace_selected")});var u=function(){f(-1)},f=function(i,c){i!==C.start.row&&(C.start.row=C.end.row=i,c||l.session._emit("changeBackMarker"),l._emit("changeHoverMarker"))};l.getHoveredRow=function(){return C.start.row},v.addListener(l.container,"mouseout",u),l.on("hide",u),l.on("changeSelection",u),l.session.doc.getLength=function(){return l.data.length},l.session.doc.getLine=function(i){var c=l.data[i];return typeof c=="string"?c:c&&c.value||""};var z=l.session.bgTokenizer;return z.$tokenizeRow=function(H){var E=l.data[H],G=[];if(!E){return G}typeof E=="string"&&(E={value:E}),E.caption||(E.caption=E.value||E.name);var D=-1,F,I;for(var n=0;n<E.caption.length;n++){I=E.caption[n],F=E.matchMask&1<<n?1:0,D!==F?(G.push({type:E.className||""+(F?"completion-highlight":""),value:I}),D=F):G[G.length-1].value+=I}if(E.meta){var c=l.renderer.$size.scrollerWidth/l.renderer.layerConfig.characterWidth;E.meta.length+E.caption.length<c-2&&G.push({type:"rightAlignedText",value:E.meta})}return G},z.$updateOnChange=a,z.start=a,l.session.$computeWidth=function(){return this.screenWidth=0},l.$blockScrolling=Infinity,l.isOpen=!1,l.isTopdown=!1,l.data=[],l.setData=function(c){l.data=c||[],l.setValue(q.stringRepeat("\n",c.length),-1),l.setRow(0)},l.getData=function(c){return l.data[c]},l.getRow=function(){return A.start.row},l.setRow=function(c){c=Math.max(-1,Math.min(this.data.length,c)),A.start.row!=c&&(l.selection.clearSelection(),A.start.row=A.end.row=c||0,l.session._emit("changeBackMarker"),l.moveCursorTo(c||0,0),l.isOpen&&l._signal("select"))},l.on("changeSelection",function(){l.isOpen&&l.setRow(l.selection.lead.row),l.renderer.scrollCursorIntoView()}),l.hide=function(){this.container.style.display="none",this._signal("hide"),l.isOpen=!1},l.show=function(F,J,i){var K=this.container,n=window.innerHeight,I=window.innerWidth,H=this.renderer,E=H.$maxLines*J*1.4,D=F.top+this.$borderSize;D+E>n-J&&!i?(K.style.top="",K.style.bottom=n-D+"px",l.isTopdown=!1):(D+=J,K.style.top=D+"px",K.style.bottom="",l.isTopdown=!0),K.style.display="",this.renderer.$textLayer.checkForSizeChanges();var G=F.left;G+K.offsetWidth>I&&(G=I-K.offsetWidth),K.style.left=G+"px",this._signal("show"),o=null,l.isOpen=!0},l.getTextLeftOffset=function(){return this.$borderSize+this.renderer.$padding+this.$imageSize},l.$imageSize=0,l.$borderSize=1,l};k.importCssString(".ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {    background-color: #CAD6FA;    z-index: 1;}.ace_editor.ace_autocomplete .ace_line-hover {    border: 1px solid #abbffe;    margin-top: -1px;    background: rgba(233,233,253,0.4);}.ace_editor.ace_autocomplete .ace_line-hover {    position: absolute;    z-index: 2;}.ace_editor.ace_autocomplete .ace_scroller {   background: none;   border: none;   box-shadow: none;}.ace_rightAlignedText {    color: gray;    display: inline-block;    position: absolute;    right: 4px;    text-align: right;    z-index: -1;}.ace_editor.ace_autocomplete .ace_completion-highlight{    color: #000;    text-shadow: 0 0 0.01em;}.ace_editor.ace_autocomplete {    width: 280px;    z-index: 200000;    background: #fbfbfb;    color: #444;    border: 1px lightgray solid;    position: fixed;    box-shadow: 2px 3px 5px rgba(0,0,0,.2);    line-height: 1.4;}"),w.AcePopup=p}),ace.define("ace/autocomplete/util",["require","exports","module"],function(c,a,d){a.parForEach=function(k,g,l){var j=0,f=k.length;f===0&&l();for(var h=0;h<f;h++){g(k[h],function(m,i){j++,j===f&&l(m,i)})}};var b=/[a-zA-Z_0-9\$\-\u00A2-\uFFFF]/;a.retrievePrecedingIdentifier=function(j,g,k){k=k||b;var f=[];for(var h=g-1;h>=0;h--){if(!k.test(j[h])){break}f.push(j[h])}return f.reverse().join("")},a.retrieveFollowingIdentifier=function(j,g,k){k=k||b;var f=[];for(var h=g;h<j.length;h++){if(!k.test(j[h])){break}f.push(j[h])}return f}}),ace.define("ace/autocomplete",["require","exports","module","ace/keyboard/hash_handler","ace/autocomplete/popup","ace/autocomplete/util","ace/lib/event","ace/lib/lang","ace/lib/dom","ace/snippets"],function(m,w,g){var b=m("./keyboard/hash_handler").HashHandler,j=m("./autocomplete/popup").AcePopup,x=m("./autocomplete/util"),d=m("./lib/event"),v=m("./lib/lang"),q=m("./lib/dom"),k=m("./snippets").snippetManager,h=function(){this.autoInsert=!0,this.autoSelect=!0,this.exactMatch=!1,this.keyboardHandler=new b,this.keyboardHandler.bindKeys(this.commands),this.blurListener=this.blurListener.bind(this),this.changeListener=this.changeListener.bind(this),this.mousedownListener=this.mousedownListener.bind(this),this.mousewheelListener=this.mousewheelListener.bind(this),this.changeTimer=v.delayedCall(function(){this.updateCompletions(!0)}.bind(this)),this.tooltipTimer=v.delayedCall(this.updateDocTooltip.bind(this),50)};(function(){this.gatherCompletionsId=0,this.$init=function(){return this.popup=new j(document.body||document.documentElement),this.popup.on("click",function(a){this.insertMatch(),a.stop()}.bind(this)),this.popup.focus=this.editor.focus.bind(this.editor),this.popup.on("show",this.tooltipTimer.bind(null,null)),this.popup.on("select",this.tooltipTimer.bind(null,null)),this.popup.on("changeHoverMarker",this.tooltipTimer.bind(null,null)),this.popup},this.getPopup=function(){return this.popup||this.$init()},this.openPopup=function(u,c,z){this.popup||this.$init(),this.popup.setData(this.completions.filtered);var l=u.renderer;this.popup.setRow(this.autoSelect?0:-1);if(!z){this.popup.setTheme(u.getTheme()),this.popup.setFontSize(u.getFontSize());var a=l.layerConfig.lineHeight,f=l.$cursorLayer.getPixelPosition(this.base,!0);f.left-=this.popup.getTextLeftOffset();var y=u.container.getBoundingClientRect();f.top+=y.top-l.layerConfig.offset,f.left+=y.left-u.renderer.scrollLeft,f.left+=l.$gutterLayer.gutterWidth,this.popup.show(f,a)}else{z&&!c&&this.detach()}},this.detach=function(){this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.off("changeSelection",this.changeListener),this.editor.off("blur",this.blurListener),this.editor.off("mousedown",this.mousedownListener),this.editor.off("mousewheel",this.mousewheelListener),this.changeTimer.cancel(),this.hideDocTooltip(),this.popup&&this.popup.isOpen&&(this.gatherCompletionsId+=1,this.popup.hide()),this.base&&this.base.detach(),this.activated=!1,this.completions=this.base=null},this.changeListener=function(c){var a=this.editor.selection.lead;(a.row!=this.base.row||a.column<this.base.column)&&this.detach(),this.activated?this.changeTimer.schedule():this.detach()},this.blurListener=function(c){var a=document.activeElement,f=this.editor.textInput.getElement();a!=f&&a.parentNode!=this.popup.container&&a!=this.tooltipNode&&c.relatedTarget!=this.tooltipNode&&c.relatedTarget!=f&&this.detach()},this.mousedownListener=function(a){this.detach()},this.mousewheelListener=function(a){this.detach()},this.goTo=function(c){var a=this.popup.getRow(),f=this.popup.session.getLength()-1;switch(c){case"up":a=a<=0?f:a-1;break;case"down":a=a>=f?-1:a+1;break;case"start":a=0;break;case"end":a=f}this.popup.setRow(a)},this.insertMatch=function(f){f||(f=this.popup.getData(this.popup.getRow()));if(!f){return !1}if(f.completer&&f.completer.insertMatch){f.completer.insertMatch(this.editor,f)}else{if(this.completions.filterText){var a=this.editor.selection.getAllRanges();for(var i=0,c;c=a[i];i++){c.start.column-=this.completions.filterText.length,this.editor.session.remove(c)}}f.snippet?k.insertSnippet(this.editor,f.snippet):this.editor.execCommand("insertstring",f.value||f)}this.detach()},this.commands={Up:function(a){a.completer.goTo("up")},Down:function(a){a.completer.goTo("down")},"Ctrl-Up|Ctrl-Home":function(a){a.completer.goTo("start")},"Ctrl-Down|Ctrl-End":function(a){a.completer.goTo("end")},Esc:function(a){a.completer.detach()},Space:function(a){a.completer.detach(),a.insert(" ")},Return:function(a){return a.completer.insertMatch()},"Shift-Return":function(a){a.completer.insertMatch(!0)},Tab:function(c){var a=c.completer.insertMatch();if(!!a||!!c.tabstopManager){return a}c.completer.goTo("down")},PageUp:function(a){a.completer.popup.gotoPageUp()},PageDown:function(a){a.completer.popup.gotoPageDown()}},this.gatherCompletions=function(z,s){var B=z.getSession(),y=z.getCursorPosition(),l=B.getLine(y.row),A=x.retrievePrecedingIdentifier(l,y.column);this.base=B.doc.createAnchor(y.row,y.column-A.length),this.base.$insertRight=!0;var f=[],c=z.completers.length;return z.completers.forEach(function(a,e){a.getCompletions(z,B,y,A,function(t,n){t||(f=f.concat(n));var C=z.getCursorPosition(),u=B.getLine(C.row);s(null,{prefix:x.retrievePrecedingIdentifier(u,C.column,n[0]&&n[0].identifierRegex),matches:f,finished:--c===0})})}),!0},this.showPopup=function(a){this.editor&&this.detach(),this.activated=!0,this.editor=a,a.completer!=this&&(a.completer&&a.completer.detach(),a.completer=this),a.keyBinding.addKeyboardHandler(this.keyboardHandler),a.on("changeSelection",this.changeListener),a.on("blur",this.blurListener),a.on("mousedown",this.mousedownListener),a.on("mousewheel",this.mousewheelListener),this.updateCompletions()},this.updateCompletions=function(f){if(f&&this.base&&this.completions){var a=this.editor.getCursorPosition(),i=this.editor.session.getTextRange({start:this.base,end:a});if(i==this.completions.filterText){return}this.completions.setFilter(i);if(!this.completions.filtered.length){return this.detach()}if(this.completions.filtered.length==1&&this.completions.filtered[0].value==i&&!this.completions.filtered[0].snippet){return this.detach()}this.openPopup(this.editor,i,f);return}var c=this.gatherCompletionsId;this.gatherCompletions(this.editor,function(r,A){var l=function(){if(!A.finished){return}return this.detach()}.bind(this),y=A.prefix,z=A&&A.matches;if(!z||!z.length){return l()}if(y.indexOf(A.prefix)!==0||c!=this.gatherCompletionsId){return}this.completions=new p(z),this.exactMatch&&(this.completions.exactMatch=!0),this.completions.setFilter(y);var e=this.completions.filtered;if(!e.length){return l()}if(e.length==1&&e[0].value==y&&!e[0].snippet){return l()}if(this.autoInsert&&e.length==1&&A.finished){return this.insertMatch(e[0])}this.openPopup(this.editor,y,f)}.bind(this))},this.cancelContextMenu=function(){this.editor.$mouseHandler.cancelContextMenu()},this.updateDocTooltip=function(){var f=this.popup,a=f.data,i=a&&(a[f.getHoveredRow()]||a[f.getRow()]),c=null;if(!i||!this.editor||!this.popup.isOpen){return this.hideDocTooltip()}this.editor.completers.some(function(l){return l.getDocTooltip&&(c=l.getDocTooltip(i)),c}),c||(c=i),typeof c=="string"&&(c={docText:c});if(!c||!c.docHTML&&!c.docText){return this.hideDocTooltip()}this.showDocTooltip(c)},this.showDocTooltip=function(f){this.tooltipNode||(this.tooltipNode=q.createElement("div"),this.tooltipNode.className="ace_tooltip ace_doc-tooltip",this.tooltipNode.style.margin=0,this.tooltipNode.style.pointerEvents="auto",this.tooltipNode.tabIndex=-1,this.tooltipNode.onblur=this.blurListener.bind(this));var a=this.tooltipNode;f.docHTML?a.innerHTML=f.docHTML:f.docText&&(a.textContent=f.docText),a.parentNode||document.body.appendChild(a);var i=this.popup,c=i.container.getBoundingClientRect();a.style.top=i.container.style.top,a.style.bottom=i.container.style.bottom,window.innerWidth-c.right<320?(a.style.right=window.innerWidth-c.left+"px",a.style.left=""):(a.style.left=c.right+1+"px",a.style.right=""),a.style.display="block"},this.hideDocTooltip=function(){this.tooltipTimer.cancel();if(!this.tooltipNode){return}var a=this.tooltipNode;!this.editor.isFocused()&&document.activeElement==a&&this.editor.focus(),this.tooltipNode=null,a.parentNode&&a.parentNode.removeChild(a)}}).call(h.prototype),h.startCommand={name:"startAutocomplete",exec:function(a){a.completer||(a.completer=new h),a.completer.autoInsert=a.completer.autoSelect=!0,a.completer.showPopup(a),a.completer.cancelContextMenu()},bindKey:"Ctrl-Space|Ctrl-Shift-Space|Alt-Space"};var p=function(c,a,f){this.all=c,this.filtered=c,this.filterText=a||"",this.exactMatch=!1};(function(){this.setFilter=function(c){if(c.length>this.filterText&&c.lastIndexOf(this.filterText,0)===0){var a=this.filtered}else{var a=this.all}this.filterText=c,a=this.filterCompletions(a,this.filterText),a=a.sort(function(l,i){return i.exactMatch-l.exactMatch||i.score-l.score});var f=null;a=a.filter(function(l){var i=l.snippet||l.caption||l.value;return i===f?!1:(f=i,!0)}),this.filtered=a},this.filterCompletions=function(G,M){var B=[],y=M.toUpperCase(),D=M.toLowerCase();G:for(var N=0,A;A=G[N];N++){var L=A.value||A.caption||A.snippet;if(!L){continue}var J=-1,F=0,C=0,I,E;if(this.exactMatch){if(M!==L.substr(0,M.length)){continue G}}else{for(var z=0;z<M.length;z++){var H=L.indexOf(D[z],J+1),K=L.indexOf(y[z],J+1);I=H>=0?K<0||H<K?H:K:K;if(I<0){continue G}E=I-J-1,E>0&&(J===-1&&(C+=10),C+=E),F|=1<<I,J=I}}A.matchMask=F,A.exactMatch=C?0:1,A.score=(A.score||0)-C,B.push(A)}return B}}).call(p.prototype),w.Autocomplete=h,w.FilteredList=p}),ace.define("ace/autocomplete/text_completer",["require","exports","module","ace/range"],function(f,b,h){function c(j,i){var k=j.getTextRange(d.fromPoints({row:0,column:0},i));return k.split(a).length-1}function g(l,j){var p=c(l,j),k=l.getValue().split(a),m=Object.create(null),i=k[p];return k.forEach(function(r,o){if(!r||r===i){return}var n=Math.abs(p-o),q=k.length-n;m[r]?m[r]=Math.max(q,m[r]):m[r]=q}),m}var d=f("../range").Range,a=/[^a-zA-Z_0-9\$\-\u00C0-\u1FFF\u2C00-\uD7FF\w]+/;b.getCompletions=function(p,l,q,o,k){var m=g(l,q,o),j=Object.keys(m);k(null,j.map(function(i){return{caption:i,value:i,score:m[i],meta:"local"}}))}}),ace.define("ace/ext/language_tools",["require","exports","module","ace/snippets","ace/autocomplete","ace/config","ace/lib/lang","ace/autocomplete/util","ace/autocomplete/text_completer","ace/editor","ace/config"],function(I,q,B){function C(d){var a=d.getCursorPosition(),f=d.session.getLine(a.row),c=k.retrievePrecedingIdentifier(f,a.column);return d.completers.forEach(function(g){g.identifierRegexps&&g.identifierRegexps.forEach(function(h){!c&&h&&(c=k.retrievePrecedingIdentifier(f,a.column,h))})}),c}var x=I("../snippets").snippetManager,E=I("../autocomplete").Autocomplete,w=I("../config"),A=I("../lib/lang"),k=I("../autocomplete/util"),L=I("../autocomplete/text_completer"),H={getCompletions:function(g,c,l,f,a){if(c.$mode.completer){return c.$mode.completer.getCompletions(g,c,l,f,a)}var d=g.session.getState(l.row),h=c.$mode.getCompletions(d,c,l,f);a(null,h)}},D={getCompletions:function(g,d,l,c,f){var h=x.snippetMap,a=[];x.getActiveScopes(g).forEach(function(s){var o=h[s]||[];for(var u=o.length;u--;){var p=o[u],m=p.name||p.tabTrigger;if(!m){continue}a.push({caption:m,snippet:p.content,meta:p.tabTrigger&&!p.name?p.tabTrigger+"\u21e5 ":"snippet",type:"snippet"})}},this),f(null,a)},getDocTooltip:function(a){a.type=="snippet"&&!a.docHTML&&(a.docHTML=["<b>",A.escapeHTML(a.caption),"</b>","<hr></hr>",A.escapeHTML(a.snippet)].join(""))}},K=[D,L,H];q.setCompleters=function(a){K=a||[]},q.addCompleter=function(a){K.push(a)},q.textCompleter=L,q.keyWordCompleter=H,q.snippetCompleter=D;var F={name:"expandSnippet",exec:function(a){return x.expandWithTab(a)},bindKey:"Tab"},z=function(c,a){J(a.session.$mode)},J=function(c){var a=c.$id;x.files||(x.files={}),j(a),c.modes&&c.modes.forEach(J)},j=function(c){if(!c||x.files[c]){return}var a=c.replace("mode","snippets");x.files[c]={},w.loadModule(a,function(d){d&&(x.files[c]=d,!d.snippets&&d.snippetText&&(d.snippets=x.parseSnippetFile(d.snippetText)),x.register(d.snippets||[],d.scope),d.includeScopes&&(x.snippetMap[d.scope].includeScopes=d.includeScopes,d.includeScopes.forEach(function(f){j("ace/mode/"+f)})))})},G=function(f){var a=f.editor,g=f.args||"",d=a.completer&&a.completer.activated;if(f.command.name==="backspace"){d&&!C(a)&&a.completer.detach()}else{if(f.command.name==="insertstring"){var c=C(a);c&&!d&&(a.completer||(a.completer=new E),a.completer.autoSelect=!1,a.completer.autoInsert=!1,a.completer.showPopup(a))}}},b=I("../editor").Editor;I("../config").defineOptions(b.prototype,"editor",{enableBasicAutocompletion:{set:function(a){a?(this.completers||(this.completers=Array.isArray(a)?a:K),this.commands.addCommand(E.startCommand)):this.commands.removeCommand(E.startCommand)},value:!1},enableLiveAutocompletion:{set:function(a){a?(this.completers||(this.completers=Array.isArray(a)?a:K),this.commands.on("afterExec",G)):this.commands.removeListener("afterExec",G)},value:!1},enableSnippets:{set:function(a){a?(this.commands.addCommand(F),this.on("changeMode",z),z(null,this)):(this.commands.removeCommand(F),this.off("changeMode",z))},value:!1}})});(function(){ace.require(["ace/ext/language_tools"],function(){})})();