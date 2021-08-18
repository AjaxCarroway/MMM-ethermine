# MMM-ethermine
A <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a> module to track miner rig statistics for Ethereum miners on 
<a href="https://ethermine.org">ethermine.org</a>


## Installing the module

````javascript
cd MagicMirror
cd modules
git clone https://github.com/AjaxCarroway/MMM-ethermine
````

## Using the module
Add `MMM-ethermine` module to the `config.js` file in MagicMirror:
````javascript
modules: [
  {
    module: 'MMM-ethermine',
    position: 'top_left',
    config: {
      updateInterval: 30000,
      address: "0x8E5976d8A259fd1D4160c7E1193192C0B7885771",
    }
  },
]
````

## Configuration options

| Option           | Description
|----------------- |-----------
| `updateInterval` | <br/> Rate at which module updates (also determines speed of fade in/fade out) <br/>If you want to increase the updateInterval, you have to also increase the time of fadeInTable and fadeInShort in ethermine.css for the fade to work properly. <br/>For instance, if I changed updateInterval to 40000, then I would need to change the animation for fadeInTable to “fadeIn 40s linear infinite” <br/> <br/>Also fadeInShort’s animation would be changed to “fadeIn 39s linear infinite” <br/>

| `address`	   | *Optional*<br/>The exchange used to get the data<br/><br/>Can be any item from <a href="https://api.cryptowat.ch/markets">THIS LIST</a> with a *currencyPair* of *ethusd* <br><br>**Type:** `String` <br>Default "kraken"


## To Do
* **Create issues to track these**
* ~API allows for different exchanges, allow setting this via configuration~
* ~24h high/low values on the ticker~
* Last change indicator (Green = price went up, Red = Price went down)
* Current hashrate for mining rig
* Alert when miner goes offline
* Average hashrate for mining rig
* Pending payout for mining
* Mining calculator based on average mining
* Convert USD value to local currency (Configurable - ZAR in my case)
* Add ticker graph (minute, hour, day, week, month, year)
* Possible future extensibility to allow for different cryptocurrencies
