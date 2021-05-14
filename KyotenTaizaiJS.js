
//GoogleAPIキー
var GoogleAPIKey = ''
var g_Map;
var deviceType;



//グーグルマップのMarkerオブジェクトのマップ
var MarkerMap = new Array();

function SetGoogleApiKey(){
	GoogleAPIKey = document.getElementById("GoogleApiKey1").value;
	Init();
}
function Init(){

	//デバイスのタイプ取得
	deviceType = (function(){
			var ua = navigator.userAgent;
			if(ua.indexOf('iPhone') > 0 ||
			   ua.indexOf('iPod') > 0 ||
			   ( ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) ){
			   		return 'smartPhone';
			}else if(ua.indexOf('iPad') > 0 ||
			   		 ua.indexOf('Android') > 0){
			   		return 'tablet';
			}else{
			   		return 'other';
			}
		 })();


	var srcURL = "https://maps.googleapis.com/maps/api/js?key=";
	srcURL += GoogleAPIKey;
	srcURL +="&callback=initMap";
	var s = document.createElement("script");
	s.src = srcURL;	

	var ele = document.getElementById("InitScriptTag");
	ele.appendChild(s);
	
	 
}


//現在位置をセットボタンを押したときの動作
function SetCenter(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(
			function ( position )
			{
				// 取得したデータの整理
				var data1 = position.coords ;

				// データの整理
				var lat1 = data1.latitude;
				var lng1 = data1.longitude;
				
				g_Map.setCenter(new google.maps.LatLng(lat1, lng1));
				
				
			},
			function ( error )
			{
				alert("現在位置をセットできませんでした");
			},
			//オプション
			{
				"enableHighAccuracy": false,
				"timeout": 8000,
				"maximumAge": 2000
			}
		);
	}
}

function initMap() {
  g_MapOpts = {
    zoom: 14,//ズームレベル
    center: new google.maps.LatLng(35.6807527,139.7600500)
  };
  g_Map = new google.maps.Map(document.getElementById("map"), g_MapOpts);
}

var current; // 現在のタブの状態を保持する変数

//タブのリンク一覧
var Tablinks = [];


(function(){
var menu = document.getElementById('tab_menu1');
var content = document.getElementById('tab_content1');
var links = menu.getElementsByTagName('a');


//Tablinkのリスト取得
for (var i = 0, l = links.length;i < l; i++){
  if(links[i].className == 'Tablink'){
  	Tablinks.push(links[i]);
  }
}
//各タブの初期化
for (var j = 0;j < Tablinks.length; j++){
  tab_init(Tablinks[j], j);
}
function tab_init(link, index){
  var id = link.hash.slice(1);
  var page = document.getElementById(id);
  if (!current){ // 状態の初期化
    current = {page:page, menu:link};
    page.style.display = 'block';
    link.className = 'active';
  } else {
    page.style.display = 'none';
  }
  
  if(id == 'page1-1'){//タスク検索タブの初期表示メソッド
  	  link.onclick = function(){
  	  	changeTab(link);
  	  	
  	  	return false;

  	  }
  }else if(id == 'page1-2'){//タスク登録タブの初期表示メソッド
	  link.onclick = function(){
		  	changeTab(link);

			  	
			return false;
		};
  }else if(id == 'pageStatusList'){//タスク登録タブの初期表示メソッド
	  link.onclick = function(){
		  	changeTab(link);
			
			ShowStsListTab();
			  	
			return false;
		};
  }
}
})();

