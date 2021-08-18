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
| `updateInterval` | <br/> Rate at which module updates (also determines speed of fade in/fade out) <br/><br/>If you want to increase the updateInterval, you have to also increase the time of fadeInTable and fadeInShort in ethermine.css for the fade to work properly. <br/><br/>For instance, if I changed updateInterval to 40000, then I would need to change the animation for fadeInTable to “fadeIn 40s linear infinite” <br/> <br/>Also fadeInShort’s animation would be changed to “fadeIn 39s linear infinite” <br/> <br>
| `address`	   | <br/>Ethereum address that is used to retrieve information about the miners working for it on https://api.ethermine.org/<br/>

## Other notes

I am a novice at MagicMirror development, so the itself code isn't very clean.

If you think I am deserving of money, you can donate to my ethereum address: `0xAD48Bae6795b8B2c1F6CA65473EF726cd7748d29`


