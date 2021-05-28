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
const KYOTEN_OUGON = 16;

//拠点同士の最小間隔(メートル)
const KYOTEN_MIN_INTERVAL = 200;
//何コインで1単位の鈴アイテムの強化ができるか
const KYOKA_COIN_UNIT = 10;
//一ステップにかかる秒数
const ONE_STEP_SECOND = 600;

g_KyotenColorNames = ["赤","青","黄","緑","紫","白","白金","白銀","白銅","黒","黒金","黒銀","黒銅","虹",
"時戻りの砂漠","再生の森","黄金の泉"]

g_YobiSuzuSettingElemIdList = 
["YobiSuzuSetting_RedSuzu",
"YobiSuzuSetting_BlueSuzu",
"YobiSuzuSetting_YellowSuzu",
"YobiSuzuSetting_GreenSuzu",
"YobiSuzuSetting_PurpleSuzu",
"YobiSuzuSetting_WhiteSuzu",
"YobiSuzuSetting_WhiteGoldSuzu",
"YobiSuzuSetting_WhiteSilverSuzu",
"YobiSuzuSetting_WhiteCopperSuzu",
"YobiSuzuSetting_BlackSuzu",
"YobiSuzuSetting_BlackGoldSuzu",
"YobiSuzuSetting_BlackSilverSuzu",
"YobiSuzuSetting_BlackCopperSuzu"]

g_YobiSuzuPowerStsElemIdList =
["RedYobiSuzuColorPowerSts",
"BlueYobiSuzuColorPowerSts",
"YellowYobiSuzuColorPowerSts",
"GreenYobiSuzuColorPowerSts",
"PurpleYobiSuzuColorPowerSts",
"WhiteYobiSuzuColorPowerSts",
"WhiteGoldYobiSuzuColorPowerSts",
"WhiteSilverYobiSuzuColorPowerSts",
"WhiteCopperYobiSuzuColorPowerSts",
"BlackYobiSuzuColorPowerSts",
"BlackGoldYobiSuzuColorPowerSts",
"BlackSilverYobiSuzuColorPowerSts",
"BlackCopperYobiSuzuColorPowerSts"
]

g_OiSuzuPowerStsElemIdList =
["RedOiSuzuColorPowerSts",
"BlueOiSuzuColorPowerSts",
"YellowOiSuzuColorPowerSts",
"GreenOiSuzuColorPowerSts",
"PurpleOiSuzuColorPowerSts",
"WhiteOiSuzuColorPowerSts",
"WhiteGoldOiSuzuColorPowerSts",
"WhiteSilverOiSuzuColorPowerSts",
"WhiteCopperOiSuzuColorPowerSts",
"BlackOiSuzuColorPowerSts",
"BlackGoldOiSuzuColorPowerSts",
"BlackSilverOiSuzuColorPowerSts",
"BlackCopperOiSuzuColorPowerSts"
]

//現在の状況（なし、経験値もしくはコインゲット、勝負、時戻しの砂漠、再生の森）
const MODE_NOTHING = 0
const MODE_GET_EXP_OR_COIN_OR_TIMESAND = 1
const MODE_FIGHT = 2



//GoogleAPIキー
var GoogleAPIKey = ''
var g_Map;
var deviceType;
var g_MakerList = []
var g_KyotenTuikaFlg = false;
var g_KyotenSakujoFlg = false;
var g_CurrentMarker = null;
var g_CurrentPositionMarker = null;
var g_InfoWindowList = [];
var g_CurrentMode = MODE_NOTHING;