function ShowStsListTab(){

	span1 = document.getElementById("StsListRedSts")
	span1.innerHTML = MyUser.RedSts

	span1 = document.getElementById("StsListBlueSts")
	span1.innerHTML = MyUser.BlueSts

	span1 = document.getElementById("StsListYellowSts")
	span1.innerHTML = MyUser.YellowSts

	span1 = document.getElementById("StsListGreenSts")
	span1.innerHTML = MyUser.GreenSts

	span1 = document.getElementById("StsListPurpleSts")
	span1.innerHTML = MyUser.PurpleSts

	span1 = document.getElementById("StsListWhiteSts")
	span1.innerHTML = MyUser.WhiteSts

	span1 = document.getElementById("StsListWhiteGoldSts")
	span1.innerHTML = MyUser.WhiteGoldSts

	span1 = document.getElementById("StsListWhiteSilverSts")
	span1.innerHTML = MyUser.WhiteSilverSts

	span1 = document.getElementById("StsListWhiteCoupperSts")
	span1.innerHTML = MyUser.WhiteCoupperSts

	span1 = document.getElementById("StsListBlackSts")
	span1.innerHTML = MyUser.BlackSts

	span1 = document.getElementById("StsListBlackGoldSts")
	span1.innerHTML = MyUser.BlackGoldSts

	span1 = document.getElementById("StsListBlackSilverSts")
	span1.innerHTML = MyUser.BlackSilverSts

	span1 = document.getElementById("StsListBlackCoupperSts")
	span1.innerHTML = MyUser.BlackCoupperSts
	
	span1 = document.getElementById("StsListRedStsExp")
	span1.innerHTML = MyUser.RedStsExp

	span1 = document.getElementById("StsListBlueStsExp")
	span1.innerHTML = MyUser.BlueStsExp

	span1 = document.getElementById("StsListYellowStsExp")
	span1.innerHTML = MyUser.YellowStsExp

	span1 = document.getElementById("StsListGreenStsExp")
	span1.innerHTML = MyUser.GreenStsExp

	span1 = document.getElementById("StsListPurpleStsExp")
	span1.innerHTML = MyUser.PurpleStsExp

	span1 = document.getElementById("StsListWhiteStsExp")
	span1.innerHTML = MyUser.WhiteStsExp

	span1 = document.getElementById("StsListWhiteGoldStsExp")
	span1.innerHTML = MyUser.WhiteGoldStsExp

	span1 = document.getElementById("StsListWhiteSilverStsExp")
	span1.innerHTML = MyUser.WhiteSilverStsExp

	span1 = document.getElementById("StsListWhiteCoupperStsExp")
	span1.innerHTML = MyUser.WhiteCoupperStsExp

	span1 = document.getElementById("StsListBlackStsExp")
	span1.innerHTML = MyUser.BlackStsExp

	span1 = document.getElementById("StsListBlackGoldStsExp")
	span1.innerHTML = MyUser.BlackGoldStsExp

	span1 = document.getElementById("StsListBlackSilverStsExp")
	span1.innerHTML = MyUser.BlackSilverStsExp
}
function changeTab(link){
  var id = link.hash.slice(1);
  var page = document.getElementById(id);

    current.page.style.display = 'none';
    if(current.menu != null){
	    current.menu.className = '';
	}
    page.style.display = 'block';
    link.className = 'active';
    current.page = page;
    current.menu = link;
}

const KYOTEN_RED = 0;
const KYOTEN_BLUE = 1;
const KYOTEN_YELLOW = 2;
const KYOTEN_GREEN = 3;
const KYOTEN_PURPLE = 4;
const KYOTEN_WHITE = 5;
const KYOTEN_WHITEGOLD = 6;
const KYOTEN_WHITESILVER = 7;
const KYOTEN_WHITECOPPER = 8;
const KYOTEN_BLACK = 9;
const KYOTEN_BLACKGOLD = 10;
const KYOTEN_BLACKSILVER = 11;
const KYOTEN_BLACKCOPPER = 12;
const KYOTEN_NIJI = 13;
const KYOTEN_TOKIMODORI = 14;
const KYOTEN_SAISEI = 15;


class User {

    //攻撃力
    RedSts = 0
    //防御力
    BlueSts = 0
    //hp
    YellowSts = 0
    //回避率
    GreenSts = 0
    //命中率
    PurpleSts = 0
    //自分のステータス上昇発生率
    WhiteSts = 0
    //自分のステータス上昇時の上昇数値
    WhiteGoldSts = 0
    //相手がステータス低下を発生したときの防御数値
    WhiteSilverSts = 0
    //相手の起こすステータス低下発生に対する抵抗率
    WhiteCoupperSts = 0
    //相手のステータス低下発生率
    BlackSts = 0
    //相手のステータス低下発生時の低下数値
    BlackGoldSts = 0
    //相手がステータス上昇を発生させたときの防御数値
    BlackSilverSts = 0
    //相手の起こすステータス上昇に対する抵抗率
    BlackCoupperSts = 0
    
    RedStsExp = 0
    BlueStsExp = 0
    YellowStsExp = 0
    GreenStsExp = 0
    PurpleStsExp = 0
    WhiteStsExp = 0
    WhiteGoldStsExp = 0
    WhiteSilverStsExp = 0
    WhiteCoupperStsExp = 0
    BlackStsExp = 0
    BlackGoldStsExp = 0
    BlackSilverStsExp = 0
    BlackCoupperStsExp = 0
    
    KyotenNames = []
    KyotenTypes = []
    KyotenLats = []
    KyotenLngs = []
    
    HavingYobiSuzuColor = []
    HavingYobiSuzuPower = []
    HavingOiSuzuColor = []
    HavineOiSuzuPower = []
    
    HavingCoin = []
    
    HavingTimeSand = []    
    TimeSandDownStsType = 0
    TimeSandUpStsType = 0

	name1;
	lat1;
	lng1;
    
  constructor(name1, lat1, lng1) {
    this.name1 = name1;
    this.lat1 = lat1
    this.lng1 = lng1
    

    
  }
  
  
  
}

let MyUser = new User();



