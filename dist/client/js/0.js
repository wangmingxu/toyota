webpackJsonp([0],{"355":function(e,r,t){"use strict";function SetTestData(e){return{"type":"SetTestData","data":e}}function GetTestData(){return function(e){return new Promise(function(e){setTimeout(function(){e("TestData")},1e3)}).then(function(r){e(SetTestData(r))})}}r["a"]=GetTestData,t.d(r,"c",function(){return a}),t.d(r,"b",function(){return n});var a=function(e){function Remove(e){return{"type":"Remove","index":e}}var r={"type":"Add"};return{"handleAdd":function(){return e(r)},"handleRemove":function(r){return e(Remove(r))}}},n=function(e){var r={"type":"change"};return{"handleClick":function(){return e(r)}}};!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(a,"TodoListAction","/Users/mingxu/MxProject/example/src/Action/Index.js"),__REACT_HOT_LOADER__.register(n,"LikeAction","/Users/mingxu/MxProject/example/src/Action/Index.js"),__REACT_HOT_LOADER__.register(SetTestData,"SetTestData","/Users/mingxu/MxProject/example/src/Action/Index.js"),__REACT_HOT_LOADER__.register(GetTestData,"GetTestData","/Users/mingxu/MxProject/example/src/Action/Index.js"))}()},"378":function(e,r,t){"use strict";var a=(t(107),t(108),t(109),t(73),t(46),t(110),t(111),t(47),t(112));t.d(r,"a",function(){return a["a"]})},"379":function(e,r,t){"use strict";function getPropType(e){var r=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":e instanceof a.Iterable?"Immutable."+e.toSource().split(" ")[0]:r}function createChainableTypeChecker(e){function checkType(r,t,a,c,i,o){for(var p=arguments.length,u=Array(p>6?p-6:0),f=6;f<p;f++)u[f-6]=arguments[f];if(o=o||a,c=c||n,null!=t[a])return e.apply(void 0,[t,a,c,i,o].concat(u));var d=i;return r?new Error("Required "+d+" `"+o+"` was not specified in `"+c+"`."):void 0}var r=checkType.bind(null,!1);return r.isRequired=checkType.bind(null,!0),r}function createImmutableTypeChecker(e,r){function validate(t,a,n,c,i){var o=t[a];if(!r(o)){var p=getPropType(o);return new Error("Invalid "+c+" `"+i+"` of type `"+p+"` supplied to `"+n+"`, expected `"+e+"`.")}return null}return createChainableTypeChecker(validate)}function createIterableTypeChecker(e,r,t){function validate(a,n,c,i,o){for(var p=arguments.length,u=Array(p>5?p-5:0),f=5;f<p;f++)u[f-5]=arguments[f];var d=a[n];if(!t(d)){var s=i,l=getPropType(d);return new Error("Invalid "+s+" `"+o+"` of type `"+l+"` supplied to `"+c+"`, expected an Immutable.js "+r+".")}if("function"!=typeof e)return new Error("Invalid typeChecker supplied to `"+c+"` for propType `"+o+"`, expected a function.");for(var y=d.toArray(),h=0,T=y.length;h<T;h++){var k=e.apply(void 0,[y,h,c,i,o+"["+h+"]"].concat(u));if(k instanceof Error)return k}}return createChainableTypeChecker(validate)}function createKeysTypeChecker(e){function validate(r,t,a,n,c){for(var i=arguments.length,o=Array(i>5?i-5:0),p=5;p<i;p++)o[p-5]=arguments[p];var u=r[t];if("function"!=typeof e)return new Error("Invalid keysTypeChecker (optional second argument) supplied to `"+a+"` for propType `"+c+"`, expected a function.");for(var f=u.keySeq().toArray(),d=0,s=f.length;d<s;d++){var l=e.apply(void 0,[f,d,a,n,c+" -> key("+f[d]+")"].concat(o));if(l instanceof Error)return l}}return createChainableTypeChecker(validate)}function createListOfTypeChecker(e){return createIterableTypeChecker(e,"List",a.List.isList)}function createMapOfTypeCheckerFactory(e,r,t,a){function validate(){for(var n=arguments.length,c=Array(n),i=0;i<n;i++)c[i]=arguments[i];return createIterableTypeChecker(e,t,a).apply(void 0,c)||r&&createKeysTypeChecker(r).apply(void 0,c)}return createChainableTypeChecker(validate)}function createMapOfTypeChecker(e,r){return createMapOfTypeCheckerFactory(e,r,"Map",a.Map.isMap)}function createOrderedMapOfTypeChecker(e,r){return createMapOfTypeCheckerFactory(e,r,"OrderedMap",a.OrderedMap.isOrderedMap)}function createSetOfTypeChecker(e){return createIterableTypeChecker(e,"Set",a.Set.isSet)}function createOrderedSetOfTypeChecker(e){return createIterableTypeChecker(e,"OrderedSet",a.OrderedSet.isOrderedSet)}function createStackOfTypeChecker(e){return createIterableTypeChecker(e,"Stack",a.Stack.isStack)}function createIterableOfTypeChecker(e){return createIterableTypeChecker(e,"Iterable",a.Iterable.isIterable)}function createRecordOfTypeChecker(e){function validate(r,t,n,c,i){for(var o=arguments.length,p=Array(o>5?o-5:0),u=5;u<o;u++)p[u-5]=arguments[u];var f=r[t];if(!(f instanceof a.Record)){var d=getPropType(f),s=c;return new Error("Invalid "+s+" `"+i+"` of type `"+d+"` supplied to `"+n+"`, expected an Immutable.js Record.")}for(var l in e){var y=e[l];if(y){var h=f.toObject(),T=y.apply(void 0,[h,l,n,c,i+"."+l].concat(p));if(T)return T}}}return createChainableTypeChecker(validate)}function createShapeTypeChecker(e){function validate(a,n,c,i,o){for(var p=arguments.length,u=Array(p>5?p-5:0),f=5;f<p;f++)u[f-5]=arguments[f];var d=a[n];if(!t(d)){var s=getPropType(d),l=i;return new Error("Invalid "+l+" `"+o+"` of type `"+s+"` supplied to `"+c+"`, expected an Immutable.js "+r+".")}var y=d.toObject();for(var h in e){var T=e[h];if(T){var k=T.apply(void 0,[y,h,c,i,o+"."+h].concat(u));if(k)return k}}}var r=void 0===arguments[1]?"Iterable":arguments[1],t=void 0===arguments[2]?a.Iterable.isIterable:arguments[2];return createChainableTypeChecker(validate)}function createShapeChecker(e){return createShapeTypeChecker(e)}function createMapContainsChecker(e){return createShapeTypeChecker(e,"Map",a.Map.isMap)}var a=t(35),n="<<anonymous>>",c={"listOf":createListOfTypeChecker,"mapOf":createMapOfTypeChecker,"orderedMapOf":createOrderedMapOfTypeChecker,"setOf":createSetOfTypeChecker,"orderedSetOf":createOrderedSetOfTypeChecker,"stackOf":createStackOfTypeChecker,"iterableOf":createIterableOfTypeChecker,"recordOf":createRecordOfTypeChecker,"shape":createShapeChecker,"contains":createShapeChecker,"mapContains":createMapContainsChecker,"list":createImmutableTypeChecker("List",a.List.isList),"map":createImmutableTypeChecker("Map",a.Map.isMap),"orderedMap":createImmutableTypeChecker("OrderedMap",a.OrderedMap.isOrderedMap),"set":createImmutableTypeChecker("Set",a.Set.isSet),"orderedSet":createImmutableTypeChecker("OrderedSet",a.OrderedSet.isOrderedSet),"stack":createImmutableTypeChecker("Stack",a.Stack.isStack),"seq":createImmutableTypeChecker("Seq",a.Seq.isSeq),"record":createImmutableTypeChecker("Record",function(e){return e instanceof a.Record}),"iterable":createImmutableTypeChecker("Iterable",a.Iterable.isIterable)};e.exports=c}});
//# sourceMappingURL=0.js.map?bcdd8dd204137e408dd2