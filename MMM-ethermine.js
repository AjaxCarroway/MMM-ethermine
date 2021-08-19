'use strict';
Module.register("MMM-ethermine", {

  result: {},
  defaults: {
	  updateInterval: 15000,
	  address: '0xeee973cf3e25c93cef4b6d0a864445a4482b212f',
	  domCount: 0,
	  fade: false,
  },

//Determines the color of share elements (red for bad output, green for good output)
  shareColor: function(shareNum, shareType, first, second){
    if(shareNum >0){
	shareType.classList.add(first);
    }else{
	shareType.classList.add(second);
   }
  },

//Determines the color of Hashrate elements (Insignificant if lower than 1 MH/s, green if higher than 1 MH/s)
  hashColor: function(hashVal, hashElement, str, num1, num2, firstColor, secondColor){
    if(hashVal){
	hashElement.innerHTML = ''+ str + num1 + '.' + num2 + ' MH/s';
	hashElement.classList.add(firstColor);
    }else{
	hashElement.innerHTML = '' + str + 'Insignificant';
	hashElement.classList.add(secondColor);
    }
  },
  getStyles: function() {
    return ["MMM-ethermine.css"];
  },

  start: function() {
    this.getMinerData();
    this.scheduleUpdate();
  },

  getDom: function() {
    var wrapper = document.createElement("table");
    wrapper.classList.add("row-separator");
    wrapper.classList.add("small");

    var data = this.result;
    var symbolElement =  document.createElement("span");
    var breakElement =  document.createElement("br");
    var symbol = this.config.ticker;
   	
    var title = document.createElement("tr");
    title.innerHTML = 'Overall Mining Statistics';
    title.classList.add("blue");
    wrapper.appendChild(title);
    wrapper.appendChild(breakElement);

//Overall Current Hashrate
    var cHash = data.data.currentStatistics.currentHashrate + ' ';
    var deci = cHash.indexOf('.');
	if(deci < 7){
		cHash = false;
	}
    var shortNum = cHash.substring(0,(deci-6));
    var decimal = cHash.substring(deci-6,(deci-5));

//Overall Reported Hashrate
    var rHash = data.data.currentStatistics.reportedHashrate.toString();
    var deci2 = rHash.length;
	if(deci2 < 7){
		rHash = false;
	}else{
		var shortNum2 = rHash.substring(0,(deci2-6));
        	var decimal2 = rHash.substring(deci2-6,(deci2-5));
	}

	var currentHash = document.createElement("tr");	
	this.hashColor(cHash, currentHash, 'Current Hashrate(CH): ', shortNum, decimal, 'shortgreen', 'shortred');

	var reportedHash = document.createElement ("tr");
   	this.hashColor(rHash, reportedHash, 'Reported Hashrate(CH): ', shortNum2, decimal2, 'shortgreen', 'shortred');

      	wrapper.appendChild(currentHash);
	wrapper.appendChild(reportedHash);

//Overall Shares
    var vShares = data.data.currentStatistics.validShares;
    var iShares = data.data.currentStatistics.invalidShares;
    var sShares = data.data.currentStatistics.staleShares;
    if(vShares) {
	var shares = document.createElement("tr");
	shares.innerHTML = 'Valid Shares(V): ' + vShares;
	this.shareColor(vShares, shares, "lgreen", "red");
	wrapper.appendChild(shares);

	var invalid = document.createElement("tr");
	invalid.innerHTML = 'Invalid Shares(I): ' + iShares;
	this.shareColor(iShares, invalid, "red", "lgreen");
	wrapper.appendChild(invalid);

	var stale = document.createElement("tr");
	stale.innerHTML = 'Stale Shares(S): ' + sShares;
	this.shareColor(sShares, stale, "red", "lgreen");
	wrapper.appendChild(stale);
	wrapper.appendChild(breakElement);
    	wrapper.appendChild(breakElement);
    }

//Workers Title
    
    var activeworkers = data.data.currentStatistics.activeWorkers;
    var spaceThing = document.createElement("tr");
    wrapper.appendChild(spaceThing);
    var active = document.createElement("tr");
    active.innerHTML = 'Total Workers: ' + activeworkers;
    active.classList.add("blue");
    wrapper.appendChild(active);

//Fade in Fade out (Refer to ethermine.css for the element)
    if(this.config.domCount == 0){
	//cuz MMM is weird for the first update
	var bwrap = document.createElement("fadeInShort");
    }else{
    	var bwrap = document.createElement("fadeInTable");
    }
    bwrap.classList.add('left');

//List of Worker length calculations
    var startIndex = this.config.domCount * 3;
    var endIndex = startIndex + 2;

    if(this.config.fade){
	this.config.fade = false;
	this.config.domCount = 0;
	startIndex = this.config.domCount * 3;
	endIndex = startIndex + 2;
    }
    if(activeworkers <= endIndex + 1){
	endIndex = activeworkers-1;
	this.config.fade = true;
    }

//List of Workers
    for(var i = startIndex; i<= endIndex; i++){

    //MinerName
	var miner = data.data.workers[i].worker;
	var minerName = document.createElement("tr");
	minerName.className = 'title';
	minerName.innerHTML = ' ' + miner + ":";
	bwrap.appendChild(minerName);

    //Current Hashrates
	var CH = data.data.workers[i].currentHashrate + ' ';
	var dec = CH.indexOf('.');
	if(dec < 7){
		CH = false;
	}
	var CshortNum = CH.substring(0,(dec-6));
	var Cdecimal = CH.substring(dec-6,(dec-5));
	var CHelement = document.createElement("tr");
	this.hashColor(CH, CHelement, 'CH: ', CshortNum, Cdecimal, 'green', 'red');

    //Reported Hashrates
	var RH = data.data.workers[i].reportedHashrate.toString();
    	var Rdec = RH.length;
	var RHelement = document.createElement("td");
	if(Rdec < 7){
		RH = false;
	}else{
	    	var RshortNum = RH.substring(0,(Rdec-6));
    		var Rdecimal = RH.substring(Rdec-6,(Rdec-5));
	}
	this.hashColor(RH, RHelement, 'RH: ', RshortNum, Rdecimal, 'green', 'red');

    //Adding Hashrate info
	CHelement.appendChild(RHelement);
	bwrap.appendChild(CHelement);

    //Shares
	var vs = data.data.workers[i].validShares;
	var iS = data.data.workers[i].invalidShares;
	var ss = data.data.workers[i].staleShares;

	if(vs) {
	    var validShare = document.createElement("tr");
	    validShare.innerHTML = 'V: ' + vs;
	    this.shareColor(vs, validShare, "lgreen", "red");

            var invalidShare = document.createElement("td");
	    invalidShare.innerHTML = 'I: ' + iS;
	    this.shareColor(iS, invalidShare, "red", "lgreen");
	    validShare.appendChild(invalidShare);

	    var staleShare = document.createElement("td");
	    staleShare.innerHTML = 'S: ' + ss;
	    this.shareColor(ss, staleShare, "red", "lgreen");

	    validShare.classList.add("indent");	
	    invalidShare.classList.add("indent");
	    staleShare.classList.add("indent");
	    validShare.appendChild(staleShare);

	//Adding Shares row
	    bwrap.appendChild(validShare);
    	}		
    }

//Adding bwrap table to wrapper (bwrap is one set of miner information)
    wrapper.appendChild(bwrap);
    this.config.domCount++;
    return wrapper;
  },

  scheduleUpdate: function(delay) {
    var nextLoad = this.config.updateInterval;
    if (typeof delay !== "undefined" && delay >= 0) {
      nextLoad = delay;
    }
    var self = this;
    setInterval(function() {
      self.getMinerData();
    }, nextLoad);
  },

//Interaction input with node helper to get Api Data
  getMinerData: function () {
    var url = 'https://api.ethermine.org/miner/' + this.config.address + '/dashboard';
	this.sendSocketNotification('GET_DATA', url);
  },

//Interaction output with node helper, returns Api Data and updates the displayed info
  socketNotificationReceived: function(notification, payload, payload2) {
    if (notification === "DATA_RESULT") {
      this.result = payload;
      this.updateDom();
    }
  },

});