//グーグルマップのMarkerオブジェクトのマップ
var MarkerMap = new Array();

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
    WhiteCopperSts = 0
    //相手のステータス低下発生率
    BlackSts = 0
    //相手のステータス低下発生時の低下数値
    BlackGoldSts = 0
    //相手がステータス上昇を発生させたときの防御数値
    BlackSilverSts = 0
    //相手の起こすステータス上昇に対する抵抗率
    BlackCopperSts = 0
    
    RedStsExp = 0
    BlueStsExp = 0
    YellowStsExp = 0
    GreenStsExp = 0
    PurpleStsExp = 0
    WhiteStsExp = 0
    WhiteGoldStsExp = 0
    WhiteSilverStsExp = 0
    WhiteCopperStsExp = 0
    BlackStsExp = 0
    BlackGoldStsExp = 0
    BlackSilverStsExp = 0
    BlackCopperStsExp = 0
    
    //拠点ID
    KyotenNames = []
    KyotenTypes = []
    KyotenLats = []
    KyotenLngs = []
    KyotenCount = 0
    
    HavingYobiSuzuColor = [0,0,0,0,0,0,0,0,0,0,0,0,0]
    HavingYobiSuzuPower = [0,0,0,0,0,0,0,0,0,0,0,0,0]
    HavingOiSuzuColor = [0,0,0,0,0,0,0,0,0,0,0,0,0]
    HavingOiSuzuPower = [0,0,0,0,0,0,0,0,0,0,0,0,0]
    
    HavingCoin = 0
    
    HavingTimeSand = 0    
    TimeSandDownStsType = 0
    TimeSandUpStsType = 0
    
    FightEnemyLevel = 1

	name1;
	lat1;
	lng1;
	KyotenMarkerList=[];
	KyotenMarkerMassages=[];
    
  constructor(name1, lat1, lng1) {
    this.name1 = name1;
    this.lat1 = lat1
    this.lng1 = lng1
    

    
  }
  
  
}

function ClearAllInfoWindow(){
	for(i=0; i<g_InfoWindowList.length; i++){
		g_InfoWindowList[i].close(); // 吹き出しの表示
	}
	infoWindowList = [];
}

function TestInitUser(User){

    //攻撃力
    User.RedSts = 10
    //防御力
    User.BlueSts = 20
    //hp
    User.YellowSts = 30
    //回避率
    User.GreenSts = 40
    //命中率
    User.PurpleSts = 50
    //自分のステータス上昇発生率
    User.WhiteSts = 60
    //自分のステータス上昇時の上昇数値
    User.WhiteGoldSts = 70
    //相手がステータス低下を発生したときの防御数値
    User.WhiteSilverSts = 80
    //相手の起こすステータス低下発生に対する抵抗率
    User.WhiteCopperSts = 90
    //相手のステータス低下発生率
    User.BlackSts = 100
    //相手のステータス低下発生時の低下数値
    User.BlackGoldSts = 110
    //相手がステータス上昇を発生させたときの防御数値
    User.BlackSilverSts = 120
    //相手の起こすステータス上昇に対する抵抗率
    User.BlackCopperSts = 130
    
    User.RedStsExp = 140
    User.BlueStsExp = 150
    User.YellowStsExp = 160
    User.GreenStsExp = 170
    User.PurpleStsExp = 180
    User.WhiteStsExp = 190
    User.WhiteGoldStsExp = 200
    User.WhiteSilverStsExp = 210
    User.WhiteCopperStsExp = 220
    User.BlackStsExp = 230
    User.BlackGoldStsExp = 240
    User.BlackSilverStsExp = 250
    User.BlackCopperStsExp = 260
    
    User.KyotenNames = ["k1", "k2"]
    User.KyotenTypes = [KYOTEN_RED, KYOTEN_GREEN]
    User.KyotenLats = [34.66679331519424, 34.669087571994275]
    User.KyotenLngs = [138.02233232405075, 137.99314988933753]
    User.KyotenCount = 2;
    
    User.HavingYobiSuzuColor = [1, 0,1, 0,1,0,0,0,0,0,0,0,0]
    User.HavingYobiSuzuPower = [10,0,30,0,90,0,0,0,0,0,0,0,0]
    User.HavingOiSuzuColor = [0,0,0,1, 0,1, 0,1,0,0,0,0,0]
    User.HavingOiSuzuPower = [0,0,0,20,0,10,0,90,0,0,0,0,0]
    
    User.HavingCoin = 270
    
    User.HavingTimeSand = 280    
    User.TimeSandDownStsType = KYOTEN_BLACKGOLD
    User.TimeSandUpStsType = KYOTEN_BLUE
    
    User.FightEnemyLevel = 2;

	User.name1 = "DebugUser";
	User.lat1 = 34.66986407528885;
	User.lng1 = 138.01743997470177;

}

