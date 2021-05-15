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

g_KyotenColorNames = ["赤","青","黄","緑","紫","白","白金","白銀","白銅","黒","黒金","黒銀","黒銅","虹","時戻りの砂漠","再生の森"]



//GoogleAPIキー
var GoogleAPIKey = ''
var g_Map;
var deviceType;
var g_MakerList = []
var g_KyotenTuikaFlg = false;
var g_CurrentMarker = null;

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
    KyotenCount = 0
    
    HavingYobiSuzuColor = []
    HavingYobiSuzuPower = []
    HavingOiSuzuColor = []
    HavineOiSuzuPower = []
    
    HavingCoin = 0
    
    HavingTimeSand = 0    
    TimeSandDownStsType = 0
    TimeSandUpStsType = 0

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
    User.WhiteCoupperSts = 90
    //相手のステータス低下発生率
    User.BlackSts = 100
    //相手のステータス低下発生時の低下数値
    User.BlackGoldSts = 110
    //相手がステータス上昇を発生させたときの防御数値
    User.BlackSilverSts = 120
    //相手の起こすステータス上昇に対する抵抗率
    User.BlackCoupperSts = 130
    
    User.RedStsExp = 140
    User.BlueStsExp = 150
    User.YellowStsExp = 160
    User.GreenStsExp = 170
    User.PurpleStsExp = 180
    User.WhiteStsExp = 190
    User.WhiteGoldStsExp = 200
    User.WhiteSilverStsExp = 210
    User.WhiteCoupperStsExp = 220
    User.BlackStsExp = 230
    User.BlackGoldStsExp = 240
    User.BlackSilverStsExp = 250
    User.BlackCoupperStsExp = 260
    
    User.KyotenNames = ["k1", "k2"]
    User.KyotenTypes = [KYOTEN_RED, KYOTEN_GREEN]
    User.KyotenLats = [34.66679331519424, 34.669087571994275]
    User.KyotenLngs = [138.02233232405075, 137.99314988933753]
    User.KyotenCount = 2;
    
    User.HavingYobiSuzuColor = []
    User.HavingYobiSuzuPower = []
    User.HavingOiSuzuColor = []
    User.HavineOiSuzuPower = []
    
    User.HavingCoin = 270
    
    User.HavingTimeSand = 280    
    User.TimeSandDownStsType = KYOTEN_BLACKGOLD
    User.TimeSandUpStsType = KYOTEN_BLUE

	name1 = "DebugUser";
	lat1 = 34.66986407528885;
	lng1 = 138.01743997470177;

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
  
	
  //拠点マーカをセット
  SetKyotenMaker(MyUser);
  
		//マップをクリックしたときの処理
	g_Map.addListener('click', function(e){
		if(g_KyotenTuikaFlg == true){
		 	let mopts = {
				position: e.latLng,
				map: g_Map,
				title: title1,
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
	
	span1 = document.getElementById("StsListBlackCoupperStsExp")
	span1.innerHTML = MyUser.BlackCoupperStsExp

	span1 = document.getElementById("StsListCoin")
	span1.innerHTML = MyUser.HavingCoin

	span1 = document.getElementById("StsListTimeSand")
	span1.innerHTML = MyUser.HavingTimeSand	
	
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
function SetKyotenMaker(User){

	let message1 = "";
	
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
	 			for(i=0; i<User.KyotenNames.length; i++){
	 				if(marker1.title == User.KyotenNames[i]){
	 					msg2 = User.KyotenMarkerMassages[i]
	 				}
	 			}
	 	
			 	let infoWindow = new google.maps.InfoWindow({ // 吹き出しの追加
			        content: msg2 // 吹き出しに表示する内容
			  	});
			  	
	     	    infoWindow.open(g_Map, this); // 吹き出しの表示
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
  
}

function CanAddKyoten(){
	if(g_CurrentMarker == null){
		alert("クリックで拠点位置を指定してください")
		return false;
	}
	return true;
}
function AddKyoten(){

	let selectbox1 = document.getElementById("AddKyotenTab_KyotenType");
	
	//値(value値)を取得
	let str1 = selectbox1.options[selectbox1.selectedIndex].value;
	let kyotenType1 = Number(str1);
	
	if(CanAddKyoten() == true){
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












