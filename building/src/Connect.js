import abi from "./abi/abi.json" assert {type : "json"};

const connect = new Promise((res,rej) => {
    if(typeof window.ethereum == "undefined"){
        rej("Install metamask");
    }
    window.ethereum.request({method: "eth_requestAccounts"})
   
    let web3 = new Web3(window.ethereum);

    let contract = new web3.eth.Contract(abi,"0xd0bC10E2b81D13905361a8C47c60360ba7D591A2");

    web3.eth.getAccounts().then((accounts) => {
        contract.methods
        .totalSupply()
        .call({from: accounts[0]})
        .then((supply)=>{
            contract.methods
            .getBuildings()
            .call({from: accounts[0]})
            .then((data)=>{
                res({supply: supply, buildings: data});
            });
        });
    });

});

export default connect;