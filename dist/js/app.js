class FeedbackWidget{_key="feedback_widget";constructor(e){this._elementId=e}get elementId(){return this._elementId}show(e,t){document.getElementsByClassName("widget__bericht__text")[0].innerHTML=e,$("#"+this._elementId).removeClass("widget-hidden"),$("#"+this._elementId).addClass("widget-show"),this.log({message:e,type:t})}hide(){$("#"+this._elementId).removeClass("widget-show"),$("#"+this._elementId).addClass("widget-hidden")}log(e){let t=JSON.parse(localStorage.getItem(this._key))??[];10<=t.length&&t.splice(0,1),t.push(e),localStorage.setItem(this._key,JSON.stringify(t))}static removeLog(){localStorage.removeItem(this._key)}history(){let e=JSON.parse(localStorage.getItem(this._key)),t="";e.forEach(e=>{t+=`<type: ${e.type}> - <berichttekst:${e.message}> <"
">`}),this.show(t,"success")}}$(function(){let e=new FeedbackWidget("feedback-success");$("#ok").on("click",function(){e.show("Speler wil deelnemen aan jouw spel. Geef akkoord.","success")}),$("#close").on("click",function(){e.hide()})});
const Game=(()=>{let t={gameState:""};return{init:function(e){setInterval(()=>{Game.Model.getGameState(1),t.gameState=""},2e3),Game.Reversi.init(),e()}}})();Game.Reversi=(()=>{const r=function(e){$(e).off("click"),spa_templates.templates.FeedbackWidget.body({color:"white"}),e.appendChild(chip)};return{init:function(){{const n=document.getElementsByClassName("board")[0];for(let a=1;a<9;a++)for(let t=1;t<9;t++){let e=document.createElement("div");$(e).addClass("tile"),e.style.gridArea=`r${a}-c`+t,$(e).click(function(){r(e)}),n.appendChild(e)}for(let t=0;t<9;t++)for(let e=0;e<8;e++){const a=document.createElement("div");$(a).addClass("number"),0==t?(a.innerHTML=""+(e+1),a.style.gridArea=`r${t}-c`+(e+1)):0==e&&(a.innerHTML=""+String.fromCharCode(64+t),a.style.gridArea=`r${t}-c`+e),n.appendChild(a)}return}}}})(),Game.Data=(()=>{let n={apiKey:"aa6bb372c0ccba60aff08f3c0b3cf922",mock:[{url:"api/Spel/Beurt",data:0}]},r={environment:"development"};return{configmap:n,init:function(e){if("development"!==e||"production"!==e)throw new Error('This environment state does not exist (accepted states are: "production" and "development")');this._stateMap.environment=e,this.get(url)},get:function(e){if("development"!==r.environment)return $.get(e).then(e=>e).catch(e=>{console.log(e.message)});{var t=e;const a=n.mock.filter(e=>e.url===t).data;return new Promise((e,t)=>{e(a)})}}}})(),Game.Model={init:function(){},getWeather:function(){var e="http://api.openweathermap.org/data/2.5/weather?q=will&APPID="+Game.Data.configMap.apiKey;Game.Data.get(e).then(e=>{if(!e?.main?.temp)throw new Error("No temperature found");console.log(e)}).catch(e=>{console.error(e.message)})},getGameState:async function(e){e=await Game.Data.get("/api/Spel/Beurt/"+e);return e}};