let MyUser = new User();
TestInitUser(MyUser)


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
    center: new google.maps.LatLng(34.67177000706186, 138.01001561998794)
  };
  g_Map = new google.maps.Map(document.getElementById("map"), g_MapOpts);
  
	
  //現在位置マーカをセット
  SetCurrentLatLngMarker(MyUser);
	
  //拠点マーカをセット
  SetKyotenMaker(MyUser);
  
		//マップをクリックしたときの処理
	g_Map.addListener('click', function(e){
		if(g_KyotenTuikaFlg == true){
		 	let mopts = {
				position: e.latLng,
				map: g_Map,
				title: "click_pos",
				icon: {
				fillColor: "#0000FF",                //塗り潰し色
				fillOpacity: 0.8,                    //塗り潰し透過率
				path: google.maps.SymbolPath.CIRCLE, //円を指定
				scale: 8,                           //円のサイズ
				strokeColor: "#0000FF",              //枠の色
				}
			
				};

			if(g_CurrentMarker != null){
				g_CurrentMarker.setMap(null);
				g_CurrentMarker =  null;
			}
			
			let marker1 = new google.maps.Marker(mopts);
			g_CurrentMarker = marker1;
			
		}else if(g_KyotenSakujoFlg == true){
		}
	});
	
  
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
  }else if(id == 'pageAddKyoten'){
  	 link.onclick = function(){
  		changeTab(link);
  	
  		g_KyotenTuikaFlg = true;
  		
  		return false;
  	  };
  }else if(id == 'pageDeleteKyoten'){
	  link.onclick = function(){
		  	changeTab(link);
		  	
		  	g_KyotenSakujoFlg = true;
			  	
			return false;
		};
  }else if(id == 'pageUpgradeStatus'){
	  link.onclick = function(){
		  	changeTab(link);
			  	
			return false;
		};
  }else if(id == 'pageYobiSuzuSetting'){
	  link.onclick = function(){
		  	changeTab(link);
			
			ShowYobisuzuSettingTab()
			
			return false;
		};
  }else if(id == 'pageYobiSuzuKyoka'){
	  link.onclick = function(){
		  	changeTab(link);
			
			
			return false;
		};
  }else if(id == 'pageTokimodoshiSetting'){
	  link.onclick = function(){
		  	changeTab(link);
			
			ShowTokimodoshiSettingTab();
			
			return false;
		};
  }else if(id == 'pageSaiseiSetting'){
	  link.onclick = function(){
		  	changeTab(link);
			
			ShowSaiseiSettingTab();
			
			return false;
		};
  }
}
})();

function ShowTokimodoshiSettingTab(){
	span1 = document.getElementById("CurrenDownStsInTokimodoshiDessert");
	span1.innerHTML = g_KyotenColorNames[MyUser.TimeSandDownStsType]
	
}

function ChangeDownStsColorInTokimodoshiDessert(){
	selectbox1 = document.getElementById("DownStsInTokimodoshiDessert")
	colorId = Number(selectbox1.options[selectbox1.selectedIndex].value)
	MyUser.TimeSandDownStsType = colorId
	
	alert("設定を更新しました");
	ShowTokimodoshiSettingTab();
}

function ShowSaiseiSettingTab(){
	span1 = document.getElementById("CurrenUpStsInSaiseiForest");
	span1.innerHTML = g_KyotenColorNames[MyUser.TimeSandUpStsType]
	
}

