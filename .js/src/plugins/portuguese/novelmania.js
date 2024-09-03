var e=this&&this.__awaiter||function(e,a,t,l){return new(t||(t=Promise))((function(n,i){function r(e){try{u(l.next(e))}catch(e){i(e)}}function o(e){try{u(l.throw(e))}catch(e){i(e)}}function u(e){var a;e.done?n(e.value):(a=e.value,a instanceof t?a:new t((function(e){e(a)}))).then(r,o)}u((l=l.apply(e,a||[])).next())}))},a=this&&this.__generator||function(e,a){var t,l,n,i,r={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return i={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function o(o){return function(u){return function(o){if(t)throw new TypeError("Generator is already executing.");for(;i&&(i=0,o[0]&&(r=0)),r;)try{if(t=1,l&&(n=2&o[0]?l.return:o[0]?l.throw||((n=l.return)&&n.call(l),0):l.next)&&!(n=n.call(l,o[1])).done)return n;switch(l=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return r.label++,{value:o[1],done:!1};case 5:r.label++,l=o[1],o=[0];continue;case 7:o=r.ops.pop(),r.trys.pop();continue;default:if(!(n=r.trys,(n=n.length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){r=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){r.label=o[1];break}if(6===o[0]&&r.label<n[1]){r.label=n[1],n=o;break}if(n&&r.label<n[2]){r.label=n[2],r.ops.push(o);break}n[2]&&r.ops.pop(),r.trys.pop();continue}o=a.call(e,r)}catch(e){o=[6,e],l=0}finally{t=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}};Object.defineProperty(exports,"__esModule",{value:!0});var t=require("@libs/fetch"),l=require("@libs/filterInputs"),n=require("cheerio"),i=require("@libs/defaultCover"),r=require("@libs/novelStatus"),o=function(){function o(){var e=this;this.id="novelmania.com.br",this.name="Novel Mania",this.icon="src/pt-br/novelmania.png",this.site="https://novelmania.com.br",this.version="1.0.0",this.imageRequestInit=void 0,this.resolveUrl=function(a,t){return e.site+(t?"/book/":"/chapter/")+a},this.filters={genres:{value:"",label:"Gêneros",options:[{label:"Todos",value:""},{label:"Ação",value:"01"},{label:"Adulto",value:"02"},{label:"Artes Marciais",value:"07"},{label:"Aventura",value:"03"},{label:"Comédia",value:"04"},{label:"Cotidiano",value:"16"},{label:"Drama",value:"23"},{label:"Ecchi",value:"27"},{label:"Erótico",value:"22"},{label:"Escolar",value:"13"},{label:"Fantasia",value:"05"},{label:"Harém",value:"21"},{label:"Isekai",value:"30"},{label:"Magia",value:"26"},{label:"Mecha",value:"08"},{label:"Medieval",value:"31"},{label:"Militar",value:"24"},{label:"Mistério",value:"09"},{label:"Mitologia",value:"10"},{label:"Psicológico",value:"11"},{label:"Realidade Virtual",value:"36"},{label:"Romance",value:"12"},{label:"Sci-fi",value:"14"},{label:"Sistema de Jogo",value:"15"},{label:"Sobrenatural",value:"17"},{label:"Suspense",value:"29"},{label:"Terror",value:"06"},{label:"Wuxia",value:"18"},{label:"Xianxia",value:"19"},{label:"Xuanhuan",value:"20"},{label:"Yaoi",value:"35"},{label:"Yuri",value:"37"}],type:l.FilterTypes.Picker},status:{label:"Status",value:"",options:[{label:"Todos",value:""},{label:"Ativo",value:"ativo"},{label:"Completo",value:"Completo"},{label:"Pausado",value:"pausado"},{label:"Parado",value:"Parado"}],type:l.FilterTypes.Picker},type:{label:"Type",value:"",options:[{label:"Todas",value:""},{label:"Americana",value:"americana"},{label:"Angolana",value:"angolana"},{label:"Brasileira",value:"brasileira"},{label:"Chinesa",value:"chinesa"},{label:"Coreana",value:"coreana"},{label:"Japonesa",value:"japonesa"}],type:l.FilterTypes.Picker},ordem:{label:"Ordenar",value:"",options:[{label:"Qualquer ordem",value:""},{label:"Ordem alfabética",value:"1"},{label:"Nº de Capítulos",value:"2"},{label:"Popularidade",value:"3"},{label:"Novidades",value:"4"}],type:l.FilterTypes.Picker}}}return o.prototype.popularNovels=function(l,i){return e(this,arguments,void 0,(function(e,l){var i,r,o,u,s=l.filters;return a(this,(function(a){switch(a.label){case 0:return i="".concat(this.site,"/novels?titulo="),i+="&categoria=".concat(null==s?void 0:s.genres.value),i+="&status=".concat(null==s?void 0:s.status.value),i+="&nacionalidade=".concat(null==s?void 0:s.type.value),i+="&ordem=".concat(null==s?void 0:s.ordem.value),i+="&page=".concat(e),[4,(0,t.fetchApi)(i).then((function(e){return e.text()}))];case 1:return r=a.sent(),o=(0,n.load)(r),u=o("div.top-novels.dark.col-6 > div.row.mb-2"),[2,u.map((function(e,a){return{name:o(a).find("a.novel-title > h5").text(),cover:o(a).find("a > div.card.c-size-1.border > img.card-image").attr("src"),path:o(a).find("a.novel-title").attr("href")||""}})).get().filter((function(e){return e.name&&e.path}))]}}))}))},o.prototype.parseNovel=function(l){return e(this,void 0,void 0,(function(){var e,o,u,s;return a(this,(function(a){switch(a.label){case 0:return[4,(0,t.fetchApi)(this.site+l).then((function(e){return e.text()}))];case 1:switch(e=a.sent(),o=(0,n.load)(e),u={path:l,name:o("div.col-md-8 > div.novel-info > div.d-flex.flex-row.align-items-center > h1").text().trim()||"Sem título"},o("b").remove(),u.name=o("div.col-md-8 > div.novel-info > div.d-flex.flex-row.align-items-center > h1").text().trim()||"Sem título",u.summary=o("div.tab-pane.fade.show.active > div.text > p").text().trim()||"",u.cover=o("div.novel-img > img.img-responsive").attr("src")||i.defaultCover,u.author=o("div.novel-info > span.authors.mb-1").text().trim(),u.genres=o("div.tags > ul.list-tags.mb-0 > li > a").map((function(e,a){return o(a).text()})).toArray().join(","),o("div.novel-info > span.authors.mb-3").text().trim()){case"Ativo":u.status=r.NovelStatus.Ongoing;break;case"Pausado":u.status=r.NovelStatus.OnHiatus;break;case"Completo":u.status=r.NovelStatus.Completed;break;default:u.status=r.NovelStatus.Unknown}return s=[],o("div.accordion.capitulo > div.card > div.collapse > div.card-body.p-0 > ol > li").each((function(e,a){var t="".concat(o(a).find("a > span.sub-vol").text().trim()," - ").concat(o(a).find("a > strong").text().trim()),l=o(a).find("a").attr("href");l&&s.push({name:t,path:l})})),u.chapters=s,[2,u]}}))}))},o.prototype.parseChapter=function(l){return e(this,void 0,void 0,(function(){var e;return a(this,(function(a){switch(a.label){case 0:return[4,(0,t.fetchApi)("".concat(this.site).concat(l)).then((function(e){return e.text()}))];case 1:return e=a.sent(),[2,(0,n.load)(e)("div#chapter-content").html()||""]}}))}))},o.prototype.searchNovels=function(l,i){return e(this,void 0,void 0,(function(){var e,r,o,u;return a(this,(function(a){switch(a.label){case 0:return e="".concat(this.site,"/novels?titulo=").concat(l,"&page=").concat(i),[4,(0,t.fetchApi)(e).then((function(e){return e.text()}))];case 1:return r=a.sent(),o=(0,n.load)(r),u=o("div.top-novels.dark.col-6 > div.row.mb-2"),[2,u.map((function(e,a){return{name:o(a).find("a.novel-title > h5").text(),cover:o(a).find("a > div.card.c-size-1.border > img.card-image").attr("src"),path:o(a).find("a.novel-title").attr("href")||""}})).get().filter((function(e){return e.name&&e.path}))]}}))}))},o}();exports.default=new o;