function ChangeUpStsColorInSaiseiForest(){
	selectbox1 = document.getElementById("UpStsInSaiseiForest")
	colorId = Number(selectbox1.options[selectbox1.selectedIndex].value)
	MyUser.TimeSandUpStsType = colorId
	
	alert("設定を更新しました");
	ShowSaiseiSettingTab();
}
function ShowYobisuzuSettingTab(){

	let elemId;
	for(i=0; i<KYOTEN_NIJI; i++){
		flg = Number(MyUser.HavingYobiSuzuColor[i]);
		elemId = g_YobiSuzuSettingElemIdList[i]
		elem = document.getElementById(elemId)
		
		if(elem == null){
			alert(elemId)
			alert(i)
		}
		if(flg == 1){
			elem.selectedIndex = 0
		}else{
			elem.selectedIndex = 1
		}
	}
}
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

	span1 = document.getElementById("StsListWhiteCopperSts")
	span1.innerHTML = MyUser.WhiteCopperSts

	span1 = document.getElementById("StsListBlackSts")
	span1.innerHTML = MyUser.BlackSts

	span1 = document.getElementById("StsListBlackGoldSts")
	span1.innerHTML = MyUser.BlackGoldSts

	span1 = document.getElementById("StsListBlackSilverSts")
	span1.innerHTML = MyUser.BlackSilverSts

	span1 = document.getElementById("StsListBlackCopperSts")
	span1.innerHTML = MyUser.BlackCopperSts
	
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

	span1 = document.getElementById("StsListWhiteCopperStsExp")
	span1.innerHTML = MyUser.WhiteCopperStsExp

	span1 = document.getElementById("StsListBlackStsExp")
	span1.innerHTML = MyUser.BlackStsExp

	span1 = document.getElementById("StsListBlackGoldStsExp")
	span1.innerHTML = MyUser.BlackGoldStsExp

	span1 = document.getElementById("StsListBlackSilverStsExp")
	span1.innerHTML = MyUser.BlackSilverStsExp
	
	span1 = document.getElementById("StsListBlackCopperStsExp")
	span1.innerHTML = MyUser.BlackCopperStsExp

	span1 = document.getElementById("StsListCoin")
	span1.innerHTML = MyUser.HavingCoin

	span1 = document.getElementById("StsListTimeSand")
	span1.innerHTML = MyUser.HavingTimeSand
	
	span1 = document.getElementById("RedYobiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingYobiSuzuPower[0];

	span1 = document.getElementById("BlueYobiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingYobiSuzuPower[1];

	span1 = document.getElementById("YellowYobiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingYobiSuzuPower[2];

	span1 = document.getElementById("GreenYobiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingYobiSuzuPower[3];

	span1 = document.getElementById("PurpleYobiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingYobiSuzuPower[4];

	span1 = document.getElementById("WhiteYobiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingYobiSuzuPower[5];

	span1 = document.getElementById("WhiteGoldYobiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingYobiSuzuPower[6];

	span1 = document.getElementById("WhiteSilverYobiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingYobiSuzuPower[7];

	span1 = document.getElementById("WhiteCopperYobiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingYobiSuzuPower[8];

	span1 = document.getElementById("BlackYobiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingYobiSuzuPower[9];

	span1 = document.getElementById("BlackGoldYobiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingYobiSuzuPower[10];

	span1 = document.getElementById("BlackSilverYobiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingYobiSuzuPower[11];

	span1 = document.getElementById("BlackCopperYobiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingYobiSuzuPower[12];
	

	span1 = document.getElementById("RedOiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingOiSuzuPower[0];

	span1 = document.getElementById("BlueOiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingOiSuzuPower[1];

	span1 = document.getElementById("YellowOiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingOiSuzuPower[2];

	span1 = document.getElementById("GreenOiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingOiSuzuPower[3];

	span1 = document.getElementById("PurpleOiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingOiSuzuPower[4];

	span1 = document.getElementById("WhiteOiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingOiSuzuPower[5];

	span1 = document.getElementById("WhiteGoldOiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingOiSuzuPower[6];

	span1 = document.getElementById("WhiteSilverOiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingOiSuzuPower[7];

	span1 = document.getElementById("WhiteCopperOiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingOiSuzuPower[8];

	span1 = document.getElementById("BlackOiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingOiSuzuPower[9];

	span1 = document.getElementById("BlackGoldOiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingOiSuzuPower[10];

	span1 = document.getElementById("BlackSilverOiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingOiSuzuPower[11];

	span1 = document.getElementById("BlackCopperOiSuzuColorPowerSts");
	span1.innerHTML = MyUser.HavingOiSuzuPower[12];
	
}

//Userクラスの末尾に追加したマーカ情報を有効化する
function validateMarker(User){
		newId1=User.KyotenNames.length-1;
		latlng = new google.maps.LatLng(User.KyotenLats[newId1], User.KyotenLngs[newId1]);
		title1 = User.KyotenNames[newId1];
		message1 = "拠点ID:" +  title1 + "<br>"
		message1 += "拠点タイプ: "
		if(User.KyotenTypes[i] < KYOTEN_TOKIMODORI){
			message1 += g_KyotenColorNames[User.KyotenTypes[newId1]];
			message1 += "の拠点" 
			message1 += "<br>"
		}else{
			message1 += g_KyotenColorNames[User.KyotenTypes[newId1]];
			message1 += "<br>"
		}
		User.KyotenMarkerMassages.push(message1);
		
	 	let mopts = {
			position: latlng,
			map: g_Map,
			title: title1,
			icon: {
			fillColor: "#FF0000",                //塗り潰し色
			fillOpacity: 0.8,                    //塗り潰し透過率
			path: google.maps.SymbolPath.CIRCLE, //円を指定
			scale: 8,                           //円のサイズ
			strokeColor: "#FF0000",              //枠の色
			}
		
			};
		
		let marker1 = new google.maps.Marker(mopts);
		User.KyotenMarkerList.push(marker1);
  	
	 	marker1.addListener('click', function(){ // マーカーをクリックしたとき
	 			for(j=0; j<User.KyotenNames.length; j++){
	 				if(marker1.title == User.KyotenNames[j]){
	 					msg2 = User.KyotenMarkerMassages[j]
	 				}
	 			}
	 	
			 	let infoWindow = new google.maps.InfoWindow({ // 吹き出しの追加
			        content: msg2 // 吹き出しに表示する内容
			  	});
			  	
	     	    infoWindow.open(g_Map, this); // 吹き出しの表示
	    });
	    


}

function SetCurrentLatLngMarker(User){
	

	latlng = new google.maps.LatLng(User.lat1, User.lng1);
	
	if(g_CurrentPositionMarker != null){
		g_CurrentPositionMarker.setMap(null)
		g_CurrentPositionMarker = null;
	}
	
 	let mopts = {
		position: latlng,
		map: g_Map,
		title: "現在地",
		icon: {
		fillColor: "#888888",                //塗り潰し色
		fillOpacity: 0.8,                    //塗り潰し透過率
		path: google.maps.SymbolPath.CIRCLE, //円を指定
		scale: 8,                           //円のサイズ
		strokeColor: "#888888",              //枠の色
		}
	
		};
	
	let marker1 = new google.maps.Marker(mopts);
	g_CurrentPositionMarker = marker1;

	    

}

//GoogleMap中のUserの拠点マーカをすべてクリアする
function ClearAllKyotenMarkerInMap(User){

	len1 = User.KyotenMarkerList.length;
	for(i=0; i<len1; i++){
		User.KyotenMarkerList[i].setMap(null);
	}
}

function SetKyotenMaker(User){

	let message1 = "";
	
	ClearAllInfoWindow();
	ClearAllKyotenMarkerInMap(User);
	
	for(i=0; i<User.KyotenNames.length; i++){
		latlng = new google.maps.LatLng(User.KyotenLats[i], User.KyotenLngs[i]);
		title1 = User.KyotenNames[i];
		message1 = "拠点ID:" +  title1 + "<br>"
		message1 += "拠点タイプ: "
		if(User.KyotenTypes[i] < KYOTEN_TOKIMODORI){
			message1 += g_KyotenColorNames[User.KyotenTypes[i]];
			message1 += "の拠点" 
			message1 += "<br>"
		}else{
			message1 += g_KyotenColorNames[User.KyotenTypes[i]];
			message1 += "<br>"
		}
		User.KyotenMarkerMassages.push(message1);
		
	 	let mopts = {
			position: latlng,
			map: g_Map,
			title: title1,
			icon: {
			fillColor: "#FF0000",                //塗り潰し色
			fillOpacity: 0.8,                    //塗り潰し透過率
			path: google.maps.SymbolPath.CIRCLE, //円を指定
			scale: 8,                           //円のサイズ
			strokeColor: "#FF0000",              //枠の色
			}
		
			};
		
		let marker1 = new google.maps.Marker(mopts);
		User.KyotenMarkerList.push(marker1);
  	
	 	marker1.addListener('click', function(){ // マーカーをクリックしたとき
	 			SetKyotenMaker(MyUser);
	 	
	 			g_CurrentMarker = marker1;
	 			for(i=0; i<User.KyotenNames.length; i++){
	 				if(marker1.title == User.KyotenNames[i]){
	 					msg2 = User.KyotenMarkerMassages[i]
	 					
	 					//前のマーカを削除して色を変えたマーカをセットする
	 					prevMarker = g_CurrentMarker;
	 					let mopts2 = {
							position: prevMarker.position,
							map: g_Map,
							title: prevMarker.title,
							icon: {
							fillColor: "#3cb371",                //塗り潰し色
							fillOpacity: 0.8,                    //塗り潰し透過率
							path: google.maps.SymbolPath.CIRCLE, //円を指定
							scale: 8,                           //円のサイズ
							strokeColor: "#3cb371",              //枠の色
							}
						
						};
						
						let marker2 = new google.maps.Marker(mopts2);
						User.KyotenMarkerList[i] = marker2
						prevMarker.setMap(null);
	 					
	 				}
	 			}
	 	
			 	let infoWindow = new google.maps.InfoWindow({ // 吹き出しの追加
			        content: msg2 // 吹き出しに表示する内容
			  	});
			  	
	     	    infoWindow.open(g_Map, this); // 吹き出しの表示
	     	    g_InfoWindowList.push(infoWindow);
	    });
	    
	}

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
    
  g_KyotenTuikaFlg = false;
  g_KyotenSakujoFlg = false;
  
}
function SetHavingYobiSuzuCount(){

	let totalCount = 0;
	
	for(var i=0; i<KYOTEN_NIJI; i++){
		elem = document.getElementById(g_YobiSuzuSettingElemIdList[i])
		if(elem.selectedIndex == 0){
			totalCount++;
		}
	}
	
	if(totalCount > 5){
	
		alert("持ち込む鈴の種類は5種類までです")
		
	}else{
	
		for(var i=0; i<KYOTEN_NIJI; i++){
			elem = document.getElementById(g_YobiSuzuSettingElemIdList[i])
			if(elem.selectedIndex == 0){
				MyUser.HavingYobiSuzuColor[i] = 1
			}else{
				MyUser.HavingYobiSuzuColor[i] = 0
			}
		}
		
		alert("持ち込む鈴の種類を変更しました")
		ShowYobisuzuSettingTab()
		
		
	}
}
function AddKyoten_MyLatLng(){
	let selectbox1 = document.getElementById("AddKyotenTab_KyotenType");
	
	//値(value値)を取得
	let str1 = selectbox1.options[selectbox1.selectedIndex].value;
	let kyotenType1 = Number(str1);
	
	if(CanAddKyotenMyLatLng(MyUser) == true){
		MyUser.KyotenCount++;
		let name1 = "k"+MyUser.KyotenCount;
	    MyUser.KyotenNames.push(name1);
	    
	    MyUser.KyotenTypes.push(kyotenType1);
	    MyUser.KyotenLats.push(MyUser.lat1)
	    MyUser.KyotenLngs.push(MyUser.lng1)
	    
	    validateMarker(MyUser)
	    
	    alert("拠点を追加しました")
	}
}
function CanAddKyotenMyLatLng(User){
	
	for(i=0; i<User.KyotenNames.length; i++){
		dist1 = distance(User.lat1, User.lng1, User.KyotenLats[i], User.KyotenLngs[i]);
		if(dist1 < KYOTEN_MIN_INTERVAL){
			msg1 = "拠点同士の間隔は" + KYOTEN_MIN_INTERVAL + "メートル以上取ってください";
			alert(msg1);
			return false;
		}
	}
	return true;
}


function CanAddKyotenCurrentMarker(User){
	if(g_CurrentMarker == null){
		alert("クリックで拠点位置を指定してください")
		return false;
	}
	
	for(i=0; i<User.KyotenNames.length; i++){
		dist1 = distance(g_CurrentMarker.position.lat(), g_CurrentMarker.position.lng(), User.KyotenLats[i], User.KyotenLngs[i]);
		if(dist1 < KYOTEN_MIN_INTERVAL){
			msg1 = "拠点同士の間隔は" + KYOTEN_MIN_INTERVAL + "メートル以上取ってください";
			alert(msg1);
			return false;
		}
	}
	return true;
}
function AddKyoten(){

	let selectbox1 = document.getElementById("AddKyotenTab_KyotenType");
	
	//値(value値)を取得
	let str1 = selectbox1.options[selectbox1.selectedIndex].value;
	let kyotenType1 = Number(str1);
	
	if(CanAddKyotenCurrentMarker(MyUser) == true){
		MyUser.KyotenCount++;
		let name1 = "k"+MyUser.KyotenCount;
	    MyUser.KyotenNames.push(name1);
	    
	    MyUser.KyotenTypes.push(kyotenType1);
	    MyUser.KyotenLats.push(g_CurrentMarker.position.lat())
	    MyUser.KyotenLngs.push(g_CurrentMarker.position.lng())
	    
	    validateMarker(MyUser)
	    
	    g_CurrentMarker.setMap(null)
	    g_CurrentMarker=null
	    alert("拠点を追加しました")
	}
	
	
}

function CanDeleteKyoten(){
	if(g_CurrentMarker == null){
		alert("クリックで削除する拠点位置を選択してください")
		return false;
	}
	return true;
}

function DeleteKyoten(){
	if(CanDeleteKyoten(MyUser) == true){
		let delKyotenName = g_CurrentMarker.title;
		let delIndex;
		let delMarker;
		
	    for(i=0; i<MyUser.KyotenNames.length; i++){
	    	if(MyUser.KyotenNames[i] == delKyotenName){
	    		delIndex = i
	    		delMarker = MyUser.KyotenMarkerList[i];
	    		break
	    	}
	    }

    	MyUser.KyotenNames.splice(delIndex, 1)
    	MyUser.KyotenTypes.splice(delIndex, 1)
    	MyUser.KyotenLats.splice(delIndex, 1)
    	MyUser.KyotenLngs.splice(delIndex, 1)
    	MyUser.KyotenMarkerList.splice(delIndex, 1)
    	MyUser.KyotenMarkerMassages.splice(delIndex, 1)
	    
	    delMarker.setMap(null)
	    g_CurrentMarker=null
	    
	    SetKyotenMaker(MyUser)
	    alert("拠点を削除しました")
	}
}

function UpgradeStatus(){

	UpPt = parseInt(MyUser.RedStsExp / 10)
	ConsumeExp = 10 * UpPt
	MyUser.RedSts += UpPt
	MyUser.RedStsExp -= ConsumeExp
	
	UpPt = parseInt(MyUser.BlueStsExp / 10)
	ConsumeExp = 10 * UpPt
	MyUser.BlueSts += UpPt
	MyUser.BlueStsExp -= ConsumeExp

	UpPt = parseInt(MyUser.YellowStsExp / 10)
	ConsumeExp = 10 * UpPt
	MyUser.YellowSts += UpPt
	MyUser.YellowStsExp -= ConsumeExp

	UpPt = parseInt(MyUser.GreenStsExp / 10)
	ConsumeExp = 10 * UpPt
	MyUser.GreenSts += UpPt
	MyUser.GreenStsExp -= ConsumeExp

	UpPt = parseInt(MyUser.PurpleStsExp / 10)
	ConsumeExp = 10 * UpPt
	MyUser.PurpleSts += UpPt
	MyUser.PurpleStsExp -= ConsumeExp

	UpPt = parseInt(MyUser.WhiteStsExp / 10)
	ConsumeExp = 10 * UpPt
	MyUser.WhiteSts += UpPt
	MyUser.WhiteStsExp -= ConsumeExp

	UpPt = parseInt(MyUser.WhiteGoldStsExp / 10)
	ConsumeExp = 10 * UpPt
	MyUser.WhiteGoldSts += UpPt
	MyUser.WhiteGoldStsExp -= ConsumeExp

	UpPt = parseInt(MyUser.WhiteSilverStsExp / 10)
	ConsumeExp = 10 * UpPt
	MyUser.WhiteSilverSts += UpPt
	MyUser.WhiteSilverStsExp -= ConsumeExp

	UpPt = parseInt(MyUser.WhiteCopperStsExp / 10)
	ConsumeExp = 10 * UpPt
	MyUser.WhiteCopperSts += UpPt
	MyUser.WhiteCopperStsExp -= ConsumeExp

	UpPt = parseInt(MyUser.BlackStsExp / 10)
	ConsumeExp = 10 * UpPt
	MyUser.BlackSts += UpPt
	MyUser.BlackStsExp -= ConsumeExp

	UpPt = parseInt(MyUser.BlackGoldStsExp / 10)
	ConsumeExp = 10 * UpPt
	MyUser.BlackGoldSts += UpPt
	MyUser.BlackGoldStsExp -= ConsumeExp

	UpPt = parseInt(MyUser.BlackSilverStsExp / 10)
	ConsumeExp = 10 * UpPt
	MyUser.BlackSilverSts += UpPt
	MyUser.BlackSilverStsExp -= ConsumeExp

	UpPt = parseInt(MyUser.BlackCopperStsExp / 10)
	ConsumeExp = 10 * UpPt
	MyUser.BlackCopperSts += UpPt
	MyUser.BlackCopperStsExp -= ConsumeExp

    alert("ステータスを強化しました")
}

function YobiSuzuKyoka(){
	elem1 = document.getElementById("YobiSuzuKyokaColor");
	elem2 = document.getElementById("YobiSuzuKyokaConsumeCoin")
	colorId = Number(elem1.options[elem1.selectedIndex].value);
	coin1 = Number(elem2.options[elem2.selectedIndex].value);
	
	if(coin1 > MyUser.HavingCoin){
		alert("強化用コインが足りません")
		return
	}else{
		upPt = coin1 / KYOKA_COIN_UNIT;
		MyUser.HavingCoin -= coin1;
		MyUser.HavingYobiSuzuPower[colorId] += upPt
		
		str1 = g_KyotenColorNames[colorId]
		str1 += "鈴を"
		str1 += upPt
		str1 += "だけ強化しました"
		alert(str1);
		
	}
}

/**
 * ２地点間の距離(m)を求める
 * ヒュベニの公式から求めるバージョン
 *
 * @param float lat1 緯度１
 * @param float lon1 経度１
 * @param float lat2 緯度２
 * @param float lon2 経度２
 * @param boolean mode 測地系 true:世界(default) false:日本
 * @return float 距離(m)
 */
function distance(lat1, lon1, lat2, lon2, mode=true)
{
    // 緯度経度をラジアンに変換
    radLat1 = deg2rad(lat1); // 緯度１
    radLon1 = deg2rad(lon1); // 経度１
    radLat2 = deg2rad(lat2); // 緯度２
    radLon2 = deg2rad(lon2); // 経度２

    // 緯度差
    radLatDiff = radLat1 - radLat2;

    // 経度差算
    radLonDiff = radLon1 - radLon2;

    // 平均緯度
    radLatAve = (radLat1 + radLat2) / 2.0;

    // 測地系による値の違い
    a = mode ? 6378137.0 : 6377397.155; // 赤道半径
    b = mode ? 6356752.314140356 : 6356078.963; // 極半径
    //e2 = (a*a - b*b) / (a*a);
    e2 = mode ? 0.00669438002301188 : 0.00667436061028297; // 第一離心率^2
    //a1e2 = a * (1 - e2);
    a1e2 = mode ? 6335439.32708317 : 6334832.10663254; // 赤道上の子午線曲率半径

    sinLat = Math.sin(radLatAve);
    W2 = 1.0 - e2 * (sinLat*sinLat);
    M = a1e2 / (Math.sqrt(W2)*W2); // 子午線曲率半径M
    N = a / Math.sqrt(W2); // 卯酉線曲率半径

    t1 = M * radLatDiff;
    t2 = N * Math.cos(radLatAve) * radLonDiff;
    dist = Math.sqrt((t1*t1) + (t2*t2));

    return dist;
}

function deg2rad(degrees) {
  return degrees * Math.PI / 180;
};

function rad2deg(radian){
        return radian * 360/(2*Math.PI);
